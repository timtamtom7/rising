# PulseMac R12 — Sharing

## Theme
Connect users anonymously through shared mood data, enabling gentle awareness of how friends and the broader community are feeling.

## Features
- **Anonymous Mood Sharing** — Publish a one-way, privacy-safe mood signal (emotion tag + intensity, no text) to friends who have opted in; no names or specifics exposed
- **"How's Everyone Feeling?" Aggregate** — A read-only community mood visualization: overall valence trend, top emotions of the day, geographic mood heatmap (optional city-level)
- **Mood Chains** — Share your current mood → see how many others feel the same right now → optionally connect anonymously with one match (both must opt in)
- **Friend Notifications** — Gentle, opt-in push: "Your friend @t just logged feeling 'hopeful' — they're having a good day" (no action required from recipient)

## Technical Notes
- **SocialService:** New service handles anonymous tokenization (user IDs hashed/ pseudonymized before broadcast)
- **Aggregate API:** Server-side aggregation endpoint returning sanitized community statistics; no PII stored
- **MoodChain Matching:** Real-time peer-matching via WebSocket or APNs push; mutual opt-in gate before reveal
- **Privacy Sandbox:** All sharing is differential-privacy styled (add noise to small groups, require minimum group size of 5 before surfacing)
