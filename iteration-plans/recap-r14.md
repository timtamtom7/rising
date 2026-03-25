# Recap — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Recap via REST API and build a web dashboard for content management and team administration.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8778)
- Endpoints:
  - `GET /sources` — list content sources
  - `GET /articles` — list articles from sources
  - `GET /recaps` — list generated recaps
  - `POST /recaps` — generate recap
  - `GET /recaps/:id` — recap content
  - `POST /sources` — add content source
  - `DELETE /sources/:id` — remove source
  - `GET /team` — team members
  - `POST /share` — share recap
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 100 requests/minute

### Web Dashboard (recap.app/dashboard)
- PWA for content and recap management
- Source management, recap generation, team administration
- Analytics
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `recap.generated` — new recap ready
  - `recap.shared` — recap shared
  - `article.added` — new article from source
  - `team.member.added` — new team member
- HMAC-signed payloads

### Developer Portal
- docs.recap.app/developers
- API reference, recap format guides
- SDK for Swift and JavaScript
- Sample integrations
- Postman collection

### Zapier / Make / IFTTT
- Triggers: recap generated, article added
- Actions: generate recap, add source

---

## Out of Scope
- Full content management beyond recaps
- Real-time collaborative editing
