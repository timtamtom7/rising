# Coin — R19: Privacy Architecture & Security

## Goal
Build the most privacy-respecting financial app with local-first storage, no bank connections, and zero analytics.

---

## Scope

### Privacy-First Architecture
- All financial data stored locally
- No bank account connections — manual entry only (true privacy)
- iCloud sync uses end-to-end encryption (CloudKit zero-knowledge)
- No analytics SDK, no telemetry, no third-party SDKs with network access
- App Sandbox, Hardened Runtime, full notarization
- Privacy manifest (PrivacyInfo.xcprivacy)

### No Third-Party Data Sharing
- Financial data never sold, never shared
- No credit card links, no Plaid, no data brokers
- Receipt images stored locally, never sent to cloud for OCR (on-device)
- Accountant access is read-only, opt-in

### Local ML Processing
- All ML (spending predictions, categorization) runs on-device
- No financial data leaves device for ML inference
- ML model trained locally on user's own patterns

### Data Portability
- Full export: all transactions as CSV/JSON
- Export to PDF for record-keeping
- "Download all my data" in settings
- Complete account deletion

### Privacy Labels (App Store)
- Accurate privacy nutrition labels:
  - Financial data: stored locally, not collected by anyone
  - No analytics, no third-party advertising SDK
  - No bank account connections

### Security Audit
- Annual third-party security audit
- Bug bounty at coin.app/security
- Dependency scanning every release
- Reproducible builds

---

## Out of Scope
- Hardware security keys
- Biometric-only unlock (password fallback required)
- Government data requests (respond per law — no voluntary sharing)
