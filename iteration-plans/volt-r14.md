# Volt — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Volt data via REST API and build a companion web dashboard for fleet monitoring and cross-platform power visibility.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8756)
- Endpoints:
  - `GET /status` — current battery status, health, time remaining
  - `GET /history` — historical battery data (charge cycles, health over time)
  - `GET /power-mode` — current power mode
  - `PUT /power-mode` — set power mode
  - `GET /analytics` — usage patterns, predictions
  - `GET /energy-cost` — cost estimates for current charge session
- API key stored in macOS Keychain
- OpenAPI 3.0 spec served at `/openapi.json`
- Rate limit: 120 requests/minute

### Web Dashboard (volt.app/dashboard)
- Companion web app for viewing battery status remotely
- Real-time status of all registered Macs
- Battery health timeline across fleet
- Energy cost projections
- Apple Sign-In for authentication

### Webhooks
- Event-based webhooks for automation:
  - `battery.low` — battery drops below threshold
  - `battery.charged` — fully charged
  - `health.degraded` — battery health dropped significantly
  - `power-mode.changed` — user or system changed mode
- Webhook destination configurable via URL
- HMAC-signed payloads for verification

### Developer Portal
- Documentation at developers.volt.app
- API reference, webhook guides, integration tutorials
- Postman collection
- Sample code (Swift, Python, JavaScript, Shell)
- Integration guides for popular apps (Cinema Dr, Logic Pro, Xcode)

### Zapier / Make / IFTTT Integration
- Zapier app for Volt triggers and actions
- "When battery is low → send Slack message"
- "When fully charged → trigger HomeKit scene"

---

## Out of Scope
- Remote control of another user's Mac
- Write access to power settings from web dashboard
- Social features beyond profile sharing
