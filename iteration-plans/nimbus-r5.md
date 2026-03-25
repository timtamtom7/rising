# NIMBUS — R5: WidgetKit, iCloud Sync, App Store Launch Prep

## Goal
WidgetKit widgets, iCloud sync for settings, and App Store launch preparation.

---

## Scope

### WidgetKit Widgets
- Small widget: storage usage per account (donut chart)
- Medium widget: active transfers list with progress
- Large widget: full dashboard with mount status + transfers
- Widget configuration: select which account to show
- `WidgetBundle` with `TimelineProvider`
- Widget intents for configuration

### iCloud Sync
- `CloudKit` for settings and preferences sync:
  - Mount preferences
  - Bandwidth limits
  - Selective sync folders
  - NOT cached files (too large)
- `CKContainer.default()` private database
- Sync on change, conflict resolution (most recent wins)
- Sync status in settings

### Shortcuts App Enhancements
- Full parameter support for all actions
- Folder path as `FilePath` type
- Custom integration via `IntentsExtension`

### App Sandbox Preparation
- `com.apple.security.app-sandbox` entitlement
- `com.apple.security.files.user-selected.read-write` for folder access
- `com.apple.security.network.client` for cloud API calls
- Bookmark scopes for persistent folder access

### Hardened Runtime & Notarization
- Hardened runtime entitlements
- Notarization via `xcrun notarytool`
- Staple ticket

### App Store Connect Setup
- App listing: name (NIMBUS), description, keywords
- Category: Productivity
- Pricing: Free with Premium tier
- Screenshots and app preview
- Privacy manifest

### Premium Tier ($4.99/month or $34.99/year)
- Unlimited accounts (free: 2)
- Encryption at rest
- Priority support
- Advanced sync options

### Localization
- `Localizable.strings` setup
- Initial languages: EN, ES, FR, DE, JA, ZH

---

## Out of Scope (R6+)
- Full public launch
- Marketing campaign
