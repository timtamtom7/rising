# Swatch — R10: Launch, Privacy Policy, Localization

## Goal
Launch Swatch publicly: publish the website, host the privacy policy, set up localization for international markets, coordinate App Store release, and build post-launch support infrastructure.

---

## Scope

### Privacy Policy Page
**URL:** `https://layton.ca/swatch/privacy`

A plain-language privacy policy covering:
- **Data collected:** None from the app itself. Color history and palettes are stored locally on the user's device.
- **iCloud sync:** Palettes synced via user's own iCloud account. Apple does not have access to the content.
- **Third-party services:** No analytics, no tracking, no third-party SDKs that collect data.
- **Shortcuts integration:** When used with Shortcuts, Swatch only reads/writes the colors you explicitly interact with.
- **Widgets:** Widget extension reads from the app group container only.
- **Contact:** Email address for privacy inquiries.

Published as a static HTML page (no CMS needed). Single-page layout, mobile-responsive.

### Website Page
**URL:** `https://layton.ca/swatch`

Simple marketing page:
- App name + tagline
- Hero GIF: quick demo of picking a color and copying HEX
- Feature bullets (from App Store description)
- "Download on the Mac App Store" badge (SVG, linked to App Store product page)
- "For Setapp" mention if applicable
- Minimal footer: Privacy Policy | Support | © Layton

Single HTML file, deployable to any static host (Netlify, GitHub Pages, or Tommaso's existing infrastructure).

### Localization
All user-facing strings externalized via `.strings` files (Swift `LocalizedStringKey` or `String(format:)`).

**Initial languages (R10):**
| Language | Code | Notes |
|----------|------|-------|
| English (US) | en | Default (base) |
| Spanish | es | |
| French | fr | |
| German | de | |
| Japanese | ja | |
| Chinese (Simplified) | zh-Hans | |

**Localized content:**
- All UI labels and button text
- Notification messages
- Onboarding flow text
- App Store metadata (separate in App Store Connect, not via `.strings`)
- Error messages

**String externalization pattern:**
```swift
// Use
Text("HEX")

// Not
Text("HEX")  // hardcoded
```

**`.strings` file example (es.lproj/Localizable.strings):**
```
"HEX" = "HEX";
"Copy to Clipboard" = "Copiar al portapapeles";
"Pick Screen Color" = "Seleccionar color de pantalla";
```

**RTL support:** Not required in R10 (no right-to-left languages), but the layout uses auto-resizing so it won't break if Arabic is added later.

### Localization in Widgets
- Widget strings in `SwatchWidgets.strings` (separate bundle)
- Use `WidgetLocalization` framework (macOS 14+)

### App Store Release
- Submit via Xcode: **Product → Archive → Distribute → App Store Connect**
- Fill in **Version Release** preference: "Manually release" (do not auto-release)
- Wait for **App Store Review** (typically 1–2 days for macOS apps)
- Coordinate App Store release with:
  - Website going live
  - Social posts (if any)
  - Setapp submission (if applicable)
- Pre-warm App Store Connect with all metadata entered in R9

### Launch Checklist
- [ ] Privacy policy page live
- [ ] Website page live
- [ ] All screenshots uploaded to App Store Connect
- [ ] App Store version submitted for review
- [ ] Localization strings complete for all 6 languages
- [ ] Final notarization ticket stapled to `.app`
- [ ] `CHANGELOG.md` updated in source repo
- [ ] GitHub release tagged (`v1.0.0`)
- [ ] Homebrew Cask entry (optional, for direct distribution)
- [ ] Setapp vendor portal submission (if applicable)

### Support Infrastructure
- **Support email:** `support@layton.ca` (or reuse existing)
- **Support page:** `https://layton.ca/swatch/support` (links to email or simple FAQ)
- **Bug reporting:** Link to GitHub Issues or a dedicated feedback form
- **CHANGELOG.md:** Semantic versioning, maintained in the repo

### Post-Launch Monitoring
- App Store Connect Sales & Trends (daily for first week, weekly after)
- App Store reviews — respond to all reviews (even negative, especially negative)
- Crash logs via Xcode Organizer (automatic with App Store distribution)
- iCloud sync errors — log to a local file for debugging

### Version Numbering
- **v1.0.0** for first public release
- Semantic versioning: `MAJOR.MINOR.PATCH`
- Minimum macOS version noted in release notes

### Build & Run
- Target: macOS 13.0+
- Localization `.strings` files must have 0 missing keys (verified via `genstrings` or custom script)
- All 6 language `.lproj` folders present in main app bundle and widget extension bundle
- Zero warnings, notarized build, ready for App Store

---

## Future (Post-R10)
- Additional languages (Portuguese, Italian, Korean, etc.)
- Android companion app
- Safari extension for web color picking
- Alfred/BetterTouchTool integrations
- Color palette sharing (export to link)
