# CadenceMac R12 — Social

## Theme
Turn focus sessions into shared experiences with accountability partners and team-wide focus challenges.

## Features
- **Focus Partner Pairing** — Find a focus partner (within the app or from contacts); set a shared focus time; both parties see each other's focus status (active/paused/completed) in real time
- **Accountability Check-ins** — End-of-day summary shared (opt-in) with partner: total focus minutes, sessions completed, longest streak; no detailed app usage shared, just aggregate
- **Team Focus Challenges** — A team lead creates a challenge (e.g., "50 focus hours this week collectively"); team members contribute minutes; leaderboard updates live; winner gets a badge
- **"Focus Together" Sessions** — Scheduled co-focusing sessions: 2+ users start a synchronized Pomodoro-style timer; at the end, all participants rate the session's quality

## Technical Notes
- **PartnerService:** Matching algorithm with preference filtering (focus style, availability, goals); push notifications for partner status changes
- **FocusSyncEngine:** WebSocket-based real-time session state sync between partners; heartbeat every 30s; graceful offline handling (session continues solo)
- **ChallengeService:** Aggregates focus minutes per team member; leaderboard recalculates on each session end; challenge expiration via background task
- **TeamRosterManager:** Team creation, member management, invite links; role: lead (can modify challenge) or member
