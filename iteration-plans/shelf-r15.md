# Shelf — R15: iOS Companion App

## Goal
Ship Shelf as a native iOS and iPadOS app for accessing and managing your shelf from iPhone and iPad.

---

## Scope

### iOS App Features
- Full shelf access from iPhone and iPad
- Browse shelves, view items, open items in their native app
- Recently accessed items
- ML suggestions on iOS based on cross-device patterns
- Background sync via iCloud

### iPad Optimization
- Sidebar navigation (Split View)
- Keyboard shortcuts matching macOS app
- Trackpad/mouse support
- External display support for presentations
- Stage Manager support

### Apple Watch App
- Watch complication: quick access to recent shelf items
- Tap to open item on paired iPhone
- Haptic feedback for item access
- "Suggested app" complication based on time/context

### iOS Widgets
- Small widget: recent item
- Medium widget: 3 recent items with app icons
- Large widget: full recent list + suggestions
- Lock screen widget: recent item name
- Interactive widget: open item directly

### Notifications
- Notify when shared shelf gets new items (team feature)
- Reminder to add item to shelf (contextual)
- "You've been mentioned in a comment" notification

### Siri & Shortcuts
- Siri suggestions: "Open your Shelf"
- "Add [item] to Shelf" intent
- Full Shortcuts actions: list shelves, get recent items, add item

---

## Out of Scope
- Android companion (separate round)
- Windows companion
- Full editing / organizing from watch
