# Cast — R3: Streaming Presets, Scheduled Casting, Multi-Device Simultaneous

## Goal
Introduce streaming presets for quick setup, scheduled casting for unattended sessions, and simultaneous casting to multiple devices.

---

## Scope

### Streaming Presets
- User-defined presets: name, capture mode (screen/window/area), quality, audio on/off, recording on/off
- Built-in presets: "Presentation", "Gaming", "Movie Night", "Audio Only"
- Save current settings as preset
- Preset manager in Preferences: list, edit, delete, reorder
- Quick-select preset from popover before casting

### Scheduled Casting
- Schedule a cast session: select date, time, device, preset
- Uses `UNCalendarNotificationTrigger` or `Timer` to trigger at scheduled time
- Pre-cast: capture quality check, device reachability check 2 minutes before
- Launch Cast app if not running at scheduled time (via `NSWorkspace`)
- Notifications: 5-minute warning, "Starting cast in 1 minute" system notification
- Auto-start recording when scheduled cast begins
- Auto-stop at scheduled end time (or duration limit)
- End-of-cast notification with recording location

### Multi-Device Simultaneous Casting
- Select multiple devices from device list
- Mirror same content to all selected devices
- Independent `GCKCastSession` per device
- Sync start/stop across all devices
- Per-device quality adaptation (if one device is weaker)
- Cast status per device shown in popover
- "Cast to All" quick action if 3+ devices configured

### Enhanced Device Management
- Device groups: create named groups (e.g., "Living Room", "Bedroom")
- Cast to group (all devices in group simultaneously)
- Device status: online/offline/unreachable
- Ping device to check responsiveness
- Edit device name (nickname override)

### Preferences — Cast Tab
- Default quality preset
- Default capture mode
- Auto-start recording toggle
- Scheduled cast defaults
- Notification preferences for cast events

---

## Out of Scope (R4+)
- Menu Bar Extra
- Shortcut integration
- Casting history
