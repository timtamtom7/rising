# NIMBUS — R1: Google Drive Mounting

## Goal
Mount Google Drive as a local folder using a FUSE-based approach (rclone or FUSE-T), display files in Finder. Core cloud mounting infrastructure.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with cloud SF Symbol icon
- `NSPopover` (380×300pt) showing mount status and quick actions
- "Open NIMBUS" button opens main window

### Google Drive Integration
- OAuth 2.0 authentication via `GTMAppAuth` or `AppAuth` wrapper
- Scope: `drive.readonly` for read-only, `drive.file` for full access
- Store refresh token securely in Keychain
- Token refresh on expiry

### Mounting Engine
- **Primary approach**: `rclone mount` as subprocess (bundled rclone binary)
  - `rclone config` for Google Drive setup
  - `rclone mount` with `--vfs-cache-mode` for read caching
  - Handle mount lifecycle (mount/unmount/eject)
- **Alternative**: FUSE-T framework for native mounting
- Mount point: `~/Library/Application Support/NIMBUS/mounts/[account]/`
- Volume appears in Finder sidebar under "Locations"

### File System Events
- Monitor mounted volume with `FSEvents` or `DispatchSource.makeFileSystemObjectSource`
- Refresh file listings on change
- Handle mount/unmount notifications

### Basic File Browser (Main Window)
- List view of mounted Drive contents
- Columns: Name, Size, Modified, Kind
- Double-click to open in default app
- Right-click context menu: Download, Preview, Reveal in Finder
- Breadcrumb navigation bar
- Back/forward history

### File Preview
- `QuickLook` for supported types (images, PDFs, text)
- Thumbnail generation for images
- No streaming video playback in R1 (download first)

### Download to Local
- "Download" action: copy file from mount to `~/Downloads/NIMBUS/`
- Progress indicator for large files
- Resume interrupted downloads (if supported by rclone)

### Account Management
- Add/remove Google Drive accounts
- Display account name and email
- Quota display (used/total from Google Drive API)

### Build & Run
- Target: macOS 13.0+
- SPM: `GTMAppAuth`, `KeychainAccess`
- Bundled rclone binary for macOS (arm64 + x86_64 universal)
- Zero warnings, clean build

---

## Out of Scope (R2+)
- Dropbox, OneDrive support
- Multiple accounts
- Bandwidth limits
- Encryption
- Menu Bar Extra
