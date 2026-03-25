# Notch — R19: Privacy Architecture & Security

## Goal
Build Notch with privacy-first operation, no analytics, and transparent practices.

---

## Scope

### Privacy-First Architecture
- All configuration data stored locally
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no telemetry, no third-party SDKs
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Local ML Processing
- App usage prediction runs on-device
- Menu bar heatmap generated locally
- No usage data sent to cloud

### No Account Required
- Works fully offline
- iCloud account for sync only
- No email required

### Minimal Permissions
- Only Accessibility permission (for controlling other apps' menu bar items)
- No full screen recording
- No keystroke logging

### Data Portability
- Full export: all presets as JSON
- "Download all my data" in settings
- Complete account deletion

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Usage data stored locally only
  - No analytics, no third-party SDK
  - iCloud sync uses end-to-end encryption

### Security Audit
- Annual third-party security audit
- Bug bounty at notch.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security keys
- Government key escrow
