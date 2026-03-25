# Pulse — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Pulse data via REST API and build a companion web dashboard for health tracking across devices and for care team access.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8768)
- Endpoints:
  - `GET /health` — current heart rate data
  - `GET /history` — historical data with date range filters
  - `GET /trends` — aggregated trends and analytics
  - `GET /insights` — AI-generated insights
  - `GET /export` — export data as JSON/CSV
  - `POST /share` — generate care circle invite
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 60 requests/minute
- All API access logged for audit

### Web Dashboard (pulse.app/dashboard)
- PWA for health tracking from any browser
- View trends, history, insights
- Family Care Circle view (see family members' trends)
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `hr.elevated` — HR above personal threshold
  - `hr.anomaly.detected` — ML anomaly detected
  - `insight.generated` — new weekly insight ready
  - `share.invitation.sent` — someone invited to care circle
- HMAC-signed payloads
- Configurable webhook destination per event type

### Health Records Export
- FHIR-compatible export for healthcare providers
- PDF summary for doctor visits
- CDA (Consolidated Clinical Document Architecture) export for EHR integration

### Developer Portal
- docs.pulse.app/developers
- API reference, webhook guides, SDK documentation
- Sample integrations with health apps
- Postman collection

### Apple Health Integration
- Bidirectional sync with Apple Health (already in scope for R1-R10)
- R14 deepens: export to more Apple Health data types

---

## Out of Scope
- Real-time streaming API
- Multi-user write access via API
- Social sharing beyond Care Circle
