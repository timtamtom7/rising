# BunkerMac R12 — Collaboration

## Theme
Enable shared decision-making with advisors and teams through collaborative rooms, secure sharing, and voting mechanisms.

## Features
- **Share Decisions with Advisors** — Invite a personal advisor (mentor, coach, partner) to view and comment on a specific decision; they see the full context and can add annotated advice
- **Team Decision Rooms** — A shared workspace for group decisions: all stakeholders can see options, add comments, vote, and see live AI analysis updates
- **Voting on Options** — Ranked-choice or approval voting; results visible after voting closes or in real-time based on room settings; votes are pseudonymous within the team
- **Decision Timeline** — All decisions have a configurable review date; BunkerMac prompts re-evaluation and tracks whether the predicted outcome actually occurred

## Technical Notes
- **DecisionRoomService:** Real-time collaborative session management; WebSocket-based sync for comments and votes; CRDT for concurrent edits
- **VotingEngine:** Implements ranked-choice (IRV) and approval voting; deterministic tie-breaking rules; results sealed once voting closes
- **AdvisorInviteSystem:** Email/link invite with role-based access (viewer, commenter); personal advisor tier is free; business tier includes analytics
- **ReminderScheduler:** Local + push notifications for decision review dates; persisted in SQLite and triggered by background refresh
