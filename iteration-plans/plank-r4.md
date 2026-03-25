# PLANK — R4: iCloud Sync, Menu Bar Extra

## Goal
Sync sidebar config across devices via iCloud, add Menu Bar Extra for quick access.

---

## Scope

### iCloud Sync
- `NSUbiquitousKeyValueStore` for config sync (lightweight)
- Sync: bookmarks, configs, widget settings, preferences
- NOT sync: notes widget content, hotkeys (device-specific)
- Sync on change, merge on app launch
- Conflict resolution: most recent wins, keep both option

### Sync Status
- Icon indicator in menu bar: synced, syncing, error
- Last sync timestamp in preferences
- Manual sync trigger button
- "iCloud Disabled" state with explanation

### Menu Bar Extra (NSMenuBarExtra)
- `NSMenuBarExtra` for macOS 13+
- Menu displays:
  - Sidebar configs (radio selection)
  - Quick bookmarks (top 5)
  - "New Bookmark" action
  - "Preferences" / "Quit"
- Badge for notification count from pinned apps

### WidgetKit Preparation
- Create widget extension target
- `WidgetBundle` with placeholder widgets
- Configure for Lock Screen widgets (if applicable)
- Widget kinds: Clock, Weather, Notes

### Menu Bar Extra Style
- Icon-only mode: rectangle.split.1x2 SF Symbol
- Icon + text mode: "PLANK" label
- Configurable in preferences

### Multi-Window Support
- Multiple sidebar windows (one per config)
- Open specific config in new window
- Window positions remembered

### Window Memory
- Remember sidebar position per config
- Remember sidebar width per config
- Restore on config switch

---

## Out of Scope (R5+)
- WidgetKit widgets
- Shortcuts
- App Store launch
