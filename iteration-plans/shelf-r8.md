# Shelf — R8: App Icon, Onboarding, Design System

## Goal
Shelf gets its visual identity: a polished app icon, cohesive design system, and a smooth onboarding flow for first-time users.

---

## Scope

### App Icon
- Design concept: a minimalist shelfsilhouette with a fewapp icons resting on it — represents organizing menu bar items
  - Warm palette: slate blue/grey background (#3a4a5c), white shelf lines, colorful app icons as accents
  - Or: simple grid of 3 dots (menu bar dots) with a shelf line beneath
- Menu bar icon: 18×18pt template image, single color (adapts to light/dark automatically), no complex detail
- App Store icon: 1024×1024pt PNG, same design scaled up
- Alternative: submit dark mode variant (white background, coloured shelf)
- Sizes needed: 16, 32, 64, 128, 256, 512, 1024pt (1x and 2x where applicable)
- Use Figma or Pixelmator Pro for source design; archive `.fig` / source files in `Design/Source/`

### Design System (`Design/` folder)
- `Colors.swift`: semantic color tokens
  - Primary accent: amber (#e07a3a) — used for highlights, badges, active states
  - Surface primary: `#1e1e1e` (dark), `#ffffff` (light)
  - Surface secondary: `#2a2a2a` (dark), `#f5f5f5` (light)
  - Text primary: `#ffffff` (dark), `#1a1a1a` (light)
  - Text secondary: `#a0a0a0`
  - Danger: `#e05a4a`
  - Success: `#4aaa6a`
  - Spacer colour: `#555555` (dark), `#d0d0d0` (light)
- `Typography.swift`: text styles
  - Title: SF Pro Display, 16pt semibold
  - Headline: SF Pro Text, 13pt semibold
  - Body: SF Pro Text, 13pt regular
  - Caption: SF Pro Text, 11pt regular
  - Monospace: SF Mono (for keyboard shortcut display)
- `Spacing.swift`: 8pt grid constants
  - `xxs: 2`, `xs: 4`, `sm: 8`, `md: 16`, `lg: 24`, `xl: 32`
- `Components/`: reusable SwiftUI views
  - `MenuItemRow`: app icon + name + visibility toggle
  - `VisibilityBadge`: eye/eye.slash SF Symbol
  - `GroupHeader`: icon + label + count
  - `SpacerRow`: spacer preview + type picker
  - `LayoutCard`: layout name + item count + active indicator
  - `SearchBar`: styled search field
  - `ShortcutRecorder`: keyboard shortcut capture field

### SF Symbols Usage
- Menu bar / visibility: `eye`, `eye.slash`, `eye.fill`, `eye.slash.fill`
- App actions: `gear`, `plus`, `minus`, `xmark`, `arrow.clockwise`
- Navigation: `chevron.right`, `chevron.down`, `sidebar.left`
- Layouts: `rectangle.stack`, `square.stack.3d.up`
- Spacers: `minus`, `minus.plus`, `arrow.left.and.right`
- All icons: medium weight, consistent 13pt or 16pt size in UI

### Onboarding (First Launch)
- Single window, shown before menu bar activates for the first time
- 3 screens, swipe or click to advance:
  1. "Shelf — Tidy up your menu bar." (app icon, tagline)
  2. "Organize, hide, and arrange your menu bar icons." (annotated screenshot of popover)
  3. "You're all set." (check icon, "Open Shelf" button that opens the menu bar popover)
- `UserDefaults` key `hasCompletedOnboarding` to skip on subsequent launches
- Onboarding window: 480×360pt, non-resizable, centred on screen

### Menu Bar Popover Polish
- No visible border (popover floats freely)
- Internal scroll with subtle momentum
- Section dividers: 1pt lines in border color
- Header surface slightly darker for visual anchoring
- Item rows: 40pt height, 12pt horizontal padding
- Corner radius: 12pt on popover, 8pt on cards

### Animation Specs
- Item appear: fade + slide up 6pt, 180ms ease-out
- Item hide/show: crossfade 150ms
- Drag reorder: lift with shadow, 200ms spring
- Sheet present: slide up, 250ms spring
- Tab/segment switch: crossfade 150ms
- All animations respect Reduce Motion preference

### About Window
- Standard macOS About panel: app name, version, copyright
- Version: "Shelf 1.0.0 (Build 1)"
- "Acknowledgments" button opens third-party licenses window

---

## Out of Scope (R9+)
- App Store assets and screenshots
- Setapp packaging
- Notarization
- Launch day
