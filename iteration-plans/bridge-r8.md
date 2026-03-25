# Bridge — R8: Beta Program, Feedback, Pre-Launch Audit

## Goal
Run a structured beta program, collect and triage feedback, and perform a final pre-launch audit before App Store submission.

---

## Scope

### TestFlight / Beta Program
- Set up HockeyApp or TestFlight alternative (e.g., Crashlytics Beta, or use Apple's TestFlight)
- Public beta signup page with waitlist
- Beta release cadence: weekly builds off main branch
- Release notes per build (auto-generated from git commits)
- Beta tester communication channel (Discord, Slack, or email newsletter)

### Feedback System
- In-app feedback button: "Send Feedback" opens sheet with text input + optional screenshot attachment
- Feedback stored locally, uploaded on next app launch when on Wi-Fi
- Feedback categories: Bug Report, Feature Request, Performance Issue, Other
- Auto-attach: device info, app version, macOS version, recent logs (user opt-in)
- Feedback admin panel (macOS-only, separate target): view incoming feedback, mark as resolved

### Bug Tracking Integration
- Sync feedback to GitHub Issues or Linear via API
- Auto-create issue from feedback with label "beta-feedback"
- Link feedback to specific crash reports (if Crashlytics used)

### Pre-Launch Audit
- **Entitlements audit**: verify all entitlements are correct for distribution (com.apple.security.app-sandbox, com.apple.security.network.client, etc.)
- **Code signing**: ensure correct team ID, provisioning profile for Mac App Store distribution
- **Privacy nutrition label**: all data collection disclosed in App Store connect
- **Help documentation**: basic Help menu with FAQ, keyboard shortcuts reference
- **App Store screenshots**: 6-8 screenshots per locale (6.5" Retina MacBook display)
- **App Store preview video**: 30-second walkthrough of core features
- **Category and keywords**: research optimal App Store category and 100-character keyword list
- **Age rating**: fill out all required App Store connect forms

### Crash Reporting
- Integrate Sentry or equivalent for crash reporting
- Capture stack traces, device state, recent user actions
- Alert on spike in crash rate

---

## Out of Scope (R9+)
- App Store submission
- Marketing push
