# Swatch — R17: Shortcuts & Automation Deep Dive

## Goal
Make Swatch deeply automatable for design workflows through Shortcuts, AppleScript, and developer integrations.

---

## Scope

### Shortcuts App Integration
- "Pick Color from Image" → returns HEX, RGB, HSL values
- "Get Palette Colors" → returns list of colors in a palette
- "Create Color" from text → parse "steel blue" → actual color
- "Convert Color" → convert between formats
- "Check Color Contrast" → returns WCAG contrast ratio
- "Get Complementary Color" → returns harmony color
- Siri Suggestions: "You picked this color last week — add it to a palette?"

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Swatch" to pick color from "/path/to/image.png"`
- `tell application "Swatch" to get palette named "My Palette"`
- `tell application "Swatch" to export palette "Brand Colors" as "css"`
- Automator actions for all Swatch functions

### Menu Bar Extra
- Native MenuBarExtra API
- Quick color picker from menu bar
- Recent colors in dropdown
- Clipboard color history

### Design Tool Automation
- Figma plugin with Shortcuts support: "Pick color in Swatch → adds to Figma"
- VS Code extension: "Get color from Swatch → inserts in code"
- Automator workflow: "When screenshot taken → pick color → add to Swatch palette"

### Folder Actions
- Attach Swatch to a folder → new image files auto-extract dominant colors
- Batch process: select folder → extract palette from all images

### Shortcuts Triggers
- Triggers: "When new image added to folder → extract colors"
- "When color copied → offer to save to Swatch"
- "Every Monday at 9am → show weekly color inspiration"

---

## Out of Scope
- Real-time collaborative editing across design tools
- Cross-device color syncing triggers
