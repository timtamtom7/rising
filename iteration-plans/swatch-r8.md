# Swatch — R8: App Icon, Onboarding, Design System

## Goal
Design the app icon, build a first-launch onboarding flow, and document the internal design system so future iterations remain consistent.

---

## Scope

### App Icon
- **1024×1024** master icon (all sizes generated via `iconutil`)
- Concept: a stylized color palette / droplet shape with a subtle depth effect
- Background: warm neutral base (matches Chronicle's `#faf9f7` or a soft gradient)
- Foreground: overlapping color swatches or a single elegant droplet
- All required sizes: 16, 32, 64, 128, 256, 512, 1024 (1x and 2x for each)
- Menu bar icon: 18×18pt template image (pure outline/silhouette, adapts to menu bar style)
- Icon assets in `Assets.xcassets/AppIcon.appiconset`
- Designed in Figma → exported as 1024 PNG → use macOS icon generator script

### Menu Bar Icon
- Separate 18×18pt template icon for `NSStatusItem`
- Design: small droplet or circular swatch, template-compatible (black/white only)
- Optional: live swatch overlay showing currently selected color (when popover is open)

### Onboarding Flow
- Triggered on first launch only (tracked via `UserDefaults onboardingCompleted`)
- Three-step SwiftUI sheet (presented over an empty state):
  1. **Welcome:** "Swatch — your color companion. Pick, palette, and export colors from your menu bar." + large animated color swatch
  2. **Pick a Color:** Mini eyedropper demo + "Click the menu bar icon to get started" + one interactive color picker demo (pre-selected color, just show the UI)
  3. **Create a Palette:** "Save colors you love into palettes. Export them anywhere." + show the palette save flow with a pre-made example
- Each step: "Continue" / "Skip" buttons
- Completion: "Get Started" → dismisses onboarding, opens popover
- No data collection; purely instructional

### Onboarding UI
```
┌─────────────────────────────────────────┐
│                                         │
│           [🎨 Color Icon]               │
│                                         │
│     Welcome to Swatch                  │
│     Your color companion in the         │
│     menu bar.                           │
│                                         │
│        [Continue →]   [Skip]            │
│                                         │
└─────────────────────────────────────────┘
```

### Design System
Document in `docs/design-system.md`:

**Colors (app chrome, not color picker — that's user-driven):**
- Background: `#f8f7f5` (warm off-white)
- Surface: `#ffffff`
- Surface Secondary: `#f2f1ef`
- Border: `#e4e2df`
- Text Primary: `#1a1a1a`
- Text Secondary: `#6b6b6b`
- Text Tertiary: `#9a9a9a`
- Accent: `#5a7df5` (periwinkle blue — clean, not playful, not aggressive)
- Accent Hover: `#4a6de5`
- Success: `#3a9a5a`
- Warning: `#d4a020`
- Danger: `#c44a4a`

**Typography:**
- All text: SF Pro (system)
- Headings: `.headline` (semibold, 16pt)
- Body: `.body` (regular, 13pt)
- Caption: `.caption` (regular, 11pt)
- Mono (color codes): SF Mono, 12pt

**Spacing (8pt grid):**
- XS: 4pt
- S: 8pt
- M: 16pt
- L: 24pt
- XL: 32pt

**Corner Radius:**
- Small elements (swatches): 6pt
- Cards/sheets: 12pt
- Buttons: 8pt

**Shadows:**
- Popover: `shadow(color:.black.opacity(0.12), radius:8, x:0, y:4)`
- Cards: `shadow(color:.black.opacity(0.08), radius:4, x:0, y:2)`
- Buttons (on press): `shadow(color:.black.opacity(0.06), radius:2, x:0, y:1)`

**Motion:**
- Duration: 200ms default, 300ms for larger transitions
- Easing: `easeInOut` for most, `spring(response:0.3, dampingFraction:0.7)` for bouncy feedback
- Disable all motion when `accessibilityReduceMotion` is true

**Component Patterns:**
- Copy button: SF Symbol `doc.on.doc` with tooltip "Copy [format] to clipboard"
- Color swatch button: 44×44pt minimum, shows hex on hover
- Section headers: uppercase, `.caption`, `.secondary` color, tracking 0.05em
- Divider: 1pt `#e4e2df` horizontal rule with 16pt vertical margin

### Assets
- All SF Symbols: documented usage (e.g., `eyedropper` for eyedropper, `square.on.square` for palette, `doc.on.clipboard` for copy)
- No custom iconography in R8 — SF Symbols cover all needs
- `AccentColor` asset for the app-wide tint color

### Build & Run
- Target: macOS 13.0+
- Onboarding shown once; controlled by `UserDefaults`
- Design system doc lives in `docs/design-system.md` (not enforced in code, but referenced)
- Zero warnings, clean build

---

## Out of Scope (R9+)
- App Store metadata
- Screenshots for App Store
- Setapp packaging
- Notarization
- Launch and marketing
