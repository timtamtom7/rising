# DUST — R6: App Store - Entitlements, Sandbox, Notarization

## Goal
Prepare DUST for App Store distribution: enable hardened runtime, configure sandbox, prepare for notarization.

---

## Scope

### App Sandbox Configuration
- `com.apple.security.app-sandbox` entitlement
- `com.apple.security.files.user-selected.read-write` for folder access
- `com.apple.security.files.bookmarks.app-scope` for bookmarking selected folders
- `com.apple.security.network.client` if any network features (unlikely)
- Disable sandbox for local-only builds during dev

### Hardened Runtime
- `com.apple.security.hardened-runtime` entitlement
- `com.apple.security.cs.allow-unsigned-executable-memory` = false
- `com.apple.security.cs.disable-library-validation` = false (default)

### Notarization Pipeline
- `xcrun notarytool` setup in build script
- Staple tickets after notarization
- Gatekeeper compatibility check

### App Store Connect Setup
- App Store listing: name, description, keywords, screenshots
- Category: Utilities
- Pricing: Free with Premium upgrade
- Age rating: 4+
- Privacy manifest: `PrivacyInfo.xcprivacy`

### Receipt Validation
- For premium features, validate App Store receipt
- `StoreKit` for premium upgrades
- `PaymentTransactionObserver` for transaction handling

### App Preview & Screenshots
- 6 screenshots for App Store listing
- App preview video (30 sec, no audio required)
- Dark/light mode variants

### EULA & Legal
- Standard EULA
- Privacy policy URL
- Terms of service

### Build Configuration
- Separate Debug/Release/Store configurations
- Code signing for Development/Distribution
- Provisioning profile setup

---

## Out of Scope (R7+)
- Marketing push
- Review response strategy
- Customer support setup
