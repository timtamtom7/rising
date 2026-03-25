# Caliber — R9: App Store Metadata, Screenshots, Setapp, Notarization

## Goal
Prepare for distribution: App Store listing, Setapp inclusion, notarization, and all required infrastructure.

---

## Scope

### App Store Listing

#### Metadata
- **App Name:** Caliber
- **Subtitle:** Screen Measurement Tool
- **Description (1700 char limit):**
  ```
  Caliber is the precision screen measurement tool for designers and developers.
  Measure any UI element, region, or distance on screen with pixel-perfect accuracy.
  
  KEY FEATURES
  — Measure any region with click-and-drag simplicity
  — See dimensions in both pixels and points (Retina-ready)
  — Measure distances between two points
  — Angle measurement for precise layouts
  — Built-in color picker — sample any color on screen
  — Pixel grid overlay on Retina displays
  — Ruler guides for alignment
  — UI Element Inspector — like Accessibility Inspector, built in
  — Export to PNG with annotations
  — Figma and Sketch integration
  — Sync measurements across devices with iCloud
  — Measurement presets for common component sizes
  — macOS Shortcuts integration
  — Full keyboard operation
  
  Caliber lives in your menu bar — press ⌘⇧M to measure anything.
  ```
- **Keywords:** screen measure, pixel ruler, design tool, UI measurement, pixel perfect, Figma companion, macOS app
- **Category:** Developer Tools / Productivity
- **Pricing:** $9.99 (or Setapp)
- **Requires:** macOS 13.0+
- **Languages:** English (initial), localized in R10

#### Screenshots (App Store)
- 6 screenshots, 1920×1200pt minimum, PNG format
  1. Menu bar icon + popover with last measurement
  2. Active measurement overlay with dimension label
  3. Ruler guides mode
  4. Color picker mode
  5. Measurement history panel
  6. Settings / Preferences panel
- App preview video (optional, 30s): demo of full measurement workflow

#### App Store Icon
- 1024×1024pt icon (same as main app icon)
- No text in icon (App Store policy)

### Setapp Packaging
- Prepare `Caliber.app` bundle for Setapp inclusion
- Setapp uses a special entitlement and signed package
- Follow Setapp's packaging guidelines: `SetappManifest.plist`
- Signed with Setapp-specific Developer ID certificate
- Package format: `.setapp` (contains `.app` bundle + manifest)
- Contact Setapp team for inclusion (their submission portal)
- Bundle ID for Setapp: `com.caliber.mac.setapp` (separate from direct sales)

### Notarization
- Notarize app with `xcrun notarytool` before distribution
- Hardened Runtime: enabled in entitlements
- Required entitlements:
  - `com.apple.security.app-sandbox`: false (required for screen capture)
  - `com.apple.security.automation.apple-events`: true (for Figma/Sketch integration)
  - `com.apple.security.files.user-selected.read-write`: true
- App is NOT sandboxed (screen measurement requires system-level access)
- Notarization ticket stapled to app bundle: `xcrun stapler staple Caliber.app`

### Developer ID Distribution
- Sign app with Developer ID certificate (Apple Developer Program)
- Create distributable `.dmg` for direct sales:
  - `productbuild --identifier com.caliber.mac --sign "Developer ID Application: ..." Caliber.dmg`
- Create installer package `.pkg` for direct download:
  - `productbuild --component Caliber.app /Applications --sign "Developer ID Application: ..." Caliber.pkg`

### Distribution Options
1. **Direct website download** — DMG with notarized app
2. **Mac App Store** — through App Store Connect
3. **Setapp** — subscription service inclusion

### Entitlements File
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "...">
<plist version="1.0">
<dict>
  <key>com.apple.security.app-sandbox</key>
  <false/>
  <key>com.apple.security.automation.apple-events</key>
  <true/>
  <key>com.apple.security.files.user-selected.read-write</key>
  <true/>
</dict>
</plist>
```

### Build Configuration
- Debug vs Release schemes properly configured
- Code signing identity: "Developer ID Application" for Release
- Archive and validate before upload to App Store Connect
- TestFlight-like process via App Store Connect for beta testers

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: SQLite.swift
- Successfully notarized app bundle
- Zero warnings, clean build

---

## Out of Scope (R10)
- Localization
- Privacy policy hosting
- Launch day monitoring

