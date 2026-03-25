# Caliber — R19: Privacy Architecture & Security

## Goal
Build the most privacy-respecting learning app with local-first data storage and transparent practices.

---

## Scope

### Privacy-First Architecture
- All study data stored locally
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no telemetry, no third-party SDKs with network access
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Local ML Processing
- Spaced repetition algorithm runs locally
- ML model for learning pattern analysis runs on-device
- Card content never sent to cloud for ML inference
- No study data shared with third parties

### No Account Required
- No email required — local-first use without any account
- iCloud account for sync (optional)
- Study groups use iCloud sharing (same privacy)

### Data Portability
- Full export: all decks as JSON/CSV
- Export individual decks
- "Download all my data" in settings
- Complete account deletion option

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Data collected: none beyond iCloud account for sync
  - No analytics
  - No third-party advertising SDK
  - Student progress data stays within institution's iCloud

### Academic Privacy
- FERPA-compliant for US academic institutions
- Student data never shared or used for research
- BAA available for healthcare training programs

### Security Audit
- Annual third-party security audit
- Bug bounty at caliber.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security keys
- Blockchain-based credential storage
- Government data residency requirements beyond standard
