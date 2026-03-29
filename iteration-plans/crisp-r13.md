# crisp — Round 13: Team Workspaces, Organization Management, Admin Controls

## Goal
Expand Crisp beyond individual users into a team/productivity platform — enabling organizations to manage shared meeting notes, enforce compliance, and gain team-level analytics.

---

## Scope

### Team Workspace
- **Organization**: Create a workspace for your team/company
- **Shared meeting library**: All team meetings visible to workspace members (with permissions)
- **Permission levels**: Admin, Member, Guest (external collaborators)
- **Invite via link or email**: Easy onboarding for new team members

### Admin Controls
- **Compliance logging**: All meetings are archived for compliance (relevant for legal, healthcare, finance)
- **Data retention policies**: Configurable (e.g., "delete meetings older than 2 years")
- **User management**: Add/remove members, assign roles, view activity logs
- **Single sign-on (SSO)**: Google Workspace / Microsoft SSO for enterprise teams

### Team Analytics
- **Meeting load dashboard**: How many meetings per week, per team, per person
- **Action item tracking**: Which action items are completed vs. overdue
- **Meeting frequency**: Who's scheduling the most meetings vs. receiving most invites
- **Talking time analysis**: Who speaks most/least in team meetings
- **Team leaderboard** (opt-in): "Most action items closed this week"

### Crisp for Education
- **Lecture capture**: Professors can record lectures with auto-transcription
- **Student note-taking**: Students can annotate shared lecture transcripts
- **Office hours**: 1:1 recorded sessions between professors and students
- **Study group**: Shared note space for student study groups

---

## CrispMac Companion — Round 13: System Deeper Integration, Automation & Enterprise

### System-Level Automation
- **Shortcuts integration**: Native Apple Shortcuts actions — "Start Crisp recording", "Get latest transcript", "Create note from clipboard"
- **Automator actions**: Workflow actions for power users
- **Scripting support**: AppleScript dictionary for scripting recording, playback, and library access
- **Launch at login**: System login item registration via ServiceManagement framework

### Enterprise & Advanced
- **SSO support**: Google Workspace / Microsoft SSO for enterprise Mac deployments
- **MDM configuration**: Mobile Device Management profile support for org-wide deployment
- **Network audio capture**: Record from networked microphones or audio interfaces
- **Audit logging**: Local audit log of all recordings and exports (for compliance)

### Advanced macOS Features
- **VRR display support**: Smooth 120Hz waveform animation on ProMotion displays
- **Spatial audio playback**: Head-tracked spatial audio on Mac with AirPods Pro
- **Metal-accelerated waveform**: GPU-rendered waveform using Metal for perf on large recordings
- **External display recording**: Record from FaceTime camera + screen simultaneously

---

## Out of Scope
- Third-party integrations (Zoom, Google Meet, Teams) (R14)
- Internationalization (R15)
