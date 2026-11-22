-- STEP 1: Run this first in Supabase > SQL Editor > New query.
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  role text not null default 'customer' check (role in ('admin','employee','customer'))
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email_or_phone text not null,
  subject text,
  message text not null,
  created_at timestamptz default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('quote','receipt')),
  doc_number text unique not null,
  client_name text not null,
  client_email text,
  client_phone text,
  tax_rate numeric(5,2) default 16,
  notes text,
  created_by uuid references auth.users,
  created_at timestamptz default now()
);

create table if not exists document_items (
  id uuid primary key default gen_random_uuid(),
  document_id uuid references documents on delete cascade,
  description text not null,
  quantity numeric not null,
  unit_price numeric(12,2) not null
);
