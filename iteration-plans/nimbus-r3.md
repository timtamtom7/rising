# NIMBUS — R3: Upload/Download Management, Bandwidth Limits, Encryption

## Goal
Full transfer management with bandwidth throttling, queue management, and encryption at rest for local cache.

---

## Scope

### Advanced Transfer Manager
- `TransferQueue`: priority queue for uploads/downloads
- Concurrent transfer limit per account (configurable)
- Global concurrent limit
- Transfer priority: high (user-initiated), normal, low (background)
- Retry policy: 3 retries with exponential backoff
- Failed transfer logging and retry UI

### Bandwidth Limits
- Global upload/download speed limits
- Per-account limits
- Schedule-based limits: e.g., "Limit to 1MB/s during work hours"
- Unrestricted mode: full speed when on AC power
- Visual indicator when throttled
- `rclone --bwlimit` flag integration

### Progress UI
- Persistent transfer panel (drawer or bottom sheet)
- Per-transfer: filename, progress bar, speed, ETA, cancel button
- Collapsed view: total active transfers, aggregate speed
- Notification on transfer complete
- "Copy to clipboard" for download path

### Encryption at Rest
- `EncryptionManager`: AES-256-GCM encryption for cached files
- Key stored in Keychain (derived from user password or device)
- Optional: encrypt entire cache folder
- Performance: encrypt/decrypt in background
- Setting: "Encrypt cached files" toggle
- Warning: encrypted cache may be slow

### Selective Sync
- "Smart Sync" vs "Full Sync" per account
- Selective sync: choose folders to keep locally
- Auto-remove local copies when remote available
- Keep local copies of "frequently accessed" files

### Conflict Resolution UI
- When conflict detected: modal showing both versions
- Options: Keep local, Keep remote, Keep both (rename)
- Conflict policy setting: auto-resolution preference

### Transfer History
- Log of all completed transfers in `UserDefaults`
- Filter: by date, account, type (upload/download)
- Re-download or re-upload from history
- Clear history option

### Pause/Resume All
- Global pause: suspend all transfers
- Auto-pause on battery, resume on AC
- Auto-pause on metered network

---

## Out of Scope (R4+)
- Multiple simultaneous accounts
- Menu Bar Extra
- Shortcuts
- Widgets
