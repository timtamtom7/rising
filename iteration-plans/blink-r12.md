# Blink — Iteration R12: Sharing & Shared Albums

## Goal
Allow selective sharing of individual clips or curated albums with trusted people — intimate sharing, not social broadcasting.

---

## Feature List

### R12.1 — Individual Clip Export
- Share any single clip as a video file (MOV/MP4)
- Export to Files app, AirDrop, Messages, email
- Option to trim (choose start/end within the 30s clip)
- "Copy link" for local network sharing

### R12.2 — Shared Albums
- Create a named album from selected clips
- Invite others via link or Apple ID email
- Shared album lives in iCloud (or user's own cloud if they prefer)
- Collaborators can add clips from their own Blink collection
- Album is read-only for viewers unless they have edit permission

### R12.3 — Shared Album Viewer
- Simple web view or lightweight macOS viewer for people without the app
- Stream clips without downloading full files
- Download individual clips or full album as zip

### R12.4 — Collaboration Notifications
- Notify album owner when someone adds a clip
- "X added a moment to Summer 2025 album"
- Prevent spam: rate-limit adds

### R12.5 — Privacy Controls
- Per-clip sharing toggle (default: off)
- Album owner can lock album (no new adds)
- Remove someone from shared album

---

## Technical Approach
- **iCloud sharing** via CloudKit (CKDContainer.share)
- **Link-based sharing** via CloudKit sharing or custom signed URLs
- **HLS streaming** for album viewing without download
- **Keychain** for managing sharing credentials
- **Compress** exported clips to HEVC for smaller file sizes

---

## UI Changes
- Share button on PlaybackView (export icon)
- Albums section in sidebar: "My Albums" + "Shared With Me"
- Album detail view: clip grid, collaborator avatars, add clip button
- Settings: sharing preferences, linked accounts

---

## Milestones
- [ ] Clip export with trim (R12.1)
- [ ] Shared album creation and CloudKit sharing (R12.2)
- [ ] Album viewer for non-users (R12.3)
- [ ] Collaboration notifications (R12.4)
- [ ] Privacy controls (R12.5)
