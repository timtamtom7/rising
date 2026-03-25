# DUST — R2: Large File Finder & Old File Finder

## Goal
Expand beyond duplicates: find large files consuming space, identify old files not accessed in X days. Add cleanup recommendations engine.

---

## Scope

### Large File Finder
- `LargeFileScanner`: find files above configurable threshold (default 100MB)
- Sort by size descending, show top consumers
- Category breakdown: Videos, Archives, Disk Images, Applications, Other
- "Sweep" action: move selected to trash
- Size formatting: KB, MB, GB with appropriate precision

### Old File Finder
- `OldFileScanner`: find files not accessed in X days
- Configurable threshold: 30, 60, 90, 180, 365 days
- Sort by last accessed date (oldest first)
- Filter by file type category
- "Archive" suggestion: compress old files before deleting

### Cleanup Recommendations Engine
- `CleanupRecommender`: analyzes scan results, generates prioritized recommendations
- Recommendation types:
  - Duplicate clusters (from R1)
  - Large files consuming space
  - Old files untouched in months
  - Cache/temporary file locations
- Each recommendation: title, description, potential space savings, action button
- Risk level indicator: Safe / Moderate / Caution

### Unified Results View
- Tabbed interface: Duplicates | Large Files | Old Files | Recommendations
- Each tab: list with selection, bulk actions
- Combined "Cleanup All" action for selected items across tabs
- Space savings preview before committing

### Visual Space Analytics
- Simple bar chart showing space by category (using Swift Charts)
- Treemap or pie chart for duplicate categories by file type
- "Space Recovered This Session" counter

### File Preview & Details
- Enhanced preview: images, PDFs (first page thumbnail), text
- File metadata: full path, created date, modified date, accessed date, permissions
- "Reveal in Finder" action
- "Open containing folder" action

### Scan History (Lightweight)
- Store last 5 scan results in `UserDefaults` (paths + summary stats only)
- Quick re-scan from history
- Clear history option

### Performance
- Parallel scanning using `TaskGroup` for directory traversal
- Background scanning: don't block UI, report progress
- Pause/resume scan capability

---

## Out of Scope (R3+)
- Safe delete with undo queue
- Exclude folder rules
- Automated scheduled scans
- Menu Bar Extra
- iCloud sync
