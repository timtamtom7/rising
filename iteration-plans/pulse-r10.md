# Pulse — R10: Launch, Privacy Policy, Localization, Post-Launch Monitoring

## Goal
Ship Pulse to the world. Set up a public privacy policy, add localization for major markets, configure crash reporting and analytics, and establish post-launch monitoring for stability and adoption.

---

## Scope

### Privacy Policy
- Hosted at: `https://pulseapp.com/privacy` (or GitHub Pages: `username.github.io/pulse/privacy`)
- Privacy policy must cover:
  - **Data collection**: Pulse reads macOS system statistics (CPU, RAM, disk, network, temperature). No personal data is collected, stored externally, or transmitted to any server.
  - **Local storage**: All sampled data stays in `~/Library/Application Support/Pulse/pulse.db` on the user's machine.
  - **iCloud sync**: If enabled, only user preferences (not stats) sync via iCloud key-value store. No personal data.
  - **Widgets**: Widget data stays on-device; no third-party data sharing.
  - **Analytics**: No third-party analytics SDK. Optional anonymous crash reporting via Apple-bundled tools.
  - **Third parties**: No SDKs, no ad networks, no data brokers.
  - **Children**: Not directed at users under 13.
  - **Contact**: email address for privacy inquiries
- Links from: App Store description, Setapp listing, Settings → About
- Add "Privacy Policy" link to app's About window

### Localization — Internationalization (i18n)
- All user-facing strings in `Localizable.strings` (or `.stringsdict` for pluralization)
- Languages for launch: English (base), plus:
  - **German** (`de.lproj`): Common — system monitoring is universally useful
  - **French** (`fr.lproj`): Common
  - **Japanese** (`ja.lproj`): Common
  - **Simplified Chinese** (`zh-Hans.lproj`): Common
- Strings to translate:
  - All UI labels ("CPU", "RAM", "Disk", "Network", "Temperature", "Battery")
  - All settings labels and descriptions
  - Notification text
  - Onboarding screens
  - Error messages
  - Pluralization rules for "minute(s)", "hour(s)", "day(s)"
- Number formatting: use `NumberFormatter` — respects locale decimal separators and grouping
- Date formatting: use `DateFormatter` — respects locale date order
- Temperature unit: user-configurable (°C / °F) — not locale-dependent
- Currency formatting for any paid features: use `NumberFormatter.currency`
- Localized screenshots for App Store in top 5 languages (optional at launch)

### Crash Reporting
- Use Apple-bundled `CrashReporter` (Xcode automatically includes crash reporting for App Store apps)
- For direct distribution: integrate `PLCrashReporter` (open source) or use Apple TestFlight beta
- Crash logs: automatically collected from App Store Connect → Privacy → Crash Logs
- Threshold: if any single crash affects >5% of sessions, alert via email
- Crash-free sessions target: >99%

### Post-Launch Monitoring
- **App Store Connect**:
  - Installations, active devices, crashes, App Store reviews
  - Daily check for first 2 weeks, weekly thereafter
- **Analytics (opt-in, privacy-first)**:
  - Use Apple's `Analytics` framework with `isEnabled` defaulting to false
  - Track: feature adoption (which settings are enabled), crash-free rate, session duration
  - No tracking of individual user behavior — aggregate only
- **GitHub Issues**:
  - Public issue tracker for bug reports and feature requests
  - Template: Bug report (with macOS version, Pulse version, steps to reproduce)
- **Adoption metrics**:
  - Set up a simple counter: "Total installs" (approximate via App Store rank or GitHub star count)
  - Track: free vs. paid conversion if monetizing

### Pre-Launch Checklist
- [ ] Privacy policy live at public URL
- [ ] All 10 languages fully translated (no "TODO" strings in any locale)
- [ ] TestFlight beta with 10+ external testers (if App Store distribution)
- [ ] Crash reporting verified working on TestFlight
- [ ] App Store submission reviewed by Apple (allow 1–3 business days)
- [ ] Setapp submission reviewed (if applicable)
- [ ] Marketing: Twitter/HackerNews/ProductHunt launch post drafted
- [ ] Support email alias configured
- [ ] Version bump to 1.0.0

### Post-Launch Checklist
- [ ] Monitor crash dashboard daily for first week
- [ ] Respond to App Store reviews (thank reviewers, reply to issues)
- [ ] Merge GitHub Issues into backlog, triage for 1.1 release
- [ ] Consider localized screenshots if adoption is strong in non-English markets
- [ ] Prepare for first patch release (1.0.1): crash fixes only, no new features

---

## End of Roadmap
Pulse 1.0 is shipped. The foundation (R1–R4) is solid, polish (R5–R8) is complete, and distribution (R9–R10) is handled. Future iterations: 1.1 bug fixes → 1.2 community features from GitHub Issues → 2.0 major feature releases.
