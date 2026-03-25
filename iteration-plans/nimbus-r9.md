# NIMBUS — R9: Beta Program, TestFlight, Feedback

## Goal
External beta testing: TestFlight, feedback collection, iteration.

---

## Scope

### TestFlight Setup
- App Store Connect: create beta app
- External testers: public link or invite-only
- Internal testers: direct邀请
- Build notes per release

### CI/CD for Beta
- Auto-build on main branch push
- Auto-upload to App Store Connect
- Version scheme: `X.Y.Z-beta.N`

### Feedback System
- In-app "Send Feedback" button
- Structured feedback: feature area, description, screenshots
- Feature request voting (local)
- Email fallback with pre-filled template

### Bug Reporting
- Template: steps to reproduce, expected vs actual, system info
- Screenshot/video attachment
- Include recent logs (user-approved)

### Beta Communication
- In-app "What's New in Beta" section
- Changelog per build
- Tester announcement channel
- Discord/Slack (optional)

### Beta Metrics
- Beta-specific feature flags
- Usage tracking (opt-in)
- Crash rate monitoring

### TestFlight Review
- Triage feedback by severity
- Fix critical issues before public
- Iterate on UX confusion
- Stabilize for 1.0

---

## Out of Scope (R10)
- Public launch
- Marketing
