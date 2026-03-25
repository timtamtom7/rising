# Recap — R19: Privacy Architecture & Security

## Goal
Build Recap with privacy-first content handling, no telemetry, and transparent practices.

---

## Scope

### Privacy-First Architecture
- All content stored locally
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no telemetry, no third-party SDKs
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Local ML Processing
- Summarization runs on-device
- No article content sent to cloud
- ML model trained locally

### No Account Required
- Works fully offline
- iCloud account for sync only
- No email required

### Content Privacy
- Shared recaps are end-to-end encrypted
- Team members' reading history not exposed to others

### Data Portability
- Full export: all recaps as Markdown/JSON
- "Download all my data" in settings
- Complete account deletion

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Content stored locally
  - No analytics, no third-party SDK
  - iCloud sync uses end-to-end encryption

### Security Audit
- Annual third-party security audit
- Bug bounty at recap.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security keys
- Government key escrow
