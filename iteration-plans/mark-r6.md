# Mark R6 — Widgets & Shortcuts Integration

## Overview
macOS Widgets, Apple Shortcuts integration.

## Features

### Widgets
- [ ] **Small Widget** — Quick-start presentation from Notification Center
- [ ] **Medium Widget** — Recent files + quick capture button
- [ ] **WidgetKit** — Widget extension target

### Shortcuts Integration
- [ ] **App Intents** — Present annotation actions as Shortcuts actions
- [ ] **Siri Suggestions** — Suggest Mark actions in Shortcuts app
- [ ] **Parameter Support** — Accept file path, annotation style as shortcut parameters

## Technical Approach
- WidgetKit with Widget extension target
- `AppIntents` framework (macOS 13+) for Shortcuts
- `AppIntent` protocol for each action (start presentation, annotate file, etc.)

## Files to Modify/Create
- `MarkWidget/` — Widget extension folder
- `MarkIntents.swift` — App Intent definitions
- `StartPresentationIntent.swift`
- `AnnotateFileIntent.swift`
- Info.plist updates for App Intents

## Build
```bash
cd /Users/mauriello/Dev/mark-macos
xcodegen generate && xcodebuild -scheme Mark -configuration Debug build 2>&1 | tail -5
```

## Success Criteria
- Widget appears in Notification Center widget gallery
- Mark actions appear in Shortcuts app
- Shortcuts can trigger Mark presentations
