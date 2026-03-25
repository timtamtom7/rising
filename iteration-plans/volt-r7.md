# Volt — R7: Accessibility, Dynamic Type, VoiceOver Support

## Goal
Ensure Volt is fully accessible — VoiceOver compatible, Dynamic Type support throughout, keyboard navigation, and reduced motion support.

---

## Scope

### VoiceOver Support
- All UI elements have meaningful accessibility labels
- Status item: label "Battery at 87 percent, charging, limited to 80 percent"
- Popover: comprehensive accessibility tree
  - Slider: "Maximum charge limit, 80 percent, adjust with arrow keys"
  - Toggle: "Charging limit, on" / "Charging limit, off"
  - Profile list: each profile is a distinct element with name, limit, and active state
  - Chart: "Charge history chart, last 24 hours, showing charge percentage over time"
  - Stats: "Battery health, 92 percent. Temperature, 47 degrees Celsius. Cycle count, 312."
- Use `AccessibilityProperty` modifiers: `.accessibilityLabel()`, `.accessibilityHint()`, `.accessibilityValue()`
- All custom actions registered for interactive elements
- `isAccessibilityElement` on containers to flatten the tree where appropriate

### Dynamic Type
- All text uses `.font(.body)`, `.font(.title)`, etc. — system text styles that scale
- Minimum text size: 11pt, maximum not constrained
- Popover width adapts: fixed 320pt for Control tab, History/Stats scroll vertically
- Long profile names truncate with `lineLimit(1)` and `truncationMode(.tail)`
- Test with accessibility sizes: AX5 (largest) down to AX1 (smallest)
- Avoid fixed-size labels; prefer `Text` + `Spacer()` layout patterns

### Keyboard Navigation
- Full keyboard navigation in popover (no mouse required)
- Tab order: status → slider → toggle → profile list → tabs → buttons
- Arrow keys navigate profile list
- Enter/Space to activate profile
- Escape to close popover
- All buttons have `.keyboardShortcuts(.default)` or explicit `.keyboardShortcut()` modifiers
- Preferences window fully keyboard-navigable
- Focus rings: use `.focusSection()` and ensure visible focus rings via system preferences

### Reduced Motion
- Respect `NSAnimations.system` and `accessibilityReduceMotion`
- Disable:
  - Slider value change animations
  - Profile switch transition animations
  - Popover appear/disappear animations (already using `.transient`)
  - Chart drawing animations
- Use `animation(.default, value:)` with `requestReduceMotion()` check
- Chart line draws immediately, not animated

### Color Contrast
- All text meets WCAG 2.1 AA (4.5:1 for body, 3:1 for large text)
- Verify in both light and dark mode
- Use `Color.effectiveAppearance` to adapt
- Green/Yellow/Red charge indicators have sufficient contrast in both modes
- High Contrast mode: ensure all UI elements remain visible

### Accessibility Inspector Audit
- Run Accessibility Inspector against the running app
- Fix all warnings and notices
- Verify with VoiceOver (`Cmd + F5`) — navigate the entire popover flow
- Test with Switch Control

### Specific UI Fixes
- Chart: add `accessibilityChartDescriptor` (iOS/macOS 13+ `Charts` accessibility)
  - Define `AXChartDataSource` for the charge history chart so VoiceOver can read data points
- Profile list: use `accessibilityChildren()` for proper collection navigation
- Stats row: flatten into individual labeled elements, not one compound label
- Menu Bar Extra glance: ensure all stat values are readable by VoiceOver

### Build & Run
- Target: macOS 13.0+
- No new dependencies
- Accessibility audit complete before shipping
- Test with VoiceOver on, Dynamic Type at AX5, Reduced Motion on

---

## Out of Scope (R8+)
- App icon design
- Onboarding flow
- Design system
- App Store metadata
