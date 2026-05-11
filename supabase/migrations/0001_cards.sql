-- NurStuHelp · Cards table
--
-- 單表 + JSONB payload。每張 Card 完整 JSON 存在 data 欄位；type/slug/status
-- 抽出來當 indexed columns，便於 filter 與唯一性約束。
--
-- RLS：anon 只能讀 published / needs_update 的 cards，禁止任何寫入。
-- 內容更新請使用 service_role（在 Supabase Dashboard 或 CI），不要把
-- service_role key 放 client。
--
-- 套用：Supabase Dashboard → SQL Editor → 貼上整段 → Run。

create table if not exists public.cards (
  id          text         primary key,
  type        text         not null check (type in (
                'vital_sign', 'disease', 'drug',
                'health_edu', 'isbar', 'med_safety', 'sop'
              )),
  slug        text         not null,
  locale      text         not null default 'zh-TW',
  status      text         not null default 'published' check (status in (
                'draft', 'in_review', 'published', 'archived', 'needs_update'
              )),
  data        jsonb        not null,
  created_at  timestamptz  not null default now(),
  updated_at  timestamptz  not null default now(),
  unique (type, slug)
);

create index if not exists cards_type_idx     on public.cards (type);
create index if not exists cards_status_idx   on public.cards (status);
create index if not exists cards_data_gin_idx on public.cards using gin (data);

-- Auto-touch updated_at
create or replace function public.cards_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists cards_updated_at on public.cards;
create trigger cards_updated_at
  before update on public.cards
  for each row execute function public.cards_set_updated_at();

-- ------------------------------------------------------------------
-- Row Level Security
-- ------------------------------------------------------------------
alter table public.cards enable row level security;

drop policy if exists "anon read listable" on public.cards;
create policy "anon read listable"
  on public.cards for select
  to anon
  using (status in ('published', 'needs_update'));

-- Authenticated users can also read (future: app accounts)
drop policy if exists "auth read listable" on public.cards;
create policy "auth read listable"
  on public.cards for select
  to authenticated
  using (status in ('published', 'needs_update'));

-- No anon / authenticated INSERT/UPDATE/DELETE — content writes go via
-- service_role only (Dashboard, scripts, or a future authenticated
-- editor role).
