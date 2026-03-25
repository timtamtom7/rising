# Pulse — R3: Customizable Metrics, Refresh Intervals, Icon Customization

## Goal
Users can choose which stats appear in the menu bar and popover, configure refresh rates, customize the menu bar icon, and switch between compact and wide menu bar display modes.

---

## Scope

### Settings Panel
- Accessible via gear icon in popover header → slides in a sheet
- Settings persisted in `UserDefaults`
- Sections:
  - **Display**: which metrics to show/hide
  - **Refresh Rate**: menu bar update frequency
  - **Menu Bar**: icon style, compact/wide mode
  - **Temperature Unit**: Celsius / Fahrenheit

### Metric Visibility Toggles
- Each stat (CPU, RAM, Disk, Network, Temperature, Battery) has an eye icon toggle
- If a metric is hidden: not shown in popover, not recorded to DB (saves space)
- Minimum one metric must be visible (prevent all-off state)
- Hidden metrics excluded from sparkline graphs

### Refresh Interval Configuration
- Menu bar update: 1s, 2s (default), 5s, 10s
- Popover update: every 500ms while open (always snappy)
- DB sample rate: 15s, 30s, 60s (default), 5min
- Settings UI: segmented control for each rate

### Menu Bar Icon Customization
- Style options:
  - **Text only** (CPU %): "42%"
  - **Icon + text**: `chart.bar.fill` + "42%"
  - **Icon only**: `chart.bar.fill` (dynamic fill based on CPU %)
  - **Minimal**: small `●` dot (color varies by load: green/amber/red)
- Width modes:
  - **Compact**: only CPU % text or icon, ~40pt wide
  - **Wide**: CPU % + RAM bar + temperature (if enabled), ~100pt wide
- Custom SF Symbol picker: user can choose any SF Symbol from a curated list
- Icon color: follows system appearance (adapts to light/dark), or fixed color preference

### Compact vs Wide Mode
- Toggle in settings between Compact and Wide
- Compact mode:
  - Menu bar shows only CPU % (or selected primary metric)
  - Popover shows all enabled stats
- Wide mode:
  - Menu bar shows: CPU % + RAM mini-bar + Temp (if enabled and space allows)
  - Menu bar layout uses `NSStatusBarButton.withVariableWidth`
  - Dynamic sizing based on which metrics are enabled

### Settings UI (SwiftUI Sheet)
- Grouped `List` with `Toggle` rows
- Section headers with `Text` bold styling
- `Picker` rows for refresh rates
- Icon preview at top showing current menu bar style
- "Reset to Defaults" button at bottom

### Persistence
- New `settings` table in SQLite or `UserDefaults` for settings
- `UserDefaults` keys: `metrics.cpu.visible`, `metrics.ram.visible`, etc.
- `UserDefaults` keys: `refresh.menuBar`, `refresh.dbSample`, `ui.iconStyle`, `ui.widthMode`, `ui.tempUnit`

---

## Out of Scope (R4+)
- Historical data export
- Multiple time-range graphs (daily/weekly/monthly)
- Menu Bar Extra API support
- iStat Menus-style categories
- Notifications for threshold crossings
- Shortcuts integration
- iCloud sync
