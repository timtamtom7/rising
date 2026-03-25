# Mark R9 — App Store Prep

## Overview
App Store metadata, screenshots, notarization.

## Features

### App Store Metadata
- [ ] **App Store Connect** — Create app entry with description, keywords, categories
- [ ] **Marketing Description** — Feature highlights, not just technical specs
- [ ] **Privacy Policy URL** — Link to hosted privacy policy
- [ ] **Support URL** — Link to support page

### Screenshots
- [ ] **All Sizes** — 2880x1800 (Mac Pro), 2560x1600 (Retina), etc.
- [ ] **Localized Screenshots** — EN, + any localization
- [ ] **App Store Preview Video** — Optional screen recording

### Notarization & Signing
- [ ] **Developer ID Certificate** — Valid signing certificate
- [ ] **Notarize** — `xcrun notarytool` or Xcode Organizer
- [ ] **Hardened Runtime** — Runtime protections enabled
- [ ] **Entitlements** — App Sandbox, com.apple.security.app-sandbox
- [ ] **App Store Connect API** — For upload via `altool` or Transporter

### Build Configuration
- [ ] **Release Scheme** — Proper signing, optimizations
- [ ] **Version & Build Numbers** — Proper incrementing

## Technical Approach
- Notarization via Xcode Organizer or `xcrun notarytool`
- App Store Connect for metadata entry
- Screenshots via QuickTime + Preview or automated capture

## Files to Modify/Create
- `Mark.entitlements` — sandbox and hardened runtime
- `Info.plist` updates — categories, privacy URL
- `project.yml` — release build settings
- Screenshots folder

## Build
```bash
cd /Users/mauriello/Dev/mark-macos
xcodegen generate && xcodebuild -scheme Mark -configuration Release build CODE_SIGN_IDENTITY="-" CODE_SIGNING_REQUIRED=NO 2>&1 | tail -5
```

## Success Criteria
- Release build succeeds with hardened runtime
- Notarization ticket attached
- Metadata ready for App Store submission
