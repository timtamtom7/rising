# Sash R2 — Multi-Monitor, Custom Zones, Undo

**Tagline:** Every screen, every edge, every direction.

---

## Concept

R2 makes Sash truly powerful. Custom snap zones let you define exactly the regions you want. Multi-monitor support means Sash knows about all your screens. Window cycling, edge-drag resize, and undo round out the experience — Sash becomes the window manager you wish macOS shipped with.

---

## R2 Scope

**In scope:**
- Custom snap zones (user-defined regions)
- Multi-monitor support (snap to any screen, monitor-aware shortcuts)
- Window cycling (`⌘\``)
- Edge-drag resize (drag window edges to trigger snap)
- Undo last snap action (`⌘⌥Z`)

**Out of scope:**
- Saved layouts, Spaces binding, app launching with layout

---

## App Structure

### Menu Bar Popover R2

```
┌──────────────────────────────────────┐
│  Sash                    [⌘ , ] [⏻] │
├──────────────────────────────────────┤
│  [Predefined]  [Custom Zones]        │  ← segmented control
├──────────────────────────────────────┤
│  PREDEFINED                          │
│                                      │
│  [←]  Left Half          ⌘ ⌥ ←     │
│  [→]  Right Half         ⌘ ⌥ →     │
│  [↑]  Top Half           ⌘ ⌥ ↑     │
│  [↓]  Bottom Half        ⌘ ⥶ ⌥↓    │
│  [⤡]  Full Screen        ⌘ ⌥ F     │
│  [◉]  Center             ⌘ ⌥ C     │
│                                      │
│  ─────────────────────────────────   │
│  CUSTOM ZONES                        │
│                                      │
│  [+] Add Zone...                     │
│  • Upper Left (Monitor 1)            │
│  • 2/3 Width (Monitor 2)             │
│                                      │
│  ─────────────────────────────────   │
│  [⌘ `] Cycle Windows     [⌘⌥Z] Undo │
│                                      │
│  Focused: Chrome · Monitor 2         │
└──────────────────────────────────────┘
```

### Add/Edit Custom Zone Sheet

Presented as a sheet over the popover (480pt wide):

```
┌──────────────────────────────────────────┐
│  New Custom Zone              [Cancel]   │
├──────────────────────────────────────────┤
│  Zone Name                               │
│  ┌────────────────────────────────────┐  │
│  │ Upper Left Quadrant               │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Monitor                                 │
│  [Monitor 1: 3024×1964        ▼]        │
│                                          │
│  Position & Size                         │
│  X: [___1280___] Y: [___0___]           │
│  W: [___1440___] H: [___960___]         │
│                                          │
│  Or: Click and drag on screen preview   │
│  ┌──────────────────────────────────┐    │
│  │  ┌────────┐                     │    │
│  │  │ ●──────│ ← drag handles      │    │
│  │  │ zone   │                     │    │
│  │  └────────┘                     │    │
│  │        [Monitor Preview]        │    │
│  └──────────────────────────────────┘    │
│                                          │
│  Keyboard Shortcut                       │
│  [record shortcut: ⌘⌥1          ]       │
│                                          │
│  [Delete Zone]              [Save Zone]  │
└──────────────────────────────────────────┘
```

**Zone editor screen preview:** Miniature representation of the selected monitor with a draggable/resizable rectangle representing the zone.

---

## Multi-Monitor Support

- `NSScreen.screens` returns all connected monitors
- Each monitor has a `screenNumber` (CGDirectDisplayID) and `deviceDescription`
- Snap positions calculate from each monitor's `frame` (not just main's `visibleFrame`)
- Shortcut modifiers can target specific monitors (R3 feature; R2 snaps to the monitor the focused window is on)
- In the popover, zones are labeled with their monitor name (`Monitor 1`, `Monitor 2`, or the display name from `NSScreen.name`)
- Status line shows which monitor the focused window is on

**Monitor detection for snap:**
```swift
// Get the screen containing the frontmost window's frame center
let windowFrame = currentWindow.frame
let targetScreen = NSScreen.screens.first { $0.frame.contains(windowFrame.center) } ?? NSScreen.main
```

---

## Window Cycling (`⌘\``)

- Cycles through windows of the frontmost app (not all windows globally)
- Implementation: get `NSWorkspace.shared.frontmostApplication`, enumerate its `NSWindow` objects, cycle to next
- For apps that use `AXUIElement` differently (e.g., some Catalyst apps): fall back to `CGWindowListCopyWindowInfo`
- Cycle order: MRU (most recently used) + 1
- No visual indicator needed — the next window simply becomes focused

---

## Edge-Drag Resize

- Monitor mouse events globally
- When user drags a window edge (within 8px of the window border) and moves it to a screen edge or predefined threshold, snap to that zone
- Implementation: `NSEvent.addGlobalMonitorForEvents(matching: .leftMouseDragged)` + track if we're near a window edge
- Need to detect which window is under mouse — use `NSWindow.window(at:)` or `CGWindowListCopyWindowInfo`
- Snap zones for edge drag: same as predefined positions (left half, right half, top half, bottom half, full screen) — triggered by dragging to within 20px of screen edge
- Visual feedback: same blue border flash as keyboard snap

**Corner drag:**
- Drag to top-left corner region → snap to top-left quarter
- Drag to bottom-right corner region → snap to bottom-right quarter
- Corner regions are 200×200px squares at each corner of the screen

---

## Undo (`⌘⌥Z`)

- Store last window position before snap: `(windowId, previousFrame, previousScreen)`
- On undo, restore frame on the same screen
- Only one level of undo (last action only, not a stack)
- If undo is called on an already-undo'd window, do nothing
- Store in memory only (not persisted across app restarts)

```swift
struct UndoState {
    let windowId: CGWindowID
    let previousFrame: CGRect
    let previousScreen: NSScreen
}
var lastAction: UndoState?
```

---

## Custom Zone Data Model

```swift
struct CustomZone: Codable, Identifiable {
    let id: UUID
    var name: String
    var monitorIndex: Int              // index into NSScreen.screens
    var frame: CGRect                   // relative to monitor origin
    var shortcut: String?               // serialized shortcut (e.g., "⌘⌥1")
    var isEnabled: Bool
}

// UserDefaults keys (R2)
sash.customZones: Data                 // JSON-encoded [CustomZone]
sash.undoEnabled: Bool                 // default true
```

---

## Keyboard Shortcuts R2

| Action | Shortcut |
|--------|----------|
| Left Half | `⌘⌥←` |
| Right Half | `⌘⌥→` |
| Top Half | `⌘⌥↑` |
| Bottom Half | `⌘⌥↓` |
| Full Screen | `⌘⌥F` |
| Center | `⌘⌥C` |
| Undo Last | `⌘⌥Z` |
| Cycle Windows | `⌘\`` |
| Custom Zone 1 | `⌘⌥1` |
| Custom Zone 2 | `⌘⌥2` |
| Custom Zone N | `⌘⌥N` |

---

## Technical Approach

**Changes from R1:**

- `WindowManager` gains `customZones: [CustomZone]` property and `undoState: UndoState?`
- `CustomZoneEditorView`: SwiftUI view for adding/editing zones with screen preview
- `EdgeDragMonitor`: class that watches global mouse drags and triggers snap when threshold met
- `WindowCycler`: handles `⌘\`` window cycling
- Zones persisted to `UserDefaults` as JSON

**Screen Preview for Zone Editor:**
- Miniature rendering of selected monitor's frame using `Canvas` or `SwiftUI.Path`
- `DragGesture` on the preview rectangle to resize/reposition the zone visually
- Real-time CGRect output synced to the numeric fields

**Edge Drag Implementation:**
```swift
NSEvent.addGlobalMonitorForEvents(matching: [.leftMouseDragged, .leftMouseUp]) { event in
    let mouseLocation = NSEvent.mouseLocation
    if let window = NSWindow.window(at: mouseLocation) {
        let distanceToEdge = window.edgeDistance(from: mouseLocation)
        if distanceToEdge < 8 {
            // Start tracking potential edge drag
            // On mouse up near screen edge → trigger snap
        }
    }
}
```

**Directory Structure Changes:**
```
Sash/
├── Sources/
│   ├── App/
│   │   └── AppDelegate.swift          (+ zone management)
│   ├── WindowManager/
│   │   ├── WindowManager.swift         (+ custom zones, undo, edge drag)
│   │   ├── WindowCycler.swift
│   │   └── EdgeDragMonitor.swift
│   ├── UI/
│   │   ├── SashPopoverView.swift       (R2: segmented control)
│   │   ├── SnapPositionRow.swift
│   │   ├── CustomZoneListView.swift
│   │   ├── CustomZoneEditorView.swift  (new)
│   │   ├── MonitorPreviewView.swift    (new)
│   │   └── StatusLineView.swift
│   └── Models/
│       ├── SnapPosition.swift
│       └── CustomZone.swift           (new)
```

---

## Success Criteria

- [ ] Custom zones can be created with name, monitor, frame, and shortcut
- [ ] Custom zones appear in the popover list
- [ ] Custom zone shortcuts work globally
- [ ] Snap works correctly on all connected monitors
- [ ] Status line shows correct monitor for focused window
- [ ] `⌘\`` cycles through windows of frontmost app
- [ ] `⌘⌥Z` restores window to previous position (one level)
- [ ] Edge drag to screen edge triggers snap
- [ ] Corner drag to corner region triggers corner snap
- [ ] Custom zones persist across app restarts
