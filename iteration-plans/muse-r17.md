# Muse — R17: Shortcuts & Automation

## Goal
Make Muse automatable through Shortcuts, AppleScript, and MIDI/automation triggers.

---

## Scope

### Shortcuts App Integration
- "Start Recording" → begin recording in current project
- "Play Project" → play named project
- "Get Current Tempo" → read tempo
- "Set Tempo" → change tempo
- "Export Project" → export to audio file
- "Create Project" → new project
- Siri Suggestions: proactive when typical music creation time

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Muse" to play project "Song 1"`
- `tell application "Muse" to set tempo to 120`
- `tell application "Muse" to export project "Song 1" as "mp3"`
- Automator actions for all Muse functions

### Menu Bar Extra
- Native MenuBarExtra API
- Quick transport controls in menu bar
- Current project name
- Metronome toggle

### MIDI Triggers
- MIDI note/trigger → start recording
- MIDI controller → control mixer
- Foot pedal support for hands-free control

### Automation Triggers
- Triggers: "When project plays → trigger light scene"
- "When recording starts → trigger countdown"
- "When tempo changes → adjust backing track"

### Folder Actions
- Audio file added to folder → import to Muse

---

## Out of Scope
- Real-time collaboration via Shortcuts
- Cloud-based rendering triggers
