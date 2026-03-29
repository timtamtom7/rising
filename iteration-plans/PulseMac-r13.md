# PulseMac R13 — Polish

## Theme
Finalize the app for App Store submission with a thorough polish pass across UI, accessibility, and launch readiness.

## Features
- **Launch Checklist** — Every pre-submission item checked: TestFlight build, Beta eligibility, Export Compliance, Age Rating, Privacy Nutrition Labels, screenshots, app preview video
- **App Store Listing** — Finalize title, subtitle, description, keywords, screenshots (5.5" + 6.7" + iPad), promotional text, and update text per localization
- **Dark/Light Mode Audit** — All screens verified in both modes; semantic colors used everywhere; no hardcoded `#RRGGBB` values; sheet/dialog backgrounds contrast-ratio compliant
- **Accessibility Audit** — VoiceOver labels on every interactive element; Dynamic Type support up to XXXL; Reduce Motion respected; color-not-only-information throughout; contrast ratios ≥ 4.5:1 for all text

## Technical Notes
- **Asset Audit:** Run `accessibilityInspect` CI step; fix all flagged issues before submission
- **Screenshot Generation:** Use Xcode snapshot tests or a dedicated screenshot harness to generate consistent device frames
- **Localization:** `Localizable.strings` verified for all user-facing strings; `genstrings` run to catch missing keys
- **Launch CI:** Fastlane ` deliver` pre-checked and ready; App Store Connect metadata validated before final submission
