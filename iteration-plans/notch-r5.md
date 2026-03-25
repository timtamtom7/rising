# Notch — R5: Widgets, App Store Prep

## Goal
Add Home Screen widgets and prepare Notch for Mac App Store submission.

---

## Scope

### Widgets (WidgetKit)
- Small widget (.systemSmall): current notch bar content snapshot (battery + date or custom)
- Medium widget (.systemMedium): battery %, date, weather temp + condition, next calendar event
- Large widget (.systemLarge): all widget info + current notch bar mode + quick action buttons (toggle mode, start timer)
- App Group (`group.com.bou.notch`) for widget data sharing
- `WidgetCenter.shared.reloadAllTimelines()` on widget data change
- Tap widget → opens Notch main window / Preferences
- Widget refresh: every 15 minutes minimum (system controlled)
- Live Activity-style updates for running timer (when macOS supports it)

### Appearance / Visual Polish
- Notch bar widget icons: consistent 12pt size, matching weight
- Date font: SF Mono or system monospaced, 11pt
- Battery/weather: SF Pro, 11pt
- Smooth transitions when switching between notch apps
- Notch bar background: customizable blur intensity (0-100%)

### App Store Preparation
- App Store Connect entry: name "Notch", subtitle: "Make your MacBook notch useful"
- Full description: highlights notch widgets, notch apps, weather, timer, customizable bar
- Screenshots: 6-8 per locale showing notch bar in action, preferences, widget options
- App preview video: 30-second walkthrough
- Keywords: notch, macbook, menubar, widgets, battery, weather, timer, mac
- Category: Utilities / Personalization
- Pricing: Free with Pro IAP, or $2.99 paid
- Privacy nutrition label: location (weather), calendar (if authorized), no tracking
- Age rating

### Pro Tier (IAP)
- Free: date, battery, weather widgets, 2 notch apps
- Pro ($2.99 one-time or $1.99/year): all notch apps, custom wallpaper, iCloud sync, Shortcuts integration, no ads

### Build, Code Sign & Notarize
- Target: macOS 13.0+
- Universal binary
- Hardened runtime
- Notarize via `xcrun altool`
- Entitlements: `com.apple.security.network.client`, `com.apple.security.personal-information.location`, `com.apple.security.icloud-services` (CloudKit), App Groups

---

## Out of Scope (R6+)
- Post-launch iteration
