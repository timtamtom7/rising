# PLANK — R6: App Store - Entitlements, Sandbox, Notarization

## Goal
Prepare PLANK for App Store distribution.

---

## Scope

### App Sandbox Configuration
- `com.apple.security.app-sandbox` enabled
- `com.apple.security.files.user-selected.read-write` for folder/app selection
- `com.apple.security.files.bookmarks.app-scope` for persistent paths
- `com.apple.security.network.client` for weather API, favicons
- `com.apple.security.automation.apple-events` for app launching

### Hardened Runtime
- `com.apple.security.hardened-runtime` enabled
- Allow JIT: NO
- Allow unsigned executable memory: NO
- Allow Apple Events: YES (for launching apps)

### Notarization
- `xcrun notarytool` submission
- Staple after success
- Gatekeeper compatibility

### App Store Connect
- App name: PLANK — Dock Sidebar
- Bundle ID: com.plank.sidebar
- Category: Productivity
- Pricing: Free + Premium
- Privacy manifest
- No tracking disclosure

### Build Configurations
- Debug: no sandbox, local signing
- Release: sandbox, hardened runtime
- Store: notarized, distribution signing

### StoreKit & Subscriptions
- `StoreKit` for premium
- Subscription IDs: PLANK Premium Monthly / Annual
- Free trial: 7 days
- Pricing: $2.99/month, $19.99/year

### Widget Extension Signing
- Widget extension separately code-signed
- App Groups for data sharing

---

## Out of Scope (R7+)
- Marketing
- Public launch
