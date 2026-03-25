# DUST — R4: Automated Cleanup Rules, Scheduled Scans, Menu Bar Extra

## Goal
Automate cleanup with user-defined rules, background scheduled scans, and Menu Bar Extra for quick status/actions.

---

## Scope

### Automated Cleanup Rules
- `CleanupRule`: name, condition (file age, size, type, name pattern), action (trash, archive, notify)
- Rule builder UI: condition chips + action picker
- Predefined rules:
  - "Old Downloads" (files > 30 days in Downloads)
  - "Large Downloads" (> 500MB, > 7 days old)
  - "Duplicate Screenshots" (screenshot-* naming pattern)
- Rule execution: manual trigger or on-schedule
- Dry-run mode: preview what rules would do

### Scheduled Scans
- `ScanScheduler`: using `DispatchSourceTimer` or background `Process`
- Schedule options: daily, weekly, specific days, monthly
- Time picker for scan start (default: 3 AM when user unlikely active)
- Run on battery: warn or skip if below 20%
- Scan scope: predefined folders or custom selection

### Background Scan Engine
- Background mode: scan runs in app background with `NSBackgroundActivityScheduler`
- Rate-limited I/O to minimize performance impact
- Resume on wake from sleep
- Notification on scan completion with summary

### Menu Bar Extra
- `NSMenuBarExtra` (macOS 13+) with status item
- Menu shows:
  - Quick Scan button
  - Last scan summary: duplicates found, space can be recovered
  - "Clean Up" submenu with top recommendations
  - Recent cleanup sessions
  - Open DUST / Preferences / Quit
- Badge for actionable items count
- Click to open popover with mini dashboard

### Mini Dashboard (Popover)
- Space usage widget: used/free with bar
- Quick stats: duplicates found, old files, large files
- "Run Quick Scan" button
- Top 3 recommendations as action items

### Notification Integration
- "Scan Complete" notification with summary
- "Cleanup Recommended" when rules trigger
- "Space Running Low" system warning passthrough
- Notification click → open relevant section

### Preferences
- Schedule configuration
- Rule management (CRUD)
- Notification toggles
- Menu Bar Extra style: icon only / icon + text

---

## Out of Scope (R5+)
- Widgets (WidgetKit)
- iCloud sync
- Shortcuts integration
- App Store launch prep
