# Bridge — R1: Device Detection, Photo Import, Contact Sync, Battery & Backup Status

## Goal
Bridge appears in the menu bar and connects to a paired iOS device via USB. The foundation: device pairing, photo import, contact sync, and basic status display.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with a paired-device SF Symbol icon (e.g., `iphone`)
- `NSPopover` (480×520pt) showing connected device summary
- Proper click-outside dismissal
- Main window opens via "Open Bridge" button

### Device Detection (MobileDevice.framework)
- Link against `PrivateFrameworks/MobileDevice.framework`
- Use `AMDeviceCopyDeviceList()` to enumerate connected devices
- `AMDeviceConnect`, `AMDeviceIsPaired`, `AMDevicePairingPair` handshake flow
- `AMDeviceStartSession` to open a session for data access
- Device list supports multiple connected devices; primary device is the first paired one found
- Handle device connect/disconnect notifications via `AMDeviceNotificationSubscribe`
- On device disconnect: clear UI, show "No device connected" state

### Device Info Panel
- Device name, model, iOS version (from `AMDeviceCopyValue`)
- Battery level, charging state (via private API or `UPSBattery` equivalent)
- Storage used / total with visual progress bar
- Backup status: last backup date, iCloud vs local backup indicator

### Photo Import
- Use `AMDeviceCopyImageInfos` or PhotoKit (`NSPhotoLibrary`) via device mount point
- Mount device image (AFC) via `AMDeviceMountImage` with callback
- Read photos from `DCIM/` directory on the mounted volume
- Display photo grid in main window: thumbnails from device
- Import selected photos to Mac Photos library via `PHPhotoLibrary`
- Import progress indicator (photos imported / total)
- Duplicate detection: skip photos already in Photos library by filename/date/size hash

### Contact Sync
- Access device contacts via `CNContactStore` (local Mac contacts)
- Read from device's `Contacts/` SQLite database (AFC mount)
- Sync direction: device → Mac by default (can configure)
- Fields: name, phone numbers, emails, addresses, notes
- Conflict resolution: newer timestamp wins
- Manual sync trigger button; no auto-sync in R1

### Basic Backup Status
- Show last manual backup date from local store
- Show whether iCloud backup is enabled on device (value from device)
- "Backup Now" button triggers `AMDeviceBackup` to `~/Library/Application Support/Bridge/Backups/`
- Backup progress in UI (bytes copied / total, estimated time)

### Data Model (SQLite.swift)
- `devices` table: id, udid, name, model, ios_version, last_seen, is_primary
- `sync_log` table: id, device_id, sync_type, started_at, completed_at, items_synced, status
- `imported_photos` table: id, device_id, filename, import_date, mac_url
- Database at `~/Library/Application Support/Bridge/bridge.db`

### BridgeStore
- `ObservableObject` held by `@MainActor AppDelegate`
- Manages device connection state, currently selected device
- Handles AFC file browser and PhotoKit interactions

### macOS App Lifecycle
- `main.swift` → `NSApplication.shared → AppDelegate`
- `applicationDidFinishLaunching`: init BridgeStore, start device monitoring
- App starts in menu bar; main window only on explicit open
- Standard app menu: About Bridge, Preferences, Quit
- Launch at login via `SMAppService`

### Build & Run
- Target: macOS 13.0+
- SPM: SQLite.swift
- Private framework MobileDevice.framework linked
- Zero warnings, clean build

---

## Out of Scope (R2+)
- Message viewing and export
- Call history
- Wi-Fi sync without USB
- Multi-device management
- Selective backup
