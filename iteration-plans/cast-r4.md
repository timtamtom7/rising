# Cast — R4: Menu Bar Extra, Shortcut Integration, Casting History

## Goal
Migrate Cast to `NSMenuBarExtra`, add keyboard shortcuts, and build a polished casting history view.

---

## Scope

### Menu Bar Extra (NSMenuBarExtra)
- Migrate from `NSStatusItem` to `NSMenuBarExtra`
- Menu bar icon: `display` SF Symbol, red dot overlay when casting
- Large menu:
  - Quick Cast: last used device, cast screen
  - Device list (connected, disconnected status)
  - Cast Window, Cast Area (quick actions)
  - Audio Only toggle
  - Separator
  - Active cast controls: stop, pause, PiP toggle, record toggle
  - Separator
  - History submenu (last 5 casts)
  - Preferences
  - Quit Cast

### Keyboard Shortcuts
- Global hotkeys (via `CGEvent` tap or `HotKey`):
  - `⌥C`: Toggle casting (start/stop to last device)
  - `⌥⇧C`: Stop casting
  - `⌥R`: Toggle recording
  - `⌥P`: Toggle PiP preview
  - `⌥D`: Open device picker
- In-app shortcuts:
  - `⌘S`: Start cast (opens device picker)
  - `⌘R`: Start/stop recording
  - `⌘P`: Toggle PiP
  - `⌘H`: Open history
  - `⌘,`: Preferences
- Shortcuts editable in Preferences

### Casting History
- SQLite table: `cast_history` (id, device_id, device_name, started_at, ended_at, duration_sec, capture_mode, quality_preset, recording_path, was_recorded)
- Main window history view: chronological list, grouped by date
- Each entry: device name, duration, time, capture mode icon, recording indicator
- Click entry: view details, replay recording, cast again
- Filter: all, recorded only, by device
- Search by device name or date
- Export history as CSV

### Main Window Redesign
- Tabbed interface: Devices, Cast, History, Preferences
- Devices tab: device grid with status indicators, add device by IP
- Cast tab: large cast controls, live preview, current session stats (duration, data sent)
- History tab: as above
- Preferences: cast settings, shortcuts, recording path, notifications

### Notifications
- System notification when scheduled cast is about to start
- Notification when device disconnects during cast
- Notification when recording saved
- Per-event toggle in preferences

---

## Out of Scope (R5+)
- Widgets
- Streaming quality optimization
- App Store
