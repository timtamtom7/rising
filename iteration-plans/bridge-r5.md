# Bridge — R5: Widgets, iCloud Sync, Shortcuts Integration

## Goal
Bridge gains Home Screen widgets, iCloud sync for settings and backup metadata, and Apple Shortcuts integration.

---

## Scope

### Widgets (WidgetKit)
- Small widget (widgetFamily: .systemSmall): shows primary device name + battery level
- Medium widget (.systemMedium): primary device info + storage usage bar + last backup time
- Large widget (.systemLarge): top 3 devices with status, mini activity feed
- Widget updates via App Group shared `UserDefaults` (`group.com.bou.bridge`)
- Widget refresh: `WidgetCenter.shared.reloadAllTimelines()` after sync events
- Tap widget → opens Bridge main window to relevant section

### iCloud Sync
- Sync Bridge settings and device registry across Macs via iCloud (`NSUbiquitousKeyValueStore`)
- Sync backup metadata (not the actual backup files): manifest, device list, backup profiles
- Conflict resolution: most recent write wins, notify user of merge
- Use CloudKit for larger data (backup logs, sync history) via `CKContainer`
- Bridge Settings in iCloud panel: enable/disable, see sync status

### Apple Shortcuts Integration
- Expose Bridge actions to Shortcuts app:
  - "Get Device Info" → returns device name, battery, storage
  - "Sync Device Photos" → triggers photo import
  - "Backup Device" → runs selected backup profile
  - "Get Device Battery Level"
  - "List Connected Devices"
- Build as an Intents extension (`BridgeIntents`)
- Supports "Run Shorcut" automation trigger from within Bridge

### Notifications (System)
- System notification on: backup complete, sync complete, new duplicate photos found, device disconnected during sync
- Notification actions: "View Details", "Dismiss"
- Notification preferences per event type in settings

### Activity Dashboard
- Main window gains Activity tab
- Shows real-time sync/backup progress with live byte counter
- Historical sync log with filterable timeline
- Storage usage over time chart (SwiftUI Charts)

---

## Out of Scope (R6+)
- App Store listing
- Launch prep refinements
- Third-party cloud storage support
- Android/device management
