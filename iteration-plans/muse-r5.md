# Muse — R5: Widgets, Streaming Support, App Store Prep

## Goal
Muse gains Home Screen widgets, streaming service integration (Spotify/Apple Music direct), and prepares for App Store submission.

---

## Scope

### Widgets (WidgetKit)
- Small widget (.systemSmall): current track album art (blurred) + track name + play/pause button
- Medium widget (.systemMedium): current track info + mini visualizer bars + previous/next controls
- Large widget (.systemLarge): current track + queue preview (next 3 tracks) + playback controls
- Updates via App Group shared `UserDefaults` (`group.com.bou.muse`)
- `WidgetCenter.shared.reloadAllTimelines()` on playback state change
- Tap widget to open Muse main window

### Streaming Service Integration
- **Spotify SDK** (or direct Web API via `SPTPlaylists`, `SPTPlayer`): OAuth2 login, play/pause, next/prev, search library
- **Apple Music Connect** (MusicKit via `MXAppleMusicClient`): play tracks from Apple Music catalog
- Streaming service selector in Preferences: "Use Muse's Library" vs "Connect Spotify" vs "Connect Apple Music"
- When streaming connected: playback info comes from streaming API instead of local files
- Queue and playlist features work with streaming library
- Visual EQ applies to streaming audio via audio unit insertion

### Crossfade / Gapless Streaming
- Implement crossfade between tracks (0-12 second range, configurable)
- Pre-buffer next track for gapless playback on streaming

### Podcasts Integration
- Muse can also handle podcasts via RSS feed import
- Podcast player UI: show podcast artwork, episode list, playback position
- Separate "Music" and "Podcasts" tabs

### App Store Preparation
- Create App Store Connect entry
- App icon: music-note-based design, works in light/dark
- Screenshots: 6 per locale, show menu bar popover, mini player, library, visualizer
- Preview video: 30-second walkthrough
- Privacy nutrition label: disclose all data collection
- Age rating questionnaire
- Pricing: Free (with Pro upgrade) or Paid

### Licensing & Legal
- Music file format licensing: ensure all supported formats are properly licensed for playback
- Third-party SDK licenses (Spotify, etc.) acknowledged

---

## Out of Scope (R6+)
- Post-launch maintenance
- Feature roadmap
