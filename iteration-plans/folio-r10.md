# FOLIO — R10: Professional Tier, Enterprise, Final Polish

## Overview
R10 is the App Store launch milestone with a Professional tier, enterprise features, accessibility audit, and final polish across all areas.

## New Functionality

### F53: FOLIO Professional Tier
- In-App Purchase: "FOLIO Pro" subscription ($4.99/month or $39.99/year)
- Pro features (from previous iterations):
  - AI Summaries (R9)
  - Predictive Fetching (R9)
  - Team Workspaces (R8)
  - ActivityPub Federation (R8)
  - Plugin System (R7)
  - iCloud Sync (R5)
  - Cloud Backup (R5)
  - Multiple Accounts (R3)
  - Custom Shortcuts (R5)
- Free tier: unlimited local feeds, 5 accounts, basic sync
- Paywall UI: Pro badge, upgrade prompt
- Subscription management via StoreKit 2
- Restore purchases option

### F54: Enterprise Features
- Managed App Configuration (MDM)
- `com.apple.configuration.managed` for:
  - Default feeds list
  - Default categories
  - Sync settings (forced iCloud)
  - Read-only feed list (prevent adding/removing feeds)
- Organization dashboard: `enterprise.folio.app`
  - Deploy default configurations
  - View anonymized usage statistics
  - Push feed lists to teams
- Single Sign-On (SSO) via SAML 2.0
- Corporate Managed Apple ID support

### F55: API for Third-Party Developers
- REST API: `api.folio.app/v1/`
- Endpoints:
  - `GET /articles` — paginated article list
  - `GET /articles/{id}`
  - `POST /feeds` — add feed
  - `GET /feeds`
  - `PUT /articles/{id}/read`
  - `GET /analytics`
- API key management in Settings
- OAuth 2.0 for user-facing apps
- Rate limiting: 100 requests/minute
- API docs: `developers.folio.app`

### F56: Browser Extension (Safari)
- Safari Web Extension target: `FOLIO Safari Extension`
- Features:
  - Subscribe button in Safari toolbar
  - "Save to FOLIO" context menu
  - Auto-discover feeds on current page
- Extension manifest V3
- Communication with FOLIO via native messaging
- App Group: `group.com.folio.reader`

### F57: Command Line Interface
- `folio` CLI tool (bundled in.app/Contents/MacOS/)
- Commands:
  ```
  folio add <url>              Add a feed
  folio list                   List all feeds
  folio refresh [feed-id]      Refresh feeds
  folio read <article-id>      Mark article as read
  folio export                 Export OPML
  folio search <query>         Search articles
  folio serve                  Start web UI (future)
  ```
- Interactive REPL mode: `folio shell`
- Shell completions for zsh/bash

### F58: Final Accessibility Audit
- Full WCAG 2.1 AA compliance review
- Accessibility Audit instrument test
- Fix all VoiceOver issues (announcements, labels, actions)
- Minimum touch target: 44x44pt
- Color contrast: 4.5:1 minimum
- Focus indicators visible in all themes
- Reduce Transparency effects (Accessibility setting)
- Motion sensitivity (Honor system setting)

### F59: Performance Audit & Polish
- Instruments profiling: memory, CPU, disk, network
- Launch time: < 1.5 seconds cold start
- Memory footprint: < 100MB with 500 articles
- Scrolling: 60fps in article list
- Feed refresh: 100 feeds in < 30 seconds
- App size: < 50MB (without models)
- Crash-free rate: > 99.5%
- Battery impact: minimal (efficient background tasks)

### F60: App Store Submission Package
- `StoreKit` screenshots (retina, various window sizes)
- App preview video (30 seconds)
- Localized descriptions (English + 5 languages initially)
- Marketing website: `folio.app`
- Privacy nutrition label (App Store Connect)
- Export Compliance documentation
- Pre-release TestFlight beta (100+ testers)
- Crash reporting via App Store Connect

## Enterprise Configuration Schema
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>DefaultFeeds</key>
    <array>
        <string>https://example.com/feed.xml</string>
    </array>
    <key>AllowedCategories</key>
    <array>
        <string>Engineering</string>
        <string>Design</string>
    </array>
    <key>ForceiCloudSync</key>
    <true/>
    <key>ReadOnlyMode</key>
    <false/>
    <key>OrganizationName</key>
    <string>Acme Corp</string>
</dict>
</plist>
```

## File Structure Final Additions
```
FOLIO/
├── FOLIOAPI/
│   ├── APIServer.swift           (Rocket-based REST server)
│   ├── APIRoutes.swift
│   ├── APIAuthentication.swift
│   └── APIRateLimiter.swift
├── FOLIOSafariExtension/
│   ├── SafariWebExtensionHandler.swift
│   ├── Resources/
│   │   ├── manifest.json
│   │   ├── background.js
│   │   ├── content.js
│   │   └── popup/
│   └── Info.plist
├── CLI/
│   ├── main.swift
│   ├── FOLIOCLI.swift
│   └── ShellCompletions.swift
├── Views/
│   ├── ProUpgradeView.swift
│   ├── EnterpriseConfigView.swift
│   └── APIDocsView.swift
└── Resources/
    ├── Localizable.xcstrings     (10 languages)
    └── AccessibilityAuditReport.pdf
```

## Success Criteria
- [ ] App Store listing submitted and approved
- [ ] All Pro features behind paywall
- [ ] Restore purchases works
- [ ] MDM configuration applies correctly
- [ ] API returns correct responses
- [ ] Safari extension installs and works
- [ ] CLI commands execute correctly
- [ ] WCAG 2.1 AA compliance achieved
- [ ] Launch time under 1.5 seconds
- [ ] 0 accessibility violations in audit
- [ ] TestFlight beta has 100+ active testers
- [ ] Crash-free rate above 99.5%
