# Bridge — R10: Post-Launch Iteration, Business Model, Roadmap

## Goal
Analyze launch metrics, introduce a sustainable business model, and plan the next feature cycle.

---

## Scope

### Launch Metrics Analysis
- Download count, sales data from App Store Connect
- Retention cohort: day 1, day 7, day 30 active users
- Crash rate post-launch vs beta
- Conversion rate: free → paid (if paid)
- Customer review sentiment analysis
- Top requested features from reviews and feedback

### Business Model / Monetization
- Free tier: single device, basic sync, limited cloud backup (5GB)
- Pro tier ($9.99/year or $2.99/month): unlimited devices, all cloud destinations, encrypted backups, priority support
- In-app purchase setup for Pro upgrade
- Upgrade prompt UI: upgrade banner in app when free tier limits reached
- Education discount: 50% off for .edu emails
- Family sharing: Pro tier shared via macOS family sharing

### Public Roadmap
- Publish roadmap on Bridge website (if any) or GitHub
- Allow users to vote on upcoming features
- Monthly changelog blog posts

### Feature Prioritization (Next Cycle)
Based on user demand and strategic fit:
1. Android companion (long-term, high-effort)
2. Health data backup (high demand, medium effort)
3. Encrypted disk image backup (dropbox-style)
4. Advanced search across all synced data
5. iMessage backup and restore

### Maintenance
- macOS update compatibility testing within 1 week of each macOS beta
- Xcode update compatibility within 1 week of each beta
- Address App Store review feedback promptly
- Keep dependencies (SQLite.swift, etc.) updated
- Security patches: within 48 hours of any CVE affecting dependencies

---

## Out of Scope
- Nothing by design. This is ongoing maintenance and next-cycle planning.
