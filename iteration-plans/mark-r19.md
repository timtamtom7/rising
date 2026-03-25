# Mark — R19: Privacy Architecture & Security

## Goal
Build Mark with privacy-first bookmark storage, no telemetry, and transparent practices.

---

## Scope

### Privacy-First Architecture
- All bookmarks stored locally
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no telemetry, no third-party SDKs
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Local ML Processing
- Bookmark classification runs on-device
- No URL content sent to cloud for ML
- Prediction models trained locally

### No Account Required
- Works fully offline
- iCloud account for sync only
- No email required

### Data Portability
- Full export: all bookmarks as HTML bookmarks file, JSON, CSV
- Browser-compatible bookmark export
- "Download all my data" in settings
- Complete account deletion

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Bookmarks stored locally, synced via iCloud E2E
  - No analytics, no third-party SDK
  - No tracking of browsing history

### Security Audit
- Annual third-party security audit
- Bug bounty at mark.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security keys
- Government key escrow
