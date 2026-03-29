# RisingMac R13 — Polish

## Theme
Polish RisingMac for App Store launch with a calm fintech aesthetic audit and full launch checklist completion.

## Features
- **Launch Checklist** — TestFlight build ready, App Store Connect metadata finalized, privacy nutrition labels complete (financial data handling disclosed), export compliance filed, content rating submitted
- **App Store Listing** — Title: "RisingMac — Save with Intelligence"; subtitle: "AI savings coach and shared family goals"; description emphasizes calm, trustworthy fintech tone; keywords: savings, budget, finance, goals, family, money, AI
- **Calm Fintech Aesthetic Audit** — Full UI review: muted, trustworthy palette (sage green #4A7C59, slate #334155, off-white #FAFAF8); no aggressive red/green (colorblind-safe indicators); generous whitespace; charts use soft gradients, not jarring fills; typography is warm and readable (SF Pro Rounded for numbers, SF Pro Text for labels)
- **Number Formatting Consistency** — All monetary values use locale-aware formatting; charts use abbreviated units ($1.2K, $3.4M); no raw numbers displayed without context; animation on balance updates is subtle (not game-like)

## Technical Notes
- **ColorAudit:** All UI tested with Deuteranopia (green-blind) and Protanopia (red-blind) simulators; use shape + label, not color alone, for any financial status indicator
- **LocaleTesting:** Number/currency/date formatting tested across en_US, en_GB, de_DE, ja_JP locales; decimal/thousand separators correct
- **FintechCompliance:** No investment advice without proper disclosures; all AI-generated advice includes "consult a financial advisor" disclaimer where required
- **PerformanceTest:** Savings chart rendering with 5 years of daily data (1800+ data points) renders smoothly at 60fps; use data decimation for chart display
