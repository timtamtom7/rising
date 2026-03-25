# Volt — R9: App Store Metadata, Screenshots, Setapp, Notarization

## Goal
Prepare all App Store listing assets, Setapp packaging, code signing, and notarization. Get the build ready for submission.

---

## Scope

### App Store Connect Setup
- Create app in App Store Connect (if not already)
- Bundle ID: `com.volt.app`
- Category: Utilities → Productivity (or Utilities)
- Pricing: Free (with potential paid features later) or $4.99
- Age rating: 4+
- Privacy manifest (`PrivacyInfo.xcprivacy`): no personal data collected
  - `NSPrivacyAccessedAPITypes`: none
  - `NSPrivacyCollectedDataTypes`: none
  - `NSPrivacyTracking`: false
- Required device capabilities: `macOS 13.0+`

### App Store Metadata
- **App name**: Volt — Battery Charge Limit
- **Subtitle**: Protect your MacBook battery
- **Description** (App Store, max 4000 chars):
  - Hook: "Volt keeps your MacBook battery one step ahead — stopping charge at your target level to extend battery lifespan."
  - Features: charge limiting, multiple profiles, battery health monitoring, time-to-empty estimates, history charts, Siri Shortcuts, widgets, iCloud sync
  - "Works completely offline. Your data stays on your device."
- **Keywords** (max 100 chars, comma-separated):
  `battery, charge limit, macbook, battery health, power, charger, battery saver, battery monitor`
- **Marketing URL**: `https://volt.app` (placeholder)
- **Support URL**: `https://volt.app/support`
- **Copyright**: `© 2025 Volt`
- **Version**: 1.0 (build 1)

### Screenshots
- 6 screenshots required for macOS:
  - 1: Popover — Control tab (showing limit slider + current charge)
  - 2: Popover — History tab (charge graph)
  - 3: Popover — Stats tab (health, cycles, temperature)
  - 4: Menu Bar Extra glance view
  - 5: Profile switcher (right-click menu)
  - 6: Onboarding flow
- Sizes: 1280×800 (minimum), 1920×1080 (recommended)
- Dark and light mode variants for each (12 total screenshots)
- No device frames — pure macOS UI shots
- Annotated with localized captions if applicable

### Localizations
- Primary: English (en)
- `Localizable.strings` generated from all user-facing strings
- Base language: English
- Prepare for: German (de), French (fr), Japanese (ja), Spanish (es) — initial translations not required for v1.0, but .strings file structure ready
- Number/formatted strings use `String(format:)` with `NumberFormatter` / `DateFormatter`
- Celsius/Fahrenheit uses `Measurement` and `MeasurementFormatter`

### Setapp Packaging
- If pursuing Setapp distribution:
  - Contact Setapp team for submission requirements
  - Build must be unsigned (.unsigned build submitted to Setapp)
  - Setapp may require a specific bundle ID prefix
  - Prepare `.setapp` package per Setapp guidelines
- Setapp-specific considerations:
  - No additional entitlements beyond standard
  - No trial period (Setapp handles licensing)
  - Disable launch-at-login by default (Setapp manages updates)

### Code Signing & Entitlements
- `Volt.entitlements`:
  - `com.apple.security.app-sandbox`: true
  - `com.apple.security.files.user-selected.read-write`: true (for export)
  - `com.apple.security.application-groups`: [group.com.volt.app]
  - `com.apple.developer.ubiquity-kvstore-identifier`: $(TeamIdentifierPrefix)com.volt.app (for iCloud)
- Code signing: Apple Developer ID, macOS Developer ID Application certificate
- Hardened Runtime: enabled
- Notarization: `xcrun notarytool` submit after signing
