# Shelf — R4: Spacers, Menu Bar Extra Support, Auto-Detection

## Goal
Add visual control over menu bar spacing (spacers), support Apple's new Menu Bar Extra API (macOS 13+), and automatically detect newly added menu bar items from launched apps.

---

## Scope

### Spacer Items
- Users can insert spacers between menu bar items to create visual separation
- Spacer types:
  - **Small spacer**: 4pt wide
  - **Medium spacer**: 8pt wide
  - **Large spacer**: 16pt wide
  - **Flexible spacer**: expands to fill available space
- Spacers appear as subtle grey lines or dots in the menu bar
- In popover: spacers listed between menu bar items, with type indicator
- Spacer positions are per-layout (like item positions)
- Add spacer via `+` button between items in the list
- Delete spacer via swipe or right-click → Delete

### Icon Separation Control
- Global setting: default spacing between managed icons (None / Small / Medium / Large)
- Applied to all items managed by Shelf in the current layout
- Implementation: when showing/hiding items, insert/remove spacer views programmatically

### Menu Bar Extra API (macOS 13+)
- Register Shelf as a `NSMenuBarExtra` provider where possible
- Use `NSApplication.menuBarExtras` to install Shelf's menu bar extra
- This allows Shelf to appear in the native "Menu Bar Extra" menu (system menu bar utilities list)
- Fall back to `NSStatusItem` for older macOS versions
- Menu Bar Extra automatically handles: proper placement, popover behavior, accessibility

### Automatic Detection of New Menu Bar Items
- On `NSWorkspace.didLaunchApplicationNotification`: scan for new menu bar items
- Compare against known items in the database
- If new item detected:
  - Add to database with `always_visible` policy (conservative default)
  - Briefly highlight the new item in the popover with a "New" badge
  - Optional toast: "Detected new menu bar item: [App Name]" with "Add to Shelf?" action
- Detection also runs on app launch to catch items from apps that launched before Shelf

### Popover Updates
- "New" badge (green, small pill) next to newly detected items
- Spacer items visible with a subtle icon (horizontal line)
- Right-click spacer → Change Type (picker for spacer type)

### Data Model Updates (SQLite.swift)
- `spacers` table: id, layout_id, position, spacer_type, created_at
- Add `is_new` column to `menu_items` (boolean, auto-cleared after user acknowledges)
- Merge spacer positions into `layout_items` (add `is_spacer` flag + `spacer_type`)

### App Group for Menu Bar Extra
- Use an app group (`com.shelf.app`) to share state between the main app and the Menu Bar Extra process
- Required for Menu Bar Extra on macOS 13+

---

## Out of Scope (R5+)
- Shortcuts integration
- AppleScript/Automator actions
- Backup/restore configurations
- Widgets
