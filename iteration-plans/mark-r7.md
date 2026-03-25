# Mark R7 — Accessibility

## Overview
Full accessibility support: VoiceOver, Dynamic Type.

## Features

### VoiceOver
- [ ] **All Controls Labeled** — accessibilityLabel on every interactive element
- [ ] **Canvas Announcement** — Describe annotation state changes
- [ ] **Navigation** — Full keyboard navigation without mouse

### Dynamic Type
- [ ] **Scalable UI** — All text adapts to system text size
- [ ] **Auto Layout** — Proper constraint system for resizing
- [ ] **Minimum Size** — Enforce minimum window size for readability

### Accessibility Audit
- [ ] **Accessibility Inspector** — Verify all elements pass audit
- [ ] **Reduce Motion** — Honor `NSAccessibility.isReduceMotionEnabled`

## Technical Approach
- Set `accessibilityLabel`, `accessibilityHint`, `accessibilityRole` on all views
- Use `NSAccessibility` protocols
- Dynamic Type via `NSFont.preferredFont(forTextStyle:)` + Auto Layout

## Files to Modify/Create
- `Accessibility.swift` — accessibility helpers/extensions
- Update all `*.swift` files with accessibility attributes
- Update `MainViewController.swift` and `ToolbarView.swift`

## Build
```bash
cd /Users/mauriello/Dev/mark-macos
xcodegen generate && xcodebuild -scheme Mark -configuration Debug build 2>&1 | tail -5
```

## Success Criteria
- VoiceOver can navigate entire app
- Text scales correctly with Dynamic Type
- All controls accessible via keyboard alone
