-- Adds the donor's contribution target (Janani Mitra / MAP-AP) to the pledges table
-- as a strongly-typed Postgres enum. The form stores the enum CODE; the app shows
-- the friendly label (see lib/projects.ts).
--
-- Run this once in: Supabase Dashboard -> SQL Editor -> New query -> Run.
-- It is idempotent — safe to run again.

-- 1. Create the enum type (only if it doesn't already exist).
do $$
begin
  if not exists (select 1 from pg_type where typname = 'project_type') then
    create type project_type as enum ('JANANI_MITRA', 'MAP_AP');
  end if;
end$$;

-- 2. Add the column using that enum type (NULL allowed for blank submissions).
alter table public.sse_pledges
  add column if not exists project project_type;
