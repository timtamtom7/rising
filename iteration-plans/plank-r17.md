# Plank — R17: Shortcuts & Automation

## Goal
Make Plank automatable through Shortcuts, AppleScript, and automatic theme switching.

---

## Scope

### Shortcuts App Integration
- "Apply Theme" → apply named theme
- "Get Current Theme" → returns theme name and colors
- "Create Theme from Image" → generates theme from image
- "Switch Preset" → switch to named preset
- "Get Theme Colors" → returns color palette
- Siri Suggestions: proactive when time-based theme switch approaches

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Plank" to apply theme "Ocean"`
- `tell application "Plank" to get current theme`
- `tell application "Plank" to create theme from "/path/to/image.jpg"`
- Automator actions for all Plank functions

### Menu Bar Extra
- Native MenuBarExtra API
- Current theme swatch in menu bar
- Quick preset switch menu
- Theme browser

### Automatic Theme Switching
- Schedule: auto-switch at sunrise/sunset
- Focus mode: "Deep Work" → dark theme
- Time-based: morning preset, afternoon preset, evening preset
- External monitor: different theme when external monitor connected

### Folder Actions
- New wallpaper added → offer to generate theme from it
- Automator workflow triggers

### Automation Triggers
- Triggers: "When external display connected → apply [preset]"
- "When Focus mode changes → switch theme"
- "When time is X → switch to [preset]"

---

## Out of Scope
- App-specific themes (each app different colors)
- Per-document themes
