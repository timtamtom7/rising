# Shelf — R2: Groups, Search/Filter, Reveal All Shortcut

## Goal
Organize menu bar items into visibility groups, add search/filter, and implement a global keyboard shortcut to temporarily reveal all hidden items.

---

## Scope

### Visibility Groups
- Three groups based on `visibility_policy` enum:
  - **Always Visible** — never hidden automatically
  - **Hide When Idle** — hidden after N minutes of inactivity (configurable, default 5 min)
  - **Hide Always** — permanently hidden until manually shown
- Each `MenuItem` in DB gets a `visibility_policy` column (default: `always_visible` on first detection)
- Users can drag items between groups or change via right-click context menu
- Group headers in the popover with item counts

### Idle Detection
- Use `NSEvent.addGlobalMonitorForEvents` or `CGEventTap` to track user activity
- Reset idle timer on: mouse move, key press, trackpad activity
- When idle threshold reached: auto-hide all items in "Hide When Idle" group
- When activity resumes: optionally auto-show (configurable in settings)
- Idle timer persists across popover closes

### Search / Filter
- Search bar at top of popover (always visible)
- Filters by app name, process name, bundle ID
- Debounced (150ms) as user types
- Shows "No results" empty state when filter matches nothing
- Clear button (×) resets filter

### Reveal All Temporarily (Keyboard Shortcut)
- Global hotkey: default `⌥⇧S` (configurable in R5)
- When triggered: show all hidden items for 30 seconds, then re-hide according to their policy
- Visual indicator: menu bar icon briefly pulses or shows an animation during reveal
- Countdown not shown in UI (silent auto-hide)
- User can interact with revealed items during the window
- Repeated trigger resets the 30-second timer

### Menu Bar Icon Updates
- Icon changes based on state:
  - All visible: standard icon
  - Some hidden: icon with subtle indicator (e.g., small dot)
  - All hidden: icon with emphasis

### Settings Popover/Section
- Idle timeout picker: 1 min, 3 min, 5 min, 10 min, 30 min
- "Auto-show on activity" toggle (for Hide When Idle group)
- "Reveal shortcut" key combination recorder (displays current shortcut, click to record new)
- Settings accessible via gear icon in popover header

### Data Model Updates (SQLite.swift)
- Add `visibility_policy` column to `menu_items` table: `TEXT DEFAULT 'always_visible'`
- Add `idle_timeout_minutes` column to `settings` table

---

## Out of Scope (R3+)
- Drag and drop reordering
- Multiple named layouts
- Menu bar badge showing hidden count
- Spacers and icon separation
- Shortcuts app integration
