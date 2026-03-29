# GrappleMac R12 — Community

## Theme
Build a community layer where users can host public debates, participate in tournaments, and upvote the best arguments.

## Features
- **Public Debates** — Any user can open a debate to the community (topic + opening position); spectators can watch live or read the transcript; up/downvote each argument in real time
- **Debate Tournaments** — Periodic themed tournaments (e.g., "Best argument for effective altruism") with bracket-style elimination; community votes determine winners; prizes are badges/flair
- **"Challenge of the Week"** — A curated weekly motion posted by the GrappleMac team; most compelling argument wins visibility on the home screen; submissions reviewed for quality before publication
- **Upvote Best Arguments** — Community voting on individual arguments (not just winner); arguments sorted by net score; top-rated arguments get highlighted and cited in related debates

## Technical Notes
- **DebateStreamService:** Public debates broadcast via WebSocket for live spectators; replay available as transcript after close
- **TournamentEngine:** Bracket management (single/double elimination); automatic match-pairing; voting rounds open/close via scheduled background tasks
- **ContentModeration:** AI-assisted pre-screening for public debates (profanity filter, relevance check); human escalation for edge cases; appeals process for removed content
- **ReputationSystem:** Users earn reputation from upvotes on public arguments; reputation unlocks: create tournaments, moderate comments, early access to Challenge of the Week
