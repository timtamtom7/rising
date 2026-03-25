# Mark R10 — Launch

## Overview
Final launch: privacy policy, localization, submission.

## Features

### Privacy Policy
- [ ] **Privacy Policy Page** — Hosted at markapp.io/privacy
- [ ] **App Privacy Nutrition Labels** — Self-reported in App Store Connect
- [ ] **Data Collection Disclosure** — Screen recording access, iCloud sync

### Localization
- [ ] **Base Language** — English (en)
- [ ] **Localizable.strings** — All user-facing strings extracted
- [ ] **Language Support** — At minimum: English, German, French, Spanish, Japanese, Chinese (Simplified)
- [ ] **XLIFF Export** — For translation workflow

### Submission
- [ ] **Transporter** — Upload to App Store Connect
- [ ] **Review Submission** — Submit for Apple review
- [ ] **Build Numbers** — Match between Xcode and App Store Connect

### Post-Launch Prep
- [ ] **Version Strategy** — Semantic versioning (1.0.0)
- [ ] **Crash Reporting** — Xcode Cloud / Firebase / custom
- [ ] **Analytics Opt-in** — Telemetry with user consent

## Technical Approach
- Privacy policy as static HTML page
- `.strings` files per language in `Mark/Resources/`
- `genstrings` to extract strings
- Localization via Xcode project localization settings

## Files to Modify/Create
- `Mark/Resources/en.lproj/Localizable.strings`
- `Mark/Resources/de.lproj/Localizable.strings`
- `Mark/Resources/fr.lproj/Localizable.strings`
- etc.
- `privacy.html` — privacy policy page (host separately)
- Update `project.yml` with localization settings

## Build
```bash
cd /Users/mauriello/Dev/mark-macos
xcodegen generate && xcodebuild -scheme Mark -configuration Release build CODE_SIGN_IDENTITY="-" CODE_SIGNING_REQUIRED=NO 2>&1 | tail -5
```

## Success Criteria
- All strings localized
- Privacy policy accessible
- Build submitted to App Store
