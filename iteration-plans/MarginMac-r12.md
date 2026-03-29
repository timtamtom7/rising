# MarginMac R12 — Sharing

## Theme
Build an intimate anonymous sharing layer where users can read others' reflections, share their own anonymously, and form collaborative reflection groups.

## Features
- **Anonymous Reflection Sharing** — Share a single reflection anonymously to the community pool; no username, no profile link; recipients can react (🙏/💜/🔥) but not reply or identify the author
- **"Read Another Mind"** — Browse a curated feed of anonymous reflections from the community; each is presented without context or author identity; tap to read more from that reflection's author (anonymously, by matching shared themes)
- **Collaborative Reflection Groups** — Private groups of 3-8 people; each member writes a short reflection on a shared weekly prompt (e.g., "What challenged you this week?"); group is read-only to others; group is closed and invitation-only
- **Reflection Pairing** — Be paired (opt-in) with another user for a week: you both write to each other anonymously, read each other's reflections, and leave one-word reactions; no dialogue, just witnessing

## Technical Notes
- **AnonPoolService:** Anonymous reflections are stripped of all identifying metadata before storage; server-side stores only text + timestamp + broad region; no IP logged; author key derived from a rotating anonymous ID
- **ReadAnotherMindFeed:** Algorithmic curation of the anon pool: relevance to user's recent themes (not used for targeting, just diversity); no engagement-maximizing ranking; rotation-based surfacing
- **GroupReflectionService:** Closed-group architecture; end-to-end encryption of reflection text within the group; group admin can remove members; reflections auto-delete after 90 days
- **PairingEngine:** Matching algorithm based on reflection theme compatibility and timezone overlap; weekly rotation; both users can break the pairing at any time with one tap
