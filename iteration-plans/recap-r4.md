# RECAP — R4: Multi-Monitor, Scheduled Recording, Menu Bar Extra

## Overview
R4 adds multi-monitor support, scheduled/automated recording, and a proper Menu Bar Extra replacing the basic status item.

## New Functionality

### R17: Multi-Monitor Recording
- Record from any connected display
- Record multiple displays simultaneously (Pro feature)
- Picture-in-Picture mode: composite multiple displays into one video
  - Layout options: side-by-side, picture-in-picture (corner), custom grid
  - Each input stream independently resizable
- Display selector UI shows all monitors with previews
- Per-display settings: show/hide cursor, include audio
- `MultiDisplayCaptureService` manages multiple `AVCaptureScreenInput` instances
- Composite encoder: `AVMutableComposition` + `AVMutableVideoComposition`

### R18: Scheduled Recording
- Schedule recording to start at specific time
- `ScheduledRecording` model:
  ```swift
  struct ScheduledRecording: Identifiable, Codable {
      let id: UUID
      var name: String
      var displayId: UUID?
      var windowId: CGWindowID?
      var scheduledTime: Date
      var duration: TimeInterval?     // nil = until stopped
      var repeatInterval: RepeatInterval?
      var isEnabled: Bool
  }
  
  enum RepeatInterval {
      case daily
      case weekly(weekday: Int)   // 1-7
      case hourly
      case custom(days: [Int])     // specific weekdays
  }
  ```
- Schedule list view in Settings
- Create/edit/delete scheduled recordings
- Upcoming recording shown in menu bar popover
- System notification 1 minute before scheduled recording starts
- `ScheduledRecordingService` manages `Timer`-based triggers
- Use `UNCalendarNotificationTrigger` for background scheduling

### R19: Recording Automation
- Start recording automatically on app launch
- Start recording when specific app becomes active
- Start recording on system wake from sleep
- `AutomationTrigger` model:
  ```swift
  enum AutomationTrigger {
      case onAppLaunch
      case onAppActive(bundleId: String)
      case onSystemWake
      case onMeetingStart         // via CalCal/FB calendar integration (future)
  }
  ```
- Global toggle to enable/disable all automations

### R20: Enhanced Menu Bar Extra
- `NSStatusItem` with custom view (not button)
- Dynamic content: shows current recording time or last recording
- Right-click → quick menu (Start, Stop, Recent, Settings)
- Left-click → full popover
- Popover redesign:
  ```
  ┌───────────────────────────────────────┐
  │ 🔴 RECAP                    ⚙️  ✕    │
  ├───────────────────────────────────────┤
  │                                       │
  │  ● Recording: 00:12:34               │
  │  ┌─────────────────────────────────┐  │
  │  │      [Live Preview Thumbnail]   │  │
  │  └─────────────────────────────────┘  │
  │                                       │
  │  [⏸ Pause]        [⏹ Stop]            │
  │                                       │
  ├───────────────────────────────────────┤
  │  Scheduled: Daily Standup at 9:00 AM  │
  │  Next recording in: 8h 47m            │
  ├───────────────────────────────────────┤
  │  Recent                               │
  │  📹 Meeting-2024-03-25    12:34       │
  │  📹 Demo-v2                  5:23     │
  │  📹 Tutorial-recording     15:45      │
  ├───────────────────────────────────────┤
  │  Open RECAP...           ⌘↩           │
  │  All Recordings...       ⌘⌥↩         │
  └───────────────────────────────────────┘
  ```
- `MenuBarController` (NSObject + NSMenuDelegate)
- `MenuBarExtraPopoverView` (SwiftUI)

### R21: Countdown Timer
- Before recording starts: 3-2-1 countdown overlay
- Countdown style options: numeric, circular progress, audio beep
- Configurable: enable/disable, sound on/off
- Screen flash effect on countdown end

### R22: Recording Hotkeys (Global)
- Beyond ⌘⇧R and ⌘⇧P (app shortcuts)
- Global hotkeys via `CGEvent` tap or `DDHotKey` (SPM):
  - F10: Start recording
  - F11: Pause/Resume
  - F12: Stop recording
- Configurable in Settings
- Conflict detection with system/other app shortcuts

## File Structure Additions
```
RECAP/
├── Services/
│   ├── MultiDisplayCaptureService.swift
│   ├── DisplayCompositor.swift
│   ├── ScheduledRecordingService.swift
│   ├── AutomationService.swift
│   └── GlobalHotkeyService.swift
├── Views/
│   ├── MultiDisplaySelectorView.swift
│   ├── PictureInPictureLayoutView.swift
│   ├── ScheduleEditorView.swift
│   ├── ScheduleListView.swift
│   ├── AutomationSettingsView.swift
│   ├── CountdownOverlayView.swift
│   └── HotkeySettingsView.swift
├── ViewModels/
│   ├── MultiDisplayViewModel.swift
│   └── ScheduleViewModel.swift
└── MenuBar/
    ├── MenuBarController.swift
    ├── MenuBarExtraPopoverView.swift
    └── RecordingLivePreviewView.swift
```

## Success Criteria
- [ ] Can select any connected display for recording
- [ ] Multi-display composite shows all selected displays
- [ ] Scheduled recording starts at correct time
- [ ] Scheduled recording respects repeat intervals
- [ ] Automation triggers work on app launch
- [ ] Menu bar extra shows live preview during recording
- [ ] Menu bar extra shows countdown before recording
- [ ] Global hotkeys work even when RECAP is not focused
- [ ] Right-click menu is functional
- [ ] Multiple scheduled recordings don't conflict
