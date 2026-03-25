# Pulse — R19: Privacy Architecture & Security Audit

## Goal
Build the most privacy-respecting heart health app, especially critical given the sensitive nature of biometric data.

---

## Scope

### Privacy-First Architecture
- All data stored locally by default
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no third-party services with network access
- No selling or sharing of health data
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy) with full disclosure

### Health Data Specific Protections
- Health data is the most sensitive category — extra encryption layer
- Local SQLite database with Data Protection full class (kSecAttrAccessibleWhenUnlockedThisDeviceOnly)
- No third-party health SDKs with external data transmission
- Apple HealthKit used only for sync — data stays within Apple ecosystem

### Data Minimization
- Store aggregates, not raw data where possible
- Raw data retained for 30 days, then summarized (user can configure)
- Care Circle data minimization: trends only, not raw data, shared with family

### Consent & Control
- Granular permissions: what data is shared, with whom, for how long
- Care Circle consent: all parties must consent before data sharing begins
- Emergency contact data: stored locally, never sent without alert trigger

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Health data collected: heart rate, HRV (if available)
  - Data linked to you: iCloud account for sync
  - Data not linked to you: none
  - No third-party advertising SDK

### Security Audit
- Annual third-party security audit focused on health data compliance
- Bug bounty at pulse.app/security (critical severity)
- Annual penetration testing
- HIPAA compliance audit for enterprise tier

### Data Portability
- Full data export at any time (JSON, CSV, PDF)
- "Download my data" in settings
- Full account deletion: delete all data, including from backups

---

## Out of Scope
- Hardware security keys for health data
- Blockchain-based health record storage
- Integration with government health databases
