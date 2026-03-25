# Muse — R1: Menu Bar Music Player, MediaRemote, Basic Controls

## Goal
Muse appears in the menu bar as a lightweight music player. It controls the system music (iTunes/Music app) via MediaRemote framework and displays current track info.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with `headphones` SF Symbol when playing, `music.note` when idle
- `NSPopover` (360×400pt) showing current track and basic controls
- Proper click-outside dismissal
- No main window in R1 — all interaction via popover

### MediaRemote Integration
- Use `MediaRemote` private framework (com.apple.mediaremote)
- `MRMediaRemoteRegisterForNowPlayingNotifications` for playback state changes
- `MRMediaRemoteGetNowPlayingInfo` to get current track info
- `MRMediaRemoteSendCommand` for play/pause, next, previous
- Observe `kMRMediaRemoteNowPlayingInfoDidChangeNotification`
- Handle case when Music app is not running: show "Open Music" button in popover

### Now Playing Display
- Track title (bold, 14pt)
- Artist name (secondary, 12pt, gray)
- Album art (120×120pt, rounded corners, drop shadow)
- Album name (secondary, 11pt, truncated)
- Progress bar (scrubable via `MRMediaRemoteSetNowPlayingPlaybackPosition`)
- Elapsed time / remaining time labels

### Basic Controls
- Play/Pause toggle button (SF Symbol `play.fill` / `pause.fill`)
- Next track button (`forward.fill`)
- Previous track button (`backward.fill`)
- Volume slider (horizontal, maps to `AVAudioSession` output volume via private API or `VolumeControl`)
- Shuffle toggle (SF Symbol `shuffle`)
- Repeat toggle (off/all/one — cycles through states)

### Menu Bar Extras
- `NSStatusItem` right-click menu:
  - Current track name + artist (disabled menu items, display only)
  - Play/Pause, Next, Previous
  - Separator
  - Open Music App
  - Separator
  - Quit Muse

### Audio Endpoint Detection
- Detect current output device (Speakers, AirPods, external DAC) via `AudioObjectGetPropertyData`
- Show output device name in popover footer
- One-click switch to different output device

### Build & Run
- Target: macOS 13.0+
- Link `MediaRemote.framework` (private) and `CoreAudio.framework`
- No SPM dependencies in R1
- Zero warnings, clean build
- Note: MediaRemote is a private framework — may require unsignificant workaround or soft-link

---

## Out of Scope (R2+)
- Built-in music library
- Equalizer and visual EQ
- Playlists
- AirPlay support
- Mini player
