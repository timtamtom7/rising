# Mark — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Mark via REST API and build a web dashboard for bookmark management and team administration.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8783)
- Endpoints:
  - `GET /bookmarks` — list bookmarks
  - `GET /bookmarks/:id` — bookmark details
  - `POST /bookmarks` — add bookmark
  - `PUT /bookmarks/:id` — update bookmark
  - `DELETE /bookmarks/:id` — delete bookmark
  - `GET /collections` — list collections
  - `POST /collections` — create collection
  - `GET /tags` — list tags
  - `GET /search?q=` — search bookmarks
  - `POST /share` — share bookmark/collection
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 100 requests/minute

### Web Dashboard (mark.app/dashboard)
- PWA for bookmark management from any browser
- Browse, search, organize bookmarks
- Team management, collection administration
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `bookmark.added` — new bookmark
  - `bookmark.accessed` — bookmark opened
  - `bookmark.shared` — shared with someone
  - `collection.updated` — collection changed
  - `tag.added` — new tag
- HMAC-signed payloads

### Developer Portal
- docs.mark.app/developers
- API reference, bookmark format guides
- SDK for Swift and JavaScript
- Browser extension SDK
- Postman collection

### Browser Extension
- Safari, Chrome, Firefox extension
- One-click bookmark from browser
- "Save to Mark" button
- Right-click → "Bookmark with Mark"

### Zapier / Make / IFTTT
- Triggers: bookmark added, bookmark accessed
- Actions: add bookmark, update tags, share

---

## Out of Scope
- Write access from web (read-only initially)
- Automatic content extraction from URLs (yet)
