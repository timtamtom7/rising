# DUST — R1: Duplicate File Finder

## Goal
Core duplicate detection engine: scan selected folders, compute file hashes (MD5/SHA256), group duplicates, allow deletion. The foundation for all DUST features.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with broom/broomstick SF Symbol icon
- `NSPopover` (400×320pt) showing quick scan status
- Main window opens via "Open DUST" button

### Duplicate Detection Engine
- `FileScanner` service: recursive directory traversal using `FileManager`
- `HashCalculator`: compute MD5 first (fast), SHA256 for verification on collision
- Hash strategy: 
  - Group by file size first (skip unique sizes)
  - For files with same size: compute partial hash (first 4KB + last 4KB)
  - Only compute full SHA256 when partial hashes match
- Progress reporting via `Progress` object
- Cancellation support via `Task` with `checkedCancellation`
- Handle symbolic links, skip system directories, respect permissions

### Scan Configuration
- Folder picker via `NSOpenPanel` (multi-select directories)
- Quick presets: Downloads, Desktop, Documents
- Exclude patterns: `.DS_Store`, `Thumbs.db`, `.git`, `node_modules`
- Min file size filter (default 1KB to skip tiny files)

### Duplicate Results View
- Group duplicates in `LazyVStack` with grouping headers
- Each group shows: file count, total wasted space, sample file preview
- File row: icon (from `NSWorkspace.shared.icon(forFile:)`), name, path, size, date modified
- Checkbox selection (select which copy to keep)
- "Select All Except Oldest" / "Select All Except Newest" quick actions
- Preview pane for selected file (images, text files up to 1MB)

### Deletion
- "Move to Trash" action (not permanent delete in R1) via `NSFileManager.trashItem`
- Confirmation alert before trash: "Move X files to Trash?"
- Show trash progress
- Post-delete: refresh view, update space recovered counter

### Data Model (In-Memory for R1)
- `DuplicateGroup`: id, files `[FileItem]`, totalWastedSpace
- `FileItem`: id, path, name, size, modificationDate, hash, isSelected
- No persistence between launches (R1)

### UI Layout (Main Window)
- Left: folder list + add/remove buttons, "Scan" button
- Center: duplicate groups list
- Right: file details / preview
- Bottom toolbar: space recovered, selected count

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: none (pure Foundation)
- Zero warnings, clean build
- Test: scan Downloads folder, find duplicates, trash them

---

## Out of Scope (R2+)
- Large file finder, old file finder
- Safe delete with undo
- Automated schedules
- Menu Bar Extra
