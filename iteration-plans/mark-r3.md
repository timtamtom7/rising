# Mark R3 — Export & Capture

## Overview
Screenshot capture, save annotations as PNG/PDF, export to clipboard.

## Features

### Screenshot Capture
- [ ] **Screen Region** — Capture a region of screen before/while presenting
- [ ] **Window Capture** — Capture specific windows

### Export
- [ ] **Save as PNG** — Flatten annotations onto slide image, save via NSSavePanel
- [ ] **Save as PDF** — Multi-page PDF with annotations
- [ ] **Copy to Clipboard** — Copy flattened annotated image to NSPasteboard

### UI
- [ ] **Export Menu** — File > Export with submenu (PNG, PDF, Copy)
- [ ] **Toolbar Buttons** — Quick export actions

## Technical Approach
- `NSSavePanel` for file save, `NSPasteboard` for clipboard
- Render `PKDrawing` to `NSImage` using `image(from:rect:)`
- PDF via `PDFDocument` with `PDFPage` per slide
- Screen capture via `CGWindowListCreateImage`

## Files to Modify/Create
- `ExportService.swift` — PNG, PDF, clipboard export logic
- `ScreenCaptureService.swift` — screen/window capture
- `MenuBuilder.swift` or `AppDelegate.swift` — export menu items

## Build
```bash
cd /Users/mauriello/Dev/mark-macos
xcodegen generate && xcodebuild -scheme Mark -configuration Debug build 2>&1 | tail -5
```

## Success Criteria
- Export to PNG flattens annotations correctly
- Export to PDF preserves all annotated slides
- Copy to clipboard works and image pastes into other apps
