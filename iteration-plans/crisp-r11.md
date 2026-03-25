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

## Out of Scope
- Video meeting recording (R12)
- Team workspace / org-level features (R13)
