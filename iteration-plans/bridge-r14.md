# Bridge — R14: API, Web Dashboard & Developer Platform

## Goal
Expose Bridge via REST API and build a web dashboard for remote device management and monitoring.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8776)
- Endpoints:
  - `GET /devices` — list connected devices
  - `GET /devices/:id` — device details
  - `POST /devices/:id/connect` — initiate connection
  - `POST /devices/:id/disconnect` — disconnect
  - `GET /workflows` — list workflows
  - `POST /workflows` — create workflow
  - `GET /scenes` — list scenes
  - `POST /scenes/:id/activate` — activate scene
  - `GET /usage` — usage analytics
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 100 requests/minute

### Web Dashboard (bridge.app/dashboard)
- PWA for remote device management
- View all connected devices
- Control devices remotely
- Workflow and scene management
- Usage analytics
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `device.connected` — device connected
  - `device.disconnected` — device disconnected
  - `workflow.triggered` — workflow executed
  - `scene.activated` — scene activated
  - `device.new` — new device detected
- HMAC-signed payloads

### Developer Portal
- docs.bridge.app/developers
- API reference, workflow trigger guides
- SDK for Swift and JavaScript
- Sample integrations
- Postman collection

### Zapier / Make / IFTTT
- Triggers: device connected, workflow triggered, scene activated
- Actions: connect device, trigger workflow, activate scene

---

## Out of Scope
- Real-time video streaming from devices
- File transfer between devices
