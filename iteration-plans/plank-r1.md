# PLANK — R1: Menu Bar + Floating Sidebar, Bookmarks, Drag-to-Reorder

## Goal
Dock sidebar with floating window: add/remove bookmarks, folder shortcuts, drag to reorder. Menu bar entry point.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with rectangle.split.1x2 SF Symbol icon (sidebar metaphor)
- `NSPopover` (320×400pt) showing sidebar preview
- "Open PLANK" button opens sidebar window

### Floating Sidebar Window
- `NSPanel` with `.floating` level, `.nonactivatingPanel` behavior
- Always on top when visible, hides on app switch option
- Draggable header with title "PLANK" and close button
- Resizable with minimum width 280pt, maximum 400pt
- Position: right edge of screen, full height minus menu bar
- Toggle via menu bar click, global hotkey, or dock icon

### Bookmark System
- `Bookmark`: id, name, url?, path?, icon, position, type (weblink/folder/app)
- Stored in `UserDefaults` as JSON
- Add bookmark: "+" button opens sheet
  - Name field (required)
  - Type selector: Web Link / Folder / Application
  - URL/path field (required based on type)
  - Icon picker (SF Symbols grid or custom)
- Edit bookmark: click pencil icon or right-click → Edit
- Delete bookmark: swipe left or right-click → Delete (with confirmation)

### Folder Shortcuts
- Select folder via `NSOpenPanel`
- Display folder icon with name
- Click → open folder in Finder
- Right-click → "Reveal in Finder", "Copy Path"

### Application Shortcuts
- Select app via `NSOpenPanel` (filter: `.app`)
- Display app icon (from `NSWorkspace.shared.icon(forFile:)`)
- Click → launch application
- Right-click → "Show in Finder"

### Drag to Reorder
- `NSOutlineView` or `NSTableView` with drag-and-drop
- Long press or drag handle to initiate reorder
- Visual feedback: insertion line, opacity change on dragged item
- Persist new order immediately

### Web Link Items
- Enter URL, optionally select favicon
- Click → open URL in default browser
- Favicon fetched via Google favicon service or `NSImage` from page

### Sidebar UI Layout
- Header: "PLANK" title, minimize button, settings gear
- Body: scrollable list of bookmarks
- Footer: "+" add button, edit mode toggle
- Section headers for grouping (optional in R1)

### Appearance
- Light/dark mode support
- Blur background effect (`.headerViewBlur`) for sidebar
- Rounded corners on sidebar edges
- Subtle shadow

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: `KeychainAccess` (future), no other deps
- Zero warnings, clean build

---

## Out of Scope (R2+)
- Widgets in sidebar
- Pinned apps
- Multiple sidebar configurations
- Keyboard navigation
- Global hotkey
- iCloud sync
