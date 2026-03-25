# Cast — R8: App Store Submission, Launch

## Goal
Submit Cast to the Mac App Store and execute a successful launch.

---

## Scope

### App Store Connect
- App entry: name "Cast", subtitle, full description
- Description highlights: Chromecast + Smart TV support, one-click screen cast, recording, PiP preview
- 100-character keywords: Chromecast, screen mirror, Smart TV, cast, stream, display, mirroring, TV
- Category: Utilities / Lifestyle
- Pricing: Free with Pro IAP, or $4.99
- Screenshots: 6-8 per display size — device list, cast controls, PiP, history, settings
- App preview video: 30-second walkthrough
- Age rating
- App Privacy: disclose screen recording, local network access, camera/microphone access
- Contact info

### IAP Setup
- Pro tier: "Cast Pro" ($9.99/year or $2.99/month)
- Pro features: 4K casting, multi-device, scheduled casts, unlimited recording, no watermark
- Free tier: 1080p, single device, 30-min recording max, watermark

### Build, Code Sign & Notarize
- Universal binary
- Hardened runtime
- Notarize via `xcrun altool`
- Validate with `productbuild`

### Submission
- Upload via Xcode Organizer
- Submit for review
- Expedited review if needed

### Launch Day
- Social posts: X, Reddit r/macapps, Product Hunt
- Update beta testers
- Monitor crash rate
- Respond to App Store reviews
- Support inbox

---

## Out of Scope (R9+)
- Post-launch iteration
