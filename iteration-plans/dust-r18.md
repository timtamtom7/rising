# Dust — R18: Advanced Widgets & Live Activities

## Goal
Expand Dust widgets across macOS and iOS for ambient focus awareness and quick session control.

---

## Scope

### macOS Desktop Widgets (WidgetKit)
- Small widget: focus timer (live countdown)
- Medium widget: today's focus time + goal progress bar + streak
- Large widget: full focus dashboard — timer, stats, blocked apps count, insights
- Interactive widget: start/stop/extend focus directly from widget
- Widget stack: combine timer + stats + streak

### iOS Home Screen Widgets
- Small: focus timer ring
- Medium: focus time + goal progress + break indicator
- Large: full dashboard + insights
- Lock screen widget: focus timer countdown
- Interactive widget: start focus from widget

### iOS Lock Screen Widgets
- Circular gauge: focus progress as ring
- Rectangular: timer + session name
- Inline: "🔒 Focused: 45m remaining"

### Live Activities
- Dynamic Island: live focus timer (macOS doesn't have Dynamic Island — focus on iOS)
- Lock Screen Live Activity: real-time session countdown
- "Focus session ending in 5 minutes" alert
- "Break time" Live Activity

### Break Timer Widget
- Large Pomodoro widget: session + break alternating
- Visual progress through work/break cycle
- Break suggestions widget

### Focus Streak Widget
- Year calendar showing focus days
- Streak counter: current streak + best streak
- Achievement badges for milestones

---

## Out of Scope
- Android widgets
- Windows desktop widgets
- Real-time collaboration via widgets
