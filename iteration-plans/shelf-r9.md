# Shelf — R9: App Store Metadata, Screenshots, Setapp, Notarization

## Goal
Everything needed to ship on the Mac App Store: screenshots, metadata, localization base, Setapp packaging, and notarization.

---

## Scope

### App Store Metadata
- **App name:** Shelf — Menu Bar Organizer
- **Subtitle:** Tidy up your menu bar.
- **Description (280 chars):** "Shelf lives in your menu bar to keep it clean. Hide, organize, and group your menu bar icons by importance. Multiple layouts, spacers, auto-hide on idle, and a global shortcut to reveal everything. Your menu bar, your way."
- **Keywords:** menu bar, menu bar organizer, hide icons, menubar, status bar, dock, declutter, productivity, macos (comma-separated, 100 char limit)
- **Category:** Utilities
- **Pricing:** $4.99 (standalone) or $0 (Setapp)
- **Content rating:** 4+
- **Requires:** macOS 13.0+

### Screenshots (App Store)
- 5 screenshots required for Mac App Store
- All at 1280×720pt (16:9)
- Screenshot set:
  1. Menu bar popover showing grouped items (hero shot)
  2. Multiple layouts view (Work / Personal)
  3. Spacer configuration in the list
  4. Search/filter active
  5. Widget showing in Notification Center
- Dark mode variants for each (10 screenshots total)
- Use a frame generator (e.g., Pixelmator Pro, Screenshot Framer) to add MacBook bezel frames

### Preview Video (optional but recommended)
- 30-second walkthrough: click menu bar → show grouped items → hide one → switch layout → reveal all shortcut
- Clean voiceover with tagline "Your menu bar, your way."
- Filmed on macOS with a clean, dark desktop

### Localisation Base
- Base language: English (en)
- All user-facing strings in `Localizable.strings` (UTF-16 encoding)
- Strings to localise: all UI labels, button titles, notification content, onboarding text, App Store description, error messages, accessibility labels
- Number/date formatting: use `NumberFormatter` and `DateFormatter` with locale awareness (already in SwiftUI)
- Generate `Shelf.xliff` file for translator handoff
- All hardcoded strings replaced with `String(localized:)` or `NSLocalizedString`

### Privacy Policy
- Hosted at `shelf.app/privacy` (static HTML)
- Summary: no analytics, no third-party SDKs, no accounts, all data stored locally on device
- Accessibility API used only to read/write menu bar item visibility (user-initiated actions only)
- Required for App Store compliance

### App Store Connect Setup
- Create entry in App Store Connect
- Upload build via Xcode Organizer (requires notarization — see below)
- Fill in all metadata fields, enter banking and tax info
- Submit for review (Mac app review time: 1–3 days typically)

### Notarization
- Code sign with Developer ID certificate (`Developer ID Application`)
- Submit to Apple notary service: `xcrun notarytool submit Shelf.app --team-id <team-id> --apple-id <apple-id>`
- Wait for notarization to complete (typically 1–5 minutes)
- Staple ticket: `xcrun stapler staple Shelf.app`
- Verify Gatekeeper passes: `spctl --assess --type exec --verbose=4 Shelf.app`
- Gatekeeper must show "accepted" before uploading to App Store Connect

### Setapp Packaging
- If releasing via Setapp:
  - Follow Setapp submission guidelines (setapp.com/developers)
  - Provide DMG build without hardened runtime restrictions that conflict with Setapp's runner
  - Ensure `LSMinimumSystemVersion` = macOS 13.0
  - Build.app bundle inside a `.setapp` wrapper directory
  - Include Setapp-specific entitlements if required
  - Coordinate submission timing with Setapp team

### Entitlements
- App Sandbox: enabled (required for App Store)
-com.apple.security.app-sandbox: true
- com.apple.security.files.user-selected.read-write: true (for backup/restore)
- com.apple.security.files.downloads.read-write: true
- Hardened Runtime: enabled (required for notarization)

---

## Out of Scope (R10)
- Launch day execution
- Post-launch monitoring
- Privacy policy URL updates
