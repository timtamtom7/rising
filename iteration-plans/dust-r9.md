# DUST — R9: Beta Program, TestFlight, Feedback

## Goal
External testing: set up TestFlight beta, gather feedback, iterate on issues before public launch.

---

## Scope

### TestFlight Setup
- App Store Connect: create beta app
- Add external testers: email list or public link
- Define beta groups: internal (Tommaso only) / external
- Set availability: public or invite-only

### Beta Build Pipeline
- Auto-build on main branch via CI
- Auto-upload to App Store Connect
- Build notes for testers
- Versioning: `X.Y.Z-beta.N`

### Feedback System
- In-app feedback button
- Collect: system info, recent crash logs, feature votes
- "Share Feedback" opens email with pre-filled template
- Optional: include last scan results (user-confirmed)

### Bug Reporting
- Structured bug report template
- Screenshot/video attachment
- Reproduce steps field
- Severity classification

### Analytics in Beta
- Track beta-specific events
- Feature flag for beta-only features
- Usage heatmaps (optional, opt-in)

### Communication
- Changelog in app: "What's New in Beta"
- External changelog URL
- Announcement channel for testers
- Discord/Slack for tester community (optional)

### TestFlight Review
- Address critical bugs before public
- Collect and prioritize feedback
- Iterate on confusing UX
- Stabilize for public release

---

## Out of Scope (R10)
- Public launch
- Marketing campaign
- Press outreach
