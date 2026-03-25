# COIN — R5: WidgetKit, Shortcuts, App Store Launch Prep

## Goal
Platform integration: WidgetKit widgets, Shortcuts actions, and App Store launch preparation.

---

## Scope

### WidgetKit Widgets
- Small widget: security score gauge (circular, colored)
- Medium widget: score + top 2 issues with fix buttons
- Large widget: full mini-dashboard with score, issues count, last scan
- Widget configuration: select which checks to include
- Widget refresh: timeline updates after each scan

### Shortcuts Integration
- "Run Security Audit" action: runs full scan, returns score and issues
- "Get Security Score" getter: returns current score
- "Check [Category]" action: run specific check category
- "Fix Security Issue" action: apply specified fix
- "Get Security Issues" action: returns list of current issues
- App intents via `IntentsExtension`

### iCloud Sync
- `CloudKit` for settings/preferences sync:
  - Scan schedule
  - Notification preferences
  - Ignored issues list
  - NOT audit results (too sensitive, local only)
- Sync status indicator

### Widget Configuration App
- Select which security checks to show in widget
- Choose notification preferences
- Quick actions configuration

### App Sandbox
- `com.apple.security.app-sandbox` entitlement
- `com.apple.security.network.client` for any network checks
- Read-only access to system settings (via helper or sysctl)

### Hardened Runtime & Notarization
- Hardened runtime entitlements
- Notarization pipeline
- Staple tickets

### App Store Connect
- App name: COIN
- Bundle ID: com.coin.securityauditor
- Category: Utilities
- Pricing: Free with Premium
- Privacy manifest
- Screenshots and preview

### Premium Tier ($2.99/month or $19.99/year)
- Unlimited scan history
- Scheduled scans (free: manual only)
- Widgets (free: limited)
- Priority support
- Export audit reports

### Localization
- `Localizable.strings` base
- Languages: EN, ES, FR, DE, JA, ZH-CN

---

## Out of Scope (R6+)
- Public launch
- Marketing
