# RECAP — R6: Video Effects, Transitions, Templates

## Overview
R6 adds video effects (filters), transitions for picture-in-picture, and recording templates for common scenarios.

## New Functionality

### R31: Video Filters/Effects
- Apply real-time filters during recording or on existing video
- Built-in filters:
  - **None** — original
  - **Grayscale** — black and white
  - **Sepia** — vintage look
  - **High Contrast** — punchy colors
  - **Cool** — blue tint
  - **Warm** — orange tint
  - **Vignette** — darkened edges
  - **Blur Background** — blur non-cursor area (accessibility)
- Filter applied via `CIFilter` chain in Metal-accelerated pipeline
- Adjustable filter intensity (0-100%)
- `VideoEffectService` manages filter stack

### R32: Transition Effects (PiP)
- When switching between multi-display/PiP layouts, use transitions
- Available transitions:
  - **Cut** — instant switch
  - **Fade** — crossfade (500ms)
  - **Slide** — slide in from direction
  - **Zoom** — zoom in/out
  - **Flip** — horizontal flip
- Transition duration configurable
- Use `AVVideoComposition` with `AVMutableVideoCompositionInstruction`

### R33: Recording Templates
- Save recording configuration as reusable template
- Template includes:
  - Display/window selection
  - Resolution/framerate
  - Annotation tools enabled
  - Timestamp format
  - Export preset
  - Recording duration limit
  - Hotkey binding
- Built-in templates:
  - **Quick Capture** — full screen, no annotations, 5 min max
  - **Tutorial** — full screen, with timestamp, annotations enabled
  - **Meeting** — window-only, no audio, 1 hour max
  - **Bug Report** — selected region, high quality, includes cursor
- `RecordingTemplate` model:
  ```swift
  struct RecordingTemplate: Identifiable, Codable {
      let id: UUID
      var name: String
      var config: RecordingConfiguration
      var isBuiltIn: Bool
  }
  ```
- Template manager view in Settings

### R34: Animated Cursor
- Cursor can be styled during recording
- Options:
  - **System Default** — no change
  - **Highlighted** — larger cursor with colored ring
  - **Animated** — bouncing/attention animation
  - **Custom Image** — user-provided cursor image
- Cursor effect applied via `CGWindowListCreateImage` masking
- Highlight color configurable
- Useful for tutorials to draw attention to cursor

### R35: Audio Ducking
- When using system audio recording, duck audio during playback
- Option: automatically lower other app audio when recording starts
- Via `CoreAudio` `kAudioDevicePropertyVolumeScalar`
- Restore volume when recording stops
- Toggle in Settings

## File Structure Additions
```
RECAP/
├── Services/
│   ├── VideoEffectService.swift
│   ├── FilterPipeline.swift
│   ├── TransitionService.swift
│   ├── TemplateService.swift
│   ├── CursorEffectService.swift
│   └── AudioDuckingService.swift
├── Views/
│   ├── FilterSettingsView.swift
│   ├── FilterPreviewView.swift
│   ├── TransitionSettingsView.swift
│   ├── TemplateManagerView.swift
│   ├── TemplateEditorView.swift
│   └── CursorStyleSettingsView.swift
├── ViewModels/
│   ├── FilterViewModel.swift
│   └── TemplateViewModel.swift
└── Models/
    ├── VideoFilter.swift
    ├── TransitionEffect.swift
    └── RecordingTemplate.swift
```

## Filter Preview UI
```
┌─ Video Filters ────────────────────────────────────────┐
│                                                       │
│  [None] [Gray] [Sepia] [Contrast] [Cool] [Warm]       │
│                                                       │
│  ┌─────────────────────────────────────────────────┐  │
│  │                                                 │  │
│  │           [Filter Preview Thumbnail]            │  │
│  │                                                 │  │
│  └─────────────────────────────────────────────────┘  │
│                                                       │
│  Intensity: [═══════════●═══════] 75%                │
│                                                       │
│  ☑ Apply filter during recording                     │
│  ☐ Apply filter to existing recordings (batch)      │
│                                                       │
└───────────────────────────────────────────────────────┘
```

## Template Editor UI
```
┌─ Edit Template ───────────────────────────────────────┐
│                                                       │
│  Name: [Quick Tutorial                      ]         │
│                                                       │
│  Source:  ● All Displays  ○ Specific Window          │
│           [Select Window ▾]                          │
│                                                       │
│  Quality: [High (1080p 60fps)           ▾]            │
│  Audio:   ☑ Include system audio                     │
│                                                       │
│  Annotations:                                         │
│  ☑ Timestamp overlay                                 │
│  ☑ Click highlights                                  │
│  ☑ Annotation tools                                 │
│                                                       │
│  Limit:  [No limit        ▾]                         │
│  Export: [Standard MP4    ▾]                        │
│                                                       │
│            [ Delete Template ]                        │
│            [ Cancel ]  [ Save Template ]              │
└───────────────────────────────────────────────────────┘
```

## Success Criteria
- [ ] All 8 filters apply correctly during recording
- [ ] Filter intensity slider works
- [ ] Filters apply to existing recordings
- [ ] All 5 transitions animate correctly
- [ ] Templates save and load correctly
- [ ] Built-in templates can't be deleted
- [ ] Cursor highlighting is visible in recording
- [ ] Custom cursor image appears in recording
- [ ] Audio ducking lowers system volume
- [ ] Audio volume restores after recording
