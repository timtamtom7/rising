# Mark — R17: Shortcuts & Automation

## Goal
Make Mark deeply automatable through Shortcuts, AppleScript, and browser/system integrations.

---

## Scope

### Shortcuts App Integration
- "Add Bookmark" → bookmark URL
- "Get Recent Bookmarks" → list recent
- "Search Bookmarks" → search by query
- "Get Bookmarks in Collection" → list by collection
- "Archive Bookmark" → move to archive
- Siri Suggestions: proactive when browsing relevant content

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Mark" to add bookmark "https://..." with title "Title"`
- `tell application "Mark" to search bookmarks "topic"`
- `tell application "Mark" to get collections`
- Automator actions for all Mark functions

### Menu Bar Extra
- Native MenuBarExtra API
- Quick bookmark access in menu bar
- Recent bookmarks
- Quick add

### Browser Extension Actions
- "Save to Mark" → bookmark with auto-tags
- "Save to Collection X" → direct collection save
- "Read Later" → add to reading queue
- Right-click → "Bookmark with Mark"

### Automation Triggers
- Triggers: "When page bookmarked → notify team"
- "When bookmark accessed → log"
- "When archive threshold reached → suggest archiving"

### RSS / Feed Integration
- Subscribe to RSS feeds → auto-bookmark new items
- "New post from favorite blog → add to Mark"

---

## Out of Scope
- Automatic screenshot of pages
- Full content extraction
