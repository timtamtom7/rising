# FOLIO — R5: Widgets, iCloud Sync, Shortcuts, App Store Prep

## Overview
R5 focuses on widgets for Notification Center and Home Screen (macOS Sonoma+), iCloud sync for cross-device continuity, Shortcuts integration, and App Store readiness.

## New Functionality

### F21: Widgets
- WidgetKit extension: `FOLIOWidgets`
- Widget families: `.systemSmall`, `.systemMedium`, `.accessoryCircular`, `.accessoryRectangular`
- Small widget: unread count + feed favicons
- Medium widget: top 3 unread article titles with feed names
- Circular accessory: unread count badge (for Notification Center)
- Rectangular accessory: "FOLIO • X unread articles"
- Widget timeline: refresh every 15 minutes via `TimelineProvider`
- Widget deep link: `foliords://article/{id}`
- Configurable widget: choose which feeds/categories to show
- Widget preview in Settings

### F22: iCloud Sync
- `File > Sync with iCloud` (or automatic via `NSUbiquitousKeyValueStore`)
- Sync data: feeds, categories, read/unread state, favorites, annotations (NOT article content)
- Use `CKContainer` CloudKit for structured data sync:
  - `CKRecord` for `Feed`, `Category`, `Annotation`
  - `CKRecord` for `ReadState` (articleId + isRead + readAt)
- Conflict resolution: latest-wins with timestamp
- Sync indicator in toolbar
- Per-device sync log in Settings
- Enable/disable iCloud sync in Settings

### F23: Shortcuts Integration
- Expose FOLIO actions to Shortcuts app via `Intents` framework
- Available actions:
  - `GetUnreadArticles` → list of articles
  - `MarkArticleRead` / `MarkArticleUnread`
  - `AddFeed` (requires URL parameter)
  - `RefreshFeeds`
  - `GetFavorites`
  - `SearchArticles` (requires query parameter)
- Parameters: number of articles, feed filter, sort order
- Results: article title, URL, feed name
- "Add to FOLIO" Shortcuts action for incoming URLs
- Donate intents when using FOLIO actions contextually

### F24: App Store Readiness — Entitlements
- `FOLIO.entitlements`:
  ```xml
  <key>com.apple.security.app-sandbox</key>
  <true/>
  <key>com.apple.security.network.client</key>
  <true/>
  <key>com.apple.security.files.user-selected.read-write</key>
  <true/>
  <key>com.apple.security.keychain-access-groups</key>
  <array><string>$(AppIdentifierPrefix)com.folio.reader</string></array>
  <key>com.apple.security.application-groups</key>
  <array><string>group.com.folio.reader</string></array>
  <key>com.apple.developer.icloud-container-identifiers</key>
  <array><string>iCloud.com.folio.reader</string></array>
  <key>com.apple.developer.icloud-services</key>
  <array><string>CloudKit</string></array>
  ```
- Hardened Runtime enabled (for notarization)
- Code signing: Developer ID for direct distribution, or Apple Developer account for App Store

### F25: App Store Readiness — Polish
- `App Store Connect` metadata: description, keywords, screenshots, privacy policy URL
- Pricing: Free (with IAP for Pro features: annotations, cloud sync)
- Age rating: 4+
- Categories: News, Productivity
- In-app purchase: `FOLIO Pro` subscription or one-time upgrade
- Pro features: annotations, Obsidian sync, cloud backup, priority support
- Ratings prompt: after 10 sessions, ask once per 90 days
- Deep link from App Store: `itms-apps://apps.apple.com/app/idXXXXXXXXX`

### F26: Export/Backup
- `File > Export All Data...` → ZIP with:
  - `feeds.json`
  - `articles.json` (metadata only, not full content)
  - `annotations.json`
  - `settings.json`
  - `opml/export.opml`
- Import from backup: `File > Import Backup...`
- Auto-backup to `~/Library/Application Support/FOLIO/backups/` (last 5)

### F27: Performance Optimizations
- Article content lazy loading (load summary, fetch full on demand)
- Image thumbnail generation on import (not on-demand)
- SQLite WAL mode for concurrent reads
- Background feed refresh via `BGAppRefreshTask`
- Memory pressure handling: purge image cache
- Launch time optimization: defer non-essential initialization

## File Structure Additions
```
FOLIO/
├── FOLIOWidgets/
│   ├── FOLIOWidgets.swift
│   ├── FOLIOWidgetsBundle.swift
│   ├── UnreadCountWidget.swift
│   ├── TopArticlesWidget.swift
│   └── WidgetTimelineProvider.swift
├── Services/
│   ├── iCloudSyncService.swift
│   ├── CloudKitManager.swift
│   ├── BackupService.swift
│   └── BackgroundRefreshService.swift
├── Intents/
│   ├── GetUnreadArticlesIntent.swift
│   ├── MarkArticleReadIntent.swift
│   ├── AddFeedIntent.swift
│   └── IntentHandler.swift
├── Views/
│   ├── WidgetConfigView.swift
│   └── ICloudSyncSettingsView.swift
└── Resources/
    ├── FOLIO.entitlements
    └── FOLIO.entitlements.development
```

## App Store Listing Content
```json
{
  "name": "FOLIO",
  "subtitle": "RSS Reader for Power Users",
  "description": "FOLIO is a native macOS RSS reader with support for Feedbin, Feedly, annotations, and iCloud sync. Read the web on your terms.",
  "keywords": ["rss", "reader", "news", "feedbin", "feedly", "atom"],
  "screenshots": {
    "mac": ["screenshot1.png", "screenshot2.png", "screenshot3.png"]
  },
  "privacy_policy_url": "https://folio.app/privacy",
  "support_url": "https://folio.app/support"
}
```

## Success Criteria
- [ ] Widget appears in Notification Center / Home Screen
- [ ] Widget shows correct unread count and articles
- [ ] Tapping widget opens FOLIO to correct article
- [ ] iCloud sync works between two Macs
- [ ] Shortcuts app shows FOLIO actions
- [ ] Shortcuts actions execute correctly
- [ ] App builds with App Sandbox and Hardened Runtime
- [ ] Auto-backup runs daily
- [ ] Launch time under 2 seconds
- [ ] Memory usage under 150MB with 1000 articles cached
