# RECAP — R1: Screen Recording Foundation

## Overview
RECAP is a native macOS screen recording app with timestamp/annotation capabilities. R1 establishes AVFoundation-based recording, menu bar controls, and MOV/MP4 export.

## Reference Architecture
- **Project:** `/Users/mauriello/Projects/chronicle` (Chronicle)
- **Pattern:** SwiftUI views hosted in `NSHostingController`, AppKit for menu bar, system permissions
- **Permissions:** Screen Recording, Microphone (if audio)
- **Recording:** `AVCaptureScreenInput`, `AVAssetWriter`, `AVCaptureVideoDataOutput`
- **Export:** `AVAssetExportSession` for MOV/MP4 via `AVAssetWriter`

## Dependencies (SPM)
```
- None (all native AVFoundation)
```

## App Lifecycle
```
main.swift → AppDelegate → NSApplication.shared
  └─ RECAPApp (SwiftUI)
       └─ ContentView (NSHostingController.rootView)
```

### Window Hierarchy
- **Menu Bar Status Item:** `NSStatusItem` with `record.circle` SF Symbol
  - Click → popover with recording controls
- **Main Window:** `RecordingWindowController` (NSWindowController)
  - Recording preview (live `AVCaptureVideoPreviewLayer`)
  - Timer display
  - Control bar (record, pause, stop)
- **Menu Bar Extra popover:**
  ```
  ┌─────────────────────────┐
  │ ● RECAP                 │
  ├─────────────────────────┤
  │ [●] Recording: 00:05:23 │
  ├─────────────────────────┤
  │ ⏸ Pause                 │
  │ ⏹ Stop                  │
  ├─────────────────────────┤
  │ Recent Recordings       │
  │   └─ Recording 1  5:23  │
  │   └─ Recording 2  12:01 │
  ├─────────────────────────┤
  │ Open RECAP...       ⌘↩ │
  │ Settings...         ⌘, │
  └─────────────────────────┘
  ```

## Functionality

### R1: AVFoundation Recording
- `ScreenCaptureService` using `AVCaptureScreenInput`
- Capture display or specific window
- `AVCaptureVideoDataOutput` for frame-by-frame writing
- `AVAssetWriter` for encoding:
  - Codec: H.264 (MP4) or ProRes 422 (MOV)
  - Resolution: native or scaled
  - Frame rate: 30fps default (configurable: 60fps, 24fps)
  - Bitrate: 10 Mbps default (High Quality preset)
- Audio capture: `AVCaptureScreenInput` includes display audio
- `ScreenRecordSession` manages the recording lifecycle
- Pause/resume support (AVAssetWriter handles this via `-pauseRecording` / `-resumeRecording`)
- Recording state machine: `.idle` → `.recording` → `.paused` → `.stopped`

### R2: Menu Bar Controls
- `NSStatusItem` with dynamic icon:
  - Idle: `record.circle` (gray)
  - Recording: `record.circle.fill` (red, animated pulse)
  - Paused: `pause.circle.fill` (orange)
- Popover controls: Start, Pause/Resume, Stop, Settings
- Display count of recent recordings
- Keyboard shortcut: ⌘⇧R to start/stop recording
- Recording timer shown in popover and optionally in menu bar title

### R3: MOV/MP4 Export
- Export presets:
  - **High Quality:** MOV / ProRes 422 / native resolution / 60fps
  - **Standard:** MP4 / H.264 High Profile / 1080p / 30fps
  - **Compact:** MP4 / H.264 Baseline / 720p / 30fps / 5 Mbps
  - **GIF:** (R3 — placeholder for R3)
- `ExportService.export(session:to:preset:)` → async file write
- Export to user-selected folder via `NSSavePanel`
- Default save location: `~/Movies/RECAP/`
- Filename template: `Recording-YYYY-MM-DD-HHmmss.mov`
- Post-export: notification with "Show in Finder" action

### R4: Display/Window Selection
- Before recording starts: display/window picker sheet
- `DisplayPickerView`: list of connected displays with thumbnails
- `WindowPickerView`: list of windows from running apps
- Option to record cursor or hide it
- Option to record with/without audio
- Remember last selection in UserDefaults

### R5: Recording Persistence
- `Recording` model stored in SQLite:
  ```sql
  CREATE TABLE recordings (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      file_path TEXT NOT NULL,
      duration_seconds REAL NOT NULL,
      created_at TEXT NOT NULL,
      thumbnail_path TEXT,
      file_size_bytes INTEGER,
      display_name TEXT,
      includes_audio INTEGER NOT NULL DEFAULT 0,
      codec TEXT NOT NULL,
      resolution_width INTEGER,
      resolution_height INTEGER
  );
  ```
- Recordings library view: grid/list of past recordings
- Thumbnail generation via `AVAssetImageGenerator`

## Data Models
```swift
struct Recording: Identifiable, Codable {
    let id: UUID
    var title: String
    var filePath: URL
    var duration: TimeInterval
    var createdAt: Date
    var thumbnailPath: URL?
    var fileSize: Int64
    var displayName: String?
    var includesAudio: Bool
    var codec: String        // 'h264', 'prores422'
    var resolution: CGSize
}

enum RecordingState {
    case idle
    case recording
    case paused
    case stopping
    case stopped
}

enum ExportPreset: String, CaseIterable {
    case highQuality  // MOV ProRes
    case standard     // MP4 H264
    case compact      // MP4 H264 720p
}
```

## File Structure
```
RECAP/
├── App/
│   ├── main.swift
│   ├── RECAPApp.swift
│   ├── AppDelegate.swift
│   └── AppState.swift
├── Models/
│   ├── Recording.swift
│   └── RecordingState.swift
├── Services/
│   ├── ScreenCaptureService.swift
│   ├── ScreenRecordSession.swift
│   ├── ExportService.swift
│   ├── RecordingStore.swift
│   └── ThumbnailGenerator.swift
├── Views/
│   ├── ContentView.swift
│   ├── RecordingPreviewView.swift
│   ├── ControlBarView.swift
│   ├── DisplayPickerView.swift
│   ├── WindowPickerView.swift
│   ├── RecordingsLibraryView.swift
│   ├── RecordingRowView.swift
│   └── ExportSettingsSheet.swift
├── ViewModels/
│   ├── RecordingViewModel.swift
│   └── LibraryViewModel.swift
├── MenuBar/
│   ├── MenuBarController.swift
│   └── MenuBarPopoverView.swift
└── Resources/
    └── Assets.xcassets
```

## Keyboard Shortcuts
| Shortcut | Action |
|---|---|
| ⌘⇧R | Start/Stop Recording |
| ⌘⇧P | Pause/Resume Recording |
| ⌘S | Save (export) current recording |
| ⌘, | Open Settings |
| Esc | Cancel current operation |

## Success Criteria
- [ ] Can select a display or window to record
- [ ] Recording starts within 1 second of clicking Record
- [ ] Live preview shows what is being captured
- [ ] Timer counts up accurately during recording
- [ ] Pause/resume works without corruption
- [ ] Stop saves file to disk successfully
- [ ] Export to MOV works with ProRes 422
- [ ] Export to MP4 works with H.264
- [ ] Menu bar icon reflects current recording state
- [ ] Recordings appear in library view after stopping
- [ ] App handles display disconnect during recording gracefully
