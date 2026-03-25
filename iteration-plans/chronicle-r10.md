# Chronicle — R10: Launch, Marketing, Platform

## Goal
Ship. Get Chronicle into users' hands, set up post-launch monitoring, and plan the next cycle.

---

## Scope

### Launch Day
- Push build to App Store Connect and submit for review
- Confirm Setapp build is submitted (if applicable)
- Publish privacy policy page
- Update website (chronicle.app) with product page:
  - Hero: app icon + tagline
  - Feature list (3–4 bullets)
  - Screenshots (same as App Store)
  - Download link pointing to Mac App Store
  - "Available on Setapp" if applicable
- Tweet / announcement: "Chronicle is live on the Mac App Store. Never miss a bill payment."
- Post to:
  - Product Hunt (coordinate launch day submission)
  - Hacker News (Show HN if appropriate)
  - Relevant subreddits (r/macapps, r/MacSetapp if applicable)

### Launch Metrics to Track
- App Store page views (via App Store Connect)
- Download count
- Crash reports (via Xcode Cloud / Firebase Crashlytics if added)
- Notification delivery success rate (track in-app)
- User feedback emails (monitor designated inbox)
- Social mentions (set up alerts for "Chronicle macOS" / "Chronicle bill reminder")

### Launch Communications
- Email to personal network (brief, authentic — not a press release)
- If Setapp: notify Setapp team of launch for potential featuring
- Update personal bio / website to mention Chronicle

### Post-Launch Bug Triage
- Monitor Feedback Assistant / App Store Connect crash logs
- Daily review of any crash reports for first 2 weeks
- Establish severity levels: crash > data loss > notification failure > UI polish
- Fix critical bugs (crashes, data corruption) within 24h, push patch build

### Post-Launch: Community
- r/macapps thread: respond to comments, answer questions
- Product Hunt: engage with comments, post update if major feature added

### v1.1 Planning
- Based on user feedback, identify top 3 most-requested features
- File issues / plan for v1.1 (out of scope for this document)
- Common requests to anticipate:
  - Dark mode improvements
  - More recurrence options (custom interval)
  - Import from CSV / bank statements
  - Multiple profiles (personal / business)
  - Apple Watch companion

### Maintenance
- Update `CHANGELOG.md` with every release
- Increment build number on every TestFlight/App Store push
- Keep dependencies (SQLite.swift) up to date with security patches
- Monitor macOS version adoption; bump minimum supported version annually

### Archive
- All R1–R9 deliverables reviewed and confirmed complete
- Design source files archived in `Design/Source/`
- This spec is the source of truth — update it before starting any new work
