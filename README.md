# NurStuHelp 護理實習助手

PWA / mobile-first 護理學生臨床實習輔助工具。

> ⚠️ 本 App 為**學習與工作輔助工具**，內容為一般護理知識、流程提醒與工具，不構成診斷、處方或臨床建議。請以最新醫囑、單位 SOP 與帶教老師指示為準。

## 技術棧

- Vite 5 + React 18 + TypeScript (strict)
- React Router v6 — BrowserRouter
- Tailwind CSS 3 + CSS 變數 design tokens
- vite-plugin-pwa（Workbox precache，autoUpdate）
- lucide-react · clsx · fuse.js · idb-keyval
- Supabase（選用，作為內容雲端來源）

## 開發

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc + vite build
npm run preview    # 預覽 build 產物
npm run typecheck  # 純型別檢查
```

## 連 Supabase（選用）

不設定 Supabase 環境變數時，App 使用 `src/data/cards/*.ts` 編譯進來的本地內容包。
設定後改走 Supabase，並用 IndexedDB 做離線快取（stale-while-revalidate）。

### 1. 建 Supabase 專案

於 https://supabase.com/dashboard → **New project**。

### 2. 套用 schema

Dashboard → **SQL Editor** → **New query** → 把以下整個檔案內容貼上 → **Run**：

```
supabase/migrations/0001_cards.sql
```

這會建立 `public.cards` 表、`updated_at` 觸發器、與 RLS 政策（anon 只能讀
`status IN ('published','needs_update')`）。

### 3. 灌入內容

從本地產生 INSERT SQL：

```bash
npm run seed:generate
```

會輸出 `supabase/seed/0002_seed_cards.sql`（idempotent，可重跑覆寫）。
複製內容 → Dashboard SQL Editor → Run。

### 4. 設定 client 環境變數

```bash
cp .env.example .env.local
# 編輯 .env.local 填入：
# VITE_SUPABASE_URL=https://xxxxx.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJ...
```

> ⚠️ 只放 **anon** key（在 Supabase Dashboard → Project Settings → API → `anon public`）。
> **永遠不要**把 `service_role` 放 client 端 — 它會繞過 RLS。

重啟 `npm run dev`。設定頁會顯示「資料來源：Supabase」。

### 5. 之後內容更新

- **方法 A**（編輯 SQL）：直接在 Dashboard 的 SQL Editor / Table Editor 改 `cards.data`。
- **方法 B**（改本地後重新 seed）：改 `src/data/cards/*.ts` → `npm run seed:generate` → 把新 SQL 貼進 Dashboard 跑一次（`on conflict do update` 會覆寫）。

App 端：
- 24h 內每次開啟會背景重抓
- Settings → **「重新抓取內容」** 立即重抓

## 目錄

```
src/
├── app/                  # AppShell, layout, providers
├── pages/                # 路由頁面
├── features/             # 功能模組（cards, search, safety, medcheck, isbar, pwa, ...）
├── components/ui/        # Design system primitives
├── data/                 # 本地內容種子（fallback / seed 來源）
├── repositories/         # 資料存取
│   ├── CardRepository.ts          # interface
│   ├── LocalCardRepository.ts     # 本地內容包
│   ├── SupabaseCardRepository.ts  # Supabase + IndexedDB 快取
│   └── ...
├── types/                # Schema 型別
├── stores/               # 全域狀態（onboarding）
├── lib/                  # 工具（supabase, persistence, piiPatterns, cn）
├── config/               # 全域設定（nav）
└── styles/               # tokens + tailwind base

supabase/
├── migrations/0001_cards.sql      # 建表 + RLS
└── seed/0002_seed_cards.sql       # 由 npm run seed:generate 產出（gitignored 視需要）

scripts/
└── generate-seed-sql.ts           # BUNDLE_CARDS → INSERT SQL
```

## 安全治理

所有臨床顯示遵循統一安全規範：

- 文案不下絕對指令（不用「立即…」「應該…」「必須…」）
- Disclaimer / Safety Banner 由設計系統元件強制套用
- 高風險頁面 banner 不可被永久關閉
- 過期內容（review.nextReviewDue 已過）自動降權
- ISBAR / 自由欄位含可辨識病人資料即時偵測，輸出時硬擋複製
- 三讀六對流程為「輔助再核對」，不取代法定核對

## 部署備註

- 採 BrowserRouter — 部署至需要 SPA fallback 的主機請設 rewrite。
- Service Worker 在 `npm run dev` 預設關閉；用 `npm run build && npm run preview` 驗證 PWA。
- PWA icon 目前為單一 SVG；生產建議補上 192/512/512-maskable PNG。
- 環境變數（`VITE_*`）在 build 階段嵌入 client bundle — 部署時記得設定。

## 故障排除

| 症狀 | 可能原因 |
|---|---|
| Settings 顯示「內建內容包」但你已設環境變數 | `.env.local` 沒被 Vite 讀到 — 確認檔名正確，重啟 dev server |
| Supabase 設好但卡片 0 張 | seed SQL 沒跑 / RLS 把 anon 擋掉 — 在 SQL Editor 跑 `select count(*) from cards;` 看一下 |
| 跑 `npm run seed:generate` 失敗 | tsx 沒裝？跑 `npm install` 一次 |
| 內容改了但 App 看到舊資料 | 24h 內走 stale-while-revalidate；按 Settings → 重新抓取內容 立刻更新 |
