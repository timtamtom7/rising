# Bridge — R19: Privacy Architecture & Security

## Goal
Build Bridge with privacy-first network monitoring, minimal data collection, and transparent practices.

---

## Scope

### Privacy-First Architecture
- Device metadata stored locally
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no telemetry, no third-party SDKs
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Network Privacy
- Bridge only sees network device metadata, not traffic content
- No packet inspection or traffic monitoring
- Device data stays on local network

### Local ML Processing
- Device detection and prediction runs on-device
- Usage patterns analyzed locally
- No device data sent to cloud for ML

### No Account Required
- Works fully offline without account
- iCloud account for sync only

### Data Portability
- Full export: all device configurations as JSON
- "Download all my data" in settings
- Complete account deletion

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Data collected: device metadata (name, type, MAC address)
  - No analytics, no third-party SDK
  - Network traffic never inspected

### Security Audit
- Annual third-party security audit
- Bug bounty at bridge.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security keys
- Government key escrow
