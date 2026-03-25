# Swatch — R9: App Store Metadata, Screenshots, Setapp, Notarization

## Goal
Prepare Swatch for distribution: App Store Connect metadata, App Store screenshots (all sizes), Setapp packaging, notarization setup, and pre-launch legal and support infrastructure.

---

## Scope

### App Store Connect Setup
- **App Name:** Swatch
- **Bundle ID:** `com.layton.swatch`
- **App Category:** Developer Tools / Graphics & Design
- **Pricing:** Free (with optional "Swatch Pro" IAP: $4.99 for export to more formats, cloud sync, widgets — or include these free)
- **Territory availability:** All regions (default)
- **Age rating:** 4+ (everyone)

### App Store Metadata

**Description (170 characters max visible in store, full ~4000):**
```
Swatch — the color picker that lives in your menu bar.
Pick any color from your screen, save them to palettes,
check accessibility contrast, and export to Swift, CSS, ASE, and more.
Beautiful, fast, and local. No accounts.
```

**Keywords (100 characters max):**
```
color picker, color palette, eyedropper, hex, rgb, accessibility, contrast, wcag, swift color, design tool
```

**Marketing URL:** `https://layton.ca/swatch` (stub page, real page in R10)
**Support URL:** `https://layton.ca/swatch/support`
**Privacy Policy URL:** `https://layton.ca/swatch/privacy`

**What's New (first version):**
```
• Pick any color from your screen with the built-in eyedropper
• View colors in HEX, RGB, HSB, CMYK, Swift, and NSColor formats
• Color history (last 20 colors) — always accessible
• Copy any format to clipboard with one click
• Create and manage named color palettes
• Import/export palettes in ASE, ACO, and GPL formats
• Generate color harmonies (complementary, triadic, analogous)
• Accessibility contrast checker (WCAG AA/AAA)
• Extract dominant colors from any image
• Color blindness simulation
• macOS 13+ native app
```

### App Store Screenshots
All sizes required:
- **Mac 6.5" × 5.9" (2880×2592px):** 1x and 2x
- **Mac 5.5" × 5.5" (2520×2520px):** 1x and 2x (optional alternate)

Screenshots to capture:
1. **Popover open, color selected** — shows color picker with format rows and history
2. **Palette management** — sidebar with palette list, color grid
3. **Contrast checker** — WCAG panel with pass/fail
4. **Eyedropper magnifier** — screen picker in action
5. **Gradient builder** — multi-stop gradient with CSS export

Screenshots generated via:
- Automated SwiftUI screenshot capture script (no interface builder needed)
- Clean macOS appearance, light mode default, dark mode variants for all 5 screenshots

### Dark Mode Screenshots
- All 5 screenshots also captured in Dark Mode (System Appearance)
- Total: 10 screenshots (5 light + 5 dark)

### App Preview Video (optional)
- 15-second looped video showing: open menu bar → eyedropper → pick color → copy HEX → add to palette
- Recorded with QuickTime Player screen recording → edited in FCPX → exported as `.mov` H.264

### Setapp Packaging
If pursuing Setapp inclusion:
- Setapp provides a `SetappLicensing` framework (embedded via CocoaPods/SPM)
- Implement `SetappLicensingDelegate` for license checking
- No revenue share details needed — Setapp handles billing
- Package app as `.pkg` installer with Setapp signing
- Submission via Setapp vendor portal

### Notarization
- **Signing identity:** Developer ID Application (`Developer ID Application: Tommaso Mauriello (XXXXXXXXXX)`)
- **Notarization via Xcode:** Archive → Distribute → Developer ID → Upload
- **Stapling:** Staple the notarization ticket to the `.app` bundle
- **Hardened Runtime:** Enabled in build settings (`ENABLE_HARDENED_RUNTIME = YES`)
- **Entitlements file:**
  ```
  com.apple.security.app-sandbox = YES
  com.apple.security.files.user-selected.read-write = YES
  com.apple.security.files.downloads.read-write = YES
  com.apple.security.network.client = YES  (if fetching palettes from URL)
  com.apple.security.automation.apple-events = YES  (Shortcuts)
  com.apple.developer.icloud-container-identifiers = [iCloud.com.layton.swatch]  (R5, if using CloudKit)
  ```
- Test notarization: `sudo xcrun stapler validate Swatch.app`

### Entitlements Notes
- App Sandbox enabled for App Store (required for notarization)
- File access limited to user-selected files and app group container
- No network access needed for core functionality (iCloud via system framework)
- Shortcuts integration requires `com.apple.security.automation.apple-events`

### Distribution Options
- **App Store (primary):** Notarized + App Store Connect upload
- **Direct download:** Notarized `.app` in `.zip` or `.dmg`
- **Setapp (secondary):** Separate build with Setapp licensing

### Build & Run
- Target: macOS 13.0+
- Must pass `xcrun altool --validate-app` before App Store submission
- App Store icon must be exactly 1024×1024 (no padding)
- App icon must not contain the macOS menu bar shape (only use the swatch/app icon for the dock/icon)
- Zero warnings, zero errors, notarized, clean

---

## Out of Scope (R10)
- Public launch and marketing
- Privacy policy page hosting
- Localization (English only in R9, localization in R10)
- Press kit
- Social media
