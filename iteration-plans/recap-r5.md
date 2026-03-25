# RECAP — R5: Widgets, Cloud Upload, App Store Prep

## Overview
R5 adds widgets, cloud upload services, and App Store submission readiness.

## New Functionality

### R23: Widgets
- WidgetKit extension: `RECAPWidgets`
- Widget families: `.systemSmall`, `.systemMedium`, `.accessoryCircular`
- Small widget: last recording thumbnail + duration
- Medium widget: last 3 recordings with thumbnails
- Circular accessory: recording status (idle/recording)
- Deep link: `recapds://open/{recordingId}`
- Widget shows recent recordings, click to open in RECAP

### R24: Cloud Upload Services
- Direct upload to cloud storage from within RECAP
- Supported services:
  - **Dropbox** — via DropboxAPI (SPM: `SwiftyDropbox`)
  - **Google Drive** — via GoogleAPIClient (SPM: `GoogleAPIClientForREST`)
  - **YouTube** — via `GTMSessionFetcher` + YouTube Data API v3
  - **Vimeo** — via Vimeo API
- `CloudUploadService` with protocol for each provider
- Upload progress shown in UI
- Automatic upload option after recording stops
- Upload history in Settings
- OAuth2 authentication per service
- Credentials stored in Keychain

### R25: Cloud Sync for Recording Library
- Sync recording metadata across devices via iCloud (CloudKit)
- Actual video files remain local (too large for CloudKit)
- `CKSyncService` manages record sync
- Recording library on new device shows recordings from other devices with "local" indicator
- "Copy to this Mac" option for remote recordings (downloads from iCloud Drive)
- Sync metadata: id, title, notes, tags, createdAt, duration, thumbnail

### R26: WidgetKit Time-Limited Recording
- Widget with button to start a "Quick Capture" (30s/1m/5m/15m)
- Tap widget to start recording immediately
- Shortcuts app integration
- `Intents` framework: `StartQuickRecordingIntent`

### R27: Shortcuts Integration
- `StartRecording` intent
- `StopRecording` intent
- `GetRecentRecordings` intent
- `ExportRecording` intent with preset parameter
- Parameters: duration (for quick recording), export preset
- Results: recording name, file path, duration
- Donate intents on use

### R28: App Store Readiness — Entitlements
- `RECAP.entitlements`:
  ```xml
  <key>com.apple.security.app-sandbox</key>
  <true/>
  <key>com.apple.security.network.client</key>
  <true/>
  <key>com.apple.security.files.user-selected.read-write</key>
  <true/>
  <key>com.apple.security.keychain-access-groups</key>
  <array><string>$(AppIdentifierPrefix)com.recap.app</string></array>
  <key>com.apple.security.application-groups</key>
  <array><string>group.com.recap.app</string></array>
  ```
- Screen Recording permission (no entitlement, runtime prompt)
- Microphone permission if audio enabled
- Hardened Runtime for notarization
- App Store categories: Productivity, Utilities

### R29: App Store Readiness — Content
- Pricing: Free (with Pro IAP for multi-display, cloud upload, scheduled recording)
- Pro features:
  - Multi-display recording
  - Cloud upload (Dropbox, GDrive, YouTube, Vimeo)
  - Scheduled recording
  - Unlimited recording history
  - Custom export presets
- Screenshots: recording UI, library, annotation tools, export options
- Privacy policy URL required
- Marketing: `recap.app`

### R30: Performance & Polish
- Hardware-accelerated encoding (VideoToolbox)
- Efficient memory usage during recording (ring buffer)
- Background recording support (limited by macOS)
- Disk space warning when < 5GB free
- Auto-stop recording when disk is full
- Clean shutdown: properly close AVAssetWriter

## File Structure Additions
```
RECAP/
├── RECAPWidgets/
│   ├── RECAPWidgetsBundle.swift
│   ├── RecentRecordingsWidget.swift
│   ├── QuickRecordWidget.swift
│   └── WidgetTimelineProvider.swift
├── Services/
│   ├── CloudUploadService.swift
│   ├── DropboxUploadService.swift
│   ├── GoogleDriveUploadService.swift
│   ├── YouTubeUploadService.swift
│   ├── VimeoUploadService.swift
│   ├── CloudSyncService.swift
│   └── DiskSpaceMonitor.swift
├── Views/
│   ├── CloudUploadSettingsView.swift
│   ├── CloudSyncSettingsView.swift
│   └── WidgetConfigView.swift
├── Intents/
│   ├── StartRecordingIntent.swift
│   ├── StopRecordingIntent.swift
│   └── IntentHandler.swift
└── Resources/
    └── RECAP.entitlements
```

## Cloud Upload UI
```
┌─ Cloud Upload ─────────────────────────────────────────┐
│                                                         │
│  ☑ Automatically upload after recording                │
│                                                         │
│  Services:                                             │
│  ┌─────────────────────────────────────────────────┐  │
│  │ 💚 Dropbox         [Connect] ● Connected        │  │
│  │    /RECAP/                          12 uploads  │  │
│  ├─────────────────────────────────────────────────┤  │
│  │ 🔵 Google Drive    [Connect] ○ Not connected     │  │
│  ├─────────────────────────────────────────────────┤  │
│  │ 🔴 YouTube         [Connect] ○ Not connected      │  │
│  │    Channel: Not set                             │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  Upload Quality: [High (original)      ▾]              │
│                                                         │
│            [ Cancel ]  [ Save Settings ]              │
└───────────────────────────────────────────────────────┘
```

## Success Criteria
- [ ] Widget appears in Notification Center
- [ ] Widget shows correct recording count
- [ ] Quick record widget starts recording on tap
- [ ] Dropbox upload works with OAuth
- [ ] YouTube upload works with proper API setup
- [ ] iCloud sync syncs recording metadata
- [ ] Shortcuts actions appear in Shortcuts app
- [ ] App builds with sandbox and hardened runtime
- [ ] Screen recording permission is requested correctly
- [ ] Pro IAP prompts upgrade UI correctly
