# Notch — R4: Menu Bar Extra, Shortcuts Integration, iCloud Sync

## Goal
Migrate Notch to `NSMenuBarExtra`, add Apple Shortcuts integration, and sync settings across Macs via iCloud.

---

## Scope

### Menu Bar Extra (NSMenuBarExtra)
- Migrate from `NSStatusItem` to `NSMenuBarExtra`
- Menu bar icon: `notch` icon (custom SF Symbol or app icon)
- Large menu:
  - Notch apps submenu: quick toggle each app on/off
  - Mode: Show / Hide / Auto-hide
  - Separator
  - Now in Notch: shows what's currently displayed in notch (e.g., "Timer: 12:34 remaining")
  - Separator
  - Preferences
  - About Notch
  - Quit Notch

### Apple Shortcuts Integration
- Intents extension for Shortcuts app
- Available actions:
  - "Show Notch Bar" / "Hide Notch Bar"
  - "Set Notch Mode" (show/hide/auto)
  - "Toggle Notch App" (specify app by name)
  - "Start Notch Timer"
  - "Stop Notch Timer"
  - "Get Notch Bar Visibility"
  - "Get Weather in Notch"
  - "Get Battery Level in Notch"
- Trigger Shortcuts from within Notch: e.g., Timer finished → run Shortcut

### iCloud Sync
- Sync all settings via `NSUbiquitousKeyValueStore` (small key-value data)
- Synced: widget visibility, notch mode, layout, app order, temperature unit, weather location
- NOT synced: wallpaper images (too large; store path reference only)
- Conflict resolution: most recent write wins, timestamp comparison
- Sync status indicator in Preferences (synced / syncing / offline)
- Uses CloudKit for larger data (layout JSON) via `CKContainer`

### Shortcut for Notch Visibility
- Global hotkey to toggle notch bar: `⌃⇧N` (configurable)
- Hotkey to cycle through notch apps: `⌃⇧→` / `⌃⇧←`
- Hotkey to start/stop timer: `⌃⇧T`

### Preferences Redesign
- NSTabViewController with tabs: Widgets, Notch Apps, Appearance, Sync, Shortcuts, About
- Widgets tab: toggle date/battery/weather, weather settings
- Notch Apps tab: manage notch apps
- Appearance tab: notch mode, height, wallpaper, opacity
- Sync tab: iCloud status, last sync time, force sync button
- Shortcuts tab: global hotkey assignments, Shortcuts integration status

### Notch Bar Context Menu
- Right-click on notch bar: quick menu with common actions
- "Stop Timer" if timer running
- "Refresh Weather"
- "Toggle DND"
- "Open Preferences"

---

## Out of Scope (R5+)
- Widgets
- App Store
