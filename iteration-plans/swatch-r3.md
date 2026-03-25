# Swatch — R3: Contrast Checker, Palette from Image, Color Blindness

## Goal
Add accessibility tooling (WCAG contrast checker), palette extraction from images via drag-and-drop, and color blindness simulation. These features turn Swatch from a picker into a color workbench.

---

## Scope

### Contrast Checker
- Dedicated panel accessible via a toolbar button or `⌘⇧K`
- Opens as a secondary popover panel or a sheet
- Two color inputs: foreground and background (each swatch + hex input)
- Auto-computes contrast ratio using WCAG 2.1 relative luminance formula:
  - L = 0.2126 * R + 0.7152 * G + 0.0722 * B (where RGB are linearized)
  - Contrast = (L1 + 0.05) / (L2 + 0.05)
- Results displayed:
  ```
  Contrast Ratio: 4.52 : 1
  
  ✓ AA Normal Text (4.5:1)  — PASS
  ✗ AA Large Text (3.0:1)   — PASS (large text = 3.0)
  ✗ AAA Normal Text (7.0:1) — FAIL
  ✗ AAA Large Text (4.5:1)  — FAIL
  
  Preview:
  [Sample text on background]
  ```
- Swap button to flip foreground/background
- "Apply as palette" button → creates a 2-color palette
- Pass/fail indicators: green checkmark for pass, red X for fail
- Minimum contrast for each level: AA normal=4.5, AA large=3.0, AAA normal=7.0, AAA large=4.5

### Palette Generation from Image
- Drag-and-drop zone in popover: "Drop image to extract colors"
- Supported formats: PNG, JPEG, HEIC, TIFF, WebP
- Uses `NSBitmapImageRep` to load image data
- K-means clustering (k=5 by default, configurable 3–10):
  1. Sample pixels from image (max 50,000 for performance)
  2. Run k-means with 10 iterations
  3. Return k cluster centroids as colors
- Alternative: median-cut algorithm via `CoreImage` CIFilter pipeline
- Extracted colors shown as a palette preview with HEX labels
- "Save as Palette" → name palette → save to palette library
- Slider to adjust number of colors (3–10)
- "Extract Again" button if result is not satisfying

### Color Blindness Simulation
- Panel showing how the selected color appears to different types of color-blind vision
- Uses Brettel/Viénot/Mollon algorithm (1997) — accurate simulation
- Supported types:
  - **Protanopia** (no L cones, red-blind)
  - **Deuteranopia** (no M cones, green-blind)
  - **Tritanopia** (no S cones, blue-blind)
  - **Protanomaly** (weak L cones)
  - **Deuteranomaly** (weak M cones, most common)
  - **Tritanomaly** (weak S cones)
  - **Achromatopsia** (complete, rare)
- Display: 7 small swatches side-by-side showing the original + 6 simulations
- "Add simulations to palette" button → adds all simulated colors to current palette
- Accessible from toolbar button or right-click color → "Simulate Color Blindness"

### Popover UI Updates (R3)
```
┌─────────────────────────────────────────┐
│  Swatch          [👁️] [📋] [⚙️]         │
├─────────────────────────────────────────┤
│ [New Palette] [Import] [Export ▾]       │
│                                         │
│ ▼ My Palettes                           │
│   [■ ■ ■ ■ ■] My Palette          [⋮]  │
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
│ [■] [■] [■]                            │
│                                         │
│ [🔍 Contrast] [🖼 Extract] [👁 Blind]  │
│                                         │
│  ── Image Extract ─────────────────    │
│  ┌───────────────────────────────────┐   │
│  │  Drop image here to extract       │   │
│  │  dominant colors                  │   │
│  └───────────────────────────────────┘   │
│                                         │
└─────────────────────────────────────────┘
```

### Contrast Checker Sheet (R3)
Full sheet (480×520pt) with:
- Two color wells (foreground/background) + hex text fields
- Contrast ratio display (large number)
- WCAG AA/AAA pass/fail table
- Live text preview (sample "The quick brown fox" in selected foreground on background)
- "Swap Colors" button
- "Add to Palette" button

### Color Blindness Sheet (R3)
Full sheet (500×300pt) with:
- Original color swatch (large)
- 7 simulation swatches in a horizontal row
- Each labeled with type name
- "Add all to Palette" button

### Performance Notes
- K-means runs on a background `Task` (not main actor) to avoid blocking UI
- Image decode uses `NSBitmapImageRep` on a background queue
- Color blindness simulation is stateless and fast (pure math, no I/O)

### Build & Run
- Target: macOS 13.0+
- No external dependencies
- Color blindness algorithm implemented from published academic paper
- Zero warnings, clean build

---

## Out of Scope (R4+)
- Color mixing
- Gradient builder
- Swift/NSColor code export per-palette
- JSON/CSS export
- Menu Bar Extra (NSMenuBarExtra)
- Shortcuts integration
- iCloud sync
