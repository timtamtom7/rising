# Swatch — R18: Advanced Widgets & Extensions

## Goal
Expand Swatch's presence across macOS and iOS with rich widgets, Notification Center extensions, and system-level color picking.

---

## Scope

### macOS Desktop Widgets (WidgetKit)
- Small widget: single random color from palette
- Medium widget: 4-color palette strip
- Large widget: full palette grid + color detail on tap
- Interactive widget: tap color to copy HEX to clipboard
- Widget stack: combine palette + inspiration widgets

### iOS Home Screen Widgets
- Small: random color swatch
- Medium: 4-color strip with HEX labels
- Large: full palette with color values
- Accessory (Lock Screen): random color as a swatch
- Interactive widget: tap to copy color

### iOS Lock Screen Widgets
- Color swatch (visual only)
- Inline: "Color: #3B82F6"

### Notification Center Widget (Today View)
- Quick palette access from Notification Center
- Recent colors, random inspiration color

### Color Picker System Extension
- System-wide color picker accessible from any app (like Digital Color Meter)
- Use Swatch's color picker in any app
- Keyboard shortcut: global hotkey to pick color from screen
- Shows color in all formats simultaneously

### Quick Actions
- Finder Quick Actions: "Extract colors from image" for right-click
- Touch Bar: color palette strip + pick color button
- Finder extension: thumbnail preview shows dominant colors

### Safari Extension
- Pick color from any webpage
- Save to Swatch palette from Safari
- Inspect: see all colors used on a webpage as a palette

---

## Out of Scope
- Android widgets
- Chrome/Firefox extensions (separate project)
