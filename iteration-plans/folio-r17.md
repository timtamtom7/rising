# Folio — R17: Shortcuts & Automation

## Goal
Make Folio deeply automatable through Shortcuts, AppleScript, and system integrations.

---

## Scope

### Shortcuts App Integration
- "Scan Document" → opens camera for capture
- "Upload Document" → upload from file
- "Search Documents" → search by query
- "Get Recent Documents" → list recent
- "Share Document" → generate share link
- "Get Document Tags" → tag list
- Siri Suggestions: proactive when scanning opportunities arise

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Folio" to scan document`
- `tell application "Folio" to get recent documents`
- `tell application "Folio" to search documents "contract"`
- Automator actions for all Folio functions

### Folder Actions
- Attach Folio to folder: new PDFs/images auto-imported
- "When file downloaded → offer to scan and save to Folio"

### Automation Triggers
- Triggers: "When new document added → run automation"
- "When document expiring soon → notify"
- "When document tagged X → share with Y"

### Calendar Integration
- Receipt date → create Folio entry with date
- Meeting with document → suggest opening Folio

### Finder Extension
- Right-click → "Scan with Folio"
- Finder Quick Action: scan to Folio

---

## Out of Scope
- Automatic routing of documents to folders
- Email-to-Folio ingestion (future)
