# Coin — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Coin data via REST API and build a companion web app for financial visibility from any device.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8774)
- Endpoints:
  - `GET /accounts` — list accounts
  - `GET /transactions` — list transactions (with date filter)
  - `GET /budgets` — list budgets
  - `GET /summary` — financial summary
  - `GET /cashflow` — cash flow prediction
  - `POST /transactions` — add transaction
  - `PUT /transactions/:id` — update transaction
  - `GET /export/:type` — export (csv, pdf)
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 60 requests/minute
- All access logged for audit

### Web Dashboard (coin.app/dashboard)
- PWA for financial overview from any browser
- Account balances, transactions, budgets
- Charts: spending by category, balance over time
- Cash flow predictions
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `transaction.added` — new transaction
  - `budget.exceeded` — budget threshold crossed
  - `balance.low` — account balance below threshold
  - `cashflow.warning` — predicted shortfall
- HMAC-signed payloads

### Developer Portal
- docs.coin.app/developers
- API reference, webhook guides
- SDK for Swift and JavaScript
- Sample integrations
- Postman collection

### Zapier / Make / IFTTT
- Triggers: transaction added, budget exceeded, balance low
- Actions: add transaction, get account balance

---

## Out of Scope
- Write access from web app (read-only to start)
- Real-time push from web to app
- Investment data integration
