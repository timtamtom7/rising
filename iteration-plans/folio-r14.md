# Folio — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Folio via REST API and build a web dashboard for document access and team management.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8777)
- Endpoints:
  - `GET /documents` — list documents
  - `GET /documents/:id` — document metadata
  - `POST /documents` — upload document
  - `PUT /documents/:id` — update metadata
  - `DELETE /documents/:id` — delete document
  - `GET /search?q=` — search documents
  - `GET /export/:id` — export document
  - `GET /tags` — list tags
  - `POST /share` — generate share link
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 60 requests/minute

### Web Dashboard (folio.app/dashboard)
- PWA for document access from any browser
- View, search, download documents
- Team management
- Compliance reports
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `document.uploaded` — new document added
  - `document.viewed` — document viewed
  - `document.shared` — document shared
  - `document.expiring` — document approaching retention date
  - `hold.applied` — legal hold placed
- HMAC-signed payloads

### Developer Portal
- docs.folio.app/developers
- API reference, webhook guides
- SDK for Swift and JavaScript
- Sample integrations
- Postman collection

### Zapier / Make / IFTTT
- Triggers: document uploaded, document viewed, expiring
- Actions: upload document, share, update tags

---

## Out of Scope
- Write access from web (read-only to start)
- Real-time collaborative viewing
