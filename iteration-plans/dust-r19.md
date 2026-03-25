# Dust — R19: Privacy Architecture & Security

## Goal
Build the most privacy-respecting focus app with zero analytics, local-only data, and transparent practices.

---

## Scope

### Privacy-First Architecture
- All focus data stored locally
- No analytics SDK, no telemetry, no crash reporting with network access
- ML model trained locally on user's own patterns
- No third-party SDKs with network access
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### No Account Required
- Dust works fully offline without any account
- iCloud sync uses end-to-end encryption (Apple Advanced Data Protection)
- Team features use iCloud sharing (same privacy)

### Focus Data Privacy
- Focus data is personal — never sold, never shared with employer without consent
- Team stats are aggregate only — individual data never exposed
- Manager dashboard shows team averages, never individual session details (unless employee opts in)

### Data Portability
- Full export of all focus data (JSON/CSV)
- "Download my data" in settings
- Complete account deletion: wipe all data

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Data collected: none beyond iCloud account
  - No analytics, no third-party advertising SDK
  - Focus data never sold or shared

### Security Audit
- Annual third-party security audit
- Bug bounty at dust.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security key support
- Government key escrow
- Blockchain-based privacy
