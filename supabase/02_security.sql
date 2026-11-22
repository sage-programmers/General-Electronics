-- STEP 2: Run after 01_tables.sql. Locks all tables to the admin only.
alter table profiles enable row level security;
alter table contact_messages enable row level security;
alter table documents enable row level security;
alter table document_items enable row level security;

create or replace function is_admin() returns boolean
language sql security definer set search_path = public as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

create policy "read own profile" on profiles for select using (id = auth.uid());
create policy "admin all documents" on documents for all using (is_admin()) with check (is_admin());
create policy "admin all items" on document_items for all using (is_admin()) with check (is_admin());
create policy "admin read messages" on contact_messages for select using (is_admin());
-- Contact form inserts use the server-side service key, so no public insert policy exists.
