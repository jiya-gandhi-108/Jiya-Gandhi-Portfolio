-- =====================================================================
-- Jiya Gandhi portfolio — Supabase schema
-- Run this whole file in your Supabase project: SQL Editor -> New query -> paste -> Run.
-- =====================================================================

-- ---------- Tables ----------------------------------------------------

create table if not exists public.profile (
  id           uuid primary key default gen_random_uuid(),
  name         text,
  roles        text[],
  tagline      text,
  hero_points  text[],
  email        text,
  phone        text,
  location     text,
  github_url   text,
  linkedin_url text,
  resume_url   text,
  avatar_url   text,
  created_at   timestamptz default now()
);

create table if not exists public.projects (
  id             uuid primary key default gen_random_uuid(),
  title          text not null,
  image_url      text,
  problem        text,
  built          text,
  subtitle       text,                   -- one-line tagline under the title
  year           text,                   -- e.g. '2025'
  tag            text,                   -- e.g. 'AI · Automation'
  long_desc      text,                   -- full write-up for the project page
  outcome        text,                   -- result / impact
  stack          text[] default '{}',
  handled        text[] default '{}',
  github_url     text not null,          -- required for every project
  demo_url       text,                   -- optional
  case_study_url text,                   -- optional
  featured       boolean default false,
  cooking        boolean default false,          -- the single "currently cooking" project
  status         text,                            -- e.g. 'In progress'
  updates        jsonb default '[]'::jsonb,       -- [{ date, note }] update history
  sort_order     integer default 0,
  created_at     timestamptz default now()
);

-- ---------- Row Level Security ---------------------------------------
-- Anyone can READ (needed by the public portfolio). Only signed-in users
-- (i.e. you, the only account in this project) can write.

alter table public.profile  enable row level security;
alter table public.projects enable row level security;

drop policy if exists "profile public read"  on public.profile;
drop policy if exists "profile owner write"   on public.profile;
drop policy if exists "projects public read"  on public.projects;
drop policy if exists "projects owner write"  on public.projects;

create policy "profile public read"  on public.profile  for select using (true);
create policy "profile owner write"  on public.profile  for all to authenticated using (true) with check (true);
create policy "projects public read" on public.projects for select using (true);
create policy "projects owner write" on public.projects for all to authenticated using (true) with check (true);

-- ---------- Storage buckets ------------------------------------------
-- Public buckets so images and the résumé are viewable on the live site.

insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true)
  on conflict (id) do update set public = true;
insert into storage.buckets (id, name, public) values ('files', 'files', true)
  on conflict (id) do update set public = true;

drop policy if exists "storage public read" on storage.objects;
drop policy if exists "storage owner write" on storage.objects;
drop policy if exists "storage owner update" on storage.objects;
drop policy if exists "storage owner delete" on storage.objects;

create policy "storage public read" on storage.objects
  for select using (bucket_id in ('project-images', 'files'));
create policy "storage owner write" on storage.objects
  for insert to authenticated with check (bucket_id in ('project-images', 'files'));
create policy "storage owner update" on storage.objects
  for update to authenticated using (bucket_id in ('project-images', 'files'));
create policy "storage owner delete" on storage.objects
  for delete to authenticated using (bucket_id in ('project-images', 'files'));

-- ---------- Seed data (edit later from the dashboard) ----------------
-- Fixed profile id so the dashboard always updates the same single row.

insert into public.profile (id, name, roles, tagline, hero_points, email, phone, location, github_url, linkedin_url, resume_url, avatar_url)
values (
  '00000000-0000-0000-0000-000000000001',
  'Jiya Gandhi',
  array['AI Automation Engineer', 'Backend Developer'],
  'I build backend systems, API integrations, and AI-powered workflow automations that eliminate repetitive work.',
  array['Building AI-powered workflows','Developing scalable backend systems','Integrating APIs & creating automation','Turning ideas into impact'],
  'jiya108gandhi@gmail.com',
  '+91 9213729985',
  'Delhi, India',
  'https://github.com/jiya-gandhi-108',
  'https://www.linkedin.com/in/jiya-gandhi-108',
  '/Jiya_Gandhi_Resume.pdf',
  '/assets/jiya.png'
)
on conflict (id) do nothing;

insert into public.projects (title, problem, built, stack, handled, github_url, featured, sort_order)
values
  ('AI Voice Calling & Lead Qualification Agent',
   'Recruiters spent significant time manually screening candidates and logging calls by hand.',
   'An AI-assisted calling workflow that captures caller intent, qualifies leads, structures notes, and pushes follow-up-ready records into CRM pipelines.',
   array['Python','OpenAI API','n8n','Webhooks','CRM APIs'],
   array['Voice-call workflow','LLM integration','API integration','Candidate scoring'],
   'https://github.com/jiya-gandhi-108', true, 1),
  ('CRM & Recruitment Automation System',
   'Candidate and lead movement across Zoho tools was manual, slow, and inconsistent.',
   'Automated assignment logic, status updates, follow-up triggers, and internal reporting flows across the Zoho stack.',
   array['Zoho CRM','Zoho Recruit','Zoho Flow','REST APIs'],
   array['Assignment logic','Status automation','Follow-up triggers','Reporting'],
   'https://github.com/jiya-gandhi-108', true, 2),
  ('E-Commerce Platform',
   'A storefront needed a reliable backend for orders, payments, and admin control.',
   'A production-style backend with authentication, cart and checkout APIs, payment integration, admin product APIs, and database-backed order handling.',
   array['Node.js','MongoDB','Stripe','REST APIs'],
   array['Auth','Cart & checkout APIs','Payment integration','Admin APIs'],
   'https://github.com/jiya-gandhi-108', false, 3),
  ('Real-Time Code Collaboration App',
   'Multiple users needed to edit the same document live without conflicts.',
   'A collaborative editor backend with live room sessions, real-time WebSocket sync, and shared editing state persistence.',
   array['Node.js','MongoDB','WebSockets'],
   array['Live rooms','WebSocket sync','State persistence'],
   'https://github.com/jiya-gandhi-108', false, 4)
on conflict do nothing;

-- ---------- Experience (editable from the dashboard) ------------------
create table if not exists public.experience (
  id          uuid primary key default gen_random_uuid(),
  role        text,
  org         text,
  period      text,
  description text,
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

alter table public.experience enable row level security;

drop policy if exists "experience public read"  on public.experience;
drop policy if exists "experience owner write"   on public.experience;
create policy "experience public read"  on public.experience for select using (true);
create policy "experience owner write"  on public.experience for all to authenticated using (true) with check (true);

insert into public.experience (role, org, period, description, sort_order)
select v.role, v.org, v.period, v.description, v.sort_order
from (values
  ('AI Automation & Backend Developer', 'Freelance', '2023 — Present',
   'Building AI workflow automations, backend APIs, and CRM integrations for clients across recruitment, e-commerce, and internal-tools work.', 1),
  ('Backend / Automation Intern', 'Right Advisors', '2024 · 6 months',
   'Built recruitment automations and internal tooling across the Zoho stack — assignment logic, status flows, and reporting.', 2)
) as v(role, org, period, description, sort_order)
where not exists (select 1 from public.experience);
