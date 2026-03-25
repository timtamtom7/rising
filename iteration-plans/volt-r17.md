# Volt — R17: Shortcuts Automation & System Integration

## Goal
Make Volt deeply automatable via Shortcuts, AppleScript, and system-level integrations for power users and workflows.

---

## Scope

### Shortcuts App Integration (Full Actions)
- "Get Mac Battery Status" → returns battery %, health, time remaining
- "Set Volt Power Mode" → set by name or preset
- "Get Battery Health History" → returns chart data
- "Get Energy Cost Estimate" → returns current session cost
- "Create Power Mode" → new mode with custom settings
- "Get Battery Prediction" → ML-predicted time to 80% health
- Siri Suggestions: proactive suggestions based on time/location

### AppleScript / JXA Support
- Full AppleScript dictionary for Volt
- Scriptable: `tell application "Volt" to get battery health`
- Scriptable: `tell application "Volt" to set power mode to "Development"`
- Automator actions for all Volt functions
- Share workflows on GitHub / Automator community

### Menu Bar Extra (Native)
- Native MenuBarExtra API (macOS 13+)
- Always-on popover with live battery stats
- Quick mode switcher directly from menu bar
- Keyboard shortcut to open Volt popover (global hotkey)

### Focus / Do Not Disturb Integration
- When Focus mode activates on Mac, Volt can:
  - Switch to a "Quiet" power profile automatically
  - Suppress non-critical notifications
  - Adjust display brightness

### Shortcuts Triggers
- Triggers: "When battery drops below X%" → run automation
- "When charger is connected" → trigger automation
- "When Mac wakes from sleep" → trigger automation

### HomeKit Integration
- HomeKit integration: when Mac starts up, trigger HomeKit scene
- Notify Home app of Mac power state (as HomeKit accessory)

---

## Out of Scope
- Direct smart plug control (requires third-party hardware)
- Multi-Mac automation (cross-device triggers)
