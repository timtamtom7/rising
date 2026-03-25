# Shelf — R1: Menu Bar App, List Items, Hide/Show, Persistence

## Goal
A working macOS menu bar app that discovers all visible menu bar items, lets users hide/show each one individually, and persists those preferences across restarts.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with shelf SF Symbol icon (or custom icon)
- `NSPopover` (360×480pt) showing all detected menu bar items
- Proper click-outside dismissal
- `NSWindow` hidden by default — menu bar only in R1

### Menu Bar Item Discovery
- Use `NSStatusBar.system.statusItems` to enumerate existing status items
- Use `AXUIElement` Accessibility API to get process names and labels for items that have them
- Also use `CGWindowListCopyWindowInfo` to get running process names with menu bars
- Build an initial list on app launch, refresh on `NSWorkspace.didLaunchApplicationNotification`
- Filter out Shelf's own status item
- For each item, capture: bundle ID, display name (or icon name), current visibility state

### Data Model (SQLite.swift)
- `menu_items` table: id, bundle_id, display_name, icon_data (PNG blob), is_hidden, position, created_at, updated_at
- `shelves` table: id, name, is_active, created_at (single shelf in R1, multiple layouts in R3)
- Database at `~/Library/Application Support/Shelf/shelf.db`
- Auto-create directory and tables on first launch

### MenuItemStore
- `ObservableObject` held by `@MainActor AppDelegate`
- `discoverMenuBarItems()` — scans current status items and updates DB
- `hideItem(id:)` / `showItem(id:)` — updates DB and calls `NSStatusItem.isVisible`
- `getAllItems()` — returns all items with their current hidden state
- Loads from SQLite on init

### Popover UI (SwiftUI)
- Header: "Shelf" title + refresh button
- List of menu bar items, each showing:
  - App icon (or SF Symbol fallback)
  - App/process name
  - Eye icon (visible) / Eye.slash icon (hidden)
  - Tap eye icon to toggle visibility
- Visual state: hidden items appear dimmed/faded in the list
- Empty state: "No menu bar items detected"
- Scroll view for long lists

### Hiding Mechanism
- For `NSStatusItem` backed items: set `statusItem.isVisible = false`
- For app-level menu bar icons: use AppleScript to tell the app to hide its menu bar item (if supported)
- Track which method was used per item for restoration
- Gracefully fail if an app doesn't support hiding (show a brief tooltip)

### macOS App Lifecycle
- `main.swift` → `NSApplication.shared → AppDelegate`
- `applicationDidFinishLaunching`: init MenuItemStore, discover items, build status item
- No main window in R1 — menu bar only
- Standard app menu: About, Quit (no Preferences in R1)

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: SQLite.swift
- No third-party UI dependencies
- Zero warnings, clean build
- Test: hide an item, restart app, item should still be hidden

---

## Out of Scope (R2+)
- Grouping into categories (Always Visible, Hide When Idle, Hide Always)
- Search/filter
- Keyboard shortcuts
- Drag and drop reordering
- Multiple layouts
- Menu bar badge count
