# Pulse — R6: WidgetKit Widgets (Small, Medium, Large), Notification Center

## Goal
Add macOS WidgetKit widgets — small, medium, and large — for placement on the desktop and in Notification Center. Widgets show real-time stats pulled from the shared app group.

---

## Scope

### WidgetKit Setup
- New widget extension target: `PulseWidgets`
- App Group: `group.com.pulse.app` — shared container for widget data
- Widget data written to shared UserDefaults at each sample interval (every 60s)
- Widget timeline: `TimelineProvider` with `.atEnd` policy, refresh every 15 minutes minimum
- Force refresh: use `WidgetCenter.shared.reloadAllTimelines()` when stats change significantly

### Small Widget (158×158pt)
- Single stat display: CPU percentage (default) or user-selected primary metric
- Circular progress ring matching the popover's design
- Metric name label below the ring
- Background: system material (blurred, matches desktop)
- Configurable: user picks which stat to show (CPU, RAM, Disk, Temperature, Battery)
- Tap → opens Pulse app

### Medium Widget (338×158pt)
- 2–3 stats side by side: CPU + RAM + Disk (or user-selected subset)
- Compact representation: percentage + mini progress bar for each
- No sparklines in medium (too small)
- Configurable: which 2–3 metrics to display
- Option for: "Last updated: 2 min ago" footer

### Large Widget (338×354pt)
- 4–5 stats in a grid: CPU, RAM, Disk, Network, Temperature
- Each stat: icon + name + value + small sparkline (last 1 hour)
- Similar visual language to the popover
- Battery stat on its own row if applicable
- Tap stat → opens Pulse app directly to that section

### Notification Center Widget
- On macOS, Notification Center widgets use the same WidgetKit framework
- Placeholder: generic stat icons
- Timeline updates work the same way as desktop widgets

### Widget Configuration Intent
- `ConfigurationAppIntent` for SwiftUI widget configuration (macOS 14+)
- Users can long-press widget to configure:
  - Which metrics to show
  - Temperature unit
  - Refresh preference (but respecting WidgetKit limits)
- Store config in shared `UserDefaults` app group

### Shared Data Architecture
- App writes to `UserDefaults(suiteName: "group.com.pulse.app")`
- Keys: `currentCPU`, `currentRAM`, `currentDisk`, `currentNetwork`, `currentTemp`, `currentBattery`, `lastUpdated`
- Widget extension reads from same shared UserDefaults
- Data format: JSON-encoded stat values for efficiency

### Widget UI
- Use SwiftUI exclusively (required by WidgetKit)
- Match popover visual design: same colors, same typography, same iconography
- Dark/light mode: use `Color("AccentColor")` and system colors — adapts automatically
- Use `.containerBackground` for proper widget material (macOS 14+)

---

## Out of Scope (R7+)
- Accessibility (VoiceOver labels for widgets)
- Dynamic Type in widgets
- App icon, onboarding, design system
- App Store metadata, screenshots, Setapp packaging
