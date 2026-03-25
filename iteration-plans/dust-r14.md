# Dust — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Dust via REST API and build a web dashboard for remote focus management and team oversight.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8772)
- Endpoints:
  - `GET /status` — current focus session status
  - `POST /session/start` — start focus session
  - `POST /session/end` — end focus session
  - `GET /stats` — focus statistics
  - `GET /blocked-apps` — list blocked apps
  - `PUT /blocked-apps` — update blocklist
  - `GET /schedule` — focus schedule
  - `POST /schedule` — set schedule
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 60 requests/minute

### Web Dashboard (dust.app/dashboard)
- PWA for focus management from any browser
- Start/stop focus sessions remotely
- View daily/weekly focus statistics
- Team management and challenges
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `focus.started` — focus session began
  - `focus.ended` — focus session ended
  - `distraction.blocked` — attempt to access blocked app
  - `goal.reached` — daily focus goal achieved
  - `break.required` — mandatory break triggered
- HMAC-signed payloads

### Developer Portal
- docs.dust.app/developers
- API reference, webhook guides
- SDK for Swift and JavaScript
- Sample integrations (Calendar, Slack, Teams)
- Postman collection

### Calendar Integration
- Two-way sync with calendar apps (Apple Calendar, Google Calendar, Outlook)
- Block time automatically blocks meetings during focus
- "Focus block" event type: colleagues see you're in focus mode

### Zapier / Make
- Triggers: focus started, goal reached, break required
- Actions: start focus, add to blocklist, get stats

---

## Out of Scope
- Real-time focus monitoring of other users
- Automatic task prioritization
