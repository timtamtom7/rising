# crisp — Round 11: AI Meeting Intelligence, Real-Time Collaboration

## Goal
Transform Crisp from a personal voice recorder into an AI-powered meeting intelligence platform — capturing meetings, generating summaries, extracting action items, and enabling real-time collaboration on notes.

---

## Scope

### AI Meeting Intelligence
- **Real-time transcription**: Use Speech framework with on-device model for live transcription during recording
- **AI summarization**: After recording, generate an executive summary (2-3 sentences), key points (bullet list), and **action items** (who needs to do what by when)
- **Speaker diarization**: Identify different speakers (Speaker 1, Speaker 2) — use on-device ML to distinguish voices
- **Meeting score**: AI rates the meeting quality ("Good discussion balance", "One person dominated", "Clear action items emerged")
- **Follow-up reminders**: If action items are extracted, set reminders to check in on completion

### Real-Time Collaboration
- **Live shared notes**: During a meeting, invite others to view live transcription on their device
- **Shared annotations**: Collaborators can highlight text and add reactions in real-time
- **Comment threads**: Tap any transcribed segment to add a comment (visible to all collaborators)
- **Version history**: All changes tracked, can revert

### Meeting Templates
- **Template library**: Pre-built templates for different meeting types (1:1, team standup, client call, brainstorming, board meeting)
- **Custom templates**: Create your own template with custom sections (e.g., "Agenda", "Discussion", "Decisions", "Action Items")
- **Template-driven recording**: When you start recording with a template, the AI knows context and formats output accordingly

### Calendar Integration
- Connect to Apple Calendar (CalDAV)
- Auto-detect upcoming meetings from calendar — offer to auto-record them
- "Join meeting" shortcut in Crisp to jump to the meeting's Crisp note
- Calendar shows Crisp notes alongside events

---

## CrispMac Companion — Round 11: Menu Bar & System Integration

### Menu Bar Presence
- **Menu bar icon**: Crisp icon in macOS menu bar — click to open quick capture window
- **Quick capture popup**: Floating mini-window for one-tap recording without opening full app
- **Now Playing in menu bar**: Show waveform icon that pulses during recording, static when idle
- **Keyboard shortcuts**: Global hotkey (default ⌘⇧C) to start/stop recording from anywhere

### System Audio Capture
- **System audio recording**: Capture audio from any app (Zoom, Safari, etc.) using macOS screen recording audio path
- **Microphone + system audio mix**: Record both voice and system audio simultaneously
- **Audio source selector**: Choose input sources before recording (mic only, system only, or mixed)

### iOS ↔ macOS Handoff
- **Handoff support**: Start recording on iPhone, continue on Mac (and vice versa)
- **Universal clipboard**: Copy transcribed text between devices seamlessly
- **iCloud sync**: All notes sync via iCloud, available on both platforms instantly
- **Continuity camera**: Use iPhone as microphone/camera input directly from Mac

### Native macOS UX
- **Touch Bar support**: Recording controls on Touch Bar (start, stop, waveform preview)
- **Focus mode awareness**: Respect Do Not Disturb — suppress notifications during recording
- **Dock badge**: Show unread notes count on Dock icon

---

## Out of Scope
- Video meeting recording (R12)
- Team workspace / org-level features (R13)
