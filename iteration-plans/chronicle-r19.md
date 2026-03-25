# Chronicle — R19: Advanced Privacy & Security Hardening

## Goal
Achieve the highest standard of privacy and security, positioning Chronicle as the most trustworthy bill tracker for sensitive financial data.

---

## Scope

### Local-First Architecture
- All data stored locally in encrypted SQLite database
- App-level encryption using AES-256 (via CryptoKit) — database encrypted at rest
- Encryption key stored in macOS Keychain, protected by user account password
- Optional: require password/Face ID to unlock Chronicle at app launch

### Privacy Audit
- Comprehensive privacy manifest (PrivacyInfo.xcprivacy)
- No analytics, no crash reporting services that send data off-device
- No third-party SDKs with network access
- App Sandbox enabled with minimal entitlements
- Hardened Runtime for notarization

### Data Export & Portability
- Full data export: JSON, CSV, or PDF
- "Download my data" button in settings — generates downloadable archive
- Delete account / wipe all data option (even for local-only users)
- Data retention policy clearly documented

### Network Security
- All iCloud sync uses end-to-end encryption (CloudKit zero-knowledge encryption)
- API server (R14) enforces TLS 1.3 only
- API rate limiting and IP allowlist option for enterprise

### Privacy Labels (App Store)
- Accurate App Store privacy nutrition labels
- All data types declared: no hidden tracking
- Privacy practices documentation at chronicle.app/privacy

### Two-Factor Authentication (for Sync)
- Optional 2FA for iCloud sync (via device-level authentication)
- TOTP support for API access (R14)

---

## Out of Scope
- Biometric-only unlock (must always allow fallback to password)
- Hardware security key support (future enterprise feature)
