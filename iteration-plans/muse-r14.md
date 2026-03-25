# Muse — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Muse via REST API and build a web dashboard for project management and collaboration.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8780)
- Endpoints:
  - `GET /projects` — list projects
  - `GET /projects/:id` — project details
  - `POST /projects` — create project
  - `PUT /projects/:id` — update project
  - `GET /tracks` — list tracks
  - `POST /tracks` — add track
  - `GET /samples` — sample library
  - `POST /share` — share project
  - `GET /export/:id` — export project
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 60 requests/minute

### Web Dashboard (muse.app/dashboard)
- PWA for project management from any browser
- Project list, collaboration management, client portal
- Sample library access
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `project.updated` — project changed
  - `project.shared` — shared with collaborator
  - `comment.added` — feedback on project
  - `sample.uploaded` — new sample in library
- HMAC-signed payloads

### Developer Portal
- docs.muse.app/developers
- API reference, audio format guides
- SDK for Swift and JavaScript
- MIDI/Audio plugin SDK
- Postman collection

### DAW Integration
- VST3 / AU plugin for Muse instruments
- Export to Pro Tools, Logic, Cubase via OMF/AAF
- MIDI I/O support

---

## Out of Scope
- Real-time DAW synchronization
- Cloud-based audio rendering
