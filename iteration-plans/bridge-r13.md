# Bridge — R13: Enterprise & IT Management

## Goal
Position Bridge for enterprise IT with MDM support, fleet device management, and compliance controls.

---

## Scope

### MDM / Managed Device Support
- Mobile Device Management profile for enterprise Mac deployment
- IT can configure which devices are visible/blocked on managed Macs
- Remote device configuration push
- Device compliance: must be MDM-enrolled to connect to enterprise devices

### Fleet Device Management
- IT admin console for all connected devices
- Device inventory: what devices have connected to the network
- Usage analytics per device, per department
- Device firmware version tracking
- Alerts for outdated firmware

### Compliance Controls
- Device allowlist/blocklist per department
- "Engineering can connect to dev servers, Marketing cannot"
- Audit log: all device connections with timestamp
- Export audit log as CSV

### Enterprise Dashboard
- Web-based admin console at admin.bridge.app
- Fleet overview dashboard
- Policy management
- Compliance reports

### Volume Licensing
- Apple VPP enrollment for volume distribution
- Enterprise pricing tiers

### SSO / SAML
- SAML 2.0 SSO for dashboard
- Support for Okta, Azure AD, Google Workspace

---

## Out of Scope
- Full NMS (Network Management System)
- Network infrastructure configuration
- Security vulnerability scanning
