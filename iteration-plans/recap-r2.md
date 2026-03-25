# RECAP — R2: Timestamps, Click Highlighting, Annotations

## Overview
R2 adds timestamp overlays, click highlighting (visual click feedback), and annotation drawing tools for recorded content.

## New Functionality

### R6: Timestamp Overlay
- Configurable timestamp text overlay on recorded video
- `TimestampOverlay` renders current recording time onto each frame
- Options:
  - Position: top-left, top-right, bottom-left, bottom-right
  - Format: `HH:MM:SS`, `HH:MM:SS.mm`, `HH:MM:SS AM/PM`, custom format
  - Font: System font, size 12-48pt
  - Color: white/black with configurable opacity
  - Background: solid color pill or transparent
- Toggle timestamp on/off during recording
- Live preview of timestamp in Settings

### R7: Click Highlighting
- Detect mouse clicks during screen recording
- Visual feedback: animated circle at click location
- Click highlight styles:
  - **Circle:** expanding circle (default)
  - **Ripple:** circular ripple effect
  - **Spotlight:** brief spotlight on click point
  - **None:** disabled
- Color: configurable (default red)
- Size: configurable (S/M/L)
- Duration: 200ms fade out
- Toggle on/off in Settings
- Implementation: `CGEvent.tapCreate` for mouse event monitoring during recording

### R8: Annotation Tools
- Drawing tools for live annotation during recording
- Available tools:
  - **Pen:** freehand drawing (pressure-sensitive if available)
  - **Highlighter:** semi-transparent wide stroke
  - **Arrow:** straight arrow with configurable color
  - **Rectangle:** outline or filled rectangle
  - **Ellipse:** outline or filled ellipse
  - **Text:** type text directly on screen
  - **Number:** auto-incrementing step numbers (1, 2, 3...)
- Tool colors: 8 preset colors + custom picker
- Stroke width: 2-10pt
- Annotation renders to `CALayer` composited onto recording frames
- Clear all annotations button
- Undo/redo for annotation strokes
- `AnnotationOverlayView` (SwiftUI Canvas + CALayer)

### R9: Annotation Palette
- Floating annotation toolbar (can be detached/docked)
- Appears when recording with annotations enabled
- Drag to reposition on screen
- Tool buttons with keyboard shortcuts (1-9)
- Color swatches in toolbar
- Stroke width slider
- "Clear All" button
- Collapse to icon mode

### R10: Post-Recording Annotation
- Add annotations after recording is complete
- Use recorded video as background, draw annotations on top
- Annotation stored as `AnnotationLayer` JSON (not baked into video)
- Export options: bake annotations into video, or keep as separate overlay file
- `AnnotationProject` model:
  ```swift
  struct AnnotationProject {
      let recordingId: UUID
      var layers: [AnnotationLayer]
      var duration: TimeInterval
  }
  
  struct AnnotationLayer {
      let id: UUID
      let tool: AnnotationTool
      let color: Color
      let strokeWidth: CGFloat
      let points: [CGPoint]   // for pen/highlighter
      let rect: CGRect?       // for rectangle/ellipse
      let text: String?       // for text tool
      let startTime: TimeInterval
      let endTime: TimeInterval
  }
  ```
- Annotation editor view: scrub timeline, draw on specific segments

## Implementation Details

### Click Detection via CGEvent
```swift
class ClickDetector {
    private var eventTap: CFMachPort?
    
    func startDetecting(onClick: @escaping (CGPoint) -> Void) {
        let eventMask: CGEventMask = (1 << .leftMouseDown.rawValue) | (1 << .rightMouseDown.rawValue)
        eventTap = CGEvent.tapCreate(
            tap: .cghidEventTap,
            place: .headInsertEventTap,
            options: .defaultTap,
            eventsOfInterest: eventMask,
            callback: { (proxy, type, event) -> Unmanaged<CGEvent>? in
                let point = event.location
                onClick(point)
                return Unmanaged.passRetained(event)
            },
            userInfo: nil
        )
        CGEvent.tapEnable(tap: eventTap!, enable: true)
    }
}
```

### Annotation Rendering Pipeline
1. Capture screen frame via `AVCaptureVideoDataOutput`
2. Draw frame to `CVPixelBuffer`
3. Render timestamp overlay to pixel buffer (Core Image `CIFilter`)
4. Render click highlights to pixel buffer
5. Render live annotations from `AnnotationOverlayView`
6. Composite all layers using `CIContext.render()`
7. Pass composited pixel buffer to `AVAssetWriter`
8. For post-recording: save layers separately, composite on playback/export

## File Structure Additions
```
RECAP/
├── Services/
│   ├── ClickDetector.swift
│   ├── TimestampOverlayService.swift
│   ├── AnnotationEngine.swift
│   └── AnnotationProjectStore.swift
├── Views/
│   ├── AnnotationPaletteView.swift
│   ├── AnnotationToolbar.swift
│   ├── AnnotationCanvasView.swift
│   ├── AnnotationEditorView.swift
│   ├── TimestampSettingsView.swift
│   └── ClickHighlightSettingsView.swift
├── ViewModels/
│   └── AnnotationViewModel.swift
├── Models/
│   ├── AnnotationTool.swift
│   ├── AnnotationLayer.swift
│   └── AnnotationProject.swift
└── Resources/
    └── AnnotationBrushes.xcassets
```

## Settings UI (Annotations Tab)
```
┌─ Annotations ─────────────────────────────────────────┐
│                                                         │
│  ☑ Show Timestamp                                        │
│    Format: [HH:MM:SS.mm      ▾]  Position: [Top-Left ▾]  │
│    Font Size: [24] pt  Color: [■ White]                │
│                                                         │
│  ☑ Highlight Clicks                                      │
│    Style: [Circle ▾]  Size: [●○○ Medium ▾]  Color: [■]  │
│                                                         │
│  ☑ Enable Annotation Tools                              │
│    [─────── Tool Palette Preview ───────]              │
│    [✏️ Pen] [▭ Highlighter] [→ Arrow] [□ Rect]         │
│    [○ Ellipse] [T Text] [① Number]                     │
│    Stroke: [2pt ═══○═══ 10pt]  Color: [■ Red]         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Success Criteria
- [ ] Timestamp overlay renders correctly on each frame
- [ ] Click highlights appear at exact mouse click location
- [ ] Click highlight animation plays smoothly
- [ ] All 7 annotation tools draw correctly
- [ ] Annotations composite onto video in real-time
- [ ] Undo/redo works for annotation strokes
- [ ] Annotation palette is draggable
- [ ] Post-recording annotation editor loads video correctly
- [ ] Annotations can be exported baked into video
- [ ] Settings persist across app restarts
