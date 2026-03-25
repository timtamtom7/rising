# Zones — R19: Privacy Architecture & Security

## Goal
Build Zones with privacy-first location handling, minimal data collection, and transparent practices.

---

## Scope

### Privacy-First Architecture
- Zone configurations stored locally
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no telemetry, no third-party SDKs
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Location Privacy
- Location used only for zone detection — not stored or tracked
- No GPS history stored
- No location data sent to cloud
- Geofence data stays on device

### Local ML Processing
- Zone prediction runs on-device
- Activity detection runs on-device
- No location data used for ML training off-device

### No Account Required
- Works fully offline
- iCloud account for sync only
- No email required

### Data Portability
- Full export: all zone configurations as JSON
- "Download all my data" in settings
- Complete account deletion

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Location used for zone detection only
  - No GPS history, no tracking
  - No analytics, no third-party SDK

### Security Audit
- Annual third-party security audit
- Bug bounty at zones.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security keys
- Government access
- Coercion detection
