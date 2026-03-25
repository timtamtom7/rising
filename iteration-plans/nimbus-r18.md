# Nimbus — R18: Advanced Widgets & Desktop Integration

## Goal
Expand Nimbus widgets across macOS and iOS for quick note capture and reading without opening the app.

---

## Scope

### macOS Desktop Widgets (WidgetKit)
- Small widget: most recent note title
- Medium widget: 3 recent notes with preview
- Large widget: recent notes + notebooks + quick add
- Interactive widget: create new note directly from widget
- Widget stack: combine recent + search + quick add

### iOS Home Screen Widgets
- Small: single recent note
- Medium: 3 recent notes + quick add button
- Large: full dashboard — recent notes, notebooks, search
- Lock screen widget: recent note title
- Interactive widget: new note from widget

### Quick Capture Widget
- Dedicated widget: tap → opens quick note with text field
- Supports voice dictation from widget
- Auto-saves to specified notebook

### Notebook Widget
- Show notes from specific notebook
- Notebook selector in widget configuration
- "Meeting Notes", "Daily Journal", etc.

### Search Widget
- Search field directly in widget
- Results shown inline
- Tap result to open in app

### Widget Gallery
- In-app widget configuration
- Preview all sizes
- Quick-add to Notification Center / desktop / Lock Screen

---

## Out of Scope
- Android widgets
- Windows desktop widgets
- Real-time collaborative editing via widgets
