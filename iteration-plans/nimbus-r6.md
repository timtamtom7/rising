# NIMBUS — R6: App Store - Entitlements, Sandbox, Notarization

## Goal
Prepare NIMBUS for App Store distribution: entitlements, sandbox, notarization pipeline.

---

## Scope

### App Sandbox Configuration
- `com.apple.security.app-sandbox` enabled
- `com.apple.security.files.user-selected.read-write` for local Downloads
- `com.apple.security.files.bookmarks.app-scope` for persistent access
- `com.apple.security.network.client` for cloud API access
- `com.apple.security.temporary-exception.files.absolute-path.read-write` for mount points (if needed)

### Hardened Runtime
- `com.apple.security.hardened-runtime` enabled
- Allow JIT: NO
- Allow unsigned executable memory: NO
- Disable library validation: NO

### Notarization
- `xcrun notarytool` submission in CI
- Staple after successful notarization
- Gatekeeper pass for Intel + Apple Silicon

### App Store Connect
- App name: NIMBUS
- Bundle ID: com.nimbus.cloudmounter
- Category: Productivity
- Pricing: Free tier + Premium subscription
- Privacy manifest: `PrivacyInfo.xcprivacy`
- All tracking disclosure (none, privacy-first)

### Build Configurations
- Debug: no sandbox, local signing
- Release: sandbox, hardened runtime
- Store: notarized, distribution signing

### Receipt & StoreKit
- `StoreKit` for premium subscriptions
- `PaymentTransactionObserver` for transaction monitoring
- Grace period for offline use
- Restore purchases

### Premium Subscription
- Subscription IDs: NIMBUS Premium Monthly / Annual
- Free trial: 7 days
- Pricing: $4.99/month, $34.99/year
- Feature gating based on entitlements

---

## Out of Scope (R7+)
- Marketing
- Public launch
