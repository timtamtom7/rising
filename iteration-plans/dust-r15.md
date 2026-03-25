# Dust — R15: iOS Companion App

## Goal
Ship Dust as a native iOS and iPadOS app for focus management on the go, with Apple Watch support.

---

## Scope

### iOS App
- Start/stop focus sessions from iPhone and iPad
- View focus statistics and history
- Manage blocklists
- Receive distraction alerts and take breaks
- Apple Health integration (focus + HR correlation)

### iPad Optimization
- Full iPad layout with split view
- Keyboard shortcuts for start/stop focus
- Stage Manager support
- External display for focus timer display

### Apple Watch App
- Start/stop focus from watch
- Glance: current session status + remaining time
- Complication: focus timer (circular)
- Haptic nudges for break reminders
- Watch face complications

### iOS Widgets
- Small widget: current focus session + timer
- Medium widget: today's focus time + goal progress + streak
- Large widget: full focus dashboard — stats, blocked apps, insights
- Lock screen widget: focus timer countdown
- Interactive widget: start/stop focus directly

### Focus Mode Integration
- Dust registers as a Focus filter (macOS Ventura+)
- When Focus activates, Dust auto-starts appropriate session
- Dust can appear as a Focus mode option

### Notifications
- "Time for a break" notification
- "Daily focus goal reached!" celebration
- "Your focus streak is at risk" reminder
- "Distraction blocked" notification

### Siri & Shortcuts
- "Start a focus session" → opens Dust to session start
- "How long have I been focused?" → Siri reads current session
- "Start Deep Work focus" → named session start

---

## Out of Scope
- Android companion (separate round)
- Controlling another user's focus
