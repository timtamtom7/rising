# Fume — Round 6: Polish, Stability & Depth

## Context
Fix reported crashes/UI issues and push every screen to genuinely excellent quality.

---

## Fixes & Stability
- Clean build, no errors
- Fix signing configuration
- All force unwraps → safe alternatives
- Source list loads without blank screens
- Search is fast — no lag on 100+ sources

---

## Design & UI Polish

### Source Library
- Cards show title, favicon, domain, tags
- Add source flow — URL validated, screenshot fetched
- Folder organization works
- Empty state meaningful ("Add your first source")

### Source Detail View
- AI analysis section readable
- Summary, facts, action items — tabs switch smoothly
- Notes attached to source visible
- Tags displayed correctly

### Query/Search
- Query results show source name + matched excerpt
- Filter chips work (by type, date)
- No results → helpful empty state

### Settings
- Sync status bar — correct state shown
- iCloud sign-in → clean OAuth flow
- Export data → ZIP/JSON downloads

---

## Edge Cases
- URL invalid → clear error message
- AI analysis fails on long text → timeout handling
- Offline → query still works on cached data
- Source deleted while detail open → handled gracefully

---

## Custom Graphics (R6)
- App icon
- Empty state illustrations (no sources, no results)
- Source card mockup
- AI insight card design
