# Shelf — R6: Widgets, WidgetKit, Notifications Center

## Goal
Add home screen / Notification Center widgets so users can see their Shelf status at a glance, and integrate with the macOS Notification Center.

---

## Scope

### WidgetKit Extension
- Create a `ShelfWidgetExtension` target (WidgetKit + App Intent extension)
- Widget types:
  - **Small widget** (systemSmall): Shows hidden count badge, shelf icon, layout name
  - **Medium widget** (systemMedium): Shows hidden count + top 3 hidden app names
  - **Large widget** (systemLarge): Full list of current layout's items with visibility toggles (widget buttons)
- Widget uses App Intents for interactive buttons (show/hide individual items, switch layout)
- Widget refreshes on: app launch, layout change, manual refresh (via widget gallery)
- Timeline: updates every 15 minutes minimum (WidgetKit policy), or on significant change via `WidgetCenter.shared.reloadAllTimelines()`

### App Intents for Widgets
- `ShowItemIntent`: takes app bundle ID, shows that menu bar item
- `HideItemIntent`: takes bundle ID, hides that menu bar item
- `SwitchLayoutIntent`: takes layout name, switches active layout
- `RevealAllIntent`: temporarily shows all hidden items
- All intents are `AppIntent` conforming types usable by both Shortcuts (R5) and Widgets

### Notification Center Integration
- Register Shelf as a Notification Center widget provider
- On macOS, Notification Center is accessible via the menu bar widget gallery
- Shelf widget appears in Today View alongside other widgets
- Same widget sizes and functionality as desktop widgets

### Widget UI (SwiftUI)
- Consistent design language with popover: dark surface, amber accents
- Small: icon + count in a rounded rectangle, tap opens app
- Medium: icon + count + "Hidden: Slack, Calendar, 1Password" (truncated list)
- Large: full list with visibility toggle buttons
- All widgets show the active layout name as a subtitle
- Dark/light mode variants

### Widget Configuration
- Users can configure which layout the widget reflects
- Small widget configuration: choose which layout to display
- Medium/Large: also choose which apps to show in the list (top N by some order)

### App Group for Widget
- App group `group.com.shelf.shared` for sharing data between main app and widget extension
- Widget reads from a shared SQLite database or UserDefaults suite
- Main app writes widget-relevant state to the shared container on every change

---

## Out of Scope (R7+)
- Full accessibility pass (VoiceOver, Dynamic Type)
- Onboarding flow
- Design system documentation
