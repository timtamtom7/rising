# Caliber — R17: Shortcuts & Automation

## Goal
Make Caliber deeply automatable through Shortcuts, AppleScript, and system integrations for study workflows.

---

## Scope

### Shortcuts App Integration
- "Get Due Cards Count" → number
- "Get Today's Review Summary" → text summary
- "Start Caliber Review" → opens app to due cards
- "Add Card to Deck" → create card via voice/text
- "Get Learning Stats" → streak, retention rate, cards reviewed
- "Import Deck" → import from file URL
- Siri Suggestions: proactive when study time approaches

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Caliber" to get due card count`
- `tell application "Caliber" to create card "front" back "back" in deck "Spanish"`
- `tell application "Caliber" to get streak`
- Automator actions for all Caliber functions

### Menu Bar Extra
- Native MenuBarExtra API
- Show due card count in menu bar
- Quick "Start Review" button
- Streak display

### Focus Integration
- Study Focus mode: when activated, Caliber enters "distraction-free review"
- Block non-Caliber apps during study sessions (Screen Time API)
- Study session timer in Focus mode

### Automation Triggers
- Triggers: "Every day at 9am → check due cards"
- "When new card added to shared deck → notify me"
- "When streak is at risk → send reminder"
- "When assignment is due tomorrow → alert"

### PDF / Document Import
- Automator action: "Import PDF to Caliber"
- Select text → right-click → "Create Caliber Card"
- Safari extension: create card from highlighted text

---

## Out of Scope
- Automatic card creation from video lectures
- Cross-device study sync triggers
