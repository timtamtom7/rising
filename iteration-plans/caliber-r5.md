# Caliber — R5: Shortcuts, iCloud Sync, Presets

## Goal
Integrate with macOS Shortcuts for automation, sync measurement history across devices via iCloud, and add measurement presets for common component sizes.

---

## Scope

### Shortcuts Integration
- Expose Caliber actions via `Intents` framework (`AppIntents` protocol, macOS 13+)
- Available Shortcut actions:
  - **"Measure Region"** → triggers measurement overlay, returns last measurement result
  - **"Get Last Measurement"** → returns width, height in px/pt, color
  - **"Measure and Copy"** → triggers measurement, copies dimensions to clipboard, returns result
  - **"Export Measurement History"** → exports history as JSON to a file
  - **"Apply Preset"** → overlays a preset dimension on screen
- Run result includes: `{widthPx, heightPx, widthPt, heightPt, colorHex, timestamp}`
- Shortcut appears in Shortcuts.app with Caliber branding
- Trigger Shortcuts from Caliber popover: "Run Shortcut…" menu item

### iCloud Sync
- Uses `NSUbiquitousKeyValueStore` for lightweight key-value sync
- Stores measurement history and presets as JSON blobs
- Sync is eventual — conflicts resolved by `lastWriteWins` with timestamp
- Sync indicator in status bar popover (small cloud icon with checkmark/spinner)
- On new device: prompts to merge or replace local history
- History limit: last 500 measurements sync to iCloud (local SQLite stores full history)
- Sync toggle in Settings → Advanced

### Measurement Presets
- Predefined common component sizes (design system tokens):
  - **Spacing:** 4pt, 8pt, 12pt, 16pt, 24pt, 32pt, 48pt
  - **Buttons:** 44×44pt (touch target), 32×32pt, 24×24pt
  - **Icons:** 16×16pt, 20×20pt, 24×24pt, 32×32pt
  - **Typography:** Line heights of 12, 14, 16, 20, 24, 32pt
  - **Cards:** 320×180pt, 375×211pt (iPhone), 768×432pt (iPad)
  - **Safe Area:** Dynamic Island / notch-aware presets
- Preset panel: accessible from overlay toolbar or menu bar → Presets
- Visual grid of presets with live comparison overlay: clicking a preset draws it over the current screen
- **Custom presets:** user can save any measurement as a named preset (stored in SQLite + iCloud)
- Preset naming: user-defined string + optional category tag
- "Compare to Preset" mode: shows delta between measured and preset (e.g., "+8px wide")

### Shortcut Preset Trigger
- Each preset can have an assigned global hotkey (per-preset, stored in UserDefaults)
- Hotkey triggers overlay pre-sized to that preset
- Useful for quickly checking common spacings

### History Enhancements
- History now supports tags/labels
- Search/filter history by color, dimensions range, tags, date
- Bulk export: select multiple history items → export as batch JSON

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: SQLite.swift, `Intents` framework
- Zero warnings, clean build

---

## Out of Scope (R6+)
- Widgets
- Notification Center
- Full accessibility audit
- Onboarding

