# wade — Round 14: Android App, Web Platform, Cross-Platform Sync

## Goal
Expand Wade to Android and web — making the conversational finance tracker accessible on any device, with full cross-platform sync.

---

## Scope

### Android App
- Full Wade app on Android (Google Play Store)
- Feature parity: conversational expense logging, budget goals, investment tracking, shared expenses
- Material Design 3 UI — but maintain Wade's conversational personality
- Android widgets: quick-log expense widget, budget status widget
- Google Assistant integration: "Hey Google, log $20 to Wade for lunch"

### Web Platform
- Responsive web app at wade.app
- Full financial dashboard: expenses, budgets, investments, net worth
- Browser-based expense logging
- Weekly/monthly financial reports in browser
- Wade conversation UI on web — chat with Wade on desktop

### Cross-Platform Sync
- Unified backend (Firebase or custom)
- All financial data syncs across iOS + Android + web
- Offline support: log expenses offline, sync when online
- End-to-end encryption: financial data encrypted at rest and in transit

### Bank & Finance Integration
- **Plaid integration**: Connect bank accounts for automatic transaction import
- **Auto-categorization**: Bank transactions auto-categorized via ML
- **Manual entry still primary**: Wade is primarily manual (conversational) — bank import is secondary/supplementary
- **Account aggregation**: See all connected accounts in one view

---

## Out of Scope
- Wade 2.0 redesign (R15)
- International expansion (R16)
