# Sash R1 — Window Snapping, Foundation

**Tagline:** Snap windows where you want them, instantly.

---

## Concept

Sash is a macOS window manager that lives in your menu bar. Snap, resize, and position windows with keyboard shortcuts — no dragging, no guessing. It's the fastest way to organize your screen real estate. R1 establishes the core mechanic: predefined snap positions activated by hotkeys.

---

## Brand Identity

**Name:** Sash
**Tagline:** "Window management, simplified."
**Vibe:** Precise, fast, no-nonsense. Like a well-calibrated tool — every movement is intentional. Dark mode default with a crisp, modern feel. The menu bar icon is a stylized sash/window frame. Snapping feels physical — quick, satisfying, exact.

**Aesthetic direction:** Linear's precision meets a workshop tool. Every pixel earns its place. No warmth needed — this is a power tool.

**Colors:**
- Background: `#0d0d0d` (near-black)
- Surface: `#1a1a1a`
- Surface elevated: `#252525`
- Accent: `#3b82f6` (electric blue — the "snap" color)
- Accent secondary: `#60a5fa`
- Text primary: `#f5f5f5`
- Text secondary: `#a0a0a0`
- Text tertiary: `#666666`
- Border: `#2a2a2a`

**Typography:**
- SF Pro
- UI labels: SF Pro, medium, 13pt
- Keyboard shortcuts: SF Mono, medium, 12pt
- Section headers: SF Pro, semibold, 11pt, uppercase tracking 0.06em
- Status text: SF Pro, regular, 11pt

**Spacing:**
- 8pt grid system
- Menu popover padding: 12pt
- List item padding: 8pt vertical, 12pt horizontal
- Section gap: 16pt
- Corner radius: 8pt (cards), 6pt (buttons)

**Menu bar icon:**
- Small grid/sash icon, 18×18pt template image
- States: idle (gray), active/snapping (blue accent)
- No badge — minimal presence when not in use

---

## R1 Scope

**In scope:**
- Menu bar `NSStatusItem` with popover
- 6 predefined snap positions with keyboard shortcuts
- CGWindow + AXUIElement window manipulation
- Visual feedback on snap (brief highlight)

**Out of scope:**
- Custom zones, layouts, multi-monitor, undo, mouse gestures

---

## App Structure

### Menu Bar

Sash lives in the macOS menu bar as an `NSStatusItem`. No dock icon — menu bar only.

**Menu bar popover (400pt wide × 340pt max):**
```
┌──────────────────────────────────────┐
│  Sash                    [⌘ , ] [⏻] │
├──────────────────────────────────────┤
│  SNAP POSITIONS                      │
│                                      │
│  [←]  Left Half          ⌘ ⌥ ←     │
│  [→]  Right Half         ⌘ ⌥ →     │
│  [↑]  Top Half           ⌘ ⌥ ↑     │
│  [↓]  Bottom Half       ⌘ ⌥ ↓     │
│  [⤡]  Full Screen       ⌘ ⌥ F     │
│  [◉]  Center            ⌘ ⌥ C     │
│                                      │
│  ─────────────────────────────────   │
│  Focused window: Chrome             │
│  Position: Right Half               │
│                                      │
│  [Enable Sash at Login]              │
└──────────────────────────────────────┘
```

- `[⌘ ,]` opens settings popover (R1: empty stub)
- `[⏻]` quits the app
- Status line shows which window is currently focused and its current snap position (if any)

### Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Left Half | `⌘⌥←` |
| Right Half | `⌘⌥→` |
| Top Half | `⌘⌥↑` |
| Bottom Half | `⌘⌥↓` |
| Full Screen | `⌘⌥F` |
| Center | `⌘⌥C` |

### Visual Feedback

When a snap action triggers:
- A brief blue border flashes on the target window's new position (150ms, then fades)
- No other UI — the snap is the feedback

---

## Data Model

R1 stores no data. Preferences are handled via `UserDefaults`:

```swift
// UserDefaults keys
sash.snapPositions: [String: CGRect]    // future: custom zones
sash.launchAtLogin: Bool               // default: false
sash.lastSnappedWindow: String?        // AXUIElement ID (for undo tracking)
```

---

## Technical Approach

**Stack:**
- SwiftUI (macOS 13+) + AppKit hybrid
- AppKit entry point (`main.swift`, `NSApplication.shared`) hosting `NSHostingController`
- CGWindow + AXUIElement for window manipulation (Accessibility API)
- Global keyboard shortcuts via `CGEvent` tap or `MASShortcut` pattern
- Swift Package Manager

**Architecture:**
- `SashApp`: App entry point, holds `AppDelegate`
- `AppDelegate`: Manages `NSStatusItem`, `NSPopover`, hosts SwiftUI via `NSHostingController`
- `WindowManager`: Singleton. Handles all AXUIElement calls. `snap(window:to:)` is the core method
- `SnapPosition`: Enum — `leftHalf`, `rightHalf`, `topHalf`, `bottomHalf`, `fullScreen`, `center`
- `SashStore`: `ObservableObject` holding current focus window info and popover state

**Window Manipulation Strategy:**
1. Get frontmost app via `NSWorkspace.shared.frontmostApplication`
2. Get its `AXUIElement` reference via `AXUIElementCreateApplication(pid)`
3. Get the focused window via `kAXFocusedWindowAttribute`
4. Use `kAXPositionAttribute` and `kAXSizeAttribute` to set new frame
5. Frames calculated from `NSScreen.main.visibleFrame` (with dock/menu bar inset)

**Shortcut Registration:**
- Use `NSEvent.addGlobalMonitorForEvents` + `NSEvent.addLocalMonitor` for key events
- Check for `⌘⌥` modifier + arrow/F/C keys
- Return `.nobypass` from monitor to not swallow events if no match

**Menu Bar Popover:**
- `NSStatusItem` with `button.image` (template)
- `NSPopover` with `behavior: .transient`, `animates: true`
- SwiftUI view hosted via `NSHostingController`

**Edge Cases:**
- No focused window: silently do nothing
- Window cannot be resized (some legacy apps): catch `AXError.cannotComplete`, show brief inline warning in popover status line
- Multiple monitors: use `NSScreen.main` (the screen containing the focused window, detected via `NSEvent.mouseLocation`)

**Accessibility Permissions:**
- On first launch, check `AXIsProcessTrusted()` — if false, show a step-by-step guide in the popover explaining how to grant Accessibility access in System Preferences
- Provide a button that opens `AccessibilitySettings` URL or prefpane

**Directory Structure (R1):**
```
Sash/
├── Sources/
│   ├── App/
│   │   ├── main.swift
│   │   └── AppDelegate.swift
│   ├── WindowManager/
│   │   ├── WindowManager.swift
│   │   └── AccessibilityHelpers.swift
│   ├── UI/
│   │   ├── SashPopoverView.swift
│   │   ├── SnapPositionRow.swift
│   │   └── StatusLineView.swift
│   ├── Models/
│   │   └── SnapPosition.swift
│   └── Utilities/
│       ├── ShortcutMonitor.swift
│       └── UserDefaultsKeys.swift
├── Resources/
│   └── Assets.xcassets/
│       └── AppIcon.appiconset/
└── Sash.entitlements
```

**Chronicle Reference:** Chronicle uses `main.swift` → `AppDelegate` → `NSHostingController` for its menu bar app entry. Sash R1 follows this exactly, swapping Chronicle's `BillStore` for `WindowManager`.

---

## Testing

- Unit tests for frame calculation (given screen bounds, each snap position returns correct CGRect)
- Integration tests: mock AXUIElement calls to verify resize calls are correct
- Manual: trigger each shortcut, verify window snaps to correct position on a real macOS app

---

## Success Criteria

- [ ] App launches as menu bar item only (no dock icon)
- [ ] All 6 snap positions work via keyboard shortcut
- [ ] Snap positions match exactly (left half = 50% width, same height)
- [ ] Visual feedback flash appears on snap
- [ ] Status line shows current window name and position
- [ ] Accessibility permission guide shown if not granted
- [ ] Launch at login toggle works (stub implementation)
- [ ] App quits cleanly via menu bar quit button
