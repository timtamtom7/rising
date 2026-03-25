# Swatch — R7: Accessibility, VoiceOver, Dynamic Type

## Goal
Comprehensive accessibility pass: full VoiceOver support, Dynamic Type throughout, reduce motion support, and keyboard navigation. Ensure Swatch is usable by everyone.

---

## Scope

### VoiceOver Support
Audit every interactive element:

**Color Picker:**
- All format rows (HEX, RGB, HSB, etc.): `accessibilityLabel` = "HEX color format, #4A90D9, button to copy"
- Copy buttons: `accessibilityLabel` = "Copy HEX color to clipboard"
- Selected color swatch: `accessibilityLabel` = "Currently selected color, #4A90D9, red 74, green 144, blue 217"
- Eyedropper button: "Pick color from screen, opens screen picker"
- History swatches: "Color history item 1 of 20, #3A5FCD" with `accessibilityRole: .button`

**Palette Management:**
- Palette list items: `accessibilityLabel` = "Palette [name], [n] colors"
- Palette color swatches: "Color [n] in [palette name], [hex]"
- New palette button: "Create new palette"
- Add to palette: "Add current color to palette, [palette name]"

**Harmonies:**
- Each harmony swatch: "Complementary color, [hex], click to select"

**Contrast Checker:**
- Foreground color well: "Foreground color for contrast check, [hex]"
- Background color well: "Background color for contrast check, [hex]"
- Contrast ratio: "[n.n] to 1 contrast ratio"
- Each WCAG level: "[AA/AAA] [normal/large] text, [pass/fail]"

**Navigation:**
- Logical tab order: color display → format rows → harmonies → palette section → eyedropper
- `accessibilityGroup` on related elements
- Skip links for palette section if content is long

### Dynamic Type
- All text uses system text styles (`.body`, `.headline`, `.caption`)
- No fixed font sizes — rely on SwiftUI's text scaling
- Custom views implement `DynamicTypeSize` appropriately:
  - Popover content scrolls when text exceeds available space
  - Color swatch grids reflow to fewer columns on smaller sizes
  - Format labels truncate with ellipsis if needed
- Minimum readable size enforced: never smaller than 11pt equivalent
- Test with: `Accessibility > Enable Differentiate Without Color` + `Reduce Motion`

### Keyboard Navigation
- All buttons have `.keyboardShortcut` or `.accessibilityKeyboardShortcut`
- Palette sidebar: `Tab` navigates between palettes, `Space` to expand/collapse
- Color history: arrow keys navigate grid, `Space`/`Enter` to select
- Format rows: focused row highlights (no mouse needed)
- Sheet dismisses with `Escape`
- Sheets confirm with `Enter`, cancel with `Escape`
- Menu bar: `Escape` closes popover (already system behavior)

### Reduce Motion
- `@Environment(\.accessibilityReduceMotion)` checked in all animated views
- Eyedropper magnifier: instant follow (no spring animation) when reduce motion is on
- Color history additions: no fade-in animation when reduce motion is on
- Harmony transitions: instant swap instead of crossfade
- Gradient preview: no interpolation animation

### Accessibility Inspector Audit
- Run Accessibility Inspector against every view
- Fix all warnings and notices
- Verify every image has an accessibility label
- Ensure color is never the only indicator (swatches always have hex text nearby)

### Specific Accessibility Fixes
- Contrast in UI chrome: popover background text (labels, HEX values) must meet WCAG AA on the popover background color
- Minimum touch target: 44×44pt for all interactive elements (already standard in SwiftUI)
- Focus rings: visible on all interactive elements via `.focusable()` and `.focusEffect`

### Accessibility Statements
- "Swatch supports VoiceOver, Dynamic Type, and Keyboard Navigation"
- Accessible from app menu: **Swatch → Accessibility Options**

### Build & Run
- Target: macOS 13.0+
- No accessibility-specific external dependencies
- Run Accessibility Inspector in Xcode → Accessibility Fundamentas → verify all elements
- Zero warnings, zero accessibility violations in automated audit

---

## Out of Scope (R8+)
- App icon design
- Onboarding flow
- Design system documentation
- App Store metadata
