# Nimbus — R17: Shortcuts & Automation Deep Dive

## Goal
Make Nimbus deeply automatable through Shortcuts, AppleScript, and system integrations for knowledge workflows.

---

## Scope

### Shortcuts App Integration
- "Create Note" → creates note with specified title/content
- "Get Recent Notes" → list of recent notes
- "Search Notes" → search by query
- "Append to Note" → add content to existing note
- "Get Meeting Notes" → notes from today
- "Create Note from Text Selection" → create from copied text
- Siri Suggestions: "Take a note" when leaving a meeting location

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Nimbus" to create note "Title" with content "Body"`
- `tell application "Nimbus" to search notes "budget"`
- `tell application "Nimbus" to get notebooks`
- Automator actions for all Nimbus functions

### Menu Bar Extra
- Native MenuBarExtra API
- Quick note capture from menu bar
- Recent notes list
- Quick search
- Global hotkey for new note

### Finder / Files Integration
- Quick Actions: "Create Nimbus Note from File"
- Files app integration: save file to Nimbus notebook
- Finder extension: right-click → add to Nimbus notebook

### Calendar Integration
- Meeting ends → auto-create meeting notes template
- Meeting invite → suggest creating pre-meeting agenda note
- Calendar event → link to related Nimbus note

### Automation Triggers
- Triggers: "When note created → run automation"
- "When note updated → notify team"
- "When meeting starts → open meeting notes"
- "When meeting ends → create follow-up note"

### Template Automation
- Auto-create notes from templates on schedule
- "Every Monday → create weekly planning note"

---

## Out of Scope
- Automatic transcription from audio calls
- Cross-device note handoff
