# Caliber — R3: Multi-Monitor, Retina, PNG Export, Ruler Guides

## Goal
Handle multi-monitor setups correctly, properly account for Retina display scaling, add PNG export with annotations, and introduce a ruler overlay mode.

---

## Scope

### Multi-Monitor Support
- On hotkey trigger, show overlay window on **every** connected `NSScreen`
- Each screen gets its own `MeasurementOverlayWindow` instance
- `NSScreen.screens` drives window creation; windows track their owning screen
- Measurement coordinates are **screen-local** (origin = top-left of that screen's frame)
- When drag starts, lock to the screen where the drag began — no crossing screens mid-measurement
- Status popover shows which screen the measurement belongs to
- History items store `screenName` (from `NSScreen.localizedName`)

### Retina / Display Scaling
- Each `NSScreen` has its own `backingScaleFactor` (1.0, 2.0, or 3.0 for Retina)
- Measurement engine queries `screen.deviceDescription[NSDeviceDescriptionKey("NSCurrentDeviceResolution")]`
- All measurements display **both raw pixels** (physical) and **points** (logical = pixels / scale)
- User preference in Settings (R4) to default to px or pt
- Pixel grid overlay uses actual physical pixels, not logical — correct for Retina

### PNG Export with Annotations
- Export button in measurement popover (appears after measurement is captured)
- `NSBitmapImageRep` captures the measured region from screen
- Annotations rendered onto the bitmap:
  - Bounding rect border: 2px white stroke
  - Dimension label pill rendered at bottom-right corner of region
  - Optional: pixel grid overlay
  - Optional: color swatch
- Export dialog via `NSSavePanel`, default name: `Caliber_${width}x${height}_${date}.png`
- Copy PNG to clipboard as well (via `NSPasteboard`)
- Annotation options configurable: show/hide label, grid, color swatch

### Ruler Overlay Mode
- Toggle via `⌘R` when overlay is active
- **Horizontal guide:** a full-width dashed line across the selected screen
  - Draggable up/down — snaps to edges of UI elements using edge detection heuristics
  - Shows Y coordinate in pt/px at left edge
- **Vertical guide:** full-height dashed line across selected screen
  - Draggable left/right — snaps to edges
  - Shows X coordinate in pt/px at top edge
- Guides use `CGContext` drawing on overlay window's content view
- Crosshair intersection shows current X,Y coordinates
- Multiple guides supported (up to 4 horizontal + 4 vertical)
- Guide color: `#FF9500` (amber) with 80% opacity
- Remove guide: right-click guide line → "Remove Guide"
- "Clear All Guides" button in overlay toolbar

### Overlay Toolbar
- Minimal floating toolbar (translucent dark pill) at top of overlay window
- Buttons: Mode (Region/Distance/Angle toggle), Pixel Grid, Ruler, Export, Cancel
- Toolbar auto-hides after 3 seconds of inactivity, re-appears on mouse move

### Coordinate Display
- In ruler mode: live X,Y readout near cursor
- Format: `X: 234 px / 117 pt  Y: 512 px / 256 pt`
- Displayed in top-left corner of overlay, same pill style as dimension label

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: SQLite.swift
- Zero warnings, clean build

---

## Out of Scope (R4+)
- UI element tree inspector
- Figma/Sketch export
- Menu Bar Extra
- Shortcuts
- iCloud sync

