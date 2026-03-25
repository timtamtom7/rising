# Chronicle — R14: API, Web App & Developer Platform

## Goal
Expose Chronicle data via a REST API and build a companion web dashboard for viewing bills on any device.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (configurable port, e.g., localhost:8765)
- Endpoints:
  - `GET /bills` — list all bills
  - `GET /bills/:id` — single bill detail
  - `POST /bills` — create bill
  - `PUT /bills/:id` — update bill
  - `DELETE /bills/:id` — delete bill
  - `GET /summary` — monthly/yearly spending summary
  - `GET /household` — household members and balances
- API key authentication (stored in macOS Keychain)
- Rate limiting: 60 requests/minute
- OpenAPI 3.0 spec generated and served at `/openapi.json`

### Web Dashboard (chronicle.app/dashboard)
- Companion web app (React/Vue SPA)
- Read-only view of all bills, spending charts, upcoming due dates
- Responsive design — works on iPhone, iPad, Windows, Linux
- Syncs via iCloud (same data source as macOS app)
- No separate account — authenticate via Apple Sign-In with iCloud

### Zapier / Make Integration
- Expose API via Zapier app or webhook receiver
- Triggers: "Bill Due" → send to Zapier → automation
- Actions: "Create Bill" via Zapier trigger from another app
- Pre-built Zap templates for common workflows (e.g., "When Stripe charges, log it as a bill")

### IFTTT Applet Support
- IFTTT webhook trigger: bill.due
- IFTTT webhook action: bill.create

### Developer Documentation
- Developer portal at chronicle.app/developers
- API reference, authentication guide, webhook setup
- Postman collection for API exploration
- Sample code snippets (Swift, Python, JavaScript)

---

## Out of Scope
- Write access from web app (read-only to start)
- Real-time push notifications from web
- Mobile native companion app
