# Caliber — R10: Launch, Privacy Policy, Localization

## Goal
Ship Caliber to the world: soft launch, privacy policy, and full localization for international markets.

---

## Scope

### Soft Launch

#### Pre-Launch Checklist
- [ ] All R1–R9 issues resolved and shipped to main branch
- [ ] Notarized build verified on clean macOS install
- [ ] App Store Connect: create app listing, submit for review
- [ ] Setapp: submit `.setapp` package
- [ ] Website: `caliberapp.com` (or appropriate domain) live with:
  - Product page with feature list
  - Download page (links to DMG and Mac App Store)
  - Pricing page
  - Support / contact page
  - Privacy policy page (see below)
- [ ] Social: Twitter/X account, brief announcement post
- [ ] Product Hunt submission (if applicable)
- [ ] Hacker News "Show HN" (if applicable)

#### Launch Day
- Coordinate simultaneous release: Mac App Store + direct download + Setapp
- Monitor for crash reports via `NSExceptionHandler` and CrashReporter
- Watch App Store Connect for review status
- Set up a simple email alias: `support@caliberapp.com` → redirects to personal email

#### Post-Launch Monitoring
- Crash reporting: use `PLCrashReporter` or similar for non-App Store builds
- Analytics (if opted-in): track measurement counts, feature usage, geography
  - Use a privacy-respecting analytics solution (e.g., Plausible Analytics or self-hosted)
  - No personal data, no tracking without consent
- Monitor feedback email for bugs and feature requests

### Privacy Policy

#### Content Requirements
Hosted at `caliberapp.com/privacy`, must cover:

1. **Data Collected:**
   - Measurement history (stored locally in SQLite)
   - iCloud sync data (stored in user's iCloud account)
   - App usage analytics (if any, opt-in only)

2. **Screen Recording Access:**
   - Caliber requires Screen Recording permission to measure pixels
   - Screen content is processed in-memory only and never stored persistently
   - No screenshots are uploaded anywhere

3. **Accessibility API:**
   - Uses Accessibility API to inspect UI elements when Inspector mode is enabled
   - Element data is processed locally and never transmitted

4. **Data Sharing:**
   - No third-party analytics SDKs
   - No data sold or shared with third parties
   - iCloud data is governed by Apple's iCloud terms

5. **Local Storage:**
   - `~/Library/Application Support/Caliber/` — measurement history, presets
   - `~/Library/Preferences/com.caliber.mac.plist` — settings

6. **Children:**
   - Caliber is not intended for use by children under 13

7. **Contact:**
   - `support@caliberapp.com`

#### Implementation
- Rendered as a simple HTML page hosted on static hosting (GitHub Pages, Netlify, etc.)
- Linked from: app's About panel, Settings, and website
- PDF version available for download

### Localization (i18n)

#### Supported Languages (Initial Wave)
| Language | Code | Status |
|----------|------|--------|
| English | en | Default |
| Spanish | es | R10 |
| French | fr | R10 |
| German | de | R10 |
| Italian | it | R10 |
| Japanese | ja | R10 |
| Chinese Simplified | zh-Hans | R10 |
| Korean | ko | R10 |

#### What to Localize
- All user-facing strings in the app (popover, settings, inspector, history)
- App Store description and keywords (per language)
- Onboarding panels
- Error messages and alerts
- Menu bar menu items
- Notification text
- Accessibility labels
- Installer and DMG strings

#### Implementation
- Use `String Catalog` (`Localizable.xcstrings`) — Xcode's built-in localization system
- Base language: English
- Each translation in `.xcstrings` file
- Use `NSLocalizedString` in AppKit code, `Text("key")` in SwiftUI
- Pluralization handled via `.init(format:arguments:)` and `String(localized:into:)`
- Date/time formatting: use `Date.FormatStyle` with locale-aware formatting
- Numbers: use `NumberFormatter` with locale

#### Language Detection
- Auto-detect from `Locale.current` on first launch
- User can override in Settings → General → Language
- Language change takes effect immediately without restart (where possible)

#### Externalized Strings File
- `Caliber/Resources/Strings/Localizable.xcstrings`
- All user-facing text extracted, including:
  - Button labels
  - Menu items
  - Popover text
  - Settings labels
  - Notification text
  - Error messages

#### Localized Screenshots (App Store)
- App Store screenshots needed for each primary language market
- At minimum: English (required), plus top 3 markets by revenue
- Each screenshot localized: language in UI matches the store listing

### Final Build & Release
- Target: macOS 13.0+
- Swift Package Manager: SQLite.swift
- Clean build, all tests passing
- Notarized, signed, ready for distribution
- Version: 1.0.0 (Semantic Versioning: MAJOR.MINOR.PATCH)

---

## Post-R10
- Quarterly minor releases (1.1, 1.2, etc.) for polish and new features
- Annual major releases for significant new capabilities
- Bug fixes as needed, shipped via App Store auto-update
