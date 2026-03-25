# RECAP — R7: Webcam Recording, Audio-Only, Chapter Markers

## Overview
R7 adds webcam overlay recording, audio-only recording mode, and chapter markers for long recordings.

## New Functionality

### R36: Webcam Recording
- Record from built-in or external webcam
- Webcam feed as overlay on screen recording
- Webcam position: drag to any corner (9-point grid)
- Webcam size: small / medium / large (configurable)
- Webcam style: circular, rounded rectangle, square
- Background behind webcam: transparent (overlay) or solid color
- Toggle webcam recording on/off during session
- Mirror webcam horizontally (default for front-facing)
- `WebcamCaptureService` using `AVCaptureDevice`

### R37: Webcam Effects
- Webcam filters matching screen filters
- Background blur (using `Vision` framework `VNGeneratePersonSegmentationRequest`)
- Face detection highlight (draw box around detected faces)
- Face smoothing / beauty filter
- Virtual background (image or solid color)

### R38: Audio-Only Recording
- Record audio without screen recording
- Use case: voice memos, podcasts, meeting audio
- Source: system audio, microphone, or both
- `AVAudioRecorder` instead of screen capture
- Audio waveform visualization during recording
- Export as M4A (AAC) or WAV
- Audio level meters in UI
- "Recording Audio" mode in menu bar (different icon)

### R39: Audio Transcription (Pro)
- Transcribe audio after recording
- On-device transcription using `Speech` framework
- Generate text transcript of recording
- SRT/ VTT subtitle file generation
- Searchable transcripts
- Click transcript to jump to timestamp
- `TranscriptionService` using `SFSpeechRecognizer`

### R40: Chapter Markers
- Add chapter markers during recording or post-edit
- Chapter marker: title + timestamp
- Auto-chapter from detected scenes (slides, screen changes)
- Auto-chapter from app name changes (when switching apps)
- Chapter markers embedded in exported video (H.264 SEI NAL or MOV chapter track)
- Chapter navigation in QuickTime-compatible format
- Auto-chapter from transcription (R39 prerequisite)

### R41: Screen Region Selection
- Select arbitrary rectangular region to record
- Draw selection rectangle on screen before recording
- Save selection as named region
- Regions remembered in dropdown selector
- "Select Region" button in recording controls
- `RegionSelectionOverlay` using `NSScreen` coordinate mapping

## File Structure Additions
```
RECAP/
├── Services/
│   ├── WebcamCaptureService.swift
│   ├── WebcamCompositor.swift
│   ├── AudioOnlyRecordingService.swift
│   ├── AudioWaveformService.swift
│   ├── TranscriptionService.swift
│   ├── ChapterMarkerService.swift
│   ├── SceneChangeDetector.swift
│   └── RegionSelectionService.swift
├── Views/
│   ├── WebcamSettingsView.swift
│   ├── WebcamPreviewView.swift
│   ├── AudioOnlyRecordingView.swift
│   ├── AudioWaveformView.swift
│   ├── TranscriptionView.swift
│   ├── ChapterMarkerView.swift
│   ├── TranscriptEditorView.swift
│   └── RegionSelectionOverlay.swift
├── ViewModels/
│   ├── WebcamViewModel.swift
│   ├── AudioOnlyViewModel.swift
│   └── TranscriptionViewModel.swift
└── Models/
    ├── ChapterMarker.swift
    ├── AudioRecording.swift
    └── TranscriptSegment.swift
```

## Data Models
```swift
struct ChapterMarker: Identifiable, Codable {
    let id: UUID
    var title: String
    var timestamp: TimeInterval
    var thumbnailPath: URL?
}

struct AudioRecording: Identifiable, Codable {
    let id: UUID
    var filePath: URL
    var duration: TimeInterval
    var createdAt: Date
    var transcriptId: UUID?
}

struct TranscriptSegment: Identifiable, Codable {
    let id: UUID
    var text: String
    var startTime: TimeInterval
    var endTime: TimeInterval
    var confidence: Float
}
```

## Success Criteria
- [ ] Webcam overlay appears on screen recording
- [ ] Webcam can be dragged to all 9 positions
- [ ] Webcam filters apply correctly
- [ ] Background blur works on webcam
- [ ] Audio-only recording produces valid M4A/WAV
- [ ] Audio waveform shows during recording
- [ ] Transcription generates text from audio
- [ ] Chapter markers can be added and removed
- [ ] Auto-chapter detects app switches
- [ ] Region selection creates proper crop area
- [ ] Chapter navigation works in QuickTime
