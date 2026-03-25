# Shelf — R7: Accessibility, Dynamic Type, VoiceOver

## Goal
Shelf is fully accessible: VoiceOver-compatible, supports Dynamic Type across all UI, and passes macOS accessibility guidelines.

---

## Scope

### VoiceOver Support
- Every UI element has a meaningful accessibility label
  - Menu bar icon: "Shelf menu bar app, [N] items hidden"
  - Item rows: "[App Name], [visibility state], double tap to toggle"
  - Eye toggle: "Hide [App Name]" or "Show [App Name]" (changes based on state)
  - Spacers: "Spacer, [type], double tap to edit"
  - Layout selector: "Current layout: [name], double tap to change"
- All actions accessible via VoiceOver (no visual-only interactions)
- Proper accessibility focus order: header → search → groups → items
- `accessibilityElementIsFocused()` and related methods implemented
- Accessibility rotor: add custom rotor for Shelf with actions (Hide Item, Show Item, Switch Layout)
- Test with VoiceOver (`⌘⌥F5`) before shipping

### Dynamic Type
- All text scales with user's preferred content size
- Popover max width grows to accommodate larger text (up to 480pt)
- Item names truncate with ellipsis at minimum sizes, never overflow
- Custom text styles using `Font` that respects Dynamic Type scaling
- Test at: Accessibility → Display → Text size → Largest ("Ax")
- Ensure no text clipping at any Dynamic Type size

### Keyboard Navigation
- Full keyboard navigation via Tab / Shift+Tab
- Arrow keys navigate within lists
- Space/Enter to toggle item visibility
- Escape to close popover
- `⌘F` to focus search bar
- All buttons and controls are keyboard-accessible

### Reduce Motion / Reduce Transparency
- Respect `NSApplication.isAccessibilityAnimationsEnabled` and `NSWorkspace.shared.isReduceMotionEnabled`
- Disable lift/shadow animations on drag (R3) when reduce motion is on
- Use crossfades instead of slide animations
- Reduce popover backdrop blur when reduce transparency is enabled

### Accessibility Inspector Audit
- Run Accessibility Inspector on all windows and popovers
- Fix any AX API warnings or errors
- Ensure all images/icons have accessibility labels (or `accessibilityElementsHidden`)
- Verify color contrast: WCAG AA minimum (4.5:1 for text, 3:1 for UI components)

### Visual Accessibility
- Do not rely solely on color to convey state (e.g., dimmed + icon, not just color)
- Eye icon / Eye.slash icon: both distinguishable without color
- Group headers have icons in addition to text labels
- Focus rings are clearly visible (custom ring color: amber accent)

### Widget Accessibility
- Widgets also need accessibility labels for all interactive elements
- VoiceOver reads widget content correctly in Notification Center

---

## Out of Scope (R8+)
- App icon design
- Onboarding flow
- Design system documentation
