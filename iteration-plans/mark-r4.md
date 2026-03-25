# Mark R4 — Menu Bar & Shortcuts

## Overview
Menu Bar Extra, keyboard shortcuts customization, presets.

## Features

### Menu Bar Extra
- [ ] **NSStatusItem** — Menu bar icon for quick access
- [ ] **Quick Actions** — Start presentation, capture screenshot, recent files
- [ ] **Preferences Access** — Link to settings from menu bar

### Keyboard Shortcuts
- [ ] **Global Hotkeys** — Register global keyboard shortcuts (Carbon / NSEvent.addGlobalMonitorForEvents)
- [ ] **Customizable Bindings** — User-configurable shortcuts stored in UserDefaults
- [ ] **Shortcut Recorder** — UI to rebind shortcuts

### Presets
- [ ] **Annotation Presets** — Save/load color + stroke width combinations as named presets
- [ ] **Preset Manager UI** — List, create, delete, rename presets
- [ ] **Preset Storage** — Codable in UserDefaults or JSON file

## Technical Approach
- `LSUIElement` = false (keep Dock icon) + `NSStatusItem` for menu bar
- `HotKey` via Carbon `RegisterEventHotKey` or `CGEvent` tap
- Presets as Codable structs saved to `~/Library/Application Support/Mark/`

## Files to Modify/Create
- `MenuBarController.swift` — NSStatusItem management
- `HotKeyManager.swift` — global shortcut registration
- `ShortcutRecorderView.swift` — rebind UI
- `PresetManager.swift` — preset CRUD
- `PresetStore.swift` — persistence

## Build
```bash
cd /Users/mauriello/Dev/mark-macos
xcodegen generate && xcodebuild -scheme Mark -configuration Debug build 2>&1 | tail -5
```

## Success Criteria
- Menu bar icon appears and shows quick actions
- Global hotkeys trigger actions even when app is in background
- Users can save and load annotation presets
