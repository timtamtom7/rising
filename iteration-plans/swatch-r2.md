# Swatch — R2: Palettes, Import/Export, Color Harmonies, Magnifier

## Goal
Add palette management (create, save, name), import/export in industry formats (ASE, ACO, GPL), color harmony generation (complementary, triadic, analogous), and a magnifier for precise eyedropper picking.

---

## Scope

### Palette Management
- **Create palette:** "New Palette" button in popover toolbar → modal sheet with name field
- **Save to palette:** When a color is selected, "Add to Palette" button → picker to choose which palette (or create new)
- **Palette list view:** Sidebar section in popover showing all saved palettes as collapsible lists
- **Palette colors:** Each palette stores up to 50 colors; displayed as a grid of swatches
- **Rename palette:** Right-click or long-press context menu on palette name
- **Delete palette:** Right-click context menu with confirmation alert
- **Select color from palette:** Clicking a palette color sets it as selected color

### Palette Data Model
```swift
struct ColorPalette: Codable, Identifiable {
    let id: UUID
    var name: String
    var colors: [SwatchColor]   // max 50
    var createdAt: Date
    var updatedAt: Date
}
```

### Palette Storage
- Palettes stored in `~/Library/Application Support/Swatch/palettes.json`
- Directory created on first palette creation
- Palettes loaded lazily on first access (not on every popover open)

### Palette Import
- **ASE** (Adobe Swatch Exchange): `.ase` files, binary format
  - Read using manual `Data` parsing (no external library)
  - Supports RGB, CMYK, Grayscale entry types
  - Converts to internal `SwatchColor` format
  - Import sheet: file picker → preview colors → confirm import

- **ACO** (Adobe Color swatch): `.aco` files
  - Read v1 and v2 ACO format
  - Handles RGB and CMYK color entries

- **GPL** (GIMP Palette): `.gpl` text format
  - Parse name/comments and RGB values from plain text
  - Each line: `Color: R G B` or `R G B Name`

- Import triggered via **File → Import Palette...** menu or drag file onto popover
- Invalid files show a descriptive error alert

### Palette Export
- **ASE export:** Binary ASE format, RGB entries
- **ACO export:** v2 ACO format
- **GPL export:** GIMP palette format (Name + RGB columns)
- **JSON export:** Full palette JSON with all color metadata
- **Export one color:** Right-click color → "Export as ASE/ACO/GPL"
- Export via sheet: choose format → choose location → save

### Color Harmonies
When a color is selected, show harmony colors in a section below the format display:
```
─ Harmonies ──────────────────────────────
[Complementary] [Triadic] [Analogous] [Split-C] [Tetradic]
```
- **Complementary:** `hue + 180°`
- **Triadic:** `hue + 120°`, `hue + 240°`
- **Analogous:** `hue - 30°`, `hue + 30°`
- **Split-Complementary:** `hue + 150°`, `hue + 210°`
- **Tetradic (Square):** `hue + 90°`, `hue + 180°`, `hue + 270°`
- Each harmony swatch is clickable (sets as selected color) and shows HEX on hover
- HSB math stays within 0–360° hue bounds (wraps)

### Eyedropper Magnifier
- Larger overlay: 200×200pt magnifier window
- Shows 15×15 pixel grid centered on cursor
- Each pixel cell is ~13pt
- Grid lines between pixels (1pt, dark gray)
- Large crosshair (2pt, white with dark outline) on center pixel
- Center pixel's color shown as HEX label below grid
- `+`/`-` buttons to zoom (8×, 10×, 15×, 20×)
- ESC to cancel, click to confirm
- Multi-monitor: handles `NSEvent.mouseLocation` correctly across screens

### Popover UI Updates (R2)
```
┌─────────────────────────────────────────┐
│  Swatch          [👁️] [📋] [⚙️]         │
├─────────────────────────────────────────┤
│ [New Palette] [Import] [Export ▾]       │
│                                         │
│ ▼ My Palettes                           │
│   [■ ■ ■ ■ ■] Palette Name        [⋮] │
│   [■ ■ ■ ■ ■] Another Palette     [⋮] │
│                                         │
│ ┌───────────────────────────────────┐   │
│ │       [Selected Color]            │   │
│ │          100×100pt                │   │
│ └───────────────────────────────────┘   │
│                                         │
│ HEX  #4A90D9    [📋]                    │
│ RGB  rgb(74, 144, 217)  [📋]            │
│ ...                                     │
│                                         │
│ ── Harmonies ───────────────────────    │
│ [■ complementary] [■] [■ triadic] [■] │
│                                         │
│ [Pick Screen Color]                     │
│ [Clear History]                         │
└─────────────────────────────────────────┘
```

### Keyboard Shortcuts (R2)
- `⌘N` — New palette
- `⌘I` — Import palette
- `⌘E` — Export selected palette
- `⌘⇧C` — Activate eyedropper
- `⌘1/2/3/4/5` — Copy HEX/RGB/HSB/Swift/NSColor
- `⌘0` — Clear selected color

### Build & Run
- Target: macOS 13.0+
- No external dependencies
- ASE/ACO parsing done with manual `Data` byte parsing
- Zero warnings, clean build

---

## Out of Scope (R3+)
- Contrast checker (WCAG AA/AAA)
- Palette generation from image (dominant colors)
- Color blindness simulation
- Color mixing
- Gradient builder
- iCloud sync
- Global hotkeys beyond eyedropper
