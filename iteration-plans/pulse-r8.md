# Pulse — R8: App Icon, Onboarding, Design System

## Goal
Create a cohesive app icon, build a polished onboarding experience for first-time users, and document and implement a full design system with design tokens, typography, color, and spacing standards.

---

## Scope

### App Icon
- Primary icon concept: stylized pulse/heartbeat waveform in a circular container
- Design: clean, modern, flat-ish with subtle gradients — matches macOS Big Sur+ aesthetic
- Sizes required:
  - 16×16, 32×32, 64×64, 128×128, 256×256, 512×512, 1024×1024 (1x and 2x)
  - Menu bar icon: 18×18 and 36×36 (template image, single color)
- Icon sets: `AppIcon.appiconset` in asset catalog
- Dark/Light mode: use template or automatic `NSImage` asset variants
- Design tool: Figma (export asset catalog directly)
- Alternative: use SF Symbol `waveform.path.ecg` styled as app icon
- Menu bar icon variant: minimal waveform glyph, 16pt, template

### Onboarding Flow
- First launch: 3-screen SwiftUI sheet (not the main popover)
- **Screen 1 — Welcome**:
  - App icon large, centered
  - "Pulse" title + tagline: "System stats at a glance"
  - "Get Started" button
- **Screen 2 — Permissions**:
  - Explain that Pulse reads system stats (no personal data collected)
  - "Open System Settings → Privacy & Security → Analytics" link if needed
  - Notification permission request (if not yet granted)
  - "Continue" button
- **Screen 3 — Customize** (optional, skippable):
  - Quick toggle for which metrics to show
  - Compact vs Wide mode selector
  - "Finish Setup" button
- Onboarding state stored in `UserDefaults`: `hasCompletedOnboarding = true`
- Skip onboarding: "Skip" link on each screen
- Re-access onboarding: Help menu → "Show Onboarding"

### Design System

#### Color Palette
```
--pulse-green:       #34C759  (healthy / low usage)
--pulse-amber:       #FF9500  (warning / moderate)
--pulse-red:         #FF3B30  (critical / high)
--pulse-blue:        #007AFF  (network up)
--pulse-purple:      #AF52DE  (network down)
--pulse-accent:      #007AFF  (primary accent — matches system)
--pulse-surface:     system background (adapts automatically)
--pulse-text:        system label color
--pulse-secondary:   system secondary label
```

#### Typography
```
--pulse-title:       .largeTitle, weight .semibold
--pulse-headline:    .title3, weight .semibold
--pulse-body:        .body, weight .regular
--pulse-caption:     .caption, weight .regular
--pulse-stat-value:  .title, weight .bold, tabular nums
--pulse-stat-label:  .caption, weight .medium, secondary color
```

#### Spacing System (8pt grid)
```
--pulse-space-xs:    4pt
--pulse-space-sm:    8pt
--pulse-space-md:    16pt
--pulse-space-lg:    24pt
--pulse-space-xl:    32pt
```

#### Component Library
- `StatRing`: circular progress indicator (CPU style)
- `StatBar`: linear progress bar (RAM/Disk style)
- `StatCard`: container for a stat section with header + value + graph
- `SparklineView`: small line chart
- `CategoryRow`: collapsible category with expand/collapse chevron
- `SettingsRow`: label + control (toggle, picker, stepper)
- `WarningBadge`: amber/red inline badge for threshold warnings

#### Asset Catalog
- `Colors.xcassets`: all design system colors
- `AppIcon.appiconset`: all icon sizes
- `Localizable.strings`: all user-facing strings (for R10 localization)

---

## Out of Scope (R9+)
- App Store metadata and screenshots
- Setapp packaging and submission
- Notarization and hardened runtime
- Privacy policy
- Localization (beyond strings preparation)
- Post-launch monitoring and crash reporting
