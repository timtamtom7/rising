# Bridge — R4: Multi-Device Support, Menu Bar Extra, Keyboard Shortcuts, Wi-Fi Sync

## Goal
Bridge graduates to a full multi-device manager with Menu Bar Extra, keyboard shortcuts, and the ability to sync over Wi-Fi without USB.

---

## Scope

### Multi-Device Support
- Device registry: all ever-seen devices stored in DB with nickname and avatar
- Device list in sidebar: all connected or previously paired devices
- Switch primary device with one click
- Simultaneous operations: run photo import on Device A while backing up Device B
- Per-device settings: nickname, icon color, default backup profile, sync schedule
- Device grouping: assign devices to groups (e.g., "Personal", "Work")
- Remove device from registry (does not unpair; just removes from Bridge)

### Menu Bar Extra (NSMenuBarExtra)
- Migrate from `NSStatusItem` to `NSMenuBarExtra` for system menu bar integration
- Menu bar shows device count badge when multiple devices connected
- Extra menu structure:
  - Device list with quick status (battery, last sync)
  - Quick actions: Sync Now, Backup Now, Open Bridge
  - Separator
  - Device settings submenu
  - Separator
  - Quit Bridge
- Live Activity-style updates for backup progress (when available on macOS)

### Keyboard Shortcuts
- Global hotkey to open Bridge: default `⌥B` (configurable)
- Media key support: `▶❚❚` to trigger sync pause/resume
- In-app shortcuts:
  - `⌘R`: Refresh device list
  - `⌘B`: Start backup
  - `⌘I`: Import photos
  - `⌘1-6`: Switch tabs
  - `⌘F`: Focus search
  - `Space`: Quick preview selected photo
- Shortcuts editable in Preferences

### Wi-Fi Sync Without USB
- After initial USB pairing, devices can sync over same local Wi-Fi network
- Discover device on LAN via Bonjour: `_bridge._tcp` service
- Establish connection using device's Wi-Fi endpoint (from `AMDeviceCopyValue` with key `WiFiAddress`)
- `AMDeviceConnect` over network (no USB required after initial pairing)
- Show Wi-Fi signal strength indicator in device card
- Fallback to USB if Wi-Fi connection fails
- Wi-Fi sync toggle in settings (on/off)

### Background Sync Agent
- `BridgeAgent` helper app (embedded in main bundle or separate helper)
- Runs as login item for background device monitoring
- Monitors for device connect/disconnect events
- Triggers scheduled syncs automatically
- Lives in menu bar (separate from main app's status item)

### Preferences Window
- General: launch at login, global hotkey, Wi-Fi sync enable/disable
- Backup: default profile, destination, schedule
- Sync: auto-sync interval, conflict resolution strategy
- Notifications: which sync events to notify about
- Advanced: clear cache, reset all settings, view debug logs

---

## Out of Scope (R5+)
- Widgets
- iCloud sync
- Shortcuts integration
- App Store
