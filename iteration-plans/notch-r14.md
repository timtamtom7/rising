# Notch — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Notch via REST API and build a web dashboard for configuration management and analytics.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8782)
- Endpoints:
  - `GET /config` — current menu bar configuration
  - `GET /items` — list menu bar items
  - `POST /items/:id/show` — show item
  - `POST /items/:id/hide` — hide item
  - `GET /presets` — list presets
  - `POST /presets` — create preset
  - `PUT /presets/:id` — update preset
  - `GET /analytics` — usage analytics
  - `POST /apply-preset/:id` — apply preset
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 100 requests/minute

### Web Dashboard (notch.app/dashboard)
- PWA for menu bar configuration
- Preset management, analytics, team administration
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `item.shown` — menu bar item shown
  - `item.hidden` — menu bar item hidden
  - `preset.applied` — preset applied
  - `config.changed` — configuration changed
- HMAC-signed payloads

### Developer Portal
- docs.notch.app/developers
- API reference, configuration guides
- SDK for Swift and JavaScript
- Sample integrations
- Postman collection

### Zapier / Make / IFTTT
- Triggers: item shown, preset applied
- Actions: show/hide item, apply preset

---

## Out of Scope
- Real-time menu bar monitoring via web
- Live preview of menu bar changes
