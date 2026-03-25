# Shelf — R18: Advanced Widgets & Desktop Integration

## Goal
Deliver rich widgets across macOS and iOS, including interactive desktop widgets for macOS 14+.

---

## Scope

### macOS Desktop Widgets (WidgetKit)
- Small widget: single most recent item
- Medium widget: 4 recent items with icons and names
- Large widget: recent items + smart suggestions + search bar
- Interactive widget: open item directly from widget (no app launch)
- Widget stack: combine multiple Shelf widgets into one stack
- Widget refresh: on-demand via WidgetCenter shared data

### iOS Home Screen Widgets
- Small: recent item
- Medium: 3 recent items + app icons
- Large: recent items + suggestions + quick add button
- Accessory widgets (Lock Screen): recent item name
- Interactive: open item directly

### iOS Lock Screen Widgets
- Inline text: "Shelf: Recent [item name]"
- Gauge: progress through recent items list
- Corner: recent item count

### Interactive Widget Actions
- All widgets interactive: tap → opens item in native app
- Long-press → quick actions menu (open, add to different shelf, remove)
- Widget button: "Add New" opens file picker

### Multi-Shelf Widget
- User selects which shelf to show in widget
- Easy shelf switcher in widget configuration UI

### Widget Gallery
- In-app widget configuration preview
- Shows all sizes and themes
- One-tap add to Notification Center / desktop / Lock Screen

---

## Out of Scope
- Android widgets
- Windows desktop widgets
- Live Activity (future consideration)
