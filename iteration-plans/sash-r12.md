# Sash — R12: Collaboration & Team Sync

## Goal
Enable team folder synchronization with access controls, audit logging, and collaborative workflows.

---

## Scope

### Team Shared Folders
- Create a team folder structure shared via Sash
- Invite team members (up to 10 for free, unlimited for paid)
- Role-based access: Admin, Editor, Viewer
- Per-folder permissions: who can read, who can write

### Real-Time Collaboration
- See when teammates are editing a shared file
- Presence indicators: who's currently in a shared folder
- "Sara is editing budget.xlsx" notification
- Auto-save and sync with optimistic locking

### Change Notifications
- Email/in-app notification when team member changes a shared file
- Digest email: daily summary of team folder changes
- "@mention in comment" notification when someone tags you

### Team Activity Feed
- Activity stream of all team folder changes
- Filter by folder, user, date
- Audit trail: who changed what and when

### Guest Access
- Invite external collaborators (clients, contractors) to specific folders
- Read-only or contributor access
- Time-limited links (7/30/90 days)
- External users don't need a Sash account

### Conflict Prevention
- File locking: lock a file while editing to prevent conflicts
- Lock request queue: if file is locked, request access
- Auto-unlock after period of inactivity

---

## Out of Scope
- Video conferencing within Sash
- Task/project management in shared folders
- Real-time co-editing of binary files
