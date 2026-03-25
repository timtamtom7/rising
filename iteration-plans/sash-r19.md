# Sash — R19: Privacy Architecture & Security

## Goal
Build the most secure sync app with zero-knowledge architecture, comprehensive encryption, and transparent practices.

---

## Scope

### Zero-Knowledge Architecture
- All data encrypted before leaving device
- Sync server never sees plaintext — zero-knowledge encryption
- User holds encryption key; server stores only encrypted blobs
- iCloud sync uses Apple end-to-end encryption (iCloud Advanced Data Protection)

### Encryption Stack
- File content: AES-256-GCM
- File metadata: encrypted
- Folder names: encrypted
- User credentials: hashed with Argon2
- TLS 1.3 for all connections
- Certificate pinning for sync server

### No Analytics
- Zero analytics SDK
- No telemetry, no crash reporting services with network access
- Local-only crash logs (user can opt to share)
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### Data Minimization
- Sync only what user configures — no auto-discovery of all files
- Delete from server when deleted locally (unless shared with team)
- Team members see only encrypted filenames until they have key

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Data collected: none beyond sync credentials
  - Data in transit: encrypted
  - No third-party advertising SDK

### Security Audit
- Annual third-party penetration testing
- Bug bounty at sash.app/security
- SOC 2 Type II certification (enterprise tier)
- Dependency scanning every release

### Data Portability
- Full export of all synced data
- "Download all my data" in settings
- Complete account deletion: wipe all server-side data

---

## Out of Scope
- Hardware security key (future enterprise)
- Blockchain-based key management
- Government key escrow
