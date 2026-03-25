# Volt — R18: Advanced Widgets & Lock Screen Integration

## Goal
Expand Volt's widget offerings across macOS and iOS, including interactive widgets, Lock Screen widgets, and desktop dashboard widgets.

---

## Scope

### macOS Desktop Widgets (WidgetKit)
- Small desktop widget: battery percentage gauge
- Medium: battery % + health score + time remaining estimate
- Large: full battery dashboard with history chart (24h)
- Interactive widgets: tap to switch power mode directly from widget
- Widget refresh: on-demand via WidgetCenter

### iOS Lock Screen Widgets
- Circular widget: battery % as a ring
- Rectangular widget: battery % + health indicator
- Inline widget: "Mac: 85% — 3h remaining"
- Accessory gauge for Lock Screen (battery as a gauge face)

### iOS Home Screen Widgets
- Small: Mac battery percentage
- Medium: battery % + health score + charging status
- Large: comparison chart (today vs. last 7 days)
- Interactive: toggle power mode directly from widget

### Interactive Widget Actions
- Mark bill as paid equivalent in Volt: switch power mode from widget
- Snooze notification equivalent: remind me in 30 minutes
- All without launching the app (WidgetKit interactive intents)

### Widget Gallery
- In-app widget configuration gallery
- Preview all widget sizes and variants
- Quick-add to Notification Center / desktop / Lock Screen

### Multi-Mac Widget Support
- If user has multiple Macs, widget shows selector
- Quick switch between Macs in widget (household feature)

---

## Out of Scope
- Android widgets
- Windows desktop widgets
- Live Activity / Dynamic Island (consider for future MacBook Pro with notch)
