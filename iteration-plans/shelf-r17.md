# Shelf — R17: Shortcuts & Automation Deep Dive

## Goal
Make Shelf deeply automatable through Shortcuts, AppleScript, and system-level triggers for power users and workflows.

---

## Scope

### Shortcuts App Integration
- "Get Recent Shelf Items" → returns list of items
- "Add Item to Shelf" → add file/URL to specified shelf
- "Create Shelf" → create new shelf by name
- "Get Smart Suggestions" → returns ML-suggested items
- "Open Shelf Item" → opens item in native app
- "Search Shelf" → search by query, return matching items
- "Move Item to Shelf" → relocate item to different shelf

### Siri Suggestions
- "Open Shelf" suggestion when similar work patterns detected
- "You haven't opened [item] in a while — want to add it to Shelf?"
- Contextual suggestions based on time and location

### AppleScript / JXA
- Full AppleScript dictionary for Shelf
- `tell application "Shelf" to get recent items`
- `tell application "Shelf" to add item "/path/to/file" to shelf "Work"`
- `tell application "Shelf" to get suggestions`
- Automator actions for all Shelf functions

### Folder Actions Integration
- Attach Shelf to any folder — new files auto-added to a shelf
- "When screenshot taken → add to Screenshots shelf"
- "When file downloaded → offer to add to shelf"
- Configurable per folder

### Menu Bar Extra
- Native MenuBarExtra API
- Quick access to recent items from menu bar
- Search directly from menu bar
- Keyboard shortcut (global hotkey) to open Shelf popover

### Automation Triggers
- Triggers: "When item added to shelf X → run Shortcut"
- "When specific app opens → add to shelf"
- "When external drive connected → switch to that shelf"

---

## Out of Scope
- Multi-device automation (cross-Mac triggers)
- Time-based automation for other devices
