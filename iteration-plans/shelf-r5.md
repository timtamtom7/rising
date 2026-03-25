# Shelf — R5: Shortcuts, AppleScript, Backup & Restore

## Goal
Integrate with macOS Shortcuts app, expose AppleScript commands for automation, and implement configuration backup/restore so users can save and share their Shelf setups.

---

## Scope

### Shortcuts Integration
- Register Shelf actions with the Shortcuts app via `Intents` framework
- Available Shortcuts actions:
  - "Show All Shelf Items" — temporarily reveals all hidden items
  - "Hide Shelf Item" — accepts app name or bundle ID, applies current layout's hide rule
  - "Show Shelf Item" — makes a specific item visible
  - "Switch Shelf Layout" — switches to a named layout
  - "Get Shelf Hidden Count" — returns number of currently hidden items
- Each action is a proper `INIntentDefinition` with parameters and results
- Shortcuts appear in the Shortcuts app under "Apps > Shelf"

### AppleScript Support
- Expose an `NSAppleScript` dictionary interface via `NSAppleEventManager`
- AppleScript commands:
  ```
  tell application "Shelf"
    show all items
    hide item "Slack"
    show item "Slack"
    get hidden count
    switch layout "Work"
    get every menu item
  end tell
  ```
- Implement as an `NSAppleScript` handler in `AppDelegate`
- Use `OSAKit` for full AppleScript dictionary if needed

### Backup Configuration
- Export entire Shelf configuration to a `.shelfbackup` file (JSON)
- Contents: all layouts, all menu items with positions and policies, spacer configuration, settings
- Triggered via menu: File → Export Configuration (or `⌘⇧E`)
- `NSSavePanel` to choose save location
- Backup file is human-readable JSON (can be inspected/edited)

### Restore Configuration
- Import from `.shelfbackup` file via File → Import Configuration (or `⌘⇧I`)
- `NSOpenPanel` to select file
- On import: option to merge with existing or replace entirely
- Merge mode: imports layouts and items that don't conflict, keeps existing
- Replace mode: clears all existing data and imports fresh
- Confirmation dialog before replace

### Shortcut Customization
- All keyboard shortcuts now configurable (moved from R2 hardcoded defaults)
- `⌥⇧S` for "Reveal All Temporarily" (default)
- Shortcuts stored in `UserDefaults` (not DB, since they're app-level preferences)
- Shortcut recorder UI: click to record new key combination, validates for conflicts

### Data Model Updates (SQLite.swift)
- `shortcuts` table: id, action_name, key_combo, modifiers (stored as string like "⌥⇧S")
- No DB changes needed for backup/restore (export reads from existing tables)

---

## Out of Scope (R6+)
- Widgets
- WidgetKit support
- Notifications center integration
