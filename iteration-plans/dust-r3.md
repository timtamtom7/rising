# DUST — R3: Safe Delete, Exclude Rules, Smart Categories

## Goal
Safe deletion with undo, folder exclusion system, smart category detection for Downloads/Desktop/Documents. Make cleanup reliable and user-controlled.

---

## Scope

### Safe Delete (Trash Queue)
- `TrashQueue`: tracks deleted items with undo capability
- On delete: move to system trash, record path + timestamp in `UserDefaults`
- Undo window: list recent deletions (last 50), one-click restore
- Restore: `NSWorkspace.shared.recycle(_:)` reversed via `NSFileManager.moveItem`
- Auto-expire undo entries after 30 days
- "Empty Trash" shortcut with confirmation

### Exclude Folder Rules
- `ExclusionRule`: pattern (glob), folder path, or regex
- Predefined exclusions: `~/Library`, `/System`, `.git`, `node_modules`, `Pods`, `Carthage`, `.gradle`
- User-defined exclusions via UI (add folder or pattern)
- Import/export exclusion list as JSON
- Exclusion rules apply to all scan types

### Smart Categories
- Auto-detect common folder structures:
  - **Downloads**: `.dmg`, `.zip`, `.pkg`, installers, browser downloads
  - **Desktop**: screenshots, temporary files
  - **Documents**: projects, archives, media
- Category-specific recommendations:
  - Downloads: old installers, duplicate archives
  - Desktop: screenshots older than 30 days
  - Documents: project leftovers (build folders, `DerivedData`)
- "Smart Sweep" per category

### Cleanup Sessions
- `CleanupSession`: groups a set of deletions with summary
- Track: items deleted, space recovered, timestamp
- Session history with restore capability
- Email/digest summary option (optional, no server in R3)

### File Type Intelligence
- Recognize file types by extension and content signature
- Category groups: Images, Videos, Audio, Documents, Archives, Code, Apps
- Custom type groupings (user-defined extensions → category)
- Smart selection: "Select all images older than X days"

### Duplicate Enhancement
- Smart keeper selection: prefer originals (by path depth, name, date)
- Filename similarity detection (Levenshtein distance) for near-duplicates
- Preview merged duplicate groups

### Settings Panel
- Default scan folders
- Exclusion patterns manager
- Safe delete toggle (always trash vs. permanent delete warning)
- File size threshold defaults
- Notification preferences

### Drag & Drop
- Drop folders onto DUST window to add to scan list
- Drop files to see their properties/size

---

## Out of Scope (R4+)
- Automated cleanup rules
- Scheduled scans
- Menu Bar Extra
- Widgets
