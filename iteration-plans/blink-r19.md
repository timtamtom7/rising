# blink — Round 19: Team, Studio, Long-Term Architecture

## Goal
Build the internal team, studio infrastructure, and long-term architectural roadmap for Blink as a standalone sustainable product company.

---

## Scope

### Team Building
- Hire: 1 iOS engineer, 1 Android engineer, 1 ML engineer (on-device models)
- Part-time designer for ongoing UI/UX iteration
- Contractor relationships for localization (10 languages)
- Consider: ML model training partnership (Apple's Core ML team, or academic collaboration)

### Studio / Workspace Setup
- Set up proper development studio for Blink (if not already on main machine)
- CI/CD pipeline: GitHub Actions for automated builds, TestFlight distribution
- Crash reporting: integrate Crashlytics / Sentry
- Analytics: postHog or Mixpanel (privacy-compliant, no PII)
- Error monitoring: track which features cause most issues

### Long-Term Architecture Planning
- Blink 2.0 technical design doc: what changes if we hit 100K users?
- Database migration strategy: move from SQLite to something more scalable if needed
- On-device ML: what models to train, what to fine-tune from Apple models
- Scalable cloud infrastructure: if/when we move off Firebase to own backend
- Security audit: third-party security review of clip storage and sharing infrastructure
- Accessibility audit: full VoiceOver + Dynamic Type pass, accessibility linter in CI

### User Research
- User interviews: 10 power users, 10 churned users
- NPS survey: instrument in-app
- Competitive analysis: what's new in personal video capture (Google Clips successors, new Apple features)
- Roadmap prioritization: what should Blink 2.0 focus on based on user research

---

## Out of Scope
- Blink 2.0 implementation (R20)
