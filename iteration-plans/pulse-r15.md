# Pulse — R15: iOS & watchOS Companion Apps

## Goal
Deliver native iOS and watchOS companion apps that keep Pulse data at your fingertips and enable Apple Watch as a primary data source.

---

## Scope

### iOS App
- Full Pulse health dashboard on iPhone and iPad
- Heart rate trends, history, insights
- Care Circle management
- Health data synced via Apple HealthKit
- Push notifications for health alerts

### iPad Optimization
- Full iPad layout with large trend charts
- Split View / Stage Manager support
- Keyboard shortcuts for navigation
- External display for presentation (health report to doctor)

### watchOS Standalone App
- Native watchOS app on Apple Watch
- Current heart rate with trend indicator
- Glance: today's resting HR average
- Complication: HR with trend arrow (up/down/stable)
- Haptic alerts for health threshold breaches
- Watch face: heart rate as a data point

### watchOS as Primary Data Source
- Use Watch as the heart rate sensor feeding into Pulse
- Background heart rate measurement every 5 minutes (Watch OS allows this)
- Automatic HRV measurement during sleep (with Watch in sleep mode)

### iOS Widgets
- Small widget: current resting HR
- Medium widget: HR trend chart (24h) + current HR
- Large widget: full dashboard — HR, HRV, sleep HR, insights
- Lock screen widget: current HR + trend
- Interactive widget: view insight detail, open app

### Siri & Shortcuts
- "How's my heart rate?" → Siri reads current HR
- "How's my heart health trend?" → Siri reads weekly summary
- Shortcuts actions: get HR, get weekly summary, get care circle status

---

## Out of Scope
- Android standalone app (separate round)
- Non-Apple Watch integration (Fitbit, etc.)
- ECG data display (Series 4+ only, future consideration)
