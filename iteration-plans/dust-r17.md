# Dust — R17: Shortcuts & Automation Deep Dive

## Goal
Make Dust deeply automatable through Shortcuts, AppleScript, Focus modes, and system integrations.

---

## Scope

### Shortcuts App Integration
- "Start Focus Session" → launches focus with default config
- "Start Deep Work Focus" → named session
- "End Focus Session" → ends current session
- "Get Focus Status" → current session info
- "Get Focus Stats" → today's focus time, streak
- "Block App" → add app to blocklist
- "Get Focus Insights" → ML-generated insight
- Siri Suggestions: proactive when usual focus time approaches

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Dust" to start focus session`
- `tell application "Dust" to get focus stats`
- `tell application "Dust" to block app "Twitter"`
- Automator actions for all Dust functions

### Menu Bar Extra
- Native MenuBarExtra API
- Focus timer in menu bar
- Quick start/stop
- Blocked app count badge
- Current session info

### Focus Mode Integration (macOS Ventura+)
- Dust appears in Focus mode settings
- Custom Focus mode: "Deep Work" uses Dust blocking
- Focus activates → Dust starts appropriate session
- Focus ends → Dust ends session

### Shortcuts Triggers
- Triggers: "When focus session starts → run automation"
- "When break is required → send notification"
- "When daily goal reached → celebrate"
- "When distraction blocked → log and continue"

### Calendar Triggers
- When calendar event titled "Focus Time" starts → auto-start Dust
- When meeting starts → pause focus session

---

## Out of Scope
- Automatic task scheduling based on focus data
- Cross-device focus handoff
