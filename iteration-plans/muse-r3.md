# Muse — R3: Playlists, Queue Management, AirPlay, Audio Visualizations

## Goal
Muse adds playlist management, smart queue controls, AirPlay streaming, and immersive audio visualizations.

---

## Scope

### Playlist Management
- Create playlist: name + optional description
- Add tracks to playlist: drag from library, multi-select, or right-click → "Add to Playlist"
- Remove tracks from playlist (reorder via drag)
- Delete playlist (with confirmation)
- Playlist view: shows track count, total duration, artwork mosaic (4 album arts)
- Edit playlist: rename, change artwork (auto-generated mosaic or custom image)
- Sort playlist by: title, artist, album, date added

### Smart Playlists
- Rules-based: "Artist is X", "Plays > 10", "Added in last 30 days", "Rating >= 4"
- Combine rules with AND/OR
- Limit by: number of tracks, total duration, or file size
- Auto-update as library changes
- "Most Played", "Recently Added", "Top Rated", "Never Played" as built-in smart playlists

### Queue Management
- "Play Next" button: insert track at position 1 in queue
- "Play Last" button: append to end of queue
- Queue drawer: shows upcoming tracks, drag to reorder
- Clear queue
- Save queue as playlist
- "Now Playing" highlighted in queue
- History: last 50 played tracks (accessible via queue drawer)

### AirPlay Support
- Detect AirPlay devices on network via Bonjour (`_raop._tcp`, `_airplay._tcp`)
- `AVAudioEngine` output to AirPlay device via `AVAudioEngine.outputNode` + `AVAudioSession`
- Alternatively use `RTPlayStream` or similar for AirPlay 2
- AirPlay device picker: list of available devices with icon, name, status
- Multi-room: group multiple AirPlay devices
- Show audio quality indicator (lossy/lossless)
- Switch output between local and AirPlay without interrupting playback

### Audio Visualizations
- Full-window visualizer mode (enter via double-click album art)
- Visualization types (user selectable):
  - **Waveform**: real-time waveform of audio signal
  - **Particles**: frequency-driven particle system
  - **Bars**: classic frequency spectrum with glow
  - **Circular**: radial frequency display
- Uses `AVAudioEngine` tap on `AVAudioMixerNode` output
- FFT analysis via `vDSP` (Accelerate framework) for frequency data
- Smooth 60fps animation
- Responds to all frequency bands

### MediaRemote Coexistence
- Continue to control system Music app via MediaRemote
- "Music Mode" vs "Muse Library Mode": toggle in settings
- In Music Mode, visualizer and EQ use MediaRemote's `nowPlayingInfo` and system audio tap
- Seamless switch between modes

---

## Out of Scope (R4+)
- Menu Bar Extra
- Global media controls
- Now Playing history
- Shortcuts integration
