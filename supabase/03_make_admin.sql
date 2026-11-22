-- STEP 3: Run AFTER creating the owner under Authentication > Users > Add user.
-- Replace the email below with the owner's email.
insert into profiles (id, role)
select id, 'admin' from auth.users where email = 'owner@example.com'
on conflict (id) do update set role = 'admin';
