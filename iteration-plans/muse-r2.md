# Muse — R2: Built-in Library, Equalizer, Visual EQ, Mini Player

## Goal
Muse gains its own music library with local file import, a 10-band equalizer with presets, animated visual EQ in the popover, and a detachable mini player window.

---

## Scope

### Built-in Music Library
- `MusicLibraryStore` observable: manages local audio files
- Supported formats: MP3, AAC, ALAC, FLAC, WAV, AIFF, OGG
- Import via drag-and-drop onto popover or "Import Files" button
- File browser sheet: `NSOpenPanel` for batch import
- Store audio metadata in SQLite: `tracks` table (id, title, artist, album, duration_ms, file_path, artwork_path, date_added, play_count, rating)
- Artwork extracted via `AVAssetImageGenerator` and stored as separate JPEG
- Library view: grid or list toggle, sortable by title/artist/album/date added
- Search bar filters library in real time
- Delete track from library (with confirmation, removes file + DB entry)

### Audio Engine (Built-in Playback)
- Replace MediaRemote dependency for built-in playback with `AVAudioEngine`
- `AVAudioPlayerNode` for playback, `AVAudioMixerNode` for EQ insertion
- Gapless playback between tracks
- Proper audio session management for macOS
- Audio output device switching via `AVAudioEngine.outputNode`

### 10-Band Equalizer
- Bands: 32Hz, 64Hz, 125Hz, 250Hz, 500Hz, 1kHz, 2kHz, 4kHz, 8kHz, 16kHz
- Gain range: -12dB to +12dB per band (slider)
- Presets: Flat, Bass Boost, Treble Boost, Vocal, Rock, Pop, Jazz, Classical, Electronic, Acoustic
- Save custom preset (name it, store in UserDefaults)
- EQ applies to built-in playback only (MediaRemote-controlled playback uses system EQ)

### Visual EQ Animation
- Real-time audio level metering from `AVAudioEngine` tap (on node after EQ)
- 32-band frequency spectrum visualization (8 per displayed band group for smoother bars)
- Smooth animation via `CADisplayLink` / `Observable` update throttled to 30fps
- Gradient bars: low frequencies in warm color, high in cool color
- Toggle to show/hide visual EQ in popover (persisted preference)
- Mini visualizer runs even when popover is narrow

### Mini Player Window
- Detachable floating window (240×240pt, always on top option)
- Shows: album art (full window background, blurred), track title, artist, controls
- Compact transport: play/pause, next, previous
- Progress bar (always visible in mini player)
- Drag to reposition
- Close button returns to menu bar mode
- Mini player state persisted: always-on-top setting, last position

### Preferences
- Default playback output device
- EQ default preset
- Mini player: launch as mini player directly (skip menu bar popover)
- Library location (custom music folder)

### Data Model (SQLite.swift)
- `tracks` table: id, title, artist, album, album_artist, genre, duration_ms, bit_rate, sample_rate, file_path, artwork_path, date_added, play_count, last_played, rating,EQ_preference TEXT
- `playlists` table: id, name, created_at, track_ids (JSON array)
- Database at `~/Library/Application Support/Muse/muse.db`

---

## Out of Scope (R3+)
- Playlists management beyond basic lists
- AirPlay support
- Audio visualizations
- Queue management
