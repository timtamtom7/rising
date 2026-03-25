# Bridge — R3: Selective Backup, Encrypted Transfers, Incremental Backup, Duplicate Photo Detection

## Goal
Introduce granular backup controls, encrypted data transfers, incremental backup logic, and intelligent duplicate photo detection.

---

## Scope

### Selective Backup
- Backup categories panel: each data type (photos, contacts, messages, notes, apps, call history, health data) has an individual toggle
- Preset backup profiles: "Full Backup", "Photos Only", "Contacts & Messages", "Custom"
- Save custom profiles with name
- Per-device default profile setting
- Backup destination selector: local (`~/Library/Application Support/Bridge/Backups/`) or external volume
- Backup queue: multiple devices can queue for backup

### Encrypted Transfers
- All device ↔ Mac data transfers use AES-256 encryption
- Generate per-device encryption key stored in Mac Keychain
- Key exchange via established AMDevice session (use `AMDeviceSetValue` for encryption preferences)
- Local backup archives encrypted at rest (`.bridgebackup` extension, zip + AES)
- Decrypt on restore with key from Keychain
- Visual indicator when encrypted transfer is active

### Incremental Backup
- Track last backup timestamp per device per data category
- Only back up files modified since last backup (compare modification dates from device)
- Maintain manifest file per device: `manifest.json` listing all backed-up files and their hashes
- Hash computation: SHA-256 per file
- Delta manifest: list of added/modified/deleted files since last backup
- Restore options: full restore, selective restore from any past backup point

### Duplicate Photo Detection
- On photo import, compute perceptual hash (`pHash`) per image
- Store hashes in SQLite: `photo_hashes` table (hash, filename, device_id, import_date)
- Before import, compare incoming photos against known hashes
- If duplicate detected: show alert with side-by-side preview, options: Skip, Import Anyway, Replace
- Duplicate album in Mac Photos: optionally move duplicates to "Bridge Duplicates" album
- Background duplicate scan: batch-process existing library for cross-device duplicates

### Backup Verification
- Post-backup verification: re-hash all backed-up files and compare to manifest
- Corruption detection: highlight files that fail hash check
- Integrity report shown at end of backup (X files, Y GB, Z duplicates skipped, 0 errors)

### Backup Scheduling
- Schedule automatic backups: daily, weekly, monthly at specified time
- Only run when device is connected and Mac is idle (screensaver active or user AFK)
- Background backup via `BGTaskScheduler`

---

## Out of Scope (R4+)
- Multi-device simultaneous sync
- Wi-Fi sync
- Menu Bar Extra
- Keyboard shortcuts
