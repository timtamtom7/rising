# Cast — R19: Privacy Architecture & Security

## Goal
Build Cast with privacy-first casting, minimal data collection, and transparent practices.

---

## Scope

### Privacy-First Architecture
- Casting metadata stored locally
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no telemetry, no third-party SDKs
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Local Network Privacy
- Cast only communicates on local network
- No external analytics from casting
- Device discovery uses mDNS — no cloud lookup

### Watch Party Privacy
- Watch party chat E2E encrypted
- No recording of watch party chat without consent

### No Account Required
- Works without account
- iCloud account for sync only
- No email required

### Data Portability
- Full export: queue history as JSON
- "Download all my data" in settings
- Complete account deletion

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Local network data used only
  - No analytics, no third-party SDK
  - iCloud sync uses end-to-end encryption

### Security Audit
- Annual third-party security audit
- Bug bounty at cast.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security keys
- Government key escrow
