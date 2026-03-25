# Swatch — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Swatch via REST API and build a companion web dashboard for palette management and team collaboration.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8769)
- Endpoints:
  - `GET /palettes` — list all palettes
  - `GET /palettes/:id` — palette with colors
  - `POST /palettes` — create palette
  - `PUT /palettes/:id` — update palette
  - `DELETE /palettes/:id` — delete palette
  - `POST /palettes/:id/colors` — add color to palette
  - `GET /brands` — list brands
  - `GET /style-guides/:id` — style guide export
  - `GET /export/:format` — export in format (css, swift, android, etc.)
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 100 requests/minute

### Web Dashboard (swatch.app/web)
- PWA for palette management from any browser
- View, create, edit palettes
- Team collaboration view
- Brand/style guide management
- Export palettes in any format
- Responsive: iPhone, iPad, desktop

### Webhooks
- Event webhooks:
  - `palette.created` — new palette created
  - `palette.updated` — palette modified
  - `color.approved` — color approved in workflow
  - `brand.access.granted` — new member added to brand
  - `style-guide.exported` — style guide downloaded
- HMAC-signed payloads

### Developer Portal
- docs.swatch.app/developers
- API reference, export formats guide
- SDK for Swift (native), JavaScript (web)
- Sample code for Figma plugin, VS Code extension
- Postman collection

### Design Tool Integrations
- Figma plugin: pull/push palettes directly in Figma
- VS Code extension: color preview in editor
- Sketch plugin: sync palettes with Sketch
- Adobe XD integration

---

## Out of Scope
- Real-time collaborative editing via web
- Write access from web for non-authenticated users
- Asset management beyond colors
