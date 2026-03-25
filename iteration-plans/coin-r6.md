# COIN — R6: App Store - Entitlements, Sandbox, Notarization

## Goal
Prepare COIN for App Store distribution.

---

## Scope

### App Sandbox Configuration
- `com.apple.security.app-sandbox` enabled
- `com.apple.security.network.client` for update checks
- Minimal file access (no user data files needed)
- Note: some security checks require elevated privileges, may need helper tool

### Helper Tool (SecurityExtension)
- `SMJobBless` helper for privileged operations
- Helper handles: `fdesetup`, `spctl`, `systemsetup`, etc.
- Separately code-signed helper tool
- XPC communication between app and helper

### Hardened Runtime
- `com.apple.security.hardened-runtime` enabled
- Allow JIT: NO
- Allow unsigned executable memory: NO

### Notarization
- `xcrun notarytool` submission
- Staple after success
- Gatekeeper compatibility

### App Store Connect
- App name: COIN — Security Audit
- Bundle ID: com.coin.securityauditor
- Category: Utilities
- Pricing: Free + Premium
- Privacy manifest: `PrivacyInfo.xcprivacy`
- No tracking

### Build Configurations
- Debug: no sandbox, local signing
- Release: sandbox, hardened runtime
- Store: notarized, distribution signing

### StoreKit & Subscriptions
- `StoreKit` for premium
- Subscription IDs: COIN Premium Monthly / Annual
- Free trial: 7 days
- Pricing: $2.99/month, $19.99/year

---

## Out of Scope (R7+)
- Marketing
- Public launch
