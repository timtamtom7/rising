# Pulse — R18: Advanced Widgets & Live Activities

## Goal
Deliver rich widgets for macOS and iOS, including Live Activities for real-time heart rate monitoring.

---

## Scope

### macOS Desktop Widgets (WidgetKit)
- Small widget: current heart rate with trend indicator
- Medium widget: 24-hour HR chart + current HR + resting HR
- Large widget: full dashboard — HR, HRV, sleep HR, weekly insight
- Interactive widget: tap to open insight, mark as acknowledged
- Widget stack: combine HR + trend + insight widgets

### iOS Home Screen Widgets
- Small: current HR + trend arrow
- Medium: HR chart (12h) + resting HR + insight preview
- Large: full health summary with weekly trends
- Accessory (Lock Screen): current HR as a gauge
- Interactive widget: dismiss insight, open care circle

### iOS Lock Screen Widgets
- Circular gauge: HR as a ring
- Rectangular: HR + time since last reading
- Inline: "HR: 72 bpm — resting"

### Live Activities
- Dynamic Island / Lock Screen Live Activity when monitoring is active
- Real-time HR display on supported iPhone models
- "Elevated HR detected" Live Activity alert
- Auto-dismiss when HR returns to normal

### Apple Watch Face Complications
- Multiple watch face complications:
  - Modular: HR + trend
  - Circular: HR as gauge
  - Activity: HR in activity ring style
  - Corner: just HR number
- Configurable color schemes

### Multi-Day Widget
- Weekly overview widget
- Monthly health summary widget
- Year-in-review widget

---

## Out of Scope
- Android widgets
- Third-party watch faces (beyond Apple)
- Non-Apple Health data sources
