# Notch — R3: Notch Apps, Customizable Notch Bar

## Goal
Notch becomes a platform for small "notch apps" — mini tools that live in the notch bar — and a fully customizable notch experience.

---

## Scope

### Notch Apps (Plugin Architecture)
- Notch apps are small SwiftUI views registered with the main Notch app
- Interface: `NotchApp` protocol with `id`, `name`, `icon`, `content: some View`
- Built-in notch apps:
  - **Clock**: large time display, world clock for another timezone
  - **Timer**: countdown timer, tap to start/stop, shown in notch
  - **System Monitor**: CPU%, RAM usage (using `host_statistics64`)
  - **Calendar**: next upcoming event from EventKit (if authorized)
  - **Do Not Disturb**: toggle DND, show status icon
  - **AirPods**: show connected AirPods name and battery
  - **Media**: current track name (from MediaRemote), play/pause button
- Notch app store: future plan, not in R3

### Notch App Manager
- Preferences panel: list of available notch apps, toggle each on/off
- Drag to reorder notch apps in the bar
- Max 5 notch apps visible at once (overflow → swipe/arrow to scroll)
- Notch app settings: each app can have its own settings (e.g., world clock city)

### Customizable Notch Bar Layout
- Drag-and-drop arrangement of widgets and notch apps
- Fine-grained layout: left, center, right alignment zones
- "Freeform" mode: drag items to exact pixel positions within notch
- Reset to default layout button
- Import/export layout as JSON

### Calendar Notch App
- Request EventKit authorization
- Show next event name + time in notch
- Tap to show event details in popup
- All-day events shown differently (no time, just name)
- Multiple calendar support

### System Monitor Notch App
- CPU usage: `host_processor_info` → average user + system + idle
- RAM usage: `host_statistics64` → active + inactive + wired
- Display as percentage or mini bar
- Update every 5 seconds
- Click to show detailed activity monitor popup

### Timer Notch App
- Set timer duration (5min, 15min, 30min, custom)
- Timer counts down in notch
- Alarm notification when done
- Timer presets saved in UserDefaults

### Preferences — Notch Apps Tab
- List of all notch apps with toggle
- Reorder via drag
- Click to configure individual app
- "+" to add custom URL scheme-based notch app (launch URL in notch)

### Data Model (UserDefaults + SQLite if needed)
- `notchApps`: Array of enabled app IDs
- `notchLayout`: JSON blob of layout configuration
- Per-app settings stored under `notchApp.{id}.settings`

---

## Out of Scope (R4+)
- Menu Bar Extra
- Shortcuts integration
- iCloud sync
