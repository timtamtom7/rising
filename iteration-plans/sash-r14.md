# Sash — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Sash via REST API and build a web dashboard for remote folder management and sync monitoring.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8771)
- Endpoints:
  - `GET /folders` — list synced folders
  - `GET /folders/:id/status` — sync status
  - `POST /folders` — add folder to sync
  - `DELETE /folders/:id` — remove folder
  - `GET /conflicts` — list active conflicts
  - `POST /conflicts/:id/resolve` — resolve conflict
  - `GET /activity` — recent activity
  - `GET /stats` — sync statistics
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 100 requests/minute

### Web Dashboard (sash.app/dashboard)
- PWA for remote sync management
- Monitor all connected devices and their sync status
- View and resolve conflicts remotely
- Team folder management
- Storage usage analytics
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `file.changed` — file updated in synced folder
  - `conflict.detected` — sync conflict occurred
  - `folder.shared` — folder shared with new member
  - `device.connected` — new device linked
  - `device.offline` — device went offline
- HMAC-signed payloads

### Developer Portal
- docs.sash.app/developers
- API reference, webhook guides
- SDK for Swift and JavaScript
- Sample integrations
- Postman collection

### Third-Party Cloud Provider Support
- Support for Dropbox, Google Drive, OneDrive as sync targets
- Bridge local folders to cloud storage
- Unified sync interface across multiple providers

---

## Out of Scope
- Real-time collaborative editing
- Full cloud provider abstraction (beyond sync bridging)
