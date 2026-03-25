# Sash — R17: Shortcuts & Automation Deep Dive

## Goal
Make Sash deeply automatable through Shortcuts, AppleScript, and system triggers for advanced sync workflows.

---

## Scope

### Shortcuts App Integration
- "Get Sync Status" → text summary
- "Sync Folder" → trigger sync for named folder
- "Get Recent Changes" → list of recent changes
- "Resolve Conflict" → resolve with specified strategy
- "Add Folder to Sash" → add folder by path
- "Get Conflict List" → list active conflicts
- Siri Suggestions: "Folder needs attention" when conflicts detected

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Sash" to get sync status`
- `tell application "Sash" to sync folder "Work Documents"`
- `tell application "Sash" to get conflicts`
- `tell application "Sash" to resolve conflict "file.txt" with strategy "local"`
- Automator actions for all Sash functions

### Menu Bar Extra
- Native MenuBarExtra API
- Sync status icon with live indicator
- Quick menu: sync all, pause sync, open dashboard
- Conflict count badge

### Folder Actions
- Attach Sash to any folder: new files auto-synced
- "When file added to Downloads → sync to team folder"
- Automator workflow triggers

### Automation Triggers
- Triggers: "When conflict detected → run automation"
- "When file changes in folder X → sync immediately"
- "When device comes online → sync all pending"
- "When new device connected → configure folder sync"

### Focus Integration
- When Focus mode activates → Sash enters "quiet sync" (minimal network activity)
- Scheduled sync pause during Focus sessions

---

## Out of Scope
- Cross-platform sync orchestration (Windows/Mac simultaneous control)
- Real-time video/file streaming via Sash protocol
