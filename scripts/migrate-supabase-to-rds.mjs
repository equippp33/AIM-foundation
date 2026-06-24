/**
 * One-time migration: Supabase sse_pledges → AWS RDS (aim-foundation)
 * Run: node scripts/migrate-supabase-to-rds.mjs
 */

import pg from "pg";

const SUPABASE_URL = "https://dyqasfwjaucapvqbmmqo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5cWFzZndqYXVjYXB2cWJtbXFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTI2MDI5OCwiZXhwIjoyMDk2ODM2Mjk4fQ.EcUT_4NdVZypBXiK5iOmHoOhYepnF2PCGqm1xcAkiCc";
const DATABASE_URL = "postgresql://postgres:4V756XoIfL8@3.111.76.57:5432/aim-foundation";

async function migrate() {
  // ── 1. Fetch all rows from Supabase via REST API ───────────────────────────
  console.log("Fetching data from Supabase...");
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/sse_pledges?select=*&order=created_at.asc`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    console.error("Failed to fetch from Supabase:", res.status, await res.text());
    process.exit(1);
  }

  const data = await res.json();

  console.log(`Fetched ${data.length} rows from Supabase.`);

  if (data.length === 0) {
    console.log("Nothing to migrate.");
    process.exit(0);
  }

  // ── 2. Connect to RDS ──────────────────────────────────────────────────────
  console.log("Connecting to RDS...");
  const client = new pg.Client({ connectionString: DATABASE_URL, ssl: false });
  await client.connect();

  // ── 3. Create table + enum if they don't exist ─────────────────────────────
  await client.query(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_type') THEN
        CREATE TYPE project_type AS ENUM ('JANANI_MITRA', 'MAP_AP');
      END IF;
    END $$;
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS public.sse_pledges (
      id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at timestamptz DEFAULT now(),
      name       text NOT NULL,
      email      text NOT NULL,
      phone      text NOT NULL,
      amount     integer NOT NULL,
      project    project_type,
      status     text DEFAULT 'pending'
    );
  `);

  console.log("Table ready. Inserting rows...");

  // ── 4. Insert rows ─────────────────────────────────────────────────────────
  let inserted = 0;
  let skipped = 0;

  for (const row of data) {
    try {
      await client.query(
        `INSERT INTO public.sse_pledges (id, created_at, name, email, phone, amount, project, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7::project_type, $8)
         ON CONFLICT (id) DO NOTHING`,
        [
          row.id,
          row.created_at,
          row.name,
          row.email,
          row.phone,
          row.amount,
          row.project ?? null,
          row.status ?? "pending",
        ]
      );
      inserted++;
    } catch (err) {
      console.warn(`Skipped row ${row.id}: ${err.message}`);
      skipped++;
    }
  }

  await client.end();

  console.log(`\nDone. Inserted: ${inserted}, Skipped: ${skipped}`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
