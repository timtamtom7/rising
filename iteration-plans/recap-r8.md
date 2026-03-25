# RECAP — R8: Collaboration, Remote Sharing, Team Features

## Overview
R8 adds collaboration features for team recording sessions, live streaming to YouTube/Twitch, and team library sharing.

## New Functionality

### R42: Live Streaming
- Stream screen recording live to:
  - YouTube Live (via YouTube Data API v3)
  - Twitch (via Twitch API)
  - Custom RTMP server
- `LiveStreamService` using `AVAssetWriter` → `RTMPOutput` (via custom RTMP library)
- Live preview before going live
- Stream key storage in Keychain
- Quality presets: 720p/30fps, 1080p/30fps, 1080p/60fps
- Bitrate: 2500-6000 kbps based on quality
- Chat overlay option (Twitch/YouTube live chat)
- Go live / End stream buttons
- Stream health indicator (bitrate, dropped frames)

### R43: Collaboration Recording
- Multiple team members recording to shared session
- "Session Code" for easy joining
- Each member sees all participants' cursors and annotations
- Annotations are shared in real-time via `MultipeerConnectivity` or `CloudKit`
- Session host controls recording start/stop
- `CollaborationSession` model:
  ```swift
  struct CollaborationSession: Identifiable, Codable {
      let id: UUID
      var hostId: String
      var sessionCode: String      // 6-character alphanumeric
      var participants: [Participant]
      var recordingState: RecordingState
  }
  
  struct Participant: Identifiable, Codable {
      let id: String
      var displayName: String
      var cursorPosition: CGPoint?
      var isRecording: Bool
  }
  ```

### R44: Live Annotation Sync
- See other collaborators' cursors and annotations in real-time
- `AnnotationSyncService` using `MultipeerConnectivity` (local network) or CloudKit (cross-network)
- Cursor colors assigned per participant
- All annotations synced at 10fps minimum
- Latency indicator
- "Follow Participant" mode: your view follows their cursor

### R45: Team Recording Library
- Shared team library for team recordings
- Team admins can organize recordings into folders
- Member permissions: view-only, download, edit metadata, delete
- Activity log: who recorded what and when
- Team storage quota management
- `TeamLibraryService` via CloudKit (private database)

### R46: Viewer Analytics
- Track views on shared recordings
- View counts, unique viewers, watch time
- Viewer list (anonymized)
- Engagement: pause points, rewatch sections
- "Most Watched" section in team library
- Analytics dashboard

### R47: Approval Workflow
- Optional: new recordings require approval before sharing
- Reviewer can watch, comment, approve/reject
- Comment threads on recordings
- Version history (if re-recorded)
- Approval notifications

## File Structure Additions
```
RECAP/
├── Services/
│   ├── LiveStreamService.swift
│   ├── RTMPStreamWriter.swift
│   ├── CollaborationSessionService.swift
│   ├── AnnotationSyncService.swift
│   ├── MultipeerService.swift
│   ├── TeamLibraryService.swift
│   ├── AnalyticsService.swift
│   └── ApprovalWorkflowService.swift
├── Views/
│   ├── LiveStreamView.swift
│   ├── StreamSettingsView.swift
│   ├── CollaborationSessionView.swift
│   ├── SessionLobbyView.swift
│   ├── ParticipantCursorOverlay.swift
│   ├── TeamLibraryView.swift
│   ├── TeamFolderView.swift
│   ├── AnalyticsDashboard.swift
│   └── ApprovalReviewView.swift
├── ViewModels/
│   ├── LiveStreamViewModel.swift
│   ├── CollaborationViewModel.swift
│   └── TeamLibraryViewModel.swift
└── Models/
    ├── LiveStreamConfig.swift
    ├── CollaborationSession.swift
    ├── Participant.swift
    └── TeamLibraryFolder.swift
```

## Success Criteria
- [ ] YouTube Live stream starts successfully
- [ ] Twitch stream starts successfully
- [ ] Stream chat overlay shows messages
- [ ] Collaboration session can be created with code
- [ ] Participant cursors visible to all
- [ ] Annotations sync between participants
- [ ] Team library shows shared recordings
- [ ] Permissions can be set per member
- [ ] View analytics are tracked
- [ ] Approval workflow functions correctly
