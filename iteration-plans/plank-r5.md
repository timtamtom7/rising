# PLANK — R5: WidgetKit, Shortcuts, App Store Launch Prep

## Goal
WidgetKit widgets, Shortcuts integration, App Store preparation.

---

## Scope

### WidgetKit Widgets
- **Small widget**: Clock (time + date)
- **Medium widget**: Weather (current temp + icon + location)
- **Large widget**: Mini dashboard (weather + calendar + notes preview)
- **Lock Screen widget** (if supported): Quick bookmark launcher (1-4 items)
- `TimelineProvider` for each widget kind
- Widget configuration: select bookmark set or widget组合

### Widget Extension
- Separate `PlankWidgets` extension target
- Shared `App Group` for data: `group.com.plank.shared`
- `UserDefaults(suiteName:)` for widget data access

### Shortcuts Integration
- "Toggle Plank Sidebar" action
- "Open Bookmark" action: specify bookmark by name or ID
- "Open Config [Name]" action
- "Get Bookmarks" action: returns list
- "Add Bookmark" action
- App Intents framework

### App Sandbox
- `com.apple.security.app-sandbox` entitlement
- `com.apple.security.files.user-selected.read-write` for folder/bookmark selection
- `com.apple.security.files.bookmarks.app-scope` for persistent access
- `com.apple.security.network.client` if weather API requires

### Hardened Runtime & Notarization
- Hardened runtime entitlements
- Notarization pipeline
- Staple tickets

### App Store Connect
- App name: PLANK
- Bundle ID: com.plank.sidebar
- Category: Productivity
- Pricing: Free with Premium
- Privacy manifest: `PrivacyInfo.xcprivacy`
- Location usage disclosure (for weather widget)

### Premium Tier ($2.99/month or $19.99/year)
- Unlimited configs (free: 3)
- Widgets (free: basic only)
- iCloud sync (free: single device)
- Custom hotkeys (free: limited)
- Priority support

### Localization
- `Localizable.strings` base
- Languages: EN, ES, FR, DE, JA, ZH-CN

---

## Out of Scope (R6+)
- Public launch
- Marketing
