# Sash R4 — Menu Bar Extra, AppleScript, Corner Snap, Cascade

**Tagline:** Every corner, every space, every workflow.

---

## Concept

R4 adds the Menu Bar Extra (SwiftUI MenuBarExtra, macOS 14+) for lightning-fast layout switching, corner snap shortcuts, cascade windows, and AppleScript support for automation. Sash becomes a first-class automation citizen.

---

## R4 Scope

**In scope:**
- SwiftUI MenuBarExtra (macOS 14+, falls back to NSStatusItem on 13)
- AppleScript support for all major actions
- Corner snap shortcuts (snap to 4 corners, 4 edges)
- Cascade windows
- App window (full settings accessible via menu bar)

**Out of scope:**
- iCloud sync, Shortcuts integration, window opacity (R5)

---

## App Structure

### Menu Bar Extra (macOS 14+)

macOS 14 introduces `SwiftUI.MenuBarExtra` — a native menu bar item with a SwiftUI view hierarchy, no more `NSPopover`. Falls back to `NSStatusItem` + `NSPopover` on macOS 13.

**Menu Bar Extra view (macOS 14+):**
```
┌──────────────────────────────────────┐
│ 🔵 Sash                              │
├──────────────────────────────────────┤
│  QUICK LAYOUTS                       │
│  📐 Code + Docs              ⌘⌥1    │
│  📧 Email + Browser          ⌘⌥2    │
│  🎧 Music + Notes            ⌘⌥3    │
│                                      │
│  ─────────────────────────────────   │
│  WINDOW ACTIONS                      │
│  ⤹ Cycle Windows             ⌘`     │
│  ⤹ Undo Last                   ⌘⌥Z │
│  ⤹ Cascade Windows             ⌘⌥K │
│                                      │
│  ─────────────────────────────────   │
│  SNAP POSITIONS                      │
│  [↖] TL Corner        [↗] TR Corner │
│  [↙] BL Corner        [↘] BR Corner │
│                                      │
│  ─────────────────────────────────   │
│  ⚙ Open Sash Settings...    ⌘,      │
│  ⏻ Quit                     ⌘Q      │
└──────────────────────────────────────┘
```

Note: The SwiftUI `MenuBarExtra` is a pull-down menu style (not a popover). For the richer popover with zone editing, users open the full Sash app window via "Open Sash Settings."

### Full Sash App Window

R4 introduces a proper app window accessible via `⌘,` or "Open Sash Settings":

```
┌────────────────────────────────────────────────────────┐
│  Sash                                     [─] [□] [×]  │
├────────────────────────────────────────────────────────┤
│  [Snap] [Layouts] [Zones] [Settings]                   │
├────────────────────────────────────────────────────────┤
│                                                        │
│  (Tab content: see R2/R3 UI)                           │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- Window size: 560×480pt, resizable min 480×400pt
- This is a full app window that can stay open alongside other apps
- The menu bar popover/extra remains the quick-access interface

---

## Corner Snap Shortcuts

R4 adds 4-corner snap (in addition to existing half-snap). Undo moves from `⌘⌥Z` to `⌘⇧Z`.

| Action | Shortcut |
|--------|----------|
| Top-Left Corner | `⌘⌥Q` |
| Top-Right Corner | `⌘⌥E` |
| Bottom-Left Corner | `⌘⌥Z` |
| Bottom-Right Corner | `⌘⌥X` |
| Left Edge Strip | `⌘⌥[` |
| Right Edge Strip | `⌘⌥]` |
| Undo Last | `⌘⇧Z` |

**Corner snap dimensions:** 50% width × 50% height (same as half-snap but in the corner quarter)
```
┌─────────┬─────────┐
│ TL      │ TR      │
│ (⌘⌥Q)   │ (⌘⌥E)   │
├─────────┼─────────┤
│ BL      │ BR      │
│ (⌘⌥Z)   │ (⌘⌥X)   │
└─────────┴─────────┘
```

**Edge strip snap dimensions:** 25% width × 100% height (slim strip on left/right edge, vertically centered).
```
┌────┬──────────────┐
│    │              │
│ L  │              │
│ E  │              │
│ D  │              │
│ G  │   Main area  │
│ E  │              │
│    │              │
│ 25%│              │
└────┴──────────────┘
```

---

## Cascade Windows

`⌘⌥K` cascades all windows of the frontmost app (or all windows if no app focused).

**Cascade algorithm:**
```swift
let cascadeOffset = CGPoint(x: 30, y: -30)  // each window offset in points
let startPosition = CGPoint(
    x: screen.visibleFrame.minX + 60,
    y: screen.visibleFrame.minY + 60
)
var currentPosition = startPosition
let defaultCascadeSize = CGSize(width: 800, height: 600)

for window in windows {
    window.setPosition(currentPosition)
    window.setSize(defaultCascadeSize)
    currentPosition.x += cascadeOffset.x
    currentPosition.y += cascadeOffset.y
}
```

- Cascaded windows are positioned from top-left, each offset down-right
- Windows that would fall off the bottom of the screen wrap to a new column
- The cascade is applied to the screen of the frontmost window

---

## AppleScript Support

Sash exposes an AppleScript dictionary (`sdef`) for automation, enabling integration with Alfred, Keyboard Maestro, and native Automator/Shortcuts (pre-R5).

**AppleScript actions:**

```applescript
-- Snap the frontmost window to left half
tell application "Sash"
    snap front window position "left half"
    snap front window position "top left corner"
end tell

-- Apply a saved layout
tell application "Sash"
    apply layout "Development Setup"
end tell

-- Get current layout name
tell application "Sash"
    get current layout name
end tell

-- Cycle windows
tell application "Sash"
    cycle windows of front application
end tell

-- Get all layouts
tell application "Sash"
    get name of every layout
end tell

-- Undo last action
tell application "Sash"
    undo last action
end tell

-- Get window info
tell application "Sash"
    get name of front window of first application
    get bounds of front window of first application
end tell

-- Trigger corner snap
tell application "Sash"
    snap front window position "bottom right corner"
end tell
```

**Implementation:**
- Add `Sash.sdef` (AppleScript script definition file) to the bundle
- Implement handlers in `AppleScriptHandler.swift`
- Each scriptable action maps to a method in `WindowManager` / `LayoutManager`

**Scriptable methods:**
```swift
@objc func snapWindow(_ position: String) throws
@objc func applyLayoutNamed(_ name: String) throws
@objc func cycleWindowsOfFrontApp() throws
@objc func undoLastSnap() throws
@objc func getLayoutNames() throws -> [String]
@objc func getCurrentLayoutName() throws -> String
```

---

## Dock Icon

R4 makes the Dock icon available as an opt-in setting (R3 launched the app silently, dock icon hidden). Users who prefer a traditional app experience can enable it.

- Default: dock icon hidden (menu bar only)
- Setting: `sash.showDockIcon: Bool` in UserDefaults
- Change takes effect on next launch (set `LSUIElement = false/true` at runtime or via `app.setActivationPolicy`)

---

## Technical Approach

**MenuBarExtra (macOS 14+):**
```swift
@main
struct SashApp: App {
    var body: some Scene {
        MenuBarExtra {
            MenuBarExtraView()
        } label: {
            Label("Sash", systemImage: "rectangle.split.2x1")
        }
        // Fallback: also define Settings window
    }
}
```

**Dock icon toggle:**
```swift
// In AppDelegate
func setDockIconVisible(_ visible: Bool) {
    if visible {
        NSApp.setActivationPolicy(.regular)
    } else {
        NSApp.setActivationPolicy(.accessory)
    }
}
```

**AppleScript sdef:**
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "...">
<dict>
    <key>NSAppleScriptEnabled</key><true/>
    <key>osa_sdef</key><string>Sash.sdef</string>
</dict>
```

**Directory Structure Changes:**
```
Sash/
├── Sources/
│   ├── App/
│   │   ├── main.swift
│   │   ├── AppDelegate.swift
│   │   └── SashApp.swift             (macOS 14+, MenuBarExtra scene)
│   ├── WindowManager/
│   │   ├── WindowManager.swift
│   │   ├── WindowCycler.swift
│   │   ├── EdgeDragMonitor.swift
│   │   └── CornerSnap.swift          (new)
│   ├── Layouts/
│   │   ├── LayoutManager.swift
│   │   ├── SpaceTracker.swift
│   │   ├── AppLauncher.swift
│   │   └── LayoutStore.swift
│   ├── Automation/
│   │   └── AppleScriptHandler.swift  (new)
│   ├── UI/
│   │   ├── MenuBarExtraView.swift    (new)
│   │   ├── SashPopoverView.swift
│   │   ├── SashMainWindow.swift      (new: full settings window)
│   │   ├── LayoutListView.swift
│   │   ├── LayoutEditorView.swift
│   │   ├── CustomZoneListView.swift
│   │   ├── CustomZoneEditorView.swift
│   │   ├── SettingsView.swift
│   │   └── StatusLineView.swift
│   └── Models/
│       ├── SnapPosition.swift         (R4: add corners, edges)
│       ├── CustomZone.swift
│       ├── Layout.swift
│       └── WindowSnapshot.swift
└── Resources/
    └── Sash.sdef                      (new: AppleScript definition)
```

---

## Success Criteria

- [ ] SwiftUI MenuBarExtra renders correctly on macOS 14+
- [ ] Falls back to NSStatusItem popover on macOS 13
- [ ] All 4 corner snap shortcuts work and snap to correct position
- [ ] Left/right edge strip shortcuts work
- [ ] Cascade (`⌘⌥K`) cascades windows correctly
- [ ] AppleScript `snap` command works from Script Editor
- [ ] AppleScript `apply layout` command works
- [ ] Full settings window opens via `⌘,`
- [ ] Dock icon can be shown/hidden via setting
- [ ] Menu bar extra shows quick layouts at top
