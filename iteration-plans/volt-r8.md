# Volt — R8: App Icon, Onboarding, Design System

## Goal
Create a cohesive design system, design and finalize the app icon, and build a polished onboarding flow for first-time users.

---

## Scope

### App Icon
- Concept: bolt/lightning bolt + battery shape, clean and minimal
- Sizes needed:
  - macOS menu bar: 18×18, 36×36 (@2x) template image
  - App icon: 16, 32, 64, 128, 256, 512, 1024 (and @2x variants)
- Design in Figma or Sketch; export as PDF for macOS icon (PDF icon uses single 1024pt source)
- Badge/status icons: green/yellow/red variants of the battery bolt
- Menu bar icon: SF Symbol `bolt.fill` or custom designed, template mode
- All icon assets stored in `Resources/Icons/`

### Design System — Colors
- `VoltColors.swift` (or `DesignSystem.swift`):
  - `chargeGreen`: #34C759 (system)
  - `chargeYellow`: #FFCC00
  - `chargeRed`: #FF3B30
  - `chargeGray`: #8E8E93
  - `popoverBackground`: `NSColor.windowBackgroundColor` (dynamic)
  - `accentPrimary`: `NSColor.controlAccentColor` (dynamic)
- All UI colors referenced from design system, never hardcoded
- Support for light/dark/high-contrast appearances via `@Environment(\.colorScheme)`

### Design System — Typography
- `VoltTypography.swift`:
  - `largeTitle`: .system(size: 28, weight: .bold) — charge % in popover
  - `title`: .system(size: 17, weight: .semibold) — section headers
  - `body`: .system(size: 13, weight: .regular) — general text
  - `caption`: .system(size: 11, weight: .regular) — stats, timestamps
  - `mono`: .monospacedSystemFont(ofSize: 13, weight: .regular) — cycle count, technical stats
- All text uses system fonts (no custom fonts needed for a menu bar app)

### Design System — Spacing
- `VoltSpacing.swift`:
  - `xxs`: 4pt
  - `xs`: 8pt
  - `sm`: 12pt
  - `md`: 16pt
  - `lg`: 24pt
  - `xl`: 32pt
- Popover padding: 16pt horizontal, 12pt vertical
- Section spacing: 16pt between sections
- Card/list item padding: 8pt
- Grid: 8pt base unit

### Design System — Components
- `StatTile`: icon + label + value, used for cycles/health/temp
- `ProfileRow`: icon + name + limit badge, used in profile list
- `ChargeRing`: circular progress indicator (used in glance and popover)
- `SegmentedTabBar`: custom segmented control for Control/History/Stats tabs
- `LimitSlider`: custom slider with limit value label above thumb
- All components in `VoltUI/` folder, SwiftUI-based

### Onboarding Flow
- Triggered on first launch (check `UserDefaults onboardingComplete`)
- `NSWindow` (480×400pt) with 3 steps:
  1. **Welcome**: "Meet Volt" — brief explanation of battery health + charge limiting. App icon hero. "Next" button.
  2. **Set Your First Limit**: Interactive slider to set initial limit. Shows context: "80% is a great starting point for most people." "Skip" / "Set Limit" buttons.
  3. **You're Ready**: Confirmation. "Open Volt in your menu bar →" with menu bar icon highlighted. "Get Started" button.
- `NSHostingController` wrapping SwiftUI views for each step
- No back button (forward-only onboarding)
- "Skip" available on step 2; always forward from step 3

### Preferences Window Redesign
- Apply design system to existing Preferences window
- Tab-based layout: "General", "Profiles", "Shortcuts", "Appearance"
- Appearance tab: menu bar display style (text %, icon %, glance), accent color override
- Consistent spacing and typography from design system

### SF Symbols
- All icons use SF Symbols:
  - `bolt.fill` — menu bar / app icon base
  - `battery.100/75/50/25/0` — battery level indicators
  - `house.fill`, `building.2.fill`, `airplane` — default profile icons
  - `gearshape.fill` — settings/preferences
  - `square.and.arrow.up` — export
  - `keyboard` — shortcuts
  - `icloud.fill` / `icloud` — sync status
  - `chart.line.uptrend.xyaxis` — history
  - `heart.fill` — battery health
  - `thermometer.medium` — temperature
  - `arrow.2.circlepath` — cycle count
- Fallback if symbol unavailable: text-based or SF Symbol alternatives documented

### Build & Run
- Target: macOS 13.0+
- App icon assets must include 1024pt source + all required sizes
- Onboarding complete flow tested with fresh install
- Design system referenced consistently across all UI files

---

## Out of Scope (R9+)
- App Store metadata
- Screenshots
- Notarization
- Launch day
