-- Agents table
create table james_app_agents (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,           -- used in ?agent=slug URL param
  name text not null,
  credentials text,
  brokerage text,
  photo_url text,
  website text,
  phone text,
  email text,
  created_at timestamptz default now()
);

-- Prospects table (created when they complete assessment)
create table james_app_prospects (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references james_app_agents(id),
  path text not null,                  -- first-time-buyer, investor, etc
  readiness_score int,
  answers jsonb,
  created_at timestamptz default now()
);

-- Questions from prospects to agents
create table james_app_questions (
  id uuid primary key default gen_random_uuid(),
  agent_id uuid references james_app_agents(id),
  prospect_id uuid references james_app_prospects(id),
  question text not null,
  response text,
  responded_at timestamptz,
  created_at timestamptz default now(),
  status text default 'pending'        -- pending, answered
);
