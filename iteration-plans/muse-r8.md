# Muse — R8: App Store Submission, Launch

## Goal
Submit Muse to the Mac App Store and execute a successful launch.

---

## Scope

### App Store Connect
- Create app entry: name "Muse", subtitle, full description
- 100-character keyword list
- Category: Music / Entertainment
- Pricing: Free with Pro IAP, or $4.99 paid
- Screenshots: 6-8 per supported Mac display size (MacBook, iMac, Mac Pro)
- App preview video: 30-second demo
- Age rating
- App Privacy answers (analytics, music library access, streaming accounts)
- Contact info for App Review

### Build & Notarization
- Code sign with "3rd Party Mac Developer Application" certificate
- Hardened runtime enabled
- Notarize via `xcrun altool --notarize-app`
- Validate: `productbuild --check-signature`
- Build for both Intel and Apple Silicon (universal binary)

### IAP Setup
- Pro tier: "Muse Pro" subscription ($9.99/year) or ($2.99/month)
- Features: unlimited playlists, cloud sync, all EQ presets, AirPlay multi-room, no ads
- Free tier: limited to 100 tracks, 5 playlists, basic EQ

### Submission & Review
- Upload via Xcode Organizer
- Submit for review
- Expedited review if needed
- Respond to App Review feedback promptly

### Launch Day
- Social posts: X, Reddit r/macapps, Product Hunt
- Update beta testers and invite them to leave reviews
- Monitor Crashlytics / Sentry for crash spikes
- Monitor App Store Connect for review status
- Respond to first reviews

---

## Out of Scope (R9+)
- Post-launch iteration
