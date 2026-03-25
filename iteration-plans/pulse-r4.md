# Pulse — R4: Historical Data, Multiple Graphs, Menu Bar Extra API, Categories

## Goal
Add historical data export, multi-range graphs (daily/weekly/monthly views), Menu Bar Extra API support for macOS 14+, and iStat Menus-style stat categories with collapsible sections.

---

## Scope

### Menu Bar Extra API (macOS 14+)
- Add `MenuBarExtra` SwiftUI protocol with `@main PulseMenuBarApp` entry point
- Fallback chain: `MenuBarExtra` (macOS 14+) → `NSStatusItem` (macOS 13)
- Compile-time conditional: `#if canImport(AppKit)` + runtime OS version check
- Menu Bar Extra content: compact view with primary metric(s) in a menu (not popover)
- Native `MenuBarExtra` puts content in the menu dropdown — redesign popover to work as a menu
- Menu structure: stats at top → separator → Settings → Quit

### Historical Data Export
- Export formats: CSV, JSON
- CSV: timestamp, cpu_user, cpu_system, cpu_idle, ram_used, ram_total, disk_used, disk_total, network_in, network_out, temp_celsius, battery_percent (one row per sample)
- JSON: array of sample objects with all fields + metadata (app version, export date, machine name)
- Share sheet via `NSSharingServicePicker`
- Time range selector: last 24 hours, last 7 days, last 30 days, all data
- Export triggered from Settings → Export section
- Large export (>7 days): show progress indicator, export on background thread

### Multiple Time-Range Graphs
- Popover gets a "History" tab or a time range picker (24h / 7d / 30d)
- Full-size charts using SwiftUI Charts (not just sparklines):
  - X-axis: time labels
  - Y-axis: percentage or absolute value (auto-scaled)
  - Grid lines: subtle horizontal rules
- CPU chart: stacked area (user + system), idle as background
- RAM chart: single area (used), with total as reference line
- Network chart: dual lines (in blue, out purple), area fill
- Temperature chart: line with threshold bands (green/amber/red zones)
- Battery chart: line with 20% and 100% reference lines
- Interactive: tap and drag to inspect values (iOS-style scrubbing, macOS touchpad)
- Pinch to zoom (trackpad) to change time window

### iStat Menus-Style Categories
- Stat categories in popover, each collapsible:
  - **Processor**: CPU detail (user/system/idle/wired breakdown, per-core if available)
  - **Memory**: RAM detail (active/inactive/wired/compressed/cached breakdown)
  - **Disks**: per-volume breakdown (show each mounted volume, not just aggregate)
  - **Network**: per-interface (en0 Wi-Fi, en1 ethernet, etc.) with individual graphs
  - **Temperature**: each sensor (CPU die, GPU, battery, etc.)
  - **Battery**: charge, health, cycle count, time remaining
- Category header: icon + name + current value, tap to expand/collapse
- Collapsed state: shows category name + primary value inline
- Expanded state: shows full detail + graph

### Data Retention & Storage
- Default retention: 30 days (configurable: 7d, 30d, 90d, forever)
- DB size estimate shown in settings: "Database: 42 MB (30 days)"
- Auto-purge on launch: DELETE FROM samples WHERE timestamp < (now - retention)
- For users who want more history: support 90 days + with optional export

---

## Out of Scope (R5+)
- Notifications for threshold crossings
- Shortcuts integration
- iCloud sync of settings
- WidgetKit widgets
- Accessibility (VoiceOver, Dynamic Type)
- App icon, onboarding, design system
