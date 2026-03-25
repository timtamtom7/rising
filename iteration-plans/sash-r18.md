# Sash — R18: Advanced Widgets & Desktop Integration

## Goal
Expand Sash widgets across macOS and iOS for quick sync monitoring without opening the app.

---

## Scope

### macOS Desktop Widgets (WidgetKit)
- Small widget: sync status indicator (synced / syncing / paused / conflicts)
- Medium widget: recent activity (last 5 changes across all folders)
- Large widget: full sync dashboard — status, conflicts, recent changes, storage
- Interactive widget: pause/resume sync from widget
- Widget stack: combine status + activity widgets

### iOS Home Screen Widgets
- Small: sync status icon + count
- Medium: activity feed (last 3 changes)
- Large: sync dashboard with conflict count
- Lock screen widget: sync status
- Interactive widget: resolve conflict from widget (if 1 conflict)

### Conflict Resolution Widget
- Dedicated widget showing active conflicts
- Tap conflict → quick resolution options (keep local, keep remote, keep both)
- Progress: X of Y conflicts resolved

### Storage Widget
- Storage used per synced folder
- Storage quota warning widget
- "You're using 80% of your sync quota" alert widget

### Widget Gallery
- In-app widget configuration
- Preview all sizes
- Quick-add to Notification Center / desktop / Lock Screen

---

## Out of Scope
- Android widgets
- Windows desktop widgets
- Live Activity (future)
