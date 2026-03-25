# Swatch — R19: Privacy Architecture & Security

## Goal
Build the most privacy-respecting color tool with no analytics, no cloud dependency, and transparent data practices.

---

## Scope

### Privacy-First Architecture
- All data stored locally (palettes, colors, style guides)
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no telemetry, no crash reporting services
- No third-party SDKs with network access
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Local-First Color Processing
- Color extraction runs entirely on-device
- ML models run on-device — no cloud inference
- Image data never leaves the device during color picking
- Screenshot is processed in memory only, not saved to disk

### No Account Required
- No email or account required to use Swatch
- iCloud account for sync (optional, Apple handles privacy)
- Team features require iCloud sharing (same privacy protections)

### Data Export & Portability
- Full palette export in all formats at any time
- "Download all my data" button in settings
- Complete account deletion: delete all data, including from iCloud backups

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Data collected: none (no analytics)
  - Data linked to you: iCloud account for sync only
  - No third-party advertising SDK
  - No data sold

### Security Audit
- Annual third-party security audit
- Bug bounty at swatch.app/security
- Dependency scanning on every release
- Reproducible builds for releases

---

## Out of Scope
- Cloud-based ML color extraction
- Social features with color sharing
- Hardware security key support
