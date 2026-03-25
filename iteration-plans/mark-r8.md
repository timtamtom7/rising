# Mark R8 — Icon, Onboarding & Design System

## Overview
App icon design, onboarding flow, comprehensive design system.

## Features

### App Icon
- [ ] **macOS Icon** — 1024x1024 PNG, all required sizes via icon set
- [ ] **Menu Bar Icon** — Template image (1x, 2x)
- [ ] **Icon Generation** — Use SF Symbols or custom asset

### Onboarding
- [ ] **First Launch Flow** — Welcome screens explaining key features
- [ ] **Permissions Flow** — Guide user through Screen Recording permission
- [ ] **NSPageController** or SwiftUI — Onboarding view controller

### Design System
- [ ] **Colors** — Semantic colors (primary, secondary, destructive, etc.)
- [ ] **Typography** — Consistent text styles (title, body, caption)
- [ ] **Spacing** — Grid system (8pt baseline)
- [ ] **Components** — Styled buttons, inputs, cards
- [ ] **Asset Catalog** — Centralized in Assets.xcassets

## Technical Approach
- Onboarding stored in `UserDefaults` (`hasCompletedOnboarding`)
- Design tokens in a `Design.swift` file or asset catalog
- `NSColor` extensions for semantic colors

## Files to Modify/Create
- `Assets.xcassets/AppIcon.appiconset/` — icon assets
- `Design.swift` — design system constants
- `OnboardingViewController.swift` — welcome flow
- `Components/` — reusable styled views
- `AppDelegate.swift` — onboarding check

## Build
```bash
cd /Users/mauriello/Dev/mark-macos
xcodegen generate && xcodebuild -scheme Mark -configuration Debug build 2>&1 | tail -5
```

## Success Criteria
- App icon renders correctly in Finder, Dock, menu bar
- First launch shows onboarding flow
- UI follows consistent design system
