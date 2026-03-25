# Readr — Round 6: Polish, Stability & Depth

## Context
Fix reported crashes/UI issues and push every screen to genuinely excellent quality.

---

## Fixes & Stability
- Clean build, no errors
- Fix signing configuration (app + widget)
- All force unwraps → safe alternatives
- Document scanning — Vision framework handles edge cases
- Note/quotes sync correctly

---

## Design & UI Polish

### Library
- Document cards show page count, date, thumbnail
- Scan button prominent
- Sort/filter work
- Empty state meaningful

### Document Scan
- Camera viewfinder correct orientation
- Page crop — draggable corners smooth
- Multi-page — add page works
- Scan complete → review screen

### OCR Results
- Text displayed readable
- Edit text — corrections save
- Copy text works
- Search within text works

### Notes
- Note cards show excerpt + page
- Note linked to correct page
- Tags display correctly
- Note detail — full text, page reference

### Quotes
- Quote cards show text + book
- Share as image → image correct
- Highlight text → page reference saved

### Export
- Citations correct (APA, MLA, Chicago, BibTeX)
- PDF export — formatted, readable
- Export to Readwise → works
- Export to Obsidian → markdown correct

### Community
- Feed loads smoothly
- Like/share work
- Anonymous quotes correct

---

## Edge Cases
- Camera permission denied → settings link
- Scan fails → retry clearly available
- No documents → meaningful empty state
- Note deleted → confirm dialog

---

## Custom Graphics (R6)
- App icon
- Document/page illustrations
- Empty state illustrations
- Quote share card design
