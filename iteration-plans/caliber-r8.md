# Caliber — R8: App Icon, Onboarding, Design System

## Goal
Design and ship the final app icon, create a polished onboarding experience for first-time users, and establish a comprehensive design system.

---

## Scope

### App Icon
- macOS app icon: 1024×1024pt master, auto-generate all sizes
- Icon concept: stylized ruler/caliper combined with a target reticle
  - Primary: charcoal/dark gray (#2C2C2E) background
  - Accent: Caliber blue (#007AFF) ruler marks and crosshair
  - Clean, minimal, instantly recognizable at 16×16pt
- Menu bar icon: 18×18pt template image (ruler outline, black/white)
- Widget icons: reuse main icon with appropriate masks
- Alternate icons: none in R1 (future: light/dark variants)
- App icon credits in About panel if designer is external

### Onboarding Flow
- Triggers on first launch only (via `UserDefaults` flag: `hasCompletedOnboarding`)
- 3-panel SwiftUI sheet (640×480pt):
  - **Panel 1 — Welcome:**
    - App name + tagline: "Measure anything on screen."
    - Brief description of what Caliber does
    - Large app icon preview
  - **Panel 2 — Permissions:**
    - Screen Recording permission required (with "Open System Settings" button)
    - Accessibility permission required for Inspector mode
    - Visual guide showing where to find and enable these in System Settings → Privacy & Security
    - "Open Settings" deep-links to `x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture`
  - **Panel 3 — Quick Start:**
    - Animated GIF/demo of measuring a region
    - Default hotkey reminder: ⌘⇧M
    - "Get Started" button → completes onboarding, sets flag
- Onboarding skippable (but completion still sets flag if skipped for permissions reasons)
- Can re-open onboarding from Settings → Help → "Show Onboarding"

### Design System

#### Color Palette
```
Primary:     #007AFF (Caliber Blue — buttons, active states)
Secondary:   #5856D6 (Purple — accent elements)
Background:  #1C1C1E (Dark mode background)
Surface:     #2C2C2E (Card/panel background)
Border:      #3A3A3C (Dividers, borders)
TextPrimary: #FFFFFF (Main text)
TextSecondary: #8E8E93 (Subtitle, hints)
Success:     #30D158 (Copy confirmation)
Warning:     #FF9500 (Ruler guides)
Error:       #FF3B30 (Destructive actions)
```

#### Typography
- Display: SF Pro Display, 20pt semibold (panel titles)
- Body: SF Pro Text, 13pt regular (general UI text)
- Caption: SF Pro Text, 11pt regular (timestamps, hints)
- Mono: SF Mono, 11pt regular (measurement values, coordinates)
- All text scales with Dynamic Type

#### Spacing (8pt grid)
- xs: 4pt
- sm: 8pt
- md: 16pt
- lg: 24pt
- xl: 32pt
- xxl: 48pt

#### Component Library
- `CaliberButton`: primary/secondary/destructive variants, 32pt height, 8pt corner radius
- `CaliberLabel`: pill-shaped measurement label, dark background, mono text
- `CaliberCard`: history/preset list item, surface background, 8pt corner radius
- `CaliberPopover`: standard popover styling, dark background
- `CaliberTextField`: 28pt height, 6pt corner radius, surface background
- `CaliberToggle`: custom toggle matching design system

#### Dark Mode Only
- Caliber is dark mode only — no light mode support
- All colors defined in Asset Catalog with dark mode variants (same values)

#### SF Symbols Usage
- `ruler.fill` — status bar icon
- `scribble.variable` — measure mode
- `line.diagonal` — distance mode
- `angle` — angle mode
- `eyedropper` — color picker
- `sidebar.leading` — inspector
- `square.and.arrow.up` — export
- `keyboard` — shortcuts
- `cloud` — iCloud sync
- `checkmark.circle.fill` — success
- `xmark.circle.fill` — error

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: SQLite.swift
- Zero warnings, clean build

---

## Out of Scope (R9+)
- App Store metadata
- Screenshots
- Notarization
- Setapp

