# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

---

# Project Overview

This repo contains **two co-located UI applications** in a single Next.js project. They share the same shell (layout, router) but have completely different design systems and purposes.

---

## App 1 — Monarch Money Clone (`/` routes)

A personal finance dashboard. All 12 screens are **already implemented and merged** to `master`.

**Design tokens:** `--primary #FF692D` · `--chart-teal #0797B9` · `--accent #1348A5` · `--background #F6F5F3`  
**Shared components:** `DashboardCard` (optional title), `Sidebar`  
**CSS classes:** `card-monarch`, `sidebar-monarch`, `text-secondary`, `text-foreground`

### Completed screens

| Route | Page |
|-------|------|
| `/` | Dashboard |
| `/accounts` | Accounts |
| `/transactions` | Transactions |
| `/cash-flow` | Cash Flow (SVG dual-line chart) |
| `/reports` | Reports (SVG Sankey diagram) |
| `/budget` | Budget (collapsible sections, modal) |
| `/goals` | Goals (save-up / pay-down tabs) |
| `/investments` | Investments (donut chart, holdings table) |
| `/recurring` | Recurring subscriptions |
| `/forecasting` | Forecasting (retirement slider, area chart) |
| `/advice` | AI Advice (filterable insight cards) |
| `/help` | Help & Support stub |
| `/referral` | Referral stub |

---

## App 2 — Magnifi Clone (`/magnifi/*` routes)

**Nothing has been built yet.** Magnifi is an AI-powered investment advisor platform — a full second product that lives under the `/magnifi/` route prefix inside this same Next.js app. It is **not** a minor addition to the Investments page; it is a complete, standalone experience with its own sidebar, design system, and feature set.

### Design system

| Token | Value | Use |
|-------|-------|-----|
| Primary accent | `#E0CD72` | CTAs, links, gold branding |
| Secondary accent | `#E7C751` | Highlights, secondary surfaces |
| Dark background | `#030F12` | Hero sections, high-contrast components |
| Surface | `#FFFFFF` | Cards, default backgrounds |
| Success | `#16B548` | Positive performance |
| Error / loss | `#F5441D` | Negative performance, errors |
| Text primary | `#000000` | Body copy |
| Text secondary | `#606060` | Muted labels |

- **Font:** Inter, sans-serif
- **Buttons:** Pill-shaped (`rounded-full`), gold fill for primary CTAs
- **Cards:** Subtle `box-shadow: 0 4px 20px #00000026`, rounded corners
- **Layout:** 8-point grid, standard responsive breakpoints (sm/md/lg/xl)

### Screens to build

All routes are prefixed with `/magnifi/`.

| Route | Screen | Key features |
|-------|--------|-------------|
| `/magnifi` | **Dashboard** | Portfolio value hero, daily P&L, AI quick-action chips ("How am I doing?", "Show my holdings"), watchlist widget, daily market snapshot, account link CTA |
| `/magnifi/investments` | **Investments** | Total value + buying power header, account health/sync status badges, holdings table across all linked accounts, top positions summary |
| `/magnifi/portfolio` | **Portfolio** | Deep-dive analytics: allocation breakdown, performance vs benchmark, risk metrics, sector/geography exposure |
| `/magnifi/search` | **Search & Discovery** | Natural-language search bar ("What investments are you searching for?"), trending searches list, "For You" personalized ideas, "Guide me" walkthrough, thematic investing categories (Long-Term Wealth, Income, Values Alignment, Stability), macro/event collections |
| `/magnifi/transactions` | **Transactions** | Trade history and account activity log, filterable by account/date/type |
| `/magnifi/news` | **News** | Market news feed, watchlist-filtered articles, sentiment tags |
| `/magnifi/screener` | **Screener** | Asset filtering tool: filter by asset class, sector, market cap, dividend yield, performance, ESG rating |
| `/magnifi/compare` | **Compare** | Side-by-side comparison of 2–4 assets: price chart overlay, fundamentals table, AI summary |
| `/magnifi/chat` | **AI Chat** | Full-page conversational interface, chat history sidebar, suggested prompts, streaming response UI |
| `/magnifi/analytics` | **Analytics** | Advanced portfolio analytics: Sharpe ratio, beta, drawdown chart, correlation matrix |
| `/magnifi/performance` | **Performance** | Historical returns vs benchmark (S&P 500, custom), time-range selector (1D/1W/1M/3M/1Y/All) |
| `/magnifi/reports` | **Reports** | Detailed reports: tax-lot detail, realized/unrealized gains, income summary |
| `/magnifi/tax` | **Tax** | Tax-loss harvesting opportunities, wash-sale warnings, estimated tax liability |
| `/magnifi/goals` | **Goals** | Investment goal setting (retirement, education, major purchase), milestone tracking |
| `/magnifi/planner` | **Planner** | Long-term retirement planner with contribution sliders and Monte Carlo projection |
| `/magnifi/settings` | **Settings** | Notification preferences, display settings, data privacy |
| `/magnifi/account` | **Account** | Linked brokerage accounts management, Plaid re-link flow, manual entry |
| `/magnifi/profile` | **Profile** | Personal info, investment preferences, risk tolerance questionnaire |
| `/magnifi/billing` | **Billing** | Subscription plan display, payment method, invoice history |
| `/magnifi/documents` | **Documents** | Tax documents (1099s), trade confirms, account statements list |

### Layout requirements

- Magnifi has its **own sidebar** — do not use the Monarch `Sidebar` component
- The Magnifi sidebar uses the dark `#030F12` background with `#E0CD72` gold active states and icon+label pairs
- The Monarch sidebar should gain a "Magnifi" entry (or section divider) that links to `/magnifi`
- All Magnifi pages use a top-level layout at `src/app/magnifi/layout.tsx` that renders the Magnifi sidebar instead of the Monarch sidebar

### Implementation rules

- All data is **mocked** — no real API calls, no backend
- Use SVG or inline CSS for charts (no new npm chart libraries)
- No new npm dependencies without a compelling reason
- `'use client'` only on pages/components that actually use hooks or browser APIs
- Do not import `React` default — use named imports or `import type { ReactNode }` as needed
- Reuse Tailwind utility classes; define Magnifi-specific CSS vars in `globals.css` under a `.magnifi` scope or `:root` additions

### Source material

The full Magnifi spec lives in a zip file one directory above the repo root (`D:/_projects/Monarch/Creating a Title from Uploaded File Content (1).zip`).

Note: this zip is not committed to the repository and lives at `../Creating a Title from Uploaded File Content (1).zip` relative to the repo root.

Key files inside:

- `Magnifi Navigation Surface Map.md` — complete route list
- `Magnifi Design System Summary.md` — color tokens, typography, components
- `Magnifi Feature Inventory.md` — per-screen feature breakdown
- `Product Requirements Document: Magnifi Web Application Clone.md` — full PRD with user stories
- `01-api-spec.yaml` — reverse-engineered API shape (for realistic mock data structure)
- `investments.png`, `portfolio.png` — real screenshots (blurred) for layout reference
