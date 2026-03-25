# Shelf — R19: Privacy Architecture & Security Audit

## Goal
Establish Shelf as the most privacy-respecting launcher, with zero telemetry, full local storage, and transparent data practices.

---

## Scope

### Privacy-First Architecture
- All data stored locally by default
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no crash reporting services sending data off-device
- No third-party SDKs with network access
- App Sandbox with minimal entitlements
- Hardened Runtime for notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Local-First Data
- Item index stored in local SQLite with Data Protection class
- No account required — Apple ID for iCloud sync only
- Full data export (JSON/CSV) at any time
- "Delete all my data" — complete data wipe option
- No data sold or shared with third parties

### Spotlight & Index Privacy
- Spotlight index is local to each Mac
- No remote indexing or search-as-a-service
- User can disable Spotlight indexing of Shelf in settings

### Privacy Labels (App Store)
- Accurate privacy nutrition labels
- Data linked to you: iCloud account (for sync only)
- Data not linked to you: aggregated usage patterns (on-device only)
- No data collected for advertising

### Security Audit
- Annual third-party security audit
- Bug bounty at shelf.app/security
- Dependency audit for every release
- Reproducible builds for releases

### Optional Telemetry (Opt-In)
- Anonymous usage stats — opt-in only
- No device fingerprinting
- Used only to improve Shelf — never monetized

---

## Out of Scope
- Hardware security key support
- Corporate certificate management
- Remote device management beyond MDM
