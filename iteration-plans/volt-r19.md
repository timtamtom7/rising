# Volt — R19: Privacy Architecture & Security Audit

## Goal
Achieve the highest privacy standard for Volt, especially critical given battery data can reveal user behavior patterns and location.

---

## Scope

### Privacy Architecture
- All data stored locally — no telemetry, no analytics, no crash reporting services
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No third-party SDKs with network access
- App Sandbox with minimal entitlements
- Hardened Runtime for notarization
- Privacy manifest (PrivacyInfo.xcprivacy) with full disclosure

### Local-First Data
- Battery history stored in local SQLite with Data Protection encryption
- No external server for data storage (iCloud Drive for sync only)
- No account required — Apple ID used only for iCloud sync
- User-controlled: all data can be deleted on demand

### API Security (R14)
- API requires authentication (API key from Keychain)
- TLS 1.3 only for all connections
- Rate limiting per API key
- Audit log of API access

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Data linked to you: none (truly local-first)
  - Data not linked to you: battery usage patterns (aggregated, anonymous)
  - Data collected: none beyond device-identifying Apple ID for iCloud

### Security Audit
- Third-party security audit (至少 annually)
- Bug bounty program at volt.app/security
- All dependencies audited for vulnerabilities
- Dependency pinning for reproducible builds

### Optional Telemetry (Opt-In Only)
- Only if user explicitly opts in: anonymous usage statistics
- No personal identifiers, no device fingerprinting
- Used solely to improve Volt — never sold or shared

---

## Out of Scope
- Hardware security key support
- Corporate MDM-level device certificates
- VPN-based data routing
