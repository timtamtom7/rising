# Zones — R15: iOS Companion App

## Goal
Ship Zones as a native iOS and iPadOS app for zone management and on-the-go switching.

---

## Scope

### iOS App
- Full zone management on iPhone and iPad
- View current zone, switch zones
- Zone history and analytics
- Push notifications for zone events

### iPad Optimization
- Full iPad layout
- Split view: zone list + detail
- Keyboard shortcuts
- External display for zone dashboard

### Apple Watch App
- Watch: current zone at a glance
- Complication: quick zone switch
- Haptic feedback on zone change
- "You're entering Work Zone" notification

### iOS Widgets
- Small widget: current zone name
- Medium widget: current zone + quick switch to 3 zones
- Large widget: full zone dashboard + all zones + automations
- Lock screen widget: current zone
- Interactive widget: switch zone directly

### Siri & Shortcuts
- "Switch to Work Zone" → activate
- "What zone am I in?" → read current
- "Run my Home Zone automations"
- Shortcuts: activate zone, get current zone, list zones

### Location Services
- Background location for automatic zone detection
- Geofence entry/exit notifications
- Bluetooth beacon detection

---

## Out of Scope
- Android companion (separate round)
- GPS tracking history on watch
