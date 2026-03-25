# ZONES — R5: Widgets, iCloud Sync, App Store Prep

## Overview
R5 adds widgets for Notification Center, iCloud sync for settings, and prepares for App Store submission.

## New Functionality

### Z24: Widgets
- WidgetKit extension: `ZONESWidgets`
- Widget families: `.systemSmall`, `.systemMedium`, `.accessoryCircular`, `.accessoryRectangular`
- Small widget: 2-3 major time zones with current time
- Medium widget: 4-6 zones with times and DST indicators
- Circular accessory: local time only
- Rectangular accessory: local + 1 other zone
- Configurable widget: choose which zones to show
- Widget timeline: refresh every 15 minutes
- Deep link: `zonesds://open/{cityId}`
- Widget configuration: select cities to display

### Z25: iCloud Sync
- Sync city list, settings, and preferences via CloudKit
- `CKContainer.default()` private database
- Record types: `City`, `Settings`, `Event`
- Automatic sync on change (via `NSUbiquitousKeyValueStore` for simple, CloudKit for complex)
- Conflict resolution: last-write-wins with timestamp
- Sync status indicator in Settings
- Enable/disable iCloud sync toggle
- Sync across Mac and iOS (ZONES iOS app future)

### Z26: Shortcuts Integration
- `GetCurrentTime` intent: returns current time in specified zone
- `ConvertTime` intent: convert time between zones
- `AddCity` intent: add city by name
- `ListUpcomingDST` intent: list upcoming DST changes
- Parameters: city name, timezone identifier
- Results: formatted time string
- Donate intents contextually

### Z27: Notifications Center Widget Configuration
- iOS 17 / macOS 14+ widget configuration
- Inline picker for city selection in widget gallery
- "Lock Screen" widgets showing time

### Z28: App Store Readiness — Entitlements
- `ZONES.entitlements`:
  ```xml
  <key>com.apple.security.app-sandbox</key>
  <true/>
  <key>com.apple.security.network.client</key>
  <true/>
  <key>com.apple.security.keychain-access-groups</key>
  <array><string>$(AppIdentifierPrefix)com.zones.app</string></array>
  <key>com.apple.security.application-groups</key>
  <array><string>group.com.zones.app</string></array>
  <key>com.apple.developer.icloud-container-identifiers</key>
  <array><string>iCloud.com.zones.app</string></array>
  <key>com.apple.developer.icloud-services</key>
  <array><string>CloudKit</string></array>
  ```
- Hardened Runtime for notarization

### Z29: App Store Content
- Pricing: Free (with Pro IAP for widgets, iCloud sync, alarms)
- Pro features:
  - Widgets (multiple zones)
  - iCloud sync
  - Unlimited alarms
  - Meeting planner advanced
  - Custom themes
- Screenshots: popover, world map, meeting planner, settings
- Marketing: `zones.app`
- Privacy policy

### Z30: Performance & Polish
- Launch time: < 0.5 seconds cold start
- Memory: < 50MB
- CPU: < 1% during idle
- Popover open time: < 100ms
- Smooth animations (60fps)
- Accessibility: VoiceOver labels on all elements

## Widget UI Examples
```
Small Widget:
┌─────────────────────┐
│  ZONES              │
│  ─────────────────  │
│  LA    9:05 AM     │
│  NY   12:05 PM     │
│  LDN   5:05 PM     │
└─────────────────────┘

Circular Accessory:
┌─────────┐
│  ZONES  │
│   9:05  │
│   AM    │
└─────────┘
```

## File Structure Additions
```
ZONES/
├── ZONESWidgets/
│   ├── ZONESWidgetsBundle.swift
│   ├── TimeZoneWidget.swift
│   ├── WorldClockWidget.swift
│   └── WidgetTimelineProvider.swift
├── Services/
│   ├── iCloudSyncService.swift
│   └── WidgetRefreshService.swift
├── Views/
│   ├── WidgetConfigView.swift
│   └── ICloudSyncSettingsView.swift
├── Intents/
│   ├── GetCurrentTimeIntent.swift
│   ├── ConvertTimeIntent.swift
│   └── IntentHandler.swift
└── Resources/
    └── ZONES.entitlements
```

## Success Criteria
- [ ] Widget appears in Notification Center
- [ ] Widget shows correct times
- [ ] Widget configuration allows city selection
- [ ] iCloud sync syncs city list
- [ ] iCloud sync syncs settings
- [ ] Shortcuts app shows ZONES actions
- [ ] Shortcuts actions work correctly
- [ ] App builds with sandbox and hardened runtime
- [ ] Launch time under 0.5 seconds
- [ ] Memory usage under 50MB
