# crisp — Round 12: Video Recording, Gallery View, Premium Playback

## Goal
Add video recording capability to Crisp, making it a complete meeting capture tool — audio + video + transcript — and introduce a premium playback experience for reviewing recorded meetings.

---

## Scope

### Video Recording
- Toggle between audio-only and video recording modes
- Video captures: front camera, screen recording, or both (picture-in-picture)
- Video uses efficient codec (HEVC) to keep file sizes manageable
- Video is synced with transcript — tap any word in transcript to jump to that video moment
- Video stored locally with optional cloud backup (Pro tier)

### Meeting Gallery
- **Gallery view**: All your meetings displayed as cards with thumbnail, title, date, participant avatars, and duration
- **Filter by**: meeting type, date range, participants, has action items, is unresolved
- **Search**: Full-text search across all transcripts — jump to the exact meeting that mentions a topic
- **Sort by**: date, duration, participant count, last accessed

### Premium Playback
- **Playback speed with voice tuning**: Speed up audio without making it chipmunk-y (pitch correction)
- **Skip silence**: Auto-skip pauses and dead air (AI detects silence > 2s)
- **Chapter markers**: AI auto-generates chapters based on topic shifts in transcript
- **Jump to action items**: Filter playback to only segments with action items
- **Clip extraction**: Select a segment of the transcript and export just that audio/video clip

### Clip Sharing
- Share a link to a specific clip (not full recording) — recipient sees only that segment
- Clips are watermarked with "Recorded with Crisp" — subtle branding
- Analytics: see when someone views your shared clip

---

## CrispMac Companion — Round 12: Desktop Widgets, Notifications & Advanced Playback

### Desktop Widgets (WidgetKit)
- **Small widget**: Quick record button + last recording timestamp
- **Medium widget**: Recent 3 recordings with title + duration
- **Large widget**: Full library view with search
- **Lock Screen widget**: Record button accessible from Lock Screen

### Advanced Notifications
- **Actionable notifications**: "Meeting saved — tap to view" with inline playback controls
- **Action item reminders**: Notification when an action item is due
- **Weekly summary**: Friday digest showing meetings this week + action items

### macOS Native Playback
- **Picture-in-Picture**: Float video/audio playback over other windows
- **Space theater mode**: Full-screen playback with distraction-free dark UI
- **AirPlay**: Stream audio playback to AirPlay speakers
- **Keyboard navigation**: Space to play/pause, ← → to skip 15s, J/K/L for playback control (YouTube-style)

### Clip Sharing & Export
- **Share menu integration**: Export audio/video clip via standard macOS Share menu
- **Drag & drop**: Drag a clip from Crisp directly into Messages, Mail, Slack
- **QuickLook preview**: Press Space on any recording in Finder to preview audio

---

## Out of Scope
- Crisp for Teams/org-level management (R13)
- Crisp API for integrations (R14)
