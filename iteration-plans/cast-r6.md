# Cast — R6: Performance, Polish, Accessibility

## Goal
Harden Cast for production: performance, reliability, error recovery, visual polish, and accessibility.

---

## Scope

### Performance
- Encoding: hardware-accelerated H.264 via VideoToolbox, target 30% CPU usage max
- Frame dropping: if encoding falls behind, drop B-frames first to maintain presentation
- Memory: cap preview window memory at 100MB, release frames promptly
- Device scanning: scan in background, don't block UI on startup
- Startup time: < 800ms to menu bar readiness
- Recording write: use buffered I/O, don't block encoding thread

### Error Recovery
- Device goes offline mid-cast: pause, attempt reconnect every 5s for 60s, then notify user
- Encoding error: log, attempt restart of encoding session, notify if persistent
- Recording write failure: stop recording gracefully, save what's written, notify user
- Network degradation: auto-reduce quality, don't interrupt cast
- Capture permission denied: show system preferences deep link, explain why permission needed
- No cast-compatible devices found: show troubleshooting tips (check network, TV power, etc.)

### Edge Cases
- Multiple monitors with different resolutions: handle gracefully, show monitor picker
- HDR content: tone-map to SDR for casting (Chromecast doesn't support HDR)
- Protected content (Netflix, etc.): detect HDCP, warn user casting won't work
- Very high frame rate (120fps): downsample to 60fps for cast
- No audio device: offer audio-only cast to speaker device (Chromecast Audio)

### Visual Polish
- PiP window: smooth resize, corner radius, drop shadow
- Menu bar icon: animated bars during active cast
- Popover: `NSVisualEffectView` with `.popover` material
- Recording indicator: pulsing red dot animation
- Device connection: subtle scale animation on device card when discovered
- Dark/Light mode: all colors adapt

### Accessibility
- Full VoiceOver support: all controls labeled, cast status announced
- Reduce Motion: disable animations
- Keyboard-only navigation: full app usable without mouse
- Dynamic Type: all text scales

### Crash Reporting
- Integrate Sentry
- Capture: current cast state, device info, recent frames if possible

---

## Out of Scope (R7+)
- Localization
- Beta program
