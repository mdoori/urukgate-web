-- DevCraft Studio — Supabase Schema
-- Run this in the Supabase SQL Editor to set up your database

-- Bookings table
create table if not exists bookings (
  id                uuid primary key default gen_random_uuid(),
  booking_ref       text not null unique,
  customer_name     text not null,
  customer_email    text not null,
  customer_phone    text not null,
  service_id        text not null,
  service_name      text not null,
  service_price     numeric(10, 2) not null,
  booking_date      text not null,
  booking_time      text not null,
  message           text default '',
  status            text not null default 'pending'
                    check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status    text not null default 'pending'
                    check (payment_status in ('pending', 'paid', 'refunded')),
  payment_intent_id text,
  meet_link         text not null,
  zoom_meeting_id   text,
  zoom_password     text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger bookings_updated_at
  before update on bookings
  for each row execute procedure update_updated_at();

-- Row Level Security
alter table bookings enable row level security;

-- Only service role (server-side) can read/write bookings
-- Public can insert (new booking) but not read others' bookings
create policy "Service role full access"
  on bookings
  for all
  using (auth.role() = 'service_role');

-- Index for fast lookups
create index if not exists idx_bookings_payment_intent on bookings (payment_intent_id);
create index if not exists idx_bookings_email on bookings (customer_email);
create index if not exists idx_bookings_date on bookings (booking_date);
create index if not exists idx_bookings_status on bookings (status);
