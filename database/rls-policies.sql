alter table public.users enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payments enable row level security;

create policy "Users can read their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can read their own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "Users can read their own payments"
  on public.payments for select
  using (auth.uid() = user_id);
