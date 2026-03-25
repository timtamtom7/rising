# Volt — R4: Time Estimates, Export, Menu Bar Extra Stats

## Goal
Add time-to-full/empty estimates, CSV/JSON export of charge history, and an expanded menu bar display showing battery cycles, health %, and temperature.

---

## Scope

### Time to Full / Empty Estimate
- Calculate based on recent charge rate (mW or % per minute)
- Track last 5 minutes of charge/discharge rate
- Formula: `minutes_to_full = (100 - currentCharge) / chargeRatePerMinute`
- If charging: show "~2h 15m to full" in popover and optionally in menu bar
- If discharging: show "~4h 30m remaining" (based on current discharge rate)
- If at limit and charging: "Paused — limit reached"
- Show as secondary text below the main charge % in the popover
- Recalculate every battery poll

### Menu Bar Extra Stats
- Expand popover to optionally show a compact stats row:
  - Cycles: `CyC0` SMC key (cycle count)
  - Health %: (maxCapacity / designCapacity) * 100, shown as `Health: 92%`
  - Temperature: `TB0T` or `TB1T` SMC key, converted to °C/°F (user preference)
- Toggle in Preferences: "Show extra stats in popover" (default on)
- Temperature shown in menu bar tooltip on hover

### Charge History Export
- "Export History..." button in History tab
- Export formats: CSV, JSON
- Date range picker: last 7 days, 30 days, all time
- CSV columns: timestamp, charge_percent, is_charging, is_plugged_in, profile_name
- JSON export: array of objects with same fields
- Use `NSSavePanel` to pick save location
- Show confirmation notification on successful export

### History Data Enhancements
- `charge_history` table add column: `profile_name TEXT` (snapshot of active profile at time of log)
- `charge_history` table add column: `charge_limit INTEGER` (snapshot of limit at time of log)
- Auto-prune: delete entries older than 30 days on each new insert (keep DB size bounded)

### UI: Popover Layout Update
- Three-segment `SegmentedControl` at top: "Control", "History", "Stats"
- Control: limit slider + toggle (from R1/R2)
- History: chart + export button + date range picker
- Stats: cycles, health, temperature, time estimates in a clean list layout
- Keyboard-navigable with Tab order

### Widget-like Glance (Menu Bar Only)
- Optional compact mode toggle in Preferences
- When enabled, popover is replaced by a small `NSPanel` (200×80pt) showing:
  - Large charge % (center)
  - Small: "Health: 92% | 47°C | 312 cycles" (bottom row)
  - Limit status: "Limit: 80%" or "No limit"
- `NSPanel` with `.nonactivatingPanel` behavior so it doesn't steal focus

### Build & Run
- Target: macOS 13.0+
- No new dependencies (all SMC, Charts, SQLite already in place)
- Test: export CSV, open in Numbers, verify data integrity

---

## Out of Scope (R5+)
- iCloud sync
- Siri Shortcuts
- Menu Bar Extra (WidgetKit)
- Widgets
