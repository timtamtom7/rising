# Chronicle — R9: App Store Assets, Screenshots, Localisation

## Goal
Everything needed to ship on the Mac App Store: screenshots, metadata, localization, and a polished listing.

---

## Scope

### App Store Metadata
- **App name:** Chronicle — Bill Reminder & Tracker
- **Subtitle:** Never miss a bill payment.
- **Description (280 chars):** "Chronicle lives in your menu bar so bills are always one click away. Track recurring payments, get reminders before due dates, and see your monthly spending at a glance. All data stays on your Mac."
- **Keywords:** bill reminder, bill tracker, bill pay, monthly bills, recurring payments, expense tracker, budget, finance, utility payments (comma-separated, 100 char limit)
- **Category:** Finance
- **Pricing:** $4.99 (standalone) or $0 (Setapp)
- **Content rating:** 4+
- **Requires:** macOS 13.0+

### Screenshots (App Store)
- 5 screenshots required for Mac App Store
- All at 1280×720pt (16:9)
- Screenshot set:
  1. Menu bar popover with upcoming bills (hero shot)
  2. Main bill list window
  3. Add/Edit bill sheet
  4. Monthly overview with spending breakdown
  5. Payment history
- Dark mode variants for each (10 screenshots total)
- Use frame generator to add MacBook bezel frames

### Preview Video (optional but recommended)
- 30-second walkthrough: menu bar → popover → add bill → mark paid → overview
- Voiceover with tagline "Never miss a bill."
- Filmed on macOS with clean desktop background

### Localisation (English first)
- Base language: English (en)
- All user-facing strings in `Localizable.strings` (or `.stringsdict` for pluralisation)
- Strings to localise: all UI labels, button titles, notification content, error messages, onboarding text, App Store description
- Number/currency/date formatting: use `NumberFormatter` and `DateFormatter` with locale awareness (already built into SwiftUI)
- `chronicle.xliff` file generated for translator handoff

### Privacy Policy
- Hosted at `chronicle.app/privacy` (static HTML page)
- Summarises: no analytics, no accounts, all data local, optional encrypted iCloud sync
- Required for App Store compliance

### App Store Connect Setup
- Create developer account entry if not already done
- Upload build via Xcode Organizer (requires notarization)
- Fill in all metadata fields
- Submit for review (review time: 1–3 days for Mac apps typically)

### Notarization
- Code sign with Developer ID certificate
- Submit to Apple's notary service (`xcrun notarytool`)
- Staple the notarization ticket to the app bundle
- Gatekeeper passes on user machines

### Setapp准备
- If releasing via Setapp:
  - Follow Setapp submission guidelines
  - Provide DMG build without hardened runtime restrictions incompatible with Setapp's runner
  - Ensure `LSMinimumSystemVersion` is set correctly
  - Provide a Build.app bundle inside a `.setapp` wrapper directory

---

## Out of Scope (R10)
- Launch day execution
- Post-launch monitoring
