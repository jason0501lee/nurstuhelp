# NurStuHelp 護理實習助手

PWA / mobile-first 護理學生臨床實習輔助工具。

> ⚠️ 本 App 為**學習與工作輔助工具**，內容為一般護理知識、流程提醒與工具，不構成診斷、處方或臨床建議。請以最新醫囑、單位 SOP 與帶教老師指示為準。

## 技術棧

- Vite 5 + React 18 + TypeScript (strict)
- React Router v6 — BrowserRouter
- Tailwind CSS 3 + CSS 變數 design tokens
- vite-plugin-pwa（Workbox precache，autoUpdate）
- lucide-react · clsx
- 預計後續加入：Zustand · Fuse.js · idb-keyval · react-hook-form · zod

## 開發

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc + vite build
npm run preview    # 預覽 build 產物
npm run typecheck  # 純型別檢查
```

## 實作里程碑

| Step | 內容 |
|---|---|
| 1 | 專案骨架 · Vite/Tailwind/PWA · AppShell · BottomNav · router · placeholder pages |
| 2 | Types & 受控字典 |
| 3 | Repository 介面 + Local 實作 + mock data seed |
| 4 | Design system primitives |
| 5 | Generic Card 渲染 |
| 6 | AppShell wiring（OnboardingGate 真正啟用） |
| 7 | HomePage |
| 8 | Reference 三層頁 |
| 9 | Search（Fuse.js） |
| 10 | Favorites / Recents |
| 11 | MedCheck 流程（SB-4 / SB-5） |
| 12 | ISBAR 流程（SB-7 PII 偵測） |
| 13 | Learn / Settings |
| 14 | 內容包擴充 |
| 15 | PWA manifest / icons / install prompt 完整化 |

## 目錄

```
src/
├── app/              # AppShell, layout, providers
├── pages/            # 路由頁面（placeholder until later steps）
├── features/         # 功能模組（cards, search, safety, medcheck, isbar, ...）
├── components/ui/    # Design system primitives
├── data/             # Mock content（之後接 Supabase / CMS）
├── repositories/     # 資料存取介面（Local 實作；之後可換 Supabase 實作）
├── types/            # Schema 型別
├── stores/           # Zustand stores
├── lib/              # 工具
├── config/           # 全域設定（nav, env）
└── styles/           # tokens + tailwind base
```

## 部署備註

- 採 BrowserRouter — 部署至需要 client-side routing fallback 的主機時，請設定 SPA rewrite（Vercel/Netlify 預設正確；GitHub Pages 需手動配 `404.html` 或改用 HashRouter）。
- Service Worker 在 `npm run dev` 預設**關閉**（避免快取打架），請用 `npm run build && npm run preview` 驗證 PWA。
- PWA icons 尚未提供實體檔案，將於 Step 15 加入 `/public/icons/`。

## 安全治理

所有臨床顯示遵循統一安全規範：

- 文案不下絕對指令（不用「立即…」「應該…」「必須…」）
- Disclaimer / Safety Banner 由設計系統元件強制套用
- 高風險頁面 banner 不可被永久關閉
- 過期內容（review.nextReviewDue 已過）自動降權

詳見 spec：策略 / IA / Content Schema / Safety Governance（離線文件）。
