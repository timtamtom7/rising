# Pulse — R2: Temperature Monitoring, Battery Stats, Detailed Graphs

## Goal
Add CPU temperature monitoring via IOKit, battery stats for Macs with batteries, detailed sparkline graphs in the popover showing the last 24 hours of data, and color-coded warnings for high resource usage.

---

## Scope

### Temperature Monitoring — IOKit
- `TemperatureMonitor` class using IOKit `IOServiceGetMatchingService` + `IORegistryEntryCreateCFProperties`
- Read `TC0P` (CPU die temperature) from `AppleSMC` service
- Fallback: `cpu-thermal` from `sysctl` (`kern.cpu_thermal`)
- If temperature unavailable (desktop Mac, VM): show "N/A" gracefully
- Display: numeric temp in °C/°F (user preference)
- Color coding: green < 70°C, amber 70–90°C, red > 90°C
- Add temperature to popover below CPU section

### Battery Stats
- `BatteryMonitor` using `IOPSCopyPowerSourcesInfo` / `IOPSCopyPowerSourcesList`
- For Macs with batteries:
  - Charge percentage + charging/discharging/full status
  - Time remaining estimate (minutes)
  - Health percentage (max capacity / design capacity)
  - Cycle count
- Desktop Macs: hide battery section entirely
- Display: "Battery: 87% — 3h 12m remaining" or "Not Charging"
- Color coding: red < 20%, amber 20–40%, green > 40%

### 24-Hour Sparkline Graphs
- Each stat (CPU, RAM, Disk, Network) gets a sparkline chart
- Rendered with SwiftUI Charts (`Chart { }` from iOS 16/macOS 13 APIs)
- Data source: SQLite samples from last 24 hours (1440 samples at 1/min)
- Sparkline: 80pt wide, 32pt tall, no axes, just the line
- CPU sparkline: area fill under the line, gradient from accent to transparent
- Network sparkline: two lines (up/down), up in blue, down in purple
- Tappable sparklines → expand to larger historical view in popover

### Color-Coded Warnings
- High CPU (>90% for >30 seconds): amber glow around CPU ring
- High RAM (>90%): amber glow around RAM bar
- High Temperature (>90°C): red glow around temp display
- Low Battery (<20%): red badge on battery section
- Warning state stored in `UserDefaults` to persist across popover close/reopen
- Optional: show a small notification badge on the menu bar icon when any warning is active

### Popover Redesign
- Scroll view to accommodate new sections
- Sections re-ordered: CPU (now with temp inline) → RAM → Battery → Disk → Network
- Sparkline for each stat below the primary display
- "⚠️ High CPU" inline warning badge when threshold exceeded
- Smooth layout animations when data updates

### Data Collection Improvements
- Temperature sampled every 5 seconds (not every 2s — SMC reads are heavier)
- Battery sampled every 30 seconds
- Sample persistence: still every 60 seconds (temperature and battery included)
- New SQLite columns: `temperature_celsius`, `battery_percent`, `battery_is_charging`, `battery_time_remaining`

---

## Out of Scope (R3+)
- Customizable metrics (show/hide sections)
- Multiple refresh intervals
- Menu bar icon customization
- Compact/wide menu bar modes
- Historical data export
