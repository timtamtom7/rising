# Nimbus — R14: API, Web App & Developer Platform

## Goal
Expose Nimbus via REST API and build a companion web app for note access and team collaboration from any device.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8773)
- Endpoints:
  - `GET /notebooks` — list notebooks
  - `GET /notebooks/:id/notes` — notes in notebook
  - `GET /notes/:id` — note content
  - `POST /notebooks` — create notebook
  - `POST /notes` — create note
  - `PUT /notes/:id` — update note
  - `DELETE /notes/:id` — delete note
  - `GET /search?q=` — search notes
  - `GET /tags` — list all tags
  - `POST /share` — share notebook
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 100 requests/minute

### Web App (nimbus.app/web)
- PWA for full note access from any browser
- Rich text editor with full feature parity
- Team collaboration features
- Search, tags, notebooks
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `note.created` — new note created
  - `note.updated` — note modified
  - `note.shared` — note shared with someone
  - `comment.added` — comment on note
  - `notebook.shared` — notebook shared
- HMAC-signed payloads

### Developer Portal
- docs.nimbus.app/developers
- API reference, webhook guides
- SDK for Swift and JavaScript
- Sample integrations (Calendar, Slack, Jira)
- Postman collection

### Zapier / Make / IFTTT
- Triggers: note created, note updated, comment added
- Actions: create note, update note, share notebook

### Obsidian / Notion Import
- Import from Obsidian (markdown files)
- Import from Notion (via Notion API export)
- Migrate existing notes in bulk

---

## Out of Scope
- Real-time collaborative editing via web (initial read-only)
- Full plugin system (yet)
