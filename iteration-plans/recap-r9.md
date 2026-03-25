# RECAP — R9: Advanced Editing, AI Features, Motion Graphics

## Overview
R9 adds a full video editor, AI-powered features (auto-cut silence, smart highlights), and motion graphics templates.

## New Functionality

### R48: Full Video Editor
- Timeline-based editor for post-recording editing
- `VideoEditorView` with multi-track timeline
- Tracks: video, webcam overlay, annotations, audio
- Edit operations:
  - Cut / split at playhead
  - Trim clip edges
  - Delete clip
  - Move clip (drag)
  - Copy/paste clips
  - Undo/redo (50-level)
- Real-time preview with `AVPlayerView`
- `VideoCompositionEngine` using `AVMutableComposition`

### R49: AI Auto-Edit Features
- **Silence Detection:** Auto-cut silent portions from recordings
  - Threshold configurable (-40dB default)
  - Preview silence regions before removing
- **Smart Highlights:** AI detects "interesting" moments (clicks, movements, app switches)
  - Generate highlight reel automatically
  - Confidence score per highlight
- **Eye Contact Correction:** For webcam recordings (uses FaceTime pipeline)
- **Auto-Enhance:** Improve video quality (contrast, brightness, stabilization)
  - Using `VNAdjustImage` and custom Core Image filters
- `AIVideoEditor` using `NaturalLanguage`, `Vision`, `AudioToolbox`

### R50: Motion Graphics Templates
- Pre-built intro/outro templates
- Templates:
  - **Lower Third:** name + title animated in
  - **Title Card:** animated title with background
  - **End Screen:** "Thanks for watching" + subscribe button placeholder
  - **Call to Action:** animated text overlay
- Template parameters: name, title, social handle, custom text
- Templates built with `Core Animation` + `CAShapeLayer`
- `MotionGraphicsRenderer` for real-time preview and export

### R51: Green Screen / Background Removal
- For webcam recordings: remove background
- Replace with solid color or image
- Uses `VNGeneratePersonSegmentationRequest` for person detection
- Spill suppression for green screen video
- Real-time preview

### R52: Audio Enhancement
- Noise reduction (remove mic hiss, fan noise)
- Volume normalization
- EQ presets (voice boost, music mode)
- Audio ducking (auto-lower music when speaking)
- Using `AVAudioEngine` with `AVAudioUnitEQ`
- `AudioEnhancementService`

### R53: Export Profiles
- Create custom export profiles
- Profile parameters:
  - Format (MOV, MP4, GIF, WebM)
  - Codec (H.264, H.265/HEVC, ProRes, VP9)
  - Resolution (original, 1080p, 720p, 480p)
  - Frame rate (24, 30, 60)
  - Bitrate
  - Include/exclude audio
- Save as named preset
- Share presets via file export (.recappreset JSON)

## File Structure Additions
```
RECAP/
├── VideoEditor/
│   ├── VideoEditorView.swift
│   ├── TimelineView.swift
│   ├── VideoTrackView.swift
│   ├── AudioTrackView.swift
│   ├── AnnotationTrackView.swift
│   ├── PlayheadView.swift
│   ├── InspectorView.swift
│   ├── ClipView.swift
│   └── VideoCompositionEngine.swift
├── Services/
│   ├── AIVideoEditor.swift
│   ├── SilenceDetector.swift
│   ├── SmartHighlightDetector.swift
│   ├── MotionGraphicsRenderer.swift
│   ├── GreenScreenService.swift
│   ├── AudioEnhancementService.swift
│   └── ExportProfileManager.swift
├── Views/
│   ├── SilenceDetectionSettingsView.swift
│   ├── SmartHighlightsView.swift
│   ├── MotionGraphicsTemplatePicker.swift
│   ├── MotionGraphicsEditorView.swift
│   ├── GreenScreenSettingsView.swift
│   ├── AudioEnhancementView.swift
│   └── ExportProfileEditorView.swift
├── ViewModels/
│   └── VideoEditorViewModel.swift
└── Models/
    ├── EditProject.swift
    ├── EditClip.swift
    ├── MotionGraphicsTemplate.swift
    └── ExportProfile.swift
```

## Editor UI Layout
```
┌─ Video Editor ─────────────────────────────────────────┐
│ [◀ ▶ ⏸] | 00:12:34 / 00:45:23 | [⛶ Full] [⌥⌘E Export]│
├───────────────────────────────────────────────────────┤
│                                                       │
│  ┌─────────────────────────────────────────────────┐  │
│  │                                                 │  │
│  │           [Video Preview Canvas]               │  │
│  │                                                 │  │
│  └─────────────────────────────────────────────────┘  │
│                                                       │
├───────────────────────────────────────────────────────┤
│  [✂️ Split] [⌫ Delete] [⤴ Undo] [↩ Redo] [🔍 Search]  │
├───────────────────────────────────────────────────────┤
│  V1 ▼ █████████░░░░░░░████████████░░░░░░░░░░░░░░░░░░░ │
│  V2 ▼ ░░░░░░░░░░░████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  A1 ▼ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│      0s     10s     20s     30s     40s     50s      │
│      |▲| ← playhead                                   │
└───────────────────────────────────────────────────────┘
```

## Success Criteria
- [ ] Video editor loads recording and plays back
- [ ] Can cut, trim, and delete clips
- [ ] Undo/redo works correctly
- [ ] AI silence detection finds silent sections
- [ ] Smart highlights are detected accurately
- [ ] Motion graphics templates render correctly
- [ ] Lower third shows name/title correctly
- [ ] Green screen removal works in real-time
- [ ] Audio enhancement improves recording quality
- [ ] Custom export profiles save and apply correctly
