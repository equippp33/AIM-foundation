import pg from "pg";

const client = new pg.Client({
  connectionString: "postgresql://postgres:4V756XoIfL8@3.111.76.57:5432/aim-foundation",
  ssl: false,
});

await client.connect();
console.log("Connected to RDS.");

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

console.log("Tables created successfully.");
await client.end();
