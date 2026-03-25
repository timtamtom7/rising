# Caliber — R4: UI Inspector, JSON Export, Figma/Sketch Integration, Menu Bar Extra

## Goal
Add an accessibility-based UI element tree inspector, JSON/Figma-compatible export, direct send to Figma/Sketch, and migrate from NSStatusItem to SwiftUI Menu Bar Extra.

---

## Scope

### UI Element Tree Inspector
- New inspector mode activated via `⌘I` or toolbar button
- Uses `AXUIElement` Accessibility API to query UI element tree under cursor
- Hover over any element: highlights it with a blue overlay rect, shows element info tooltip
- Click to select: opens inspector panel showing:
  - Element type (AXButton, AXStaticText, AXImage, etc.)
  - Title / label / value
  - Frame (x, y, width, height in points)
  - Role description
  - Parent hierarchy (breadcrumb)
- Inspector panel: floating window (280×400pt), dark theme, font: SF Pro, 11pt
- Supports standard macOS apps; requires Accessibility permission (prompt if not granted)
- "Copy Element Info" button → copies all element data as formatted text
- "Measure Element" button → switches to region measurement with the element's frame pre-filled

### JSON Export
- Export measurements to structured JSON:
```json
{
  "version": "1.0",
  "exportedAt": "2025-01-15T10:30:00Z",
  "measurements": [
    {
      "id": "uuid",
      "type": "region",
      "frame": { "x": 100, "y": 200, "width": 320, "height": 240 },
      "displayName": "Header Button",
      "color": "#FF5733",
      "screen": "Display 1",
      "createdAt": "2025-01-15T10:30:00Z"
    }
  ]
}
```
- `NSSavePanel` for file save; also copy JSON to clipboard
- Import JSON (drag file onto Caliber) to restore and re-display measurements

### Figma-Compatible Export
- Export individual measurements or selections as Figma-compatible frame data
- Format: JSON matching Figma's node structure (partial — enough for import plugins)
- "Send to Figma" action:
  - Uses Figma's macOS share menu (NSSharingServicePicker) or clipboard
  - Copies node data to clipboard formatted for Figma's internal paste
  - Shows notification: "Copied for Figma — paste in Figma (⌘V)"
- "Send to Sketch" action: same pattern via Sketch's clipboard format

### Menu Bar Extra (SwiftUI)
- Migrate `NSStatusItem` to SwiftUI `MenuBarExtra` (macOS 14.0+)
- Falls back to `NSStatusItem` on macOS 13.x
- Menu bar UI:
  - Caliber icon (ruler SF Symbol, tinted)
  - Popover with quick actions: Measure, History, Inspector, Settings
  - Last measurement summary at top
- `MenuBarExtra` content uses SwiftUI `List` for history items
- Tray icon: 18×18pt template image

### Settings Panel
- Accessible via Preferences (⌘,) or menu bar → Settings
- Tabs: General, Shortcuts, Export, Advanced
- General: Launch at login toggle, default measurement mode (region/distance/angle), default units (px/pt)
- Shortcuts: customize global hotkey, per-mode hotkeys
- Export: default export format, annotation options, file naming pattern
- Advanced: accessibility permission status, clear accessibility cache, pixel density override

### Build & Run
- Target: macOS 13.0+ (MenuBarExtra graceful degradation)
- Swift Package Manager: SQLite.swift
- Zero warnings, clean build

---

## Out of Scope (R5+)
- Shortcuts integration
- iCloud sync
- Widgets
- Notification Center widget
- Onboarding

