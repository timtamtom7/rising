# RisingMac R12 — Social

## Theme
Enable shared savings goals with family, friends, and group challenges to build accountability and collective motivation.

## Features
- **Shared Savings Goals with Family** — Invite family members to view a savings goal's progress; each can contribute directly; goal progress is transparent to all; privacy controls: hide specific transaction details from specific members
- **Group Savings Challenges** — A challenge between friends: "Everyone saves $500 in April"; tracked privately, aggregate group progress visible; winners decided by % of goal achieved (not absolute amount)
- **"Save Together" Sessions** — Scheduled monthly "save-up" sessions: participants set a 48-hour window to resist discretionary purchases; any saved amount is logged; leaderboard of resisters (not spenders)
- **Family Contribution History** — Transparent log of contributions by each family member toward shared goals; gamified with milestones and thank-you notes

## Technical Notes
- **SharedGoalService:** Manages multi-user goals with role-based visibility (owner: full detail, member: progress only, limited: balance only); real-time sync of progress updates
- **ContributionPrivacyLayer:** Configurable per-member privacy; transaction-level detail hidden from specific users while preserving aggregate accuracy
- **ChallengeService:** Group challenges use percentage-based metrics so high earners aren't unfairly advantaged; winner selection algorithm uses coefficient of variation to ensure fairness
- **SaveTogetherSession:** Short-duration challenge engine; participants mark each day as "saved" (no discretionary spend) or "opted out"; streak tracking; push reminders at temptation hours
