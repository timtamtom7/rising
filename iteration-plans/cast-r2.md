# Cast — R2: Audio Casting, Quality Settings, Recording, PiP Preview

## Goal
Expand Cast with audio casting, configurable quality settings, the ability to record cast sessions, and a picture-in-picture preview window.

---

## Scope

### Audio Casting
- Separate audio stream from video via `AVCaptureScreenInput` audio channel
- Use `SCStreamConfiguration` to capture system audio via `SCStreamAudioData`
- Or use `kAudioOutputUnitElement` tap on `DefaultOutputUnit`
- Audio codec: AAC-LC, 44.1kHz stereo (Chromecast compatible)
- Audio-only casting mode: cast just the Mac's audio to a speaker device
- Toggle audio on/off mid-cast via menu bar or popover
- Audio level meter in UI

### Quality Settings
- Quality presets in Preferences:
  - **Auto**: adapt bitrate based on network quality
  - **1080p 30fps**: 5 Mbps video, 128kbps audio
  - **1080p 60fps**: 8 Mbps video, 256kbps audio
  - **4K 30fps**: 20 Mbps video, 256kbps audio
  - **4K 60fps**: 35 Mbps video, 320kbps audio
- Manual override: slider for bitrate (1-35 Mbps)
- Network quality monitor: show current effective quality in menu bar
- Adaptive bitrate: reduce quality automatically if network degrades

### Recording of Cast Session
- `AVAssetWriter` to record the `CMSampleBuffer` being sent to the cast device
- Record to `~/Movies/Cast/` directory
- File format: MP4 (H.264 + AAC)
- Recording indicator: red dot in menu bar while recording
- Start/stop recording via popover button or keyboard shortcut
- Recording of what is actually being cast (not raw capture)
- Post-cast: offer to trim recording via `AVAssetExportSession`

### Picture-in-Picture Preview
- Floating `NSWindow` (320×180pt, resizable) showing live preview of what's being cast
- Always on top option
- Draggable, position remembered
- Can be minimized to small "now casting" badge
- Shows FPS counter in corner
- Toggle PiP via popover or `⌘P` shortcut

### Cast History
- Log of cast sessions: date, device, duration, content type (screen/window/audio)
- Stored in SQLite: `cast_history` table
- View history in main window
- "Cast Again" button to repeat previous cast

### Build & Run
- Add `AVFoundation`, `CoreMedia`, `CoreAudio` frameworks
- Recording needs `com.apple.security.files.user-selected.read-write`

---

## Out of Scope (R3+)
- Streaming presets
- Scheduled casting
- Multi-device simultaneous
