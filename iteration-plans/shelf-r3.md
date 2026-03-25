# Shelf — R3: Drag & Drop, Multiple Layouts, Hidden Count Badge

## Goal
Introduce custom ordering of menu bar items via drag and drop, multiple saved layouts (icon configurations), and a badge on the menu bar icon showing how many items are hidden.

---

## Scope

### Drag and Drop Reordering
- Within the popover list, users can drag items to reorder
- Order is persisted per-layout (see Multiple Layouts below)
- Drag handle on the left side of each row (grip icon, `line.3.horizontal`)
- Visual feedback during drag: item lifts with shadow, drop zones highlight
- Use SwiftUI's `onDrag` / `onDrop` with `Transferable` protocol
- Reordering within a group only; items cannot be dragged between groups

### Multiple Layouts (Named Configurations)
- Users can create multiple named layouts (e.g., "Work", "Personal", "Focus Mode")
- `layouts` table: id, name, is_active, created_at, updated_at
- `layout_items` table: id, layout_id, menu_item_id, position, visibility_policy
- One layout is "active" at a time — switching layout applies its visibility settings
- Layout management in popover:
  - "Layouts" section with list of saved layouts
  - `+` to create new layout (prompts for name)
  - Right-click layout → Rename, Duplicate, Delete
  - Active layout has a checkmark
- Switching layouts: brief animation, all items update to new configuration

### Menu Bar Badge
- `NSStatusItem.button` gets a badge overlay showing hidden count
- Badge: small red circle with white number (1–9, "9+" for more)
- Updates in real time as items are hidden/shown
- When count is 0: no badge shown
- Badge positioned in the corner of the status item (bottom-right)

### Popover Layout (Revised)
- Header: "Shelf" title + layouts dropdown + settings gear
- Layout selector: segmented control or dropdown showing current layout name
- Groups section: collapsible, shows item count per group
- Search bar (carried from R2)
- Item list with drag handles, eye toggle, group indicator
- Footer: "X items hidden" summary

### Data Model Updates (SQLite.swift)
- `layouts` table: id, name, is_active, created_at, updated_at
- `layout_items` table: id, layout_id, menu_item_id, position, visibility_policy
- Remove `position` from `menu_items` (moved to `layout_items`)
- Add `layout_id` FK to `menu_items` for the active layout's state

### Build & Run
- All R1 + R2 functionality preserved and extended
- Layout switching tested: create 2 layouts, switch, verify correct items hidden/shown

---

## Out of Scope (R4+)
- Spacers and icon separation
- Menu Bar Extra API
- Automatic detection of new items
- Shortcuts app integration
