import type { IncomingMessage, ServerResponse } from 'http';

async function readBody(req: IncomingMessage): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => { try { resolve(JSON.parse(data)); } catch { reject(new Error('Invalid JSON')); } });
    req.on('error', reject);
  });
}

async function syncToAirtable(fields: Record<string, string>, sessionId?: string) {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const token = process.env.token;
  if (!baseId || !token) return;

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  if (sessionId) {
    const searchRes = await fetch(
      `https://api.airtable.com/v0/${baseId}/Leads?filterByFormula=${encodeURIComponent(`{SessionId}="${sessionId}"`)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const searchData = await searchRes.json() as { records: { id: string }[] };
    const existingId = searchData.records?.[0]?.id;

    if (existingId) {
      const r = await fetch(`https://api.airtable.com/v0/${baseId}/Leads/${existingId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ fields: { ...fields, SessionId: sessionId } }),
      });
      if (!r.ok) console.error('Airtable update error:', r.status, await r.text());
      return;
    }
    fields.SessionId = sessionId;
  }

  const r = await fetch(`https://api.airtable.com/v0/${baseId}/Leads`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ records: [{ fields }] }),
  });
  if (!r.ok) console.error('Airtable create error:', r.status, await r.text());
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'POST') {
    try {
      const { name, email, phone, address, interest, origin, timeline, propertyNeeds, sessionId, details } = await readBody(req);

      const fields: Record<string, string> = Object.fromEntries(
        Object.entries({ Name: name, Phone: phone, Email: email, Address: address, Interest: interest, Origin: origin, Details: details })
          .filter(([, v]) => v != null && v !== '')
      );

      await syncToAirtable(fields, sessionId);

      res.writeHead(201);
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      console.error('Error saving lead:', err);
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Failed to save lead' }));
    }
  } else {
    res.writeHead(405);
    res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
}
