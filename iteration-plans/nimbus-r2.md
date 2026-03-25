# NIMBUS — R2: Dropbox, OneDrive, File Caching, Offline Mode

## Goal
Expand cloud provider support: Dropbox, OneDrive, S3. Add intelligent file caching and offline mode.

---

## Scope

### Dropbox Integration
- Dropbox SDK via `SwiftyDropbox` or API v2
- OAuth 2.0 with PKCE (no client secret needed for installed apps)
- `dropboxdk` URL scheme for callback
- Support: Personal Dropbox, Dropbox Business
- Configure via `rclone config` with `dropbox` remote type

### OneDrive Integration
- Microsoft Graph API via `MSAL` for auth
- OneDrive Personal and OneDrive for Business
- OAuth 2.0 with `publicClientApplication`
- Support multiple tenant IDs for Business
- Configure via `rclone config` with `onedrive` remote type

### S3 Integration (Bonus Provider)
- Amazon S3, Backblaze B2, Wasabi, MinIO
- Access key + secret key authentication
- Bucket and prefix selection
- STS tokens for temporary credentials
- Configure via `rclone config` with `s3` remote type

### Multi-Account Management
- `CloudAccount`: id, provider, email, displayName, quota, isConnected
- List all accounts in sidebar
- Active account indicator
- Switch between accounts

### File Caching Strategy
- `CacheManager`: local cache for recently accessed files
- Cache location: `~/Library/Caches/NIMBUS/`
- Cache policy: LRU with configurable size limit (default 5GB)
- Cache warming: pre-download files likely to be opened
- Smart prefetch: based on folder traversal patterns

### Offline Mode
- Mark files/folders for offline availability
- `OfflineFileManager`: tracks offline-marked files
- "Available Offline" indicator in file list
- Sync status: synced, pending, error
- Manual sync trigger for offline files
- Background sync when back online

### File Sync Engine
- Bidirectional sync: download remote changes, upload local changes
- Conflict resolution: newest wins, or prompt user
- Sync queue with priority
- Pause/resume sync
- Sync status per file/folder

### Transfer Manager
- Upload/download queue with concurrent limit (default 3)
- Progress UI: per-file and total progress
- Pause/resume/cancel individual transfers
- Bandwidth limit configuration (from R3)
- Retry failed transfers

### UI Enhancements
- Provider icons in file list
- Account switcher in toolbar
- Sync status column
- Offline indicator column
- Transfer activity in popover

---

## Out of Scope (R3+)
- Upload/download bandwidth limits
- Encryption at rest
- Multiple simultaneous accounts
- Menu Bar Extra
