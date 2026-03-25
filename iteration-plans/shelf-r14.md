# Shelf — R14: API, Web App & Developer Platform

## Goal
Expose Shelf data via REST API and build a companion web app for accessing your shelf from any browser or platform.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8767)
- Endpoints:
  - `GET /shelves` — list all shelves
  - `GET /shelves/:id/items` — items in a shelf
  - `POST /shelves` — create shelf
  - `POST /shelves/:id/items` — add item to shelf
  - `PUT /items/:id` — update item (rename, move, tag)
  - `DELETE /items/:id` — remove item
  - `GET /recent` — recently accessed items
  - `GET /suggestions` — ML-suggested items
- API key authentication (macOS Keychain)
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 100 requests/minute

### Web Dashboard (shelf.app/web)
- PWA for accessing shelf from any browser
- View all shelves, recent items, suggested items
- Read-only view of shared team shelves
- Responsive design: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks for automation:
  - `item.added` — new item added to shelf
  - `item.accessed` — item was opened
  - `shelf.shared` — shelf shared with someone
  - `stack.created` — new smart stack generated
- HMAC-signed payloads for security

### Developer Portal
- docs.shelf.app/developers
- API reference, webhook guides, SDK documentation
- Postman collection
- Sample integrations (VS Code, Xcode, Figma)
- Community gallery of user-built integrations

### Zapier / Make / IFTTT
- Zapier triggers: item added, item accessed, new stack
- Zapier actions: add item to shelf, create shelf, update item
- Template Zaps for popular workflows

---

## Out of Scope
- Write access from web app initially (read-only)
- Real-time collaborative editing
- Social feed beyond team activity
