# Cast — R17: Shortcuts & Automation

## Goal
Make Cast automatable through Shortcuts, AppleScript, and casting triggers.

---

## Scope

### Shortcuts App Integration
- "Cast to [Device]" → start casting
- "Stop Casting" → stop current
- "Add to Queue" → add content
- "Start Watch Party" → create party
- "Get Now Playing" → what's casting
- Siri Suggestions: proactive when typical watching time

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Cast" to cast "https://stream.url" to device "Living Room"`
- `tell application "Cast" to stop casting`
- `tell application "Cast" to get now playing`
- Automator actions for all Cast functions

### Menu Bar Extra
- Native MenuBarExtra API
- Now Playing in menu bar
- Quick device switch
- Queue access

### Automation Triggers
- Triggers: "When movie starts → dim lights"
- "When watch party starts → notify friends"
- "When stream ends → turn off TV"
- Time-based: "Every Friday at 8pm → start Movie Night"

### Focus Integration
- Focus mode → set appropriate casting zone
- "Presentation Focus" → Cast to Conference Room

### HomeKit Integration
- Cast started → trigger HomeKit scene
- Cast stopped → trigger "movie over" scene

---

## Out of Scope
- Real-time stream transcoding
- Automatic content acquisition
