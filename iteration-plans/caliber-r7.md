# Caliber — R7: Accessibility, VoiceOver, Keyboard-Only Operation

## Goal
Ensure Caliber is fully accessible, works with VoiceOver, and can be operated entirely via keyboard.

---

## Scope

### VoiceOver Support
- All UI elements have proper accessibility labels:
  - Status bar icon: "Caliber, menu bar app"
  - Popover buttons: "Measure", "History", "Settings", "Quit"
  - Measurement label: "Measurement: ${width} by ${height} pixels, ${width} by ${height} points"
  - History items: "Measurement ${n}, ${width} by ${height} pixels, from ${screen}, ${timestamp}"
  - Presets: "Preset: ${name}, ${width} by ${height} points"
  - Color swatch: "Color: ${hex}, click to copy"
- Inspector panel: every AX element description is complete
- Measurement overlay announces mode changes via `AXAnnouncement`:
  - "Region measurement mode active. Press Escape to cancel."
  - "Measurement complete: ${width} by ${height} pixels. Press C to copy."
- VoiceOver navigation order is logical through all popover UI

### Keyboard-Only Operation
- Every action accessible via keyboard:
  - `⌘⇧M`: toggle measurement overlay
  - `⌘⇧D`: distance mode
  - `⌘⇧A`: angle mode
  - `⌘⇧I`: inspector mode
  - `⌘R`: ruler mode
  - `⌘G`: pixel grid toggle
  - `⌘E`: export last measurement
  - `⌘C`: copy last measurement
  - `Escape`: cancel / dismiss overlay
  - `Tab` / `Shift+Tab`: navigate between controls in popover
  - `Space` / `Enter`: activate focused control
  - `Arrow keys`: nudge measurement selection by 1px (when overlay active)
  - `⌘Arrow keys`: nudge by 10px
- Global hotkey customization (R4) fully accessible via keyboard
- All buttons, lists, text fields fully keyboard navigable

### Accessibility Inspector Integration
- Caliber's own UI passes Accessibility Inspector audit
- Uses `NSAccessibility` protocols on all custom views
- SwiftUI views use `.accessibilityLabel()`, `.accessibilityHint()`, `.accessibilityValue()`
- Popover uses `NSPopoverAXAnnouncement` for mode changes

### Focus Management
- When overlay activates, focus moves into the overlay
- Escape returns focus to previously focused app
- Arrow key nudging uses `NSWindow.makeFirstResponder` to ensure key events route correctly

### Dynamic Type Support
- All text in popover and inspector respects macOS Dynamic Type settings
- Font sizes scale from `NSFont.preferredFont(forTextStyle:)` or SwiftUI's dynamic type
- Minimum touch target: 44×44pt for all interactive elements

### Reduced Motion
- Respects `NSApp.isReduceMotion` — disables:
  - Animated fade-in of measurement label
  - Animated guide snapping
  - Animated overlay transitions
- Replaced with instant visibility toggles

### Accessibility Audit
- Full pass through all screens: popover, settings, history, inspector, presets
- Fix any `AXError` violations
- Verify with Accessibility Inspector tool (included with Xcode)

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: SQLite.swift
- Zero accessibility warnings
- Test with VoiceOver enabled (⌘F5)

---

## Out of Scope (R8+)
- App icon design
- Onboarding flow
- App Store metadata

