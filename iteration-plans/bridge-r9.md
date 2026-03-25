# Bridge — R9: App Store Submission, Launch

## Goal
Ship Bridge on the Mac App Store. Final polish, submission, and launch day execution.

---

## Scope

### App Store Connect Setup
- Create app entry in App Store Connect
- Fill in all metadata: name, subtitle, description, keywords, category, pricing
- Upload screenshots for all supported display sizes (MacBook, Mac desktop)
- Upload preview video
- Configure age rating questionnaire
- Set up in-app purchases (none for launch; leave scaffolding for future)
- App Privacy: answer all data collection questions accurately
- Add beta testflight external tester group if not yet done

### Build for Distribution
- Set code signing identity: "3rd Party Mac Developer Application: [Team]"
- Enable hardened runtime (`ENABLE_HARDENED_RUNTIME`)
- Archive build in Xcode, export for Mac App Store distribution
- Notarize via `xcrun altool --notarize-app`
- Validate with `productbuild --check-signature`

### Submission
- Upload binary via Xcode Organizer or `xcrun altool`
- Submit for review
- Set release date: " manually release" on approval
- Request expedited review if timeline requires (emergency if bug fix)

### Launch Day
- Pre-launch: verify all App Store info is live and correct
- Launch time: post on social channels (X, Mastodon, Reddit r/macapps)
- Hacker News, Product Hunt if applicable
- Monitor App Store Connect for review status
- Support inbox ready for incoming user questions
- Launch day stream: watch for crashes in Crashlytics/Sentry

### Post-Launch Monitoring
- Daily App Store Connect sales/review monitoring for first week
- Respond to first customer reviews
- Watch crash rate; if > 0.5% crash rate, hotfix immediately
- Monitor beta feedback channel for new reports from production users

---

## Out of Scope (R10)
- Post-launch feature roadmap
- Major version follow-up
