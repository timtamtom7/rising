# Nimbus — R19: Privacy Architecture & Security

## Goal
Build the most privacy-respecting notes app with local-first data, end-to-end encryption for collaboration, and zero analytics.

---

## Scope

### Privacy-First Architecture
- All notes stored locally on device
- iCloud sync uses end-to-end encryption (CloudKit with Advanced Data Protection)
- Shared notebooks: end-to-end encrypted, server never sees plaintext
- No analytics SDK, no telemetry, no third-party SDKs with network access
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Local ML Processing
- Summarization runs on-device
- Topic clustering runs on-device
- Writing assistance runs on-device
- No note content sent to cloud for ML inference

### No Account Required
- Works fully offline without any account
- iCloud account for sync only
- Team collaboration uses iCloud sharing (same privacy)

### Data Portability
- Full export: all notes as Markdown/JSON
- Export individual notebooks
- "Download all my data" in settings
- Complete account deletion

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Data collected: none beyond iCloud account
  - No analytics, no third-party advertising SDK
  - Notes never sold or shared

### Security Audit
- Annual third-party security audit
- Bug bounty at nimbus.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security keys
- Blockchain-based note storage
- Government key escrow
