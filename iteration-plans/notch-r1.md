# Notch — R1: Notch Detection, Menu Bar in Notch, Small Widgets, Menu Bar Entry

## Goal
Notch makes the MacBook notch useful. It detects the notch area, uses the notch space for small widgets (date, battery, weather), and lives in the menu bar.

---

## Scope

### Notch Detection
- Use `NSScreen.visibleFrame` and `NSScreen.frame` to calculate notch dimensions
- On MacBook Pro with notch: notch width ~311pt (M3 Pro/Max), height ~53pt
- Detect on launch and on display reconfiguration (when external display changes)
- If no notch detected: show alert, offer to use as "top bar widget" on non-notch Macs
- Notch safe area: respect system UI, don't overlap with camera indicator light

### Menu Bar in Notch
- Create an `NSWindow` positioned exactly over the notch area
- `window.styleMask = .borderless`, `backgroundColor = .clear`
- `window.level = .floating`
- `window.collectionBehavior = [.canJoinAllSpaces, .stationary, .ignoresCycle]`
- Fill notch with `NSVisualEffectView` (`.hudWindow` material or `.popover`)
- On top of that, display compact widget content
- Handle display notch offset correctly for different MacBook models (check `NSScreen.deviceDescription`)

### Small Notch Widgets
- **Date/Time**: current time (HH:mm), current day (Mon, Tue...)
- **Battery**: percentage + charging indicator icon
- **Weather**: current temperature + condition icon (from wttr.in or Open-Meteo, no API key)
- Compact display, monospaced digits for time
- Auto-refresh: time every minute, battery every 30s, weather every 15 minutes
- Widget layout: icon left, value right, vertically centered in notch

### Menu Bar Entry Point (NSStatusItem)
- `NSStatusItem` with `menubar.star.fill` SF Symbol or custom notch icon
- Right-click menu:
  - Toggle notch bar visibility (show/hide)
  - Widget settings submenu: which widgets to show
  - Preferences
  - About Notch
  - Quit Notch

### Preferences (NSWindow)
- Settings sheet/window (400×300pt):
  - Toggle each widget on/off: Date, Battery, Weather
  - Weather location: city name or auto-detect (CoreLocation)
  - Temperature unit: Celsius / Fahrenheit
  - Notch bar opacity: slider 0.5-1.0
  - Launch at login toggle

### Data Model (UserDefaults)
- `showDate`: Bool
- `showBattery`: Bool
- `showWeather`: Bool
- `weatherLocation`: String
- `temperatureUnit`: String ("C" | "F")
- `notchBarOpacity`: Double
- `isVisible`: Bool
- `weatherData`: cached weather response (JSON, expires after 15 min)

### Weather Service
- Fetch from `wttr.in` (e.g., `https://wttr.in/{city}?format=j1`) — no API key needed
- Parse JSON: `temp_C`, `weatherCode`, `weatherDesc[0].value`
- Map weather code to SF Symbol (sun.max, cloud, cloud.rain, etc.)
- Cache response in UserDefaults with timestamp
- CoreLocation for auto-detect: `CLLocationManager.authorizationStatus`, request when needed

### Build & Run
- Target: macOS 13.0+
- SwiftUI for widget views inside notch window
- AppKit for notch window management
- SPM: None required in R1
- Entitlements: `com.apple.security.network.client` (for weather fetch), `com.apple.security.personal-information.location`
- Zero warnings, clean build

---

## Out of Scope (R2+)
- Multiple notch modes
- Notch wallpaper
- Notch apps (mini tools)
- Resizable notch content
