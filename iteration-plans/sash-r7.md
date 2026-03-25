# Sash R7 — Accessibility, VoiceOver, Keyboard-Only Operation

**Tagline:** Sash works for everyone.

---

## Concept

R7 is about inclusion. Every feature must be accessible, navigable by keyboard alone, and respectful of system accessibility settings. VoiceOver support, keyboard-only navigation, Reduce Motion compliance, and full accessibility auditing. Sash should work for power users who can't use a mouse and users with visual impairments.

---

## R7 Scope

**In scope:**
- Full VoiceOver accessibility audit and support
- Keyboard-only navigation (all UI accessible via Tab, Arrow keys, Space/Enter)
- Reduce Motion compliance (disable animations when enabled)
- Accessibility preferences respected throughout

**Out of scope:**
- Localization (R10), App Store packaging (R9)

---

## VoiceOver Support

Every UI element must have a meaningful accessibility label and value.

### Menu Bar Popover

| Element | Accessibility Label | Accessibility Value |
|---------|-------------------|---------------------|
| "Sash" header | "Sash, window manager" | — |
| "Left Half" row | "Left half" | "Keyboard shortcut: Command Option Left Arrow" |
| Status line | "Current window" | "[App name] on [Monitor name]" |
| Settings button | "Open Settings" | — |
| Quit button | "Quit Sash" | — |

**Implementation:**
```swift
Text("Left Half")
    .accessibilityLabel("Left half")
    .accessibilityValue("Keyboard shortcut: Command Option Left Arrow")
```

### Full App Window

All controls must be reachable and operable via VoiceOver.

**Tab order (logical navigation):**
1. Window tabs (Snap, Layouts, Zones, Settings)
2. Tab content (each tab's controls)
3. Action buttons
4. Close/minimize/zoom

**Focus management:**
- When a sheet opens, initial focus goes to the first field
- When sheet closes, focus returns to the triggering element
- `FocusState` and `.focusable()` for SwiftUI focus management

**VoiceOver announcements:**
- When a layout is applied: "Layout [name] applied, [N] windows arranged"
- When snap occurs: "[Position name] applied to [window name]"
- When undo occurs: "Undid [action description]"

### Custom Zone Editor Accessibility

The screen preview with draggable zone must be keyboard-accessible:
- Arrow keys move the zone rectangle by 1px (10px with Shift)
- `Tab` moves between X, Y, W, H numeric fields
- Tab and Space activate numeric field for editing

```swift
// Keyboard-accessible zone rectangle
Rectangle()
    .accessibilityLabel("Zone area")
    .accessibilityValue("\(Int(zone.frame.origin.x)), \(Int(zone.frame.origin.y)), \(Int(zone.frame.width)) by \(Int(zone.frame.height))")
    .accessibilityAdjustableAction { direction in
        switch direction {
        case .up: zone.frame.origin.y -= 10
        case .down: zone.frame.origin.y += 10
        case .left: zone.frame.origin.x -= 10
        case .right: zone.frame.origin.x += 10
        @unknown default: break
        }
    }
```

---

## Keyboard-Only Navigation

**Global shortcuts (already in R1-R4, verified for accessibility):**

| Shortcut | Action |
|----------|--------|
| `⌘⌥←/→/↑/↓` | Half snap |
| `⌘⌥F` | Full screen |
| `⌘⌥C` | Center |
| `⌘⌥Q/E/Z/X` | Corner snaps |
| `⌘⌥[/]` | Edge strip snaps |
| `⌘⌥1-9` | Custom zone / layout |
| `⌘\` | Cycle windows |
| `⌘⇧Z` | Undo |
| `⌘⌥K` | Cascade |
| `⌘⌥=/-/5/0` | Opacity |
| `⌘,` | Open Settings |

**In-app navigation:**
- `Tab` / `⇧Tab`: move between controls
- `Arrow keys`: navigate within lists and segmented controls
- `Space` / `Enter`: activate buttons and list items
- `Escape`: close sheets, dismiss popover
- `⌘W`: close settings window

**Focus indicators:**
- All keyboard-navigable elements have a visible focus ring
- Focus ring color: accent blue (`#3b82f6`) with 2pt stroke
- No element is reachable by keyboard without a clear focus indicator

**Skip links:**
- Popover has a "Skip to content" link (first Tab stop) to jump directly to the main content area

---

## Reduce Motion

macOS "Reduce Motion" setting (`Accessibility > Display > Reduce motion`) disables animations.

**Compliance strategy:**
```swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

// Before any animation
withAnimation(reduceMotion ? .none : .default) {
    // state changes
}

// For explicit animation blocks
if !reduceMotion {
    // add spring/duration animations
}
```

**Affected animations (disabled when Reduce Motion is on):**
- Popover open/close (instant instead of animated)
- Sheet presentation (instant)
- Layout apply (no window travel animation — instant snap)
- Snap feedback border flash (instant on/off instead of fade)
- Zone highlight in editor
- Notification appearance (no slide-in, just appear)

**Snap feedback without animation:**
- Instead of blue border fading out, use a brief opacity flash (0→1→0 over 200ms CSS-style but instant when reduced)
- Actually: use a solid border that appears for 150ms then disappears (no fade)

---

## High Contrast Mode

All UI elements must render correctly in High Contrast mode.

**Strategy:**
- Use system semantic colors (`.primary`, `.secondary`, `.accentColor`)
- Avoid hardcoded colors for text — use `.primary` and `.secondary` which adapt
- Borders and dividers use `.separator` which thickens in High Contrast
- Icons use SF Symbols (template) which adapt to high contrast

**Testing:**
- Enable High Contrast in System Preferences > Accessibility > Display > Increase Contrast
- Verify all text is readable, all controls are distinguishable

---

## Accessibility Audit Checklist

| Element | Label | Value | Traits | Actions |
|---------|-------|-------|--------|---------|
| Menu bar icon | ✓ | — | Button | |
| Popover container | ✓ | — | Group | |
| Snap row | ✓ | ✓ (shortcut) | Button | |
| Layout row | ✓ | ✓ (# windows) | Button | |
| Zone row | ✓ | ✓ (monitor) | Button | |
| Settings tab | ✓ | — | Button / Selected | |
| Toggle | ✓ | ✓ (on/off) | Button / Switch | Adjust |
| Numeric field | ✓ | ✓ | None | SetValue |
| Zone preview | ✓ | ✓ (coords) | Adjustable | Increment/Decrement |
| Notification | ✓ | ✓ | — | |

---

## Technical Approach

**Accessibility APIs used:**
- `accessibilityLabel`, `accessibilityValue`, `accessibilityHint`
- `accessibilityAddTraits`, `accessibilityRemoveTraits`
- `accessibilityAdjustableAction`
- `@Environment(\.accessibilityReduceMotion)`
- `@AccessibilityFocusState`

**No new dependencies needed.**

**SwiftUI accessibility modifiers** used throughout:
```swift
Text("Left Half")
    .accessibilityLabel("Left half")
    .accessibilityValue("Keyboard shortcut Command Option Left Arrow")
    .accessibilityHint("Snaps the focused window to the left half of the screen")
    .accessibilityAction(.default) { /* activate */ }
```

**Accessibility audit tool:** Use macOS Accessibility Inspector (built into Xcode) to verify all elements before shipping R7.

---

## Success Criteria

- [ ] VoiceOver reads every popover element with meaningful labels
- [ ] VoiceOver reads layout names and window counts correctly
- [ ] All popover controls reachable and operable without mouse
- [ ] All settings window controls reachable and operable without mouse
- [ ] Tab order is logical in all views
- [ ] All animations disabled when Reduce Motion is on
- [ ] Snap feedback instant (not animated) when Reduce Motion is on
- [ ] High Contrast mode renders correctly
- [ ] All SF Symbols used as template images (adapts to system contrast)
- [ ] Focus ring visible on all keyboard-navigable elements
- [ ] Accessibility Inspector shows no warnings for Sash UI
