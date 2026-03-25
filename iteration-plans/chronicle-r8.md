# Chronicle — R8: Branding, Design System, App Icon

## Goal
Chronicle gets its visual identity. Consistent design system, polished app icon, and a cohesive visual language that makes it feel like a real product.

---

## Scope

### App Icon
- Design: stylized calendar page with a small checkmark — warm amber background (#e07a3a), white calendar glyph, subtle drop shadow
- Sizes: 16, 32, 64, 128, 256, 512, 1024pt (all @1x and @2x where applicable)
- Use a tool like Figma or Pixelmator Pro to create the source
- Alternative icon: also submit a dark mode variant (calendar glyph in white, background #1a1a1a)
- App Store requires 1024×1024pt PNG
- Menu bar icon: 18×18pt template image, single color, adapts automatically

### Design System Documentation
- `Design/` folder in the project with:
  - `Colors.swift`: all app colors as static vars (named semantic tokens)
  - `Typography.swift`: text style definitions (font, size, weight, line height)
  - `Spacing.swift`: spacing constants using 8pt grid
  - `Components/`: reusable SwiftUI components (BillCard, AmountLabel, CategoryBadge, MonthProgressBar, etc.)
- Every color has a light and dark variant
- Dark mode: surfaces shift to #141414, text remains light-on-dark, accent stays amber

### SF Symbols Usage
- Consistent icon set throughout:
  - Calendar/clock: `calendar`, `calendar.badge.clock`
  - Bills: `doc.text`, `creditcard`
  - Categories: each has a symbol (house: `house`, utilities: `bolt`, subscriptions: `tv`, insurance: `shield`, phone: `phone`, car: `car`, health: `heart`, other: `ellipsis.circle`)
  - Actions: `plus`, `checkmark`, `xmark`, `gear`, `magnifyingglass`, `arrow.up.arrow.down`, `calendar.badge.plus`
- Never mix icon styles — stick to one weight (medium throughout)

### Animation Specs
- Card appear: fade + slide up 8pt, 200ms ease-out
- Card paid: checkmark draws in, card fades to 60% opacity, 300ms
- Sheet present: slide up from bottom, 250ms spring
- Tab switch: crossfade, 150ms
- Progress bar: animate width changes, 400ms ease-in-out
- Popover: use system default (no custom animation)

### Menu Bar Popover Polish
- Popover has no visible border — it just floats
- Internal scroll: smooth scroll with subtle momentum
- Sections separated by thin 1pt dividers (border color)
- Header area slightly darker surface for visual anchoring

### Onboarding (first launch only)
- Single full-screen window on first launch (before menu bar activates)
- 3 screens, swipe or click to advance:
  1. "Chronicle — Never miss a bill." (app icon, tagline)
  2. "Add your bills, set reminders." (screenshot of add bill sheet)
  3. "You're all set." (check icon, "Open Menu Bar" button)
- Uses `UserDefaults` key `hasCompletedOnboarding` to skip on subsequent launches

### About Window
- Standard macOS About panel (app name, version, copyright)
- Version string: "Chronicle 1.0.0 (Build 1)"
- Third-party licenses accessible via "Acknowledgments" button

---

## Out of Scope (R9+)
- App Store assets, screenshots
- Launch prep, marketing
