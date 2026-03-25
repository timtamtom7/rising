# Volt — R15: iOS & watchOS Companion Apps

## Goal
Ship Volt companion apps for iPhone, iPad, and Apple Watch to monitor Mac battery status from anywhere.

---

## Scope

### iOS App
- View Mac battery status from anywhere (via iCloud sync)
- Battery health, current charge, time remaining
- Power mode: switch between profiles from iPhone
- Push notifications when Mac battery is low or fully charged
- Apple Watch app embedded in iOS app bundle

### iPad Optimization
- Full iPad layout — side-by-side battery status and history
- Keyboard shortcuts for quick mode switching
- External display support for presentation mode status

### Apple Watch App
- Glance: current Mac battery percentage and health
- Complication: battery percentage in watch face
- Tap complication → open detailed view
- Haptic alerts for battery low/fully charged
- Control power mode from watch (quick toggle)

### Home Screen / Lock Screen Widgets
- Small widget: Mac battery percentage
- Medium widget: battery % + health score + time remaining
- Lock screen widget: countdown to fully charged
- Interactive widget: quick toggle power mode

### Notification Enhancements
- Rich notifications with battery percentage inline
- Action buttons: "Open Volt", "Find My Mac"
- Notification scheduling: quiet hours, only critical alerts

### WidgetKit for macOS (desktop widgets)
- macOS 14+ desktop widgets
- Battery dashboard widget on desktop

---

## Out of Scope
- Android companion app (separate roadmap)
- Controlling power settings from iOS (read-only initially)
- Apple TV app
