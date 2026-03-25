# Plank — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Plank via REST API and build a web dashboard for theme management and marketplace administration.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8775)
- Endpoints:
  - `GET /themes` — list themes
  - `GET /themes/:id` — theme details
  - `POST /themes` — create theme
  - `PUT /themes/:id` — update theme
  - `DELETE /themes/:id` — delete theme
  - `GET /presets` — list presets
  - `POST /presets` — create preset
  - `POST /themes/:id/publish` — publish to marketplace
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 100 requests/minute

### Web Dashboard (plank.app/dashboard)
- PWA for theme management
- Theme marketplace admin
- Theme upload and management
- Analytics: downloads, ratings
- Responsive: iPhone, iPad, desktop

### Webhooks
- Event webhooks:
  - `theme.published` — theme published to marketplace
  - `theme.downloaded` — someone downloaded your theme
  - `preset.changed` — preset switched
  - `theme.updated` — theme updated
- HMAC-signed payloads

### Developer Portal
- docs.plank.app/developers
- API reference, theme format spec
- Theme SDK: create themes programmatically
- Sample code (Swift, Python, JavaScript)
- Postman collection

### Theme Export Formats
- Export as: .plist, JSON, Swift UIColor, Android XML, CSS Variables, Figma Tokens
- Batch export for design systems

---

## Out of Scope
- Real-time collaborative theme editing
- Plugin API for runtime modifications
