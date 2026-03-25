# Notch — R17: Shortcuts & Automation

## Goal
Make Notch automatable through Shortcuts, AppleScript, and time/location triggers.

---

## Scope

### Shortcuts App Integration
- "Show Menu Bar Item" → show named item
- "Hide Menu Bar Item" → hide named item
- "Apply Preset" → apply named preset
- "Get Menu Bar Status" → list visible items
- "Toggle Menu Bar Item" → toggle visibility
- Siri Suggestions: proactive when work hours start

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Notch" to show item "Wi-Fi"`
- `tell application "Notch" to hide item "Google Chrome"`
- `tell application "Notch" to apply preset "Work Mode"`
- Automator actions for all Notch functions

### Menu Bar Extra
- Native MenuBarExtra API
- Quick access to Notch controls
- Visible items list
- Preset switcher

### Automation Triggers
- Triggers: "When work hours start → apply Work preset"
- "When meeting starts → hide distracting items"
- "When external display connected → apply Dual Display preset"
- Time-based: morning preset, evening preset

### Focus Integration
- Focus mode → apply associated preset
- "Deep Work" Focus = Work Mode preset

### Folder Actions
- New app installed → suggest adding to menu bar management

---

## Out of Scope
- Automatic app detection
- Cross-device preset sync triggers
