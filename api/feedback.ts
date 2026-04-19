import type { IncomingMessage, ServerResponse } from 'http';

async function readBody(req: IncomingMessage): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => { try { resolve(JSON.parse(data)); } catch { reject(new Error('Invalid JSON')); } });
    req.on('error', reject);
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    const body = await readBody(req);
    const { name, phone, email, intents, heardFrom, likedMost, likedLeast, additionalComments, workingWithAgent, sendOptions, notes } = body;
    const ratingFields = ['Price', 'Location', 'Floor Plan', 'Kitchen', 'Curb Appeal', 'Overall Opinion'];

    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.token;

    if (baseId && token) {
      const fields: Record<string, string> = Object.fromEntries(
        Object.entries({
          'Visitor Name': name, Phone: phone, Email: email, Intent: intents,
          ...Object.fromEntries(ratingFields.map(f => [f, body[f] || ''])),
          'Heard From': heardFrom, 'Liked Most': likedMost, 'Liked Least': likedLeast,
          'Additional Comments': additionalComments, 'Working With Agent': workingWithAgent,
          'Send Options': sendOptions, Notes: notes,
        }).filter(([, v]) => v != null && v !== '')
      );

      const r = await fetch(`https://api.airtable.com/v0/${baseId}/tbltLA7BO0R7Iv9OZ`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ records: [{ fields }] }),
      });
      if (!r.ok) console.error('Airtable feedback error:', r.status, await r.text());
    }

    res.writeHead(201);
    res.end(JSON.stringify({ success: true }));
  } catch (err) {
    console.error('Feedback error:', err);
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Failed to save feedback' }));
  }
}
