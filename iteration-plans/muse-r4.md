# Muse — R4: Menu Bar Extra, Global Controls, Now Playing History, Shortcuts

## Goal
Muse moves to `NSMenuBarExtra`, gains global media control hotkeys, Now Playing history, and Apple Shortcuts integration.

---

## Scope

### Menu Bar Extra (NSMenuBarExtra)
- Migrate from `NSStatusItem` to `NSMenuBarExtra`
- Menu bar icon: updates to show playing state (animated bars when playing)
- Large menu:
  - Now Playing: title, artist, album art thumbnail (40×40pt)
  - Transport: previous, play/pause, next
  - Volume slider
  - Separator
  - Output device submenu (speakers, AirPlay devices)
  - Now Playing History submenu (last 10 tracks)
  - Separator
  - Open Muse (→ main window)
  - Open Music App
  - Quit Muse

### Global Media Control Hotkeys
- Register global hotkeys via `CGEvent` tap or `HotKey` library (or manual `kHotKeyTag`)
- Default bindings:
  - `⌥Space`: Play/Pause (works even when Muse is not focused)
  - `⌥→`: Next track
  - `⌥←`: Previous track
  - `⌥↑`: Volume up
  - `⌥↓`: Volume down
- Shortcuts editable in Preferences
- Work even when Mac is locked (if Accessibility permissions granted)

### Now Playing History
- Persistent history of all played tracks: track ID, played_at timestamp, played_duration (how much was listened)
- View history in main window: scrollable list grouped by date
- Each entry: track name, artist, played at time, % played (progress indicator if < 100%)
- Filter: all, today, this week, this month
- Search history by track name or artist
- "Go to Track" → opens track in library
- Clear history option

### Apple Shortcuts Integration
- Intents extension for Shortcuts app
- Available actions:
  - "Play Track in Muse" (track name as parameter)
  - "Pause Muse"
  - "Resume Muse"
  - "Next Track"
  - "Previous Track"
  - "Get Current Track Info"
  - "Set Volume" (0-100)
  - "Add Track to Playlist"
  - "Search Library"
- Supports both system Music app control (via MediaRemote) and Muse's own library

### Main Window Redesign
- Tabbed interface: Library, Playlists, Queue, History, Visualizer
- Toolbar: search, view toggle (grid/list), add tracks, settings
- Keyboard navigation: full arrow-key navigation through library

### Mini Player Enhancements
- Always-on-top option for mini player
- Transparency slider for mini player background
- Track info tooltip on hover

---

## Out of Scope (R5+)
- Streaming services
- Widgets
- App Store
