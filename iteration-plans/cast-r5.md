# Cast — R5: Widgets, Quality Optimization, App Store Prep

## Goal
Add widgets, optimize streaming quality, and prepare Cast for Mac App Store submission.

---

## Scope

### Widgets (WidgetKit)
- Small widget (.systemSmall): shows "No active cast" or "Casting to [Device]" + cast icon
- Medium widget (.systemMedium): active cast status + device name + stop cast button + duration
- Large widget (.systemLarge): last 3 cast sessions + quick start cast buttons
- App Group (`group.com.bou.cast`) for widget data sharing
- `WidgetCenter.shared.reloadAllTimelines()` on cast state change
- Tap widget → opens Cast main window

### Streaming Quality Optimization
- Hardware-accelerated H.264 encoding via `VTCompressionSession`
- GPU-based encoding on Apple Silicon (`VTVideoEncoderH264HEVCMac`)
- B-frames and reference frames: tuned for low latency
- Adaptive GOP (group of pictures) length based on scene change detection
- Rate control: VBR with target bitrate ±20% fluctuation
- Buffer management: reduce latency by eliminating B-frame reference chain
- Latency target: < 200ms from capture to display on TV

### Network Optimization
- Use `NWConnection` for Cast protocol (DIAL/HTTP-based)
- Multicast DNS (mDNS) for device discovery reliability
- Connection keep-alive ping every 30s
- Packet size tuning for Wi-Fi vs Ethernet
- Auto-switch to lower quality if packet loss > 5%
- Use QUIC if device supports it for lower latency

### App Store Preparation
- App Store Connect entry: name "Cast", subtitle, full description
- Screenshots: 6-8 per locale showing device list, casting, PiP, history
- Preview video: 30-second demo
- Keywords: Chromecast, screen mirror, smart TV, cast, mirror, stream
- Privacy nutrition label: screen recording permission disclosed, local network access disclosed
- Age rating
- Pricing: Free with Pro IAP (4K, multi-device, scheduled casts) or $4.99 paid

### Build & Notarization
- Code sign, hardened runtime, notarize
- Universal binary (Intel + Apple Silicon)
- Entitlements: `com.apple.security.network.client`, `com.apple.security.device.audio-input` (for audio capture)

---

## Out of Scope (R6+)
- Post-launch iteration
