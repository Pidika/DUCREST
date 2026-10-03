create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  company text check (company is null or char_length(company) <= 160),
  email text not null check (char_length(email) <= 200),
  phone text check (phone is null or char_length(phone) <= 40),
  subject text not null check (char_length(subject) <= 160),
  message text not null check (char_length(message) between 10 and 4000),
  status text not null default 'new' check (status in ('new', 'in_review', 'responded', 'closed')),
  assigned_to uuid references auth.users(id) on delete set null,
  internal_notes text,
  retention_until date default (current_date + interval '24 months'),
  deleted_at timestamptz
);

alter table public.enquiries enable row level security;

create policy "Authenticated staff can read enquiries"
on public.enquiries for select to authenticated using (true);

create policy "Authenticated staff can update enquiries"
on public.enquiries for update to authenticated using (true) with check (true);

revoke all on public.enquiries from anon;
grant select, update on public.enquiries to authenticated;

create index if not exists enquiries_status_created_at_idx
on public.enquiries (status, created_at desc)
where deleted_at is null;
