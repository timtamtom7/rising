# Bridge — R17: Shortcuts & Automation

## Goal
Make Bridge deeply automatable through Shortcuts, AppleScript, and system-level device triggers.

---

## Scope

### Shortcuts App Integration
- "Connect to Device" → connect by name
- "Disconnect Device" → disconnect
- "Activate Scene" → activate named scene
- "Get Connected Devices" → list devices
- "Run Workflow" → trigger workflow
- "Get Device Info" → device details
- Siri Suggestions: proactive when device in range

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Bridge" to get connected devices`
- `tell application "Bridge" to connect device "AirPods"`
- `tell application "Bridge" to activate scene "Movie Night"`
- Automator actions for all Bridge functions

### Menu Bar Extra
- Native MenuBarExtra API
- Device list in menu bar
- Quick connect/disconnect
- Scene quick buttons

### Automation Triggers
- Triggers: "When device connects → run automation"
- "When device disconnects → run automation"
- "When I arrive home → connect to [devices]"
- "When I leave → disconnect [devices]"

### Location-Based Triggers
- Arrive at location → connect to associated devices
- Leave location → disconnect
- Geofencing: "Near home" vs. "Away"

### Focus Integration
- Focus mode → apply associated scene
- "Presentation Focus" → TV off, conference room devices ready

---

## Out of Scope
- Direct Bluetooth pairing management
- Real-time audio/video routing
