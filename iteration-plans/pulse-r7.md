# Pulse — R7: Full Accessibility, VoiceOver, Dynamic Type

## Goal
Make Pulse fully accessible: every UI element has VoiceOver labels, all text scales with Dynamic Type, keyboard navigation works throughout, and accessibility preferences are respected.

---

## Scope

### VoiceOver Support
- Every interactive element has an `accessibilityLabel`:
  - CPU ring: "CPU usage at 23 percent, with 15 percent in user mode and 8 percent in system mode"
  - RAM bar: "RAM usage, 10 point 2 gigabytes used out of 32 gigabytes, 32 percent"
  - Disk bar: "Disk usage, 421 gigabytes used of 1 terabyte, 41 percent"
  - Network: "Network activity, uploading at 12 megabytes per second, downloading at 45 megabytes per second"
  - Temperature: "CPU temperature, 72 degrees Celsius"
  - Battery: "Battery at 87 percent, 3 hours 12 minutes remaining, not charging"
- All stat values have `accessibilityValue` with the raw numeric data
- Warnings: "Warning, CPU usage is above 80 percent"
- Critical: "Critical alert, CPU usage is above 95 percent"
- Use `Accessibility announcement` for transient states (e.g., settings saved)

### Custom Accessibility Traits
- Progress indicators: `.updatesFrequently` trait (stats update often — VoiceOver should not announce every update)
- Stat sections: `.isSummaryItem` trait for grouping
- Toggles: standard toggle traits with clear labels
- Buttons: descriptive labels without redundant "button" suffix

### Keyboard Navigation
- Full keyboard navigation via SwiftUI's `.focusable()` and `.keyboardShortcut()`
- Popover: Tab cycles through each stat section
- Settings sheet: Tab through all controls, Enter to activate
- Menu bar: Space to open popover, Escape to close
- `KeyboardShortcuts`:
  - `⌘,` → Open Settings
  - `⌘Q` → Quit
  - `⌘R` → Refresh stats immediately
- First navigation focus: the most important stat (CPU)

### Dynamic Type
- All text uses SwiftUI's `Text` with default scaling (no fixed `.font(.body)`)
- Use system text styles: `.title`, `.headline`, `.body`, `.caption`, `.label`
- Popover layout adapts to larger text sizes:
  - Minimum touch target: 44pt
  - Scroll view when content exceeds available space at large text sizes
  - No text truncation at largest sizes — use wrapping
- Test with: `Dynamic Type → Accessibility Sizes` (Axiom, Calibri, Body at XXXL)

### Reduce Motion & Accessibility Preferences
- Respect `accessibilityReduceMotion` — disable non-essential animations when enabled
- Use `accessibilityReduceTransparency` — replace blur materials with solid backgrounds
- High contrast mode: use `Color.accentColor` for essential UI, ensure sufficient contrast ratios (4.5:1 minimum)
- Bold text: honor `NSApplication.shared.preferredContentSizeCategory` for `NSView`-based components

### Widget Accessibility
- WidgetKit's `accessibilityLabel` on widget configurations
- Widget timeline uses `.disabled` for placeholder states
- Long-press context menu on widgets has accessible labels

### Accessibility Inspector Testing
- Run Accessibility Inspector against every screen
- Verify: no accessibility warnings, all elements labeled, logical tab order
- VoiceOver test: navigate entire app with VoiceOver (⌘F5)

---

## Out of Scope (R8+)
- App icon design
- Onboarding flow
- Design system documentation
- App Store metadata and screenshots
- Setapp packaging
- Notarization
