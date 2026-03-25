# Chronicle — R15: iOS Companion App

## Goal
Ship Chronicle for iPhone and iPad as a native companion app that stays in sync with the Mac app via iCloud.

---

## Scope

### iOS App Features
- Full bill list view — same data as Mac
- Add/edit/delete bills on iOS
- Notification delivery on iPhone (Apple Push Notification service)
- Quick actions from iOS widget or notification
- Face ID / Touch ID lock option for app privacy

### Widgets for iOS
- Small widget: next bill due
- Medium widget: bills due this week
- Lock screen widget: countdown to next bill
- Interactive widget: mark bill as paid directly from widget

### Watch App
- Apple Watch companion — complications and glances
- Watch app shows next 3 upcoming bills
- Tap to mark as paid from watch face
- Haptic tap when bill is due

### iPad Optimisation
- Split-view support — use Chronicle alongside another app
- Keyboard shortcuts matching Mac app
- External display support for presentations (household overview)

### Sync Architecture
- Shared iCloud container (App Groups) between Mac and iOS
- NSPersistentCloudKit for automatic sync
- Conflict resolution: most recent edit wins with local backup
- Sync status indicator (last synced time, pending changes)

### App Store Listing
- iOS app listing separate from Mac (but linked)
- iOS app: "Chronicle — Bill Tracker for iPhone & iPad"
- Combined Mac + iOS bundle or separate purchases (business decision)

---

## Out of Scope
- Android companion app (separate project)
- Windows companion app
- Two-way sync via non-iCloud methods
