# Swatch — R4: Color Mixing, Gradient Builder, Code Export, Menu Bar Extra

## Goal
Add color mixing (blend two colors), gradient builder (multi-stop gradients), per-palette code export formats, JSON/CSS export, and migrate to `NSMenuBarExtra` (macOS 14+ graceful fallback).

---

## Scope

### Color Mixing
- Blend two colors at a specified ratio
- UI: two color wells + slider (0–100%, default 50%) + result swatch
- Mix modes:
  - **RGB blend:** linear RGB interpolation
  - **CMYK blend:** mix in CMYK space
  - **HSB blend:** mix in HSB space (hue interpolation uses shortest arc)
- "Add to History" and "Add to Palette" buttons for the result color
- Accessible via "Mix Colors" toolbar button → sheet

### Gradient Builder
- Multi-stop gradient editor
- Stops: up to 8 color stops, each with a position (0.0–1.0) and a color
- Gradient types:
  - **Linear:** angle control (0–360°, default 90°)
  - **Radial:** center point control (x, y as 0–1 normalized)
  - **Angular** (conic): center point + starting angle
- Visual gradient preview bar (full width, 60pt tall)
- Stop markers on preview: draggable, click to add, right-click to delete
- Stop editor: selected stop shows color picker + position slider
- Live preview updates as stops are adjusted
- Export gradient as:
  - **CSS:** `linear-gradient(90deg, #color1 0%, #color2 100%)`
  - **SwiftUI:** `LinearGradient(gradient: Gradient(colors: [.color1, .color2]), startPoint: .leading, endPoint: .trailing)`
  - **Core Graphics:** `CGGradient(colorsSpace:CGColorSpaceCreateDeviceRGB(), colors:[cg1,cg2] as CFArray, locations:[0,1])!`
  - **UIKit:** `CAGradientLayer(colors: [UIColor, UIColor], locations: [0, 1])`
- "Save Gradient to Palette" → saves each stop color to the selected palette

### Palette Code Export
- Export entire palette as:
  - **Swift UIColor extension:**
    ```swift
    extension UIColor {
        static let myPalette = ColorPalette([
            UIColor(hex: "#4A90D9"),
            UIColor(hex: "#FF6B6B"),
            // ...
        ])
    }
    ```
  - **SwiftUI Color extension:**
    ```swift
    extension Color {
        static let myPalette = ColorPalette([
            Color(hex: "#4A90D9"),
            // ...
        ])
    }
    ```
  - **NSColor extension:**
    ```swift
    extension NSColor {
        static let myPalette = ColorPalette([
            NSColor(hex: "#4A90D9"),
            // ...
        ])
    }
    ```
  - **JSON:** `{ "name": "My Palette", "colors": [{ "hex": "#4A90D9", "rgb": {...} }, ...] }`
  - **CSS Variables:**
    ```css
    :root {
      --palette-color-1: #4A90D9;
      --palette-color-2: #FF6B6B;
      /* ... */
    }
    ```
  - **Tailwind config snippet:**
    ```js
    colors: {
      'my-palette': ['#4A90D9', '#FF6B6B', ...]
    }
    ```

### Menu Bar Extra (NSMenuBarExtra) — macOS 14+
- On macOS 14+, adopt `NSMenuBarExtra` (the new menu bar API)
- `NSMenuBarExtra` provides the system "runner" menu bar icon automatically
- Still uses `NSStatusItem` under the hood for macOS 13 compatibility
- The menu bar icon in R4 becomes a live preview: small color swatch matching last picked color
- The swatch icon updates reactively when `selectedColor` changes

### Palette Rename Inline
- Double-click palette name in sidebar → inline text field → Enter to confirm

### Build & Run
- Target: macOS 13.0+ (NSMenuBarExtra gated on `@available(macOS 14.0, *)`)
- No external dependencies
- Gradient math: pure Swift, no Core Image needed for preview
- Zero warnings, clean build

---

## Out of Scope (R5+)
- Shortcuts integration
- iCloud sync
- Global eyedropper hotkey customization
- Widgets
- Notification Center
- VoiceOver / Accessibility audit
