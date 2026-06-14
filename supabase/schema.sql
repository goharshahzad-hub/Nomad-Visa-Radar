create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'editor', 'admin')),
  newsletter_opt_in boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_email_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.countries (
  id uuid primary key default gen_random_uuid(),
  country_name text not null unique,
  slug text not null unique,
  flag text not null,
  region text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.visa_programs (
  id uuid primary key default gen_random_uuid(),
  country_id uuid not null references public.countries(id) on delete cascade,
  visa_program_name text not null,
  minimum_income numeric,
  minimum_income_label text not null,
  visa_fee numeric,
  visa_fee_label text not null,
  duration text not null,
  duration_months integer,
  renewable boolean not null default false,
  dependents_allowed boolean not null default false,
  tax_summary text not null,
  documents_required text[] not null default '{}',
  processing_time text not null,
  application_url text not null,
  official_government_url text not null,
  last_verified date not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(country_id, visa_program_name)
);

create table if not exists public.country_scores (
  id uuid primary key default gen_random_uuid(),
  country_id uuid not null references public.countries(id) on delete cascade,
  internet_score integer not null check (internet_score between 0 and 100),
  cost_of_living_score integer not null check (cost_of_living_score between 0 and 100),
  safety_score integer not null check (safety_score between 0 and 100),
  family_friendliness_score integer not null check (family_friendliness_score between 0 and 100),
  healthcare_score integer not null check (healthcare_score between 0 and 100),
  quality_of_life_score integer not null check (quality_of_life_score between 0 and 100),
  nomad_score integer not null check (nomad_score between 0 and 100),
  cost_of_living_monthly_usd numeric,
  internet_speed_mbps numeric,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(country_id)
);

create table if not exists public.saved_countries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  country_id uuid not null references public.countries(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(user_id, country_id)
);

create table if not exists public.comparison_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  country_slugs text[] not null,
  share_slug text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  user_id uuid references public.users(id) on delete set null,
  status text not null default 'subscribed' check (status in ('subscribed', 'unsubscribed')),
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  routed_to_email text not null default 'goharshahzad@gmail.com',
  status text not null default 'new' check (status in ('new', 'reviewed', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.contact_messages
add column if not exists routed_to_email text not null default 'goharshahzad@gmail.com';

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  country_id uuid references public.countries(id) on delete cascade,
  visa_program_id uuid references public.visa_programs(id) on delete cascade,
  source_name text not null,
  source_url text not null,
  source_type text not null default 'official' check (source_type in ('government', 'embassy', 'official', 'trusted_mobility', 'other')),
  confidence_score integer not null default 80 check (confidence_score between 0 and 100),
  last_checked timestamptz,
  last_content_hash text,
  last_status_code integer,
  last_error text,
  last_changed_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.sources
add column if not exists last_content_hash text;

alter table public.sources
add column if not exists last_status_code integer;

alter table public.sources
add column if not exists last_error text;

alter table public.sources
add column if not exists last_changed_at timestamptz;

create table if not exists public.visa_updates (
  id uuid primary key default gen_random_uuid(),
  visa_program_id uuid references public.visa_programs(id) on delete cascade,
  source_id uuid references public.sources(id) on delete set null,
  title text not null,
  summary text not null,
  status text not null default 'draft' check (status in ('draft', 'review', 'approved', 'rejected', 'published')),
  confidence_score integer not null default 70 check (confidence_score between 0 and 100),
  last_checked timestamptz,
  last_updated timestamptz,
  reviewed_by uuid references public.users(id),
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null,
  author_id uuid references public.users(id),
  status text not null default 'draft' check (status in ('draft', 'review', 'published', 'archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  permissions text[] not null default array['countries', 'updates', 'blog', 'alerts'],
  created_at timestamptz not null default now()
);

create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  country_id uuid references public.countries(id) on delete cascade,
  alert_type text not null default 'visa_update',
  threshold jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.editor_reviews (
  id uuid primary key default gen_random_uuid(),
  visa_update_id uuid references public.visa_updates(id) on delete cascade,
  country_name text,
  source_url text not null,
  proposed_change text not null,
  confidence_score integer not null default 70 check (confidence_score between 0 and 100),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'needs_more_sources')),
  checked_at timestamptz,
  reviewed_by uuid references public.users(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.search_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  query text,
  filters jsonb not null default '{}'::jsonb,
  result_count integer not null default 0,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and role in ('admin', 'editor')
  );
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url',
    case
      when exists (
        select 1 from public.admin_email_allowlist
        where lower(email) = lower(new.email)
      )
      then 'admin'
      else 'user'
    end
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = excluded.full_name,
        avatar_url = excluded.avatar_url,
        role = case
          when exists (
            select 1 from public.admin_email_allowlist
            where lower(email) = lower(excluded.email)
          )
          then 'admin'
          else public.users.role
        end,
        updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'users', 'countries', 'visa_programs', 'country_scores', 'saved_countries',
    'comparison_history', 'newsletter_subscribers', 'contact_messages', 'visa_updates', 'blog_posts',
    'admin_email_allowlist',
    'admin_users', 'alerts', 'sources', 'editor_reviews', 'search_logs'
  ]
  loop
    execute format('alter table public.%I enable row level security', table_name);
  end loop;
end $$;

create policy "Public can read active country data" on public.countries
for select using (status = 'active' or public.is_admin());

create policy "Public can read active visa programs" on public.visa_programs
for select using (status = 'active' or public.is_admin());

create policy "Public can read country scores" on public.country_scores
for select using (true);

create policy "Public can read published blog posts" on public.blog_posts
for select using (status = 'published' or public.is_admin());

create policy "Users can read own profile" on public.users
for select using (id = auth.uid() or public.is_admin());

create policy "Users can update own profile" on public.users
for update using (id = auth.uid()) with check (id = auth.uid());

create policy "Users manage saved countries" on public.saved_countries
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Users manage comparison history" on public.comparison_history
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Users manage alerts" on public.alerts
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "Anyone can subscribe to newsletter" on public.newsletter_subscribers
for insert with check (true);

create policy "Users can read own newsletter subscription" on public.newsletter_subscribers
for select using (user_id = auth.uid() or public.is_admin());

create policy "Anyone can create contact messages" on public.contact_messages
for insert with check (true);

create policy "Admins manage contact messages" on public.contact_messages
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins manage admin email allowlist" on public.admin_email_allowlist
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins manage country data" on public.countries
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins manage visa programs" on public.visa_programs
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins manage scores" on public.country_scores
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins manage sources" on public.sources
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins manage updates" on public.visa_updates
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins manage blog posts" on public.blog_posts
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins manage admin users" on public.admin_users
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins manage editor reviews" on public.editor_reviews
for all using (public.is_admin()) with check (public.is_admin());

create policy "Admins read search logs" on public.search_logs
for select using (public.is_admin());

create index if not exists countries_region_idx on public.countries(region);
create index if not exists visa_programs_status_idx on public.visa_programs(status);
create index if not exists sources_last_checked_idx on public.sources(last_checked);
create index if not exists sources_source_url_idx on public.sources(source_url);
create index if not exists editor_reviews_status_idx on public.editor_reviews(status);
create index if not exists blog_posts_status_idx on public.blog_posts(status);
create index if not exists contact_messages_status_idx on public.contact_messages(status, created_at desc);

insert into public.admin_email_allowlist (email)
values ('goharshahzad@gmail.com')
on conflict (email) do nothing;

update public.users
set role = 'admin', updated_at = now()
where lower(email) = 'goharshahzad@gmail.com';

insert into public.admin_users (user_id)
select id
from public.users
where lower(email) = 'goharshahzad@gmail.com'
on conflict (user_id) do nothing;

drop trigger if exists touch_users_updated_at on public.users;
create trigger touch_users_updated_at before update on public.users
for each row execute function public.touch_updated_at();

drop trigger if exists touch_countries_updated_at on public.countries;
create trigger touch_countries_updated_at before update on public.countries
for each row execute function public.touch_updated_at();

drop trigger if exists touch_visa_programs_updated_at on public.visa_programs;
create trigger touch_visa_programs_updated_at before update on public.visa_programs
for each row execute function public.touch_updated_at();

drop trigger if exists touch_country_scores_updated_at on public.country_scores;
create trigger touch_country_scores_updated_at before update on public.country_scores
for each row execute function public.touch_updated_at();

drop trigger if exists touch_blog_posts_updated_at on public.blog_posts;
create trigger touch_blog_posts_updated_at before update on public.blog_posts
for each row execute function public.touch_updated_at();
