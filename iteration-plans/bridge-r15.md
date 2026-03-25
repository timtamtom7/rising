# Bridge — R15: iOS Companion App

## Goal
Ship Bridge as a native iOS and iPadOS app for remote device management and control.

---

## Scope

### iOS App
- Full device management on iPhone and iPad
- View connected devices
- Control devices remotely (where applicable)
- Workflow and scene management
- Usage analytics
- Push notifications for device events

### iPad Optimization
- Full iPad layout with device grid
- Split view: device list + detail
- Keyboard shortcuts
- External display for device dashboards

### Apple Watch App
- Watch glance: connected device count
- Complication: quick scene activation
- Haptic feedback for connection events

### iOS Widgets
- Small widget: connected device count
- Medium widget: device list + quick actions
- Large widget: full dashboard + scenes
- Lock screen widget: scene buttons
- Interactive widget: activate scene

### Siri & Shortcuts
- "Connect to my AirPods" → Siri executes
- "Run my Movie Scene" → scene activation
- "Which devices are connected?" → list
- Shortcuts actions: connect device, trigger workflow

### Notifications
- "New device detected on network"
- "AirPods connected"
- "Workflow triggered: [name]"

---

## Out of Scope
- Android companion (separate round)
- Real-time video from cameras
