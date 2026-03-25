# Sash — R15: iOS Companion App

## Goal
Ship Sash as a native iOS and iPadOS app for monitoring sync status, managing shared folders, and accessing files on the go.

---

## Scope

### iOS App
- Monitor sync status from iPhone and iPad
- View shared folders and team activity
- Resolve conflicts from iOS
- Browse files in synced folders (read-only)
- Download files for offline access

### iPad Optimization
- Full iPad layout with sidebar navigation
- Split View: folder list + file browser
- Keyboard shortcuts matching macOS app
- External display for presentations

### File Access
- Open synced files in their native app from Sash
- Share sheet integration: save to synced folder from any app
- Files app integration: Sash folders appear in Files app

### Apple Watch App
- Watch complication: sync status indicator
- Glance: "All synced" or "3 conflicts"
- Tap to open iPhone app for details

### iOS Widgets
- Small widget: sync status (synced / syncing / conflicts)
- Medium widget: recent activity in shared folders
- Large widget: full sync dashboard
- Lock screen widget: sync status
- Interactive widget: resolve conflict directly

### Notifications
- "New file in shared folder" notification
- Conflict alert: "Resolve this conflict"
- "Device offline" alert

### Siri & Shortcuts
- "Check Sash sync status" → Siri reads status
- "Sync a folder" Shortcuts action

---

## Out of Scope
- Full file editing within Sash iOS app
- Android companion (separate round)
