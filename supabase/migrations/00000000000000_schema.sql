
create table if not exists users (
  id uuid references auth.users (id) on delete cascade,
  first_name text,
  last_name text,
  email text unique,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz default now()
);