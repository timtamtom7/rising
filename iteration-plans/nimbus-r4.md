# NIMBUS — R4: Multiple Accounts, Menu Bar Extra, Shortcuts

## Goal
Multi-account support, Menu Bar Extra for quick access, Shortcuts integration for automation.

---

## Scope

### Multiple Accounts
- Up to 5 accounts per provider
- `AccountManager`: CRUD for accounts, default account selection
- Quick switcher: menu bar shows current account, click to switch
- Separate mount points per account: `~/Library/Application Support/NIMBUS/mounts/[account-id]/`
- Combined view option: show all accounts in unified folder tree

### Menu Bar Extra (NSMenuBarExtra)
- `NSMenuBarExtra` (macOS 13+) or `NSStatusItem`
- Menu items:
  - Mount status per account (mount/unmount toggle)
  - Active transfers count
  - "Open NIMBUS" / "Preferences" / "Quit"
- Badge for pending transfers or sync issues
- Click opens popover with mini dashboard

### Mini Dashboard (Popover)
- Mount status grid: account name, connected/disconnected, sync status
- Quick mount/unmount buttons
- Active transfer list (top 3)
- "View All Transfers" → open main window
- Storage summary: cached / available

### Shortcuts Integration
- "Mount Cloud Drive" action: mount specified account
- "Unmount Cloud Drive" action
- "List Files" action: returns file list from specified path
- "Download File" action: downloads file to local, returns path
- "Upload File" action: upload local file to cloud
- "Get Storage Usage" action: returns quota info

### Notification Center Widget
- Transfer progress widget (small)
- Storage usage widget (medium)
- Sync status widget (small)

### Preferences Window
- Accounts tab: manage all accounts
- Sync tab: selective sync, conflict resolution, bandwidth
- Cache tab: size limit, encryption, clear cache
- General tab: launch at login, notifications, shortcuts

### Launch at Login
- `SMAppService` for macOS 13+
- `LSSharedFileList` fallback for older versions
- Toggle in preferences

### Global Hotkey
- `CGSession` or `EventMonitor` for global hotkey
- Default: ⌘⇧N to toggle NIMBUS window
- Configurable in preferences

---

## Out of Scope (R5+)
- WidgetKit
- iCloud sync
- App Store launch
