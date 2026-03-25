# Zones — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Zones via REST API and build a web dashboard for zone management and analytics.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8779)
- Endpoints:
  - `GET /zones` — list zones
  - `GET /zones/:id` — zone details
  - `POST /zones` — create zone
  - `PUT /zones/:id` — update zone
  - `POST /zones/:id/activate` — activate zone
  - `GET /current` — current active zone
  - `GET /history` — zone history
  - `GET /analytics` — usage analytics
  - `POST /automations` — create automation
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 100 requests/minute

### Web Dashboard (zones.app/dashboard)
- PWA for zone management from any browser
- Zone configuration, analytics, household management
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `zone.activated` — zone switched
  - `zone.left` — departed zone
  - `automation.triggered` — automation executed
  - `household.member.zone_changed` — family member changed zone
- HMAC-signed payloads

### Developer Portal
- docs.zones.app/developers
- API reference, automation guides
- SDK for Swift and JavaScript
- Sample integrations
- Postman collection

### Zapier / Make / IFTTT
- Triggers: zone activated, zone left, automation triggered
- Actions: activate zone, create automation

---

## Out of Scope
- Real-time location tracking
- GPS history access via API
