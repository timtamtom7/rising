# Muse — R19: Privacy Architecture & Security

## Goal
Build Muse with privacy-first audio handling, no telemetry, and transparent practices.

---

## Scope

### Privacy-First Architecture
- All projects stored locally by default
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no telemetry, no third-party SDKs with network access
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Local ML Processing
- Composition assistance runs on-device
- Style transfer runs on-device
- No audio content sent to cloud for ML

### Audio Privacy
- Microphone access only when recording — explicit consent each time
- Recorded audio never leaves device without user action
- Collaboration audio streamed losslessly with E2E encryption

### No Account Required
- Works fully offline
- iCloud account for sync and collaboration only
- No email required

### Data Portability
- Full export: all projects as MIDI/Audio files
- "Download all my data" in settings
- Complete account deletion

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Audio recorded stays on device
  - iCloud sync uses end-to-end encryption
  - No analytics, no third-party SDK

### Security Audit
- Annual third-party security audit
- Bug bounty at muse.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security keys
- Blockchain-based rights management
