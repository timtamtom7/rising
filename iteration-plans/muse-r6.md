# Muse — R6: Performance, Polish, Accessibility

## Goal
Harden Muse for production: performance optimization, error handling, visual polish, and full accessibility.

---

## Scope

### Performance
- Thumbnail caching: artwork thumbnails cached to disk at multiple sizes
- Audio analysis caching: FFT results for visualizations cached per track
- Library view virtualization: `LazyVStack` with pagination for large libraries (10,000+ tracks)
- Startup time: target < 500ms to menu bar readiness
- Memory: cap in-memory artwork cache at 200MB, evict LRU
- Audio engine restart only on output device change, not on every track
- Background indexing: compute audio features (BPM, key) in background queue

### Error Handling
- Missing audio file: mark track as unavailable, show warning icon in library, skip during playback
- Corrupted audio file: graceful skip, log error, continue to next
- No output device: show alert, don't crash
- Streaming service auth failure: re-authenticate silently, fall back to local library
- Network failure during streaming: buffer drain → pause → resume on reconnect

### Visual Polish
- Album art loading: fade-in animation on load (300ms ease-in)
- Progress bar: smooth fill animation, not jumpy
- Track transition: crossfade album art (500ms) on track change
- Mini player: window shadow, vibrancy effect
- Popover: `NSVisualEffectView` with `.popover` material
- Dark/Light mode: all colors adapt, album art has dark/light variants if needed

### Audio Polish
- Volume curve: logarithmic scaling for more natural feel
- EQ: real-time update without audio drop-out
- Crossfade: smooth 0-pain blending
- Gapless: precise scheduling of next track start

### Accessibility
- Full VoiceOver support: all controls labeled, track info spoken on change
- `AccessibilityElement` for all custom views
- Reduce Motion: disable visualizations, use static images instead
- Dynamic Type: all text scales
- Minimum touch target: 44×44pt
- Keyboard-only navigation: full app usable without mouse

### Crash Reporting
- Integrate Sentry or equivalent
- Capture audio engine state, current track, playback position on crash

---

## Out of Scope (R7+)
- Localization
- Beta program
