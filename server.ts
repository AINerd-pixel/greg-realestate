import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const db = new Database("leads.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT UNIQUE,
    name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    interest TEXT,
    origin TEXT,
    timeline TEXT,
    property_needs TEXT,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
try { db.exec(`ALTER TABLE leads ADD COLUMN address TEXT`); } catch {}
try { db.exec(`ALTER TABLE leads ADD COLUMN interest TEXT`); } catch {}
try { db.exec(`ALTER TABLE leads ADD COLUMN origin TEXT`); } catch {}
try { db.exec(`ALTER TABLE leads ADD COLUMN session_id TEXT`); } catch {}
try { db.exec(`CREATE UNIQUE INDEX IF NOT EXISTS idx_leads_session_id ON leads(session_id WHERE session_id IS NOT NULL)`); } catch {}
try { db.exec(`ALTER TABLE leads ADD COLUMN details TEXT`); } catch {}

async function syncToAirtable({ airtableBaseId, airtableToken, sessionId, name, phone, email, address, interest, origin, details }: Record<string, string | undefined>) {
  const fields: Record<string, string> = Object.fromEntries(
    Object.entries({ Name: name, Phone: phone, Email: email, Address: address, Interest: interest, Origin: origin, Details: details })
      .filter(([, v]) => v != null && v !== '')
  );

  try {
    if (sessionId) {
      // Search for existing record by SessionId
      const searchRes = await fetch(
        `https://api.airtable.com/v0/${airtableBaseId}/Leads?filterByFormula=${encodeURIComponent(`{SessionId}="${sessionId}"`)}`,
        { headers: { Authorization: `Bearer ${airtableToken}` } }
      );
      const searchData = await searchRes.json() as { records: { id: string }[] };
      const existingId = searchData.records?.[0]?.id;

      if (existingId) {
        // Update existing record
        const r = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/Leads/${existingId}`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${airtableToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ fields: { ...fields, SessionId: sessionId } }),
        });
        if (!r.ok) console.error("Airtable update error:", r.status, await r.text());
        return;
      }
      // No existing record — fall through to create with SessionId
      fields.SessionId = sessionId;
    }

    const r = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/Leads`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${airtableToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: [{ fields }] }),
    });
    if (!r.ok) console.error("Airtable create error:", r.status, await r.text());
  } catch (err) {
    console.error("Airtable sync failed:", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/leads", (req, res) => {
    const { name, email, phone, address, interest, origin, timeline, propertyNeeds, sessionId, details } = req.body;
    try {
      // Upsert by session_id for chat leads; plain insert for website popup (no sessionId)
      if (sessionId) {
        db.prepare(`
          INSERT INTO leads (session_id, name, email, phone, address, interest, origin, timeline, property_needs, details)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(session_id) DO UPDATE SET
            name = COALESCE(excluded.name, name),
            email = COALESCE(excluded.email, email),
            phone = COALESCE(excluded.phone, phone),
            address = COALESCE(excluded.address, address),
            interest = COALESCE(excluded.interest, interest),
            origin = excluded.origin,
            timeline = COALESCE(excluded.timeline, timeline),
            property_needs = COALESCE(excluded.property_needs, property_needs),
            details = excluded.details
        `).run(sessionId, name, email, phone, address, interest, origin, timeline, propertyNeeds, details);
      } else {
        db.prepare(
          "INSERT INTO leads (name, email, phone, address, interest, origin, timeline, property_needs) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
        ).run(name, email, phone, address, interest, origin, timeline, propertyNeeds);
      }

      // Sync to Airtable
      const airtableBaseId = process.env.AIRTABLE_BASE_ID;
      const airtableToken = process.env.token;
      if (airtableBaseId && airtableToken) {
        syncToAirtable({ airtableBaseId, airtableToken, sessionId, name, phone, email, address, interest, origin, details });
      }

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error saving lead:", error);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  app.get("/api/leads", (req, res) => {
    try {
      const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
      res.json(leads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.get("/api/feedback-schema", async (_req, res) => {
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableToken = process.env.token;
    const r = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/tbltLA7BO0R7Iv9OZ`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${airtableToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ records: [{ fields: { Phone: 'test123' } }] }),
    });
    const data = await r.json();
    res.json({ status: r.status, data });
  });

  app.post("/api/feedback", async (req, res) => {
    const { name, phone, email, intents, heardFrom, likedMost, likedLeast, additionalComments, workingWithAgent, sendOptions, notes } = req.body;
    const ratingFields = ['Price', 'Location', 'Floor Plan', 'Kitchen', 'Curb Appeal', 'Overall Opinion'];
    try {
      const airtableBaseId = process.env.AIRTABLE_BASE_ID;
      const airtableToken = process.env.token;
      if (airtableBaseId && airtableToken) {
        const fields: Record<string, string> = Object.fromEntries(
          Object.entries({
            'Visitor Name': name, Phone: phone, Email: email, Intent: intents,
            ...Object.fromEntries(ratingFields.map(f => [f, req.body[f] || ''])),
            'Heard From': heardFrom, 'Liked Most': likedMost, 'Liked Least': likedLeast,
            'Additional Comments': additionalComments, 'Working With Agent': workingWithAgent,
            'Send Options': sendOptions, Notes: notes,
          }).filter(([, v]) => v != null && v !== '')
        );
        console.log('Feedback fields:', JSON.stringify(fields));
        const r = await fetch(`https://api.airtable.com/v0/${airtableBaseId}/tbltLA7BO0R7Iv9OZ`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${airtableToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ records: [{ fields }] }),
        });
        const txt = await r.text();
        if (!r.ok) console.error('Airtable feedback error:', r.status, txt);
        else console.log('Airtable feedback success');
      }
      res.status(201).json({ success: true });
    } catch (error) {
      console.error('Feedback error:', error);
      res.status(500).json({ error: 'Failed to save feedback' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
