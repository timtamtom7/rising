# DUST — R5: WidgetKit, iCloud Sync, Shortcuts

## Goal
Platform integration: macOS Widgets for desktop visibility, iCloud sync for cross-device rules, Shortcuts actions.

---

## Scope

### WidgetKit Widgets
- Small widget: space recovered today, quick scan button
- Medium widget: top 3 cleanup recommendations, space chart
- Large widget: full dashboard with duplicate/old/large file counts
- Widget refresh: timeline updates after each cleanup session
- Widget configuration: select which folders to monitor
- `WidgetKit` + `WidgetBundle`

### iCloud Sync
- `CloudKit` integration for:
  - Exclusion rules
  - Cleanup rules
  - User preferences
  - NOT scan results (too large)
- `CKContainer.default()` private database
- Sync on rule change, conflict resolution (latest wins)
- Sync status indicator in settings

### Shortcuts Integration
- "Run DUST Scan" action: runs scan on specified folders, returns result summary
- "Clean Up Duplicates" action: automated duplicate cleanup
- "Get Space Recovered" getter: returns total space ever recovered
- "Add Exclusion Rule" action
- Shortcuts app shows DUST actions in gallery

### Widget Configuration App
- `IntentsExtension` for widget configuration
- Select folders to include in widget data
- Choose widget refresh frequency

### CloudKit Dashboard
- Sync status: last sync time, pending changes
- Manual sync trigger
- Conflict resolution UI if needed

### Shortcuts Parameters
- Folder paths as input/output
- Space amounts as numbers
- Boolean for dry-run mode

### Backup & Restore
- Export rules/settings as JSON
- Import from file or iCloud
- Reset to defaults option

---

## Out of Scope (R6+)
- App Store launch prep
- Marketing materials
- Full review cycle
