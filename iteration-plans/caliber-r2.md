# Caliber — R2: Distance, Angles, Color Picker, History, Pixel Grid

## Goal
Add distance measurement between two points, angle measurement, integrated color picker, persistent measurement history, and a pixel grid overlay during measurement.

---

## Scope

### Distance Measurement Mode
- Toggle mode via modifier key during measurement: hold `Alt` to switch from region → distance mode
- **Distance mode:** first click = point A, second click = point B, shows connecting line
- Line style: 1px solid white, endpoint circles (6px diameter, white fill)
- Label at midpoint of line: distance in px and pt (diagonal = √(w²+h²))
  - e.g., `Distance: 400 px / 200 pt`
- Escape cancels current point

### Angle Measurement Mode
- Three-click measurement: vertex is the second click
- Shows two line segments with angle arc at vertex
- Label: angle in degrees (°) shown at the arc center
  - e.g., `45°`
- Angle arc: 1px dashed white arc, radius 20pt
- Labels for each segment length alongside each line

### Color Picker
- Hold `⌥` (Option) during or after measurement to activate color picker
- Uses `NSScreen.main?.colorUsingSpace(.deviceRGB)` approach — sample pixel under cursor
- Small color swatch square (16×16pt) appears in the measurement label pill
- On click: copies hex color to clipboard (e.g., `#FF5733`) and shows hex in label
- Color picker tooltip: "Click to copy #RRGGBB"
- Works with `CGWindowListCreateImage` for screen capture of a single pixel

### Measurement History
- `MeasurementStore` now persists to SQLite (SQLite.swift, same pattern as Chronicle)
- `measurements` table: id, type (region/distance/angle), data (JSON blob), color (nullable hex), screenName, createdAt
- `data` JSON blob: stores relevant geometry per type:
  - region: `{x, y, width, height, widthPx, heightPx}`
  - distance: `{x1, y1, x2, y2, distancePx, distancePt}`
  - angle: `{x1, y1, vertexX, vertexY, x2, y2, angleDeg}`
- History popover accessible from menu bar icon (clock icon) — shows last 20 measurements
- Each history item: thumbnail preview (small region capture), dimensions/color, timestamp
- Click history item: re-display measurement overlay on the captured region
- "Copy" and "Delete" per history item
- "Clear All History" with confirmation alert

### Pixel Grid Overlay
- When zoom level ≥ 2 (Retina), toggle pixel grid via `⌘G` while measuring
- Grid: 1px dark lines (`#000000` at 30%) at every pixel boundary within the selection rect
- Renders using SwiftUI `Canvas` or `NSBezierPath` overlay
- Grid fades out if selection is small (< 20px) to avoid visual noise
- Shows "Pixel Grid" badge in corner when active

### Measurement Label Enhancements
- Now supports multi-line display when both dimensions and color are shown
- Color swatch inline in label pill
- Angle label separate from region/distance label
- Label font: SF Mono, 11pt

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: SQLite.swift
- Zero warnings, clean build

---

## Out of Scope (R3+)
- Multi-monitor support
- Export to PNG
- Ruler guides
- Menu Bar Extra
- iCloud sync

