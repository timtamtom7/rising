# RECAP — R3: GIF Export, Trimming, Cropping, Share

## Overview
R3 adds GIF export, video trimming, cropping, and share sheet integration for quick social sharing.

## New Functionality

### R11: GIF Export
- Export recordings as animated GIF
- `GIFExportService` using `CGImageDestinationCreateWithURL` with `UTType.gif`
- GIF options:
  - Resolution: Original, 720p, 480p, 360p
  - Frame rate: 10fps, 15fps, 20fps (lower = smaller file)
  - Quality: Low (256 colors), Medium (128 colors), High (64 colors)
  - Loop: Infinite, 1x, 3x
- Estimated file size shown before export
- Dithering options for better quality at low color counts
- "Copy GIF to Clipboard" option
- Drag-and-drop GIF directly from Finder

### R12: Video Trimming
- Trim start and end of recording in-app
- `AVAssetImageGenerator` + `AVAssetExportSession` for export with new time range
- Visual timeline scrubber with trim handles
- Frame-accurate trimming (GOP-independent via re-encoding)
- Set trim in/out points with `Set In Point` / `Set Out Point` buttons
- Live preview of trimmed segment
- `TrimService.trim(recording:start:end:)` → new file

### R13: Video Cropping
- Crop recorded video to remove unwanted areas
- Interactive crop overlay (drag corners/edges)
- Aspect ratio presets: Free, 16:9, 4:3, 1:1, 9:16 (vertical)
- Crop region highlighted, outside area darkened
- Crop applied on export (not destructive until export)
- `CropService.crop(recording:region:)` → new file

### R14: Share Sheet Integration
- `View > Share...` (⌘⇧.) → `NSSharingServicePicker`
- Built-in share targets:
  - **Copy to Clipboard** — full video or GIF
  - **Mail** — attach to new mail message
  - **Messages** — send via Messages
  - **AirDrop** — share to nearby devices
  - **Twitter/X** — direct share (if Twitter app installed)
  - **YouTube** — upload (if YouTube app installed)
  - **Save to Files** — save to chosen folder
- Custom share extension for third-party apps
- Recent shares remembered

### R15: Thumbnail Preview & Quick Look
- Custom thumbnail for each recording (frame at 10% duration)
- Thumbnail grid in library view
- Hover over thumbnail to see 3-second animated preview (WebP-style frame sequence)
- Space bar to Quick Look recording
- `QLPreviewingController` conformance for Quick Look preview

### R16: Recording Metadata Editing
- Edit recording title after saving
- Add notes/description to recording
- Tag recordings with custom tags
- Star/favorite recordings
- `recording_metadata` table:
  ```sql
  CREATE TABLE recording_metadata (
      recording_id TEXT PRIMARY KEY REFERENCES recordings(id) ON DELETE CASCADE,
      title TEXT,
      notes TEXT,
      tags TEXT,            -- comma-separated
      is_starred INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL
  );
  ```

## File Structure Additions
```
RECAP/
├── Services/
│   ├── GIFExportService.swift
│   ├── TrimService.swift
│   ├── CropService.swift
│   └── ShareService.swift
├── Views/
│   ├── TrimmerView.swift
│   ├── TimelineView.swift
│   ├── CropOverlayView.swift
│   ├── GIFExportSheet.swift
│   ├── ExportOptionsSheet.swift
│   └── MetadataEditorView.swift
├── ViewModels/
│   ├── TrimmerViewModel.swift
│   └── ExportViewModel.swift
└── Models/
    ├── GIFExportOptions.swift
    └── TrimRange.swift
```

## Trimmer UI
```
┌─ Trim Recording ───────────────────────────────────────┐
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │ ▼|█████████████████████████████|             ▶| ▼│ │
│  │   ^in                              ^out          │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  00:00:05.12 ──────●─────────────── 00:00:32.45     │
│                    ↑ playhead                         │
│                                                       │
│  Duration: 00:27.33                                   │
│                                                       │
│  [ Set In ]  [ Set Out ]  [ Reset ]                  │
│                                                       │
│  ☑ Show trim handles on preview                      │
│                                                       │
│            [ Cancel ]  [ Export Trimmed ]             │
└───────────────────────────────────────────────────────┘
```

## GIF Export Options
```
┌─ Export as GIF ────────────────────────────────────────┐
│                                                       │
│  Resolution:  [Original (1920x1080)    ▾]            │
│  Frame Rate:  [15 fps                    ▾]          │
│  Quality:     [Medium (128 colors)      ▾]           │
│  Loop:        [Infinite                  ▾]          │
│                                                       │
│  ─────────────────────────────────────               │
│  Estimated size: ~4.2 MB                             │
│  Duration: 12.3 seconds                              │
│  ─────────────────────────────────────               │
│                                                       │
│  ☑ Copy GIF to clipboard after export                │
│                                                       │
│            [ Cancel ]  [ Export GIF ]                 │
└───────────────────────────────────────────────────────┘
```

## Success Criteria
- [ ] GIF export produces playable animated GIF
- [ ] GIF file size is reasonable (< 10MB for 30-second clip)
- [ ] Trimming is frame-accurate
- [ ] Trim handles are draggable
- [ ] Crop overlay is interactive
- [ ] Aspect ratio presets constrain crop correctly
- [ ] Share sheet shows all configured targets
- [ ] GIF copies to clipboard successfully
- [ ] Quick Look shows preview on space bar
- [ ] Metadata editing saves correctly
