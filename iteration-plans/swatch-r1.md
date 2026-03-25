# Swatch — R1: Menu Bar Color Picker, Eyedropper, Color Formats, History

## Goal
A working menu bar color picker with a popover UI, screen eyedropper, all standard color formats, and a color history. This is the core loop: pick a color, see it in every format, copy what you need.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with a small color swatch icon (18×18pt, template image that previews the currently selected color as the icon tint)
- `NSPopover` (360×480pt) showing the color picker UI
- Proper click-outside dismissal
- Clicking status item toggles popover; clicking outside closes it

### Color Picker Popover
```
┌─────────────────────────────────────────┐
│  Swatch                        [👁️] [⚙️] │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐    │
│  │                                 │    │
│  │       [Selected Color]          │    │
│  │          120×120pt              │    │
│  │                                 │    │
│  └─────────────────────────────────┘    │
│                                         │
│  HEX    #4A90D9  [📋]                    │
│  RGB    rgb(74, 144, 217)  [📋]          │
│  HSB    hsb(207°, 66%, 85%)  [📋]       │
│  CMYK   cmyk(66%, 34%, 0%, 15%) [📋]    │
│  Swift  Color(red:0.29,green:0.57,      │
│          blue:0.85)          [📋]       │
│  NSColor  NSColor(red:0.29,green:       │
│          0.57,blue:0.85,alpha:1.0) [📋] │
│                                         │
│  ── Eyedropper ──────────────────────   │
│  [🎯 Pick Screen Color]                  │
│                                         │
│  ── Color History ────────────────────  │
│  [■][■][■][■][■][■][■][■][■][■]        │
│  (last 20 colors, click to restore)     │
│                                         │
│  [Copy HEX]  [Copy RGB]  [Copy Swift]    │
│                                         │
└─────────────────────────────────────────┘
```

### Eyedropper Tool (Screen Color Picker)
- `CGWindowListCreateImage` to capture the screen
- Custom magnifier overlay: 11×11 pixel grid, 10× magnification, centered crosshair
- Follows mouse cursor; ESC cancels
- Picked color becomes selected color + added to history
- Uses `NSScreen.main` coordinates; handles multi-monitor setups
- Global hotkey: `⌘⇧C` to activate eyedropper from anywhere

### Color Model
```swift
struct SwatchColor: Codable, Identifiable, Hashable {
    let id: UUID
    var hex: String          // "#RRGGBB"
    var name: String?        // optional human label
    var createdAt: Date

    var rgb: (r: Int, g: Int, b: Int)
    var hsb: (h: Double, s: Double, b: Double)
    var cmyk: (c: Double, m: Double, y: Double, k: Double)

    init(hex: String)
    init(nsColor: NSColor)
    init(rgb: (r: Int, g: Int, b: Int))
}
```

### Color Format Display
- HEX: `#RRGGBB` format
- RGB: `rgb(R, G, B)` — integers 0–255
- HSB: `hsb(H°, S%, B%)` — hue 0–360°, sat/bright 0–100%
- CMYK: `cmyk(C%, M%, Y%, K%)` — all percentages 0–100%
- Swift UIColor: `Color(red:0.29, green:0.56, blue:0.85)` (0–1 doubles)
- NSColor: `NSColor(red:0.29, green:0.56, blue:0.85, alpha:1.0)` (0–1 doubles)
- Each row has a copy button that copies the formatted string to clipboard
- Main "Copy" buttons at bottom for quick copy of selected format

### Color History
- Persisted in `UserDefaults` as JSON array of last 20 `SwatchColor`s
- Stored as array of hex strings to minimize storage
- Displayed as a grid of 10×2 color squares (20×20pt each)
- Clicking a history color restores it as the selected color
- History clears via a "Clear History" option in the ⚙️ menu

### macOS App Lifecycle
- `main.swift` (no @main attribute) → `NSApplication.shared → AppDelegate`
- `applicationDidFinishLaunching`: init ColorStore, build status item
- App starts in menu bar, no main window in R1
- Standard app menu: About Swatch, Preferences (placeholder), Quit Swatch
- Launch at login via `SMAppService.mainApp` (macOS 13+)

### ColorStore
- `@MainActor class ColorStore: ObservableObject`
- `@Published var selectedColor: SwatchColor`
- `@Published var colorHistory: [SwatchColor]` (max 20)
- `copyToClipboard(_ text: String)` → `NSPasteboard.general.setString`
- Persists history to `UserDefaults` on every change
- Loads history from `UserDefaults` on init

### Native Color Panel Fallback
- "Open System Color Picker" button in popover
- Opens `NSColorPanel.shared` anchored to the popover
- Listens to `NSColorPanel.shared.setTarget` / `NSColorPanel.shared.color` changes via notification
- Synced with selected color (bidirectional)

### Build & Run
- Target: macOS 13.0+
- No external dependencies in R1 (pure Apple frameworks)
- Zero warnings, clean build
- Test: pick a color, copy each format, restart app, history persists

---

## Out of Scope (R2+)
- Named color palettes
- Palette import/export
- Color harmonies
- Magnifier zoom during eyedropper
- Contrast checker
- Gradient builder
- iCloud sync
- Widgets
