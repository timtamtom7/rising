# Recap — R17: Shortcuts & Automation

## Goal
Make Recap deeply automatable through Shortcuts, AppleScript, and scheduled content gathering.

---

## Scope

### Shortcuts App Integration
- "Generate Daily Recap" → generate recap
- "Get Latest Recap" → open latest recap
- "Add Article to Recap" → save article
- "Get Recap Sources" → list sources
- "Search Recaps" → search by query
- Siri Suggestions: proactive when daily recap time approaches

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Recap" to generate daily recap`
- `tell application "Recap" to get latest recap`
- `tell application "Recap" to add source "https://..."`
- Automator actions for all Recap functions

### Menu Bar Extra
- Native MenuBarExtra API
- Quick recap access in menu bar
- "Generate Recap" button
- Recent recap list

### Scheduled Automation
- Daily recap generation: every morning at 8am
- Weekly digest: every Monday at 9am
- "When article saved → add to today's recap queue"
- Calendar-triggered: before weekly meeting → generate recap

### Folder Actions
- New article in folder → auto-add to Recap
- RSS download → offer to add as source

### Automation Triggers
- Triggers: "When recap generated → notify team"
- "When new article from source → add to queue"
- "When weekly digest ready → send to Slack"

---

## Out of Scope
- Real-time news monitoring
- Automatic social posting
