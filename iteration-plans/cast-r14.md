# Cast — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Cast via REST API and build a web dashboard for casting management and analytics.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8781)
- Endpoints:
  - `GET /devices` — list casting devices
  - `POST /cast` — cast content to device
  - `POST /stop` — stop casting
  - `GET /queue` — playback queue
  - `POST /queue/add` — add to queue
  - `GET /watch-party/:id` — watch party details
  - `POST /watch-party` — create watch party
  - `GET /zones` — list zones
  - `POST /zones/:id/content` — set zone content
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 100 requests/minute

### Web Dashboard (cast.app/dashboard)
- PWA for casting management
- Device management, queue, watch parties
- Zone management (venue)
- Analytics
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `casting.started` — started casting
  - `casting.stopped` — stopped casting
  - `watch-party.joined` — someone joined party
  - `device.offline` — casting device went offline
- HMAC-signed payloads

### Developer Portal
- docs.cast.app/developers
- API reference, casting protocol guides
- SDK for Swift and JavaScript
- Casting protocol documentation (Chromecast-style protocol)
- Postman collection

### Zapier / Make / IFTTT
- Triggers: casting started, watch party created
- Actions: cast content, create watch party

---

## Out of Scope
- Real-time streaming protocol development
- CDN management
