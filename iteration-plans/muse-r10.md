# Muse — R10: Long-Term Maintenance, Major Version Planning

## Goal
Establish sustainable long-term maintenance practices and plan the Muse 2.0 cycle.

---

## Scope

### Maintenance Cadence
- Monthly minor updates (bug fixes, small improvements)
- Quarterly feature updates
- Major version bump yearly (Muse 2.0, 3.0, etc.)

### Technical Debt
- Audit and reduce technical debt accumulated in v1
- Migrate from MediaRemote (private framework) to public `MediaPlayer` framework (`MPNowPlayingInfoCenter`, `MPRemoteCommandCenter`)
- Replace SQLite.swift with raw SQLite or `GRDB` if performance issues arise
- Re-evaluate `AVAudioEngine` usage; ensure compatibility with Apple Silicon Pro audio
- Review and remove deprecated APIs on each Xcode update

### macOS Platform Evolution
- Monitor Apple announcements at WWDC
- Adapt to new macOS features (Stage Manager, immersive media, etc.)
- Ensure compatibility with new Apple Silicon Macs (M3 Ultra, etc.)
- Support latest macOS + 2 previous versions

### Major Version Planning (2.0)
- AI-powered recommendations: "Based on what you play, you might like..."
- Collaborative playlists: share playlist link, others can add tracks
- Live streaming: stream audio from Mac to AirPlay devices in real time
- Video podcast support: video player with audio EQ
- CarPlay/Dock for Mac (if Apple ever supports it)
- Android companion app (long-term)

### End-of-Life / Deprecation
- If v1 reaches end of life: 6-month minimum notice
- Data export tool: export all library data as JSON
- Migrate to v2 with data transfer wizard

---

## Out of Scope
- Nothing. This is ongoing.
