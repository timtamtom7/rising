# PLANK — R3: Multiple Configurations, Keyboard Navigation, Global Hotkey

## Goal
Multiple sidebar configurations, full keyboard navigation, global hotkey to toggle.

---

## Scope

### Multiple Sidebar Configurations
- `SidebarConfig`: id, name, bookmarks `[Bookmark]`, widgets `[WidgetConfig]`, position, width
- Create/rename/delete configs
- Switch between configs via menu bar menu
- Quick switch: ⌘1-9 for first 9 configs
- Default config always exists

### Keyboard Navigation
- Full tab navigation through all controls
- Arrow keys for list navigation
- Enter to activate/open
- Escape to close sidebar
- ⌘⇧P to toggle sidebar (global)
- Focus indicators for accessibility

### Global Hotkey
- `CGSession` or `EventMonitor` + `CGEvent` tap for global hotkey
- Default: ⌘⇧P (configurable)
- Works when PLANK is not frontmost
- Configurable in preferences: hotkey recorder
- Conflict detection with other apps

### Keyboard Shortcuts for Bookmarks
- Assign hotkey to individual bookmarks (⌘1-9 fallback to global)
- `MASShortcut` or custom hotkey recorder
- Execute bookmark action from anywhere
- Hotkey shown in bookmark tooltip

### Sidebar Toggle Behavior
- Toggle: show/hide sidebar
- Pin: keep sidebar visible even when other apps are focused
- Auto-hide: sidebar hides after 5 seconds of inactivity (optional)
- Focus mode: sidebar stays pinned, dims other windows slightly

### Accessibility Enhancements
- Full VoiceOver support: labels, actions, navigation
- Reduce Motion: disable animations
- Custom focus ring color

### Configurable Sidebar Position
- Left edge, right edge (default), or follow mouse
- "Flip" position option
- Position persists per config

### Window Management
- "Window Left Half" / "Window Right Half" bookmark actions
- "Center Window" bookmark action
- `CGSWindow` manipulation via `CGWindowListCopyWindowInfo`

### Mouse Navigation
- Hover to preview bookmark details
- Middle-click to open in background
- Right-click for context menu

---

## Out of Scope (R4+)
- iCloud sync
- Menu Bar Extra
- WidgetKit
