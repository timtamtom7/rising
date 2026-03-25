# Mark R2 — Annotation Tools & History

## Overview
Multiple annotation tools, color picker, stroke width, undo/redo.

## Features

### Tools
- [ ] **Freehand Draw** — PencilKit-based drawing on top of slides
- [ ] **Highlighter** — Semi-transparent strokes for emphasis
- [ ] **Tool Selector** — Segmented control or toolbar to switch tools

### Color & Style
- [ ] **Color Picker** — NSColorPanel integration, preset swatches (red, blue, green, yellow, black)
- [ ] **Stroke Width** — Slider or preset sizes (thin, medium, thick)

### History
- [ ] **Undo/Redo** — PKCanvasViewDelegate history via UndoManager

## Technical Approach
- Extend `AnnotationCanvasView` (or create `MarkCanvasView`) using PencilKit
- PKToolPicker for tool selection, or custom UI
- Store strokes per-slide in `MarkAnnotation` model
- UndoManager integration for canvas operations

## Files to Modify/Create
- `MarkAnnotation.swift` — annotation model
- `MarkCanvasView.swift` — PencilKit canvas wrapper
- `ToolbarView.swift` — tool selector, color picker, stroke width
- `MainViewController.swift` — wire up toolbar

## Build
```bash
cd /Users/mauriello/Dev/mark-macos
xcodegen generate && xcodebuild -scheme Mark -configuration Debug build 2>&1 | tail -5
```

## Success Criteria
- User can draw freehand strokes on slides
- User can highlight with semi-transparent strokes
- User can pick any color and stroke width
- Undo/redo works for all drawing operations
