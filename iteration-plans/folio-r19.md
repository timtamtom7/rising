# Folio — R19: Privacy Architecture & Security

## Goal
Build Folio with privacy-first document storage, no analytics, and transparent practices.

---

## Scope

### Privacy-First Architecture
- All documents stored locally by default
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no telemetry, no third-party SDKs
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Local ML Processing
- OCR and document classification run on-device
- No document content sent to cloud
- ML model trained locally

### No Account Required
- Works fully offline
- iCloud account for sync only
- No email required

### Data Portability
- Full export: all documents as PDF/PNG/text
- "Download all my data" in settings
- Complete account deletion

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Documents stored locally
  - No analytics, no third-party SDK
  - iCloud sync uses end-to-end encryption

### Security Audit
- Annual third-party security audit
- Bug bounty at folio.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security keys
- Government key escrow
