# Zones — R17: Shortcuts & Automation

## Goal
Make Zones deeply automatable through Shortcuts, AppleScript, and system integrations.

---

## Scope

### Shortcuts App Integration
- "Activate Zone" → activate named zone
- "Get Current Zone" → returns current zone
- "Switch Zone" → switch with options
- "Get Zone History" → recent zone history
- "Run Zone Automations" → trigger automations
- Siri Suggestions: proactive when approaching usual zone location

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Zones" to activate zone "Work"`
- `tell application "Zones" to get current zone`
- `tell application "Zones" to get zone history`
- Automator actions for all Zones functions

### Menu Bar Extra
- Native MenuBarExtra API
- Current zone in menu bar
- Quick zone switch menu
- Zone status

### Automation Triggers
- Triggers: "When entering zone X → run automation"
- "When leaving zone X → run automation"
- "When it's 9am on weekday → activate Work Zone"
- "When calendar event starts → suggest zone switch"

### Focus Integration
- Focus mode ↔ Zone binding: "Deep Work" Focus = Work Zone active
- Zone change → appropriate Focus activates

### HomeKit Integration
- Enter Zone → trigger HomeKit scene
- "Arrive Home → living room lights on, thermostat to 72"

---

## Out of Scope
- Real-time GPS tracking via Shortcuts
- Multi-person zone automation triggers
