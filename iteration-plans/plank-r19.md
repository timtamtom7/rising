# Plank — R19: Privacy Architecture & Security

## Goal
Build Plank with privacy-first architecture, no telemetry, and transparent data practices.

---

## Scope

### Privacy-First Architecture
- All theme data stored locally
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no telemetry, no third-party SDKs
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Local ML Processing
- Theme generation runs on-device
- No theme content sent to cloud
- ML model trained locally

### No Account Required
- Works fully offline
- Theme marketplace uses iCloud account for publishing
- No email required to browse/download free themes

### Data Portability
- Full export: all themes as JSON
- "Download all my data" in settings
- Complete account deletion

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Data collected: none
  - No analytics, no third-party SDK
  - Theme data stays local

### Security Audit
- Annual third-party security audit
- Bug bounty at plank.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security keys
- Government key escrow
