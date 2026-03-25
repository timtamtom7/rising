# crisp — Round 17: Chrome Extension, Browser Recorder, Productivity Suite

## Goal
Extend Crisp into the browser — making it a universal meeting recorder that works with any video conferencing tool via browser extension, positioning Crisp as the meeting intelligence layer for the entire web.

---

## Scope

### Chrome / Safari Extension
- "Capture" button in browser toolbar — appears on any page
- Works with: Google Meet, Zoom Web, Microsoft Teams Web, RingCentral, Loom, and any other web-based video call
- Captures: audio, video (screen + camera), transcript (via browser's Web Speech API)
- Side panel: shows live transcript while recording
- One-click save to Crisp library

### Browser Recorder
- Fallback: if the meeting tool doesn't support extension recording, use screen recording + system audio capture
- Crisp captures the entire browser tab with audio
- No installation required on the meeting host's side — just install extension on attendee's side

### Crisp + Notion / Obsidian Extension
- Native extension for Notion: "Import this meeting" button in Notion
- Obsidian plugin: sync Crisp notes directly to Obsidian vault
- Both: bidirectional — edit in Crisp or Notion, sync back

### Productivity Suite Features
- **Crisp for Gmail**: After a call, one-tap attach meeting notes to a Gmail thread
- **Crisp for Google Docs**: Insert meeting transcript into a Google Doc
- **Crisp for Slack**: Slash command `/crisp summary [meeting-id]` — posts AI summary to current Slack channel
- **Crisp for Calendar**: Chrome extension adds "View Crisp notes" button in Google Calendar event detail view

---

## Out of Scope
- Crisp desktop app for Windows/Linux (R18 — long-term)
- Subscription business optimization (R18)
