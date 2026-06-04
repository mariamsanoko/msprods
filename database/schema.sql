create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  plan text not null default 'free' check (plan in ('free', 'pro', 'enterprise')),
  subscription_status text not null default 'inactive',
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  stripe_subscription_id text unique,
  plan text not null check (plan in ('pro', 'enterprise')),
  status text not null,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  stripe_payment_intent_id text unique,
  amount_cents integer not null default 0,
  currency text not null default 'eur',
  status text not null,
  created_at timestamptz not null default now()
);
