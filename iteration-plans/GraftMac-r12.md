# GraftMac R12 — Social

## Theme
Turn skill practice into a shared journey with friends through accountability, group challenges, and public progress visibility.

## Features
- **Shared Skill Tracking** — Opt-in friends can view your practice streak and current skill levels in specific areas; you see theirs in return
- **Accountability Partner** — Designate a partner; each week you both set a target; missed days trigger a gentle nudge to both parties (no judgment, just awareness)
- **Group Challenges** — Time-boxed challenges (e.g., "100 hours of coding by June 1") with a shared leaderboard; challenge members can be friends or public
- **Public Practice Streaks** — Shareable profile card showing streak length, top skills, and total hours; embeddable link for social sharing

## Technical Notes
- **SocialGraphService:** Manages friend relationships, privacy settings, and opt-in status
- **ChallengeService:** CRUD for challenges; real-time leaderboard via lightweight WebSocket or polling; calculates rolling totals from session logs
- **NotificationBridge:** APNs + in-app notifications for partner nudges and challenge updates; respect Do Not Disturb
- **ProfileCardService:** Generates a static shareable card (PNG/SVG) from user stats; upload to CDN or generate on-demand
