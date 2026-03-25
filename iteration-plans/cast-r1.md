# Cast — R1: Screen Casting, Device Discovery, Menu Bar Controls

## Goal
Cast appears in the menu bar and lets users cast their Mac screen or a specific window to a Chromecast or Smart TV. Foundation: device discovery, screen capture, and basic start/stop casting.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with `display` SF Symbol
- `NSPopover` (400×360pt) showing available devices and cast controls
- Proper click-outside dismissal
- Main window opens via "Open Cast" or full preferences via menu

### Device Discovery (GoogleCast SDK)
- Integrate Google Cast SDK for macOS (CocoaPods: `google-cast-sdk` or manual framework)
- `GCKDeviceScanner` for Bonjour-based device discovery
- Filter devices: Chromecast, Chromecast Ultra, Google TV, Android TV, Smart TV with Cast
- Device list: name, model, icon (TV/chromecast icon), signal strength
- Manual IP add: for devices on same network but not discovered
- Remember last-used device, auto-connect on launch

### Screen / Window Capture
- `SCShareableContent.getExcludingDesktopWindows` for window enumeration
- `SCStreamConfiguration` for capture settings
- Capture modes:
  - **Entire Screen**: user selects which display if multiple
  - **Application Window**: user selects specific app window
  - **Area**: user drags to select screen region
- Capture at native resolution, downscale for casting
- Use `SCStream` or `AVCaptureScreenInput` with `AVAssetWriter` for frame capture
- Frame rate: 30fps for streaming (Chromecast max is 60fps at 1080p, 30fps at 4K)

### Cast Session Management
- `GCKSessionManager` / `GCKCastSession` for cast lifecycle
- Connect → route → launch cast application (default MediaReceiver)
- Send media (h.264 video + AAC audio) via `GCKMediaInformation`
- `GCKCastContext` handles most of the heavy lifting
- Handle device disconnect: pause stream, attempt reconnect, notify user
- Background streaming: keep casting even if popover is closed

### Menu Bar Controls
- Right-click menu:
  - Device list (click to connect/cast)
  - Cast Screen / Cast Window toggle
  - Stop Casting
  - Separator
  - Preferences
  - Quit Cast

### UI Components
- Device grid/list in popover: device name, model, status (idle/casting)
- "Cast Screen" button, "Cast Window" button
- Active casting indicator: animated icon in menu bar
- "Stop Casting" prominent button when active
- Status text: "Casting to [Device Name]", "No device connected"

### Data Model (UserDefaults)
- Last used device ID
- Preferred capture mode (screen/window/area)
- Remembered devices (device UUID → name)
- Cast settings (quality preset, audio on/off)

### Build & Run
- Target: macOS 13.0+
- CocoaPods: `google-cast-sdk`
- Or manual: Cast framework from Google Cast SDK download
- Entitlements: `com.apple.security.network.client` for Bonjour/mDNS
- Zero warnings, clean build

---

## Out of Scope (R2+)
- Audio casting
- Quality settings
- Recording
- Picture-in-picture
