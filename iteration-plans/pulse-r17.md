# Pulse — R17: Shortcuts Automation & System Integration

## Goal
Make Pulse deeply automatable through Shortcuts, AppleScript, and system integrations for health-conscious power users.

---

## Scope

### Shortcuts App Integration
- "Get Current Heart Rate" → number output
- "Get Heart Rate Trend" → text summary
- "Get Weekly Heart Summary" → detailed summary
- "Get Care Circle Status" → family members' status
- "Get Latest Insight" → most recent AI insight
- Siri Suggestions: proactive health summaries in the morning

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Pulse" to get current heart rate`
- `tell application "Pulse" to get weekly summary`
- `tell application "Pulse" to get care circle status`
- Automator actions for all Pulse functions

### Menu Bar Extra
- Native MenuBarExtra API
- Always-on heart icon with live HR display
- Click to see quick trends
- Alert badges for anomalies

### Focus Integration
- When Focus activates → Pulse logs reduced HR expectation context
- Focus modes linked to health patterns: "During Work Focus, your avg HR is 72"

### Health App Integration
- Pulse data written back to Apple Health (as appropriate)
- Heart rate variability (HRV) from Pulse available in Apple Health
- Respiratory rate (if derivable) written to Apple Health

### HomeKit Integration
- HomeKit accessory: Mac as a health monitor
- When HR enters a specific range → trigger HomeKit scene
- "Movie mode": when watching a movie, dim lights, set thermostat

### Shortcuts Triggers
- Triggers: "When HR goes above X" → run automation
- "When anomaly detected" → notify via SMS/email
- "Every morning at 8am" → get weekly summary spoken by Siri

---

## Out of Scope
- Direct integration with pacemakers or medical devices
- Emergency services integration (beyond emergency contact)
