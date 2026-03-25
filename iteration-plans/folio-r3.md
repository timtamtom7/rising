# FOLIO — R3: Accounts, Notifications, Keyboard Navigation

## Overview
R3 adds third-party RSS service accounts (Feedbin, Feedly), system notifications for new articles, and comprehensive keyboard navigation for power users.

## New Dependencies
```
- KeychainAccess (~> 4.2) — account credentials
```

## New Functionality

### F11: Feedbin Account
- `File > Add Account > Feedbin...`
- API: `https://api.feedbin.me/v2/` (Basic Auth or OAuth2)
- Features:
  - Sync starred articles (Feedbin "starred" ↔ FOLIO favorites)
  - Sync read state bidirectionally
  - Import Feedbin subscriptions as feeds
  - Unread counts synced
- Background sync every 15 minutes
- Feedbin credentials stored in Keychain
- Conflict resolution: Feedbin server wins for sync
- Manual sync button in account settings

### F12: Feedly Account
- `File > Add Account > Feedly...`
- OAuth2 via `https://feedly.com/v3/auth/auth`
- Callback URL: `foliords://auth/feedly`
- Features:
  - Sync categories (Feedly categories ↔ FOLIO categories)
  - Sync read/unread state
  - Sync saved articles (Feedly "saved" ↔ FOLIO favorites)
  - Fetch articles from Feedly's API instead of direct feed URLs
- Token refresh handled automatically
- Feedly sync status indicator in sidebar

### F13: Unified Feed Aggregation
- When both local feeds and account feeds exist, merge in `FeedAggregator`
- `FeedAggregator.merge(local:, feedbin:, feedly:)` → `[FeedGroup]`
- Duplicate articles detected by URL hash
- Per-account sync status badges in sidebar
- Account-specific features: Feedly category pills, Feedbin tags

### F14: System Notifications
- `UNUserNotificationCenter` request authorization on first launch
- Notification triggers:
  - New articles in subscribed feeds (configurable: 5+ new articles)
  - Per-feed notification toggle (off by default)
  - Notification frequency: immediate / hourly digest / daily digest
- Notification content: feed name + article count + titles
- Click notification → opens FOLIO to first new article
- `NotificationService` with `requestAuthorization()`, `scheduleNotification()`, `handleNotificationTap()`
- Do Not Disturb / Focus-aware (skip notifications during Focus)

### F15: Comprehensive Keyboard Navigation
- Full VoiceOver support (accessibility audit)
- `KeyboardNavigationService` (ObservableObject) tracking `selectedArticleId`
- Tab order: Sidebar → Article List → Reader (or Reader as sheet)
- Vim-style navigation in article list:
  - `j` / `↓` — next article
  - `k` / `↑` — previous article
  - `g` — first article
  - `G` — last article
  - `/` — focus search
  - `o` — open article in reader
  - `Enter` — open in browser
  - `s` — save to favorites / Instapaper
  - `m` — mark read/unread
  - `u` — mark unread
  - `r` — refresh current feed
  - `?` — show keyboard shortcuts overlay
- Reader view keyboard:
  - `j` / `↓` — scroll down
  - `k` / `↑` — scroll up
  - `Space` — page down
  - `b` — page up
  - `Esc` — close reader
  - `+` / `-` — zoom font size
  - `t` — toggle reader theme
- Global hotkey: ⌘⇧F to activate app and focus search (via `CGEvent` tap)

## UI Changes

### Sidebar Additions
- Accounts section (collapsible) with Feedbin/Feedly icons
- Sync status: ✓ synced / ↻ syncing / ⚠ error
- Per-feed notification toggle (bell icon, toggles with ⌘⇧N)

### Settings Window (new)
- `FOLIOSettingsWindow`: tabbed (General / Accounts / Notifications / Reader / Keyboard)
- Accounts tab: add/remove Feedbin/Feedly, sync now, sync frequency
- Notifications tab: enable/disable, frequency, per-feed toggles
- Keyboard tab: custom shortcut mapping (future-proofing)

### Keyboard Shortcuts Overlay
- `?` key or `Help > Keyboard Shortcuts` → full-screen overlay
- Visual diagram of all shortcuts

## File Structure Additions
```
FOLIO/
├── Services/
│   ├── FeedbinService.swift
│   ├── FeedlyService.swift
│   ├── FeedAggregator.swift
│   ├── NotificationService.swift
│   └── GlobalHotkeyService.swift
├── Views/
│   ├── SettingsWindow/
│   │   ├── SettingsWindowController.swift
│   │   ├── GeneralSettingsView.swift
│   │   ├── AccountsSettingsView.swift
│   │   ├── NotificationsSettingsView.swift
│   │   ├── ReaderSettingsView.swift
│   │   └── KeyboardSettingsView.swift
│   ├── KeyboardShortcutsOverlay.swift
│   └── SyncStatusView.swift
├── ViewModels/
│   ├── SettingsViewModel.swift
│   └── AccountsViewModel.swift
├── Models/
│   ├── FeedbinAccount.swift
│   └── FeedlyAccount.swift
└── App/
    └── URLSchemeHandler.swift         (foliords:// for OAuth callback)
```

## Account Data Models
```swift
struct FeedbinAccount: Codable {
    var email: String
    var apiKey: String   // stored in Keychain
    var lastSyncedAt: Date?
    var syncEnabled: Bool
}

struct FeedlyAccount: Codable {
    var userId: String
    var accessToken: String   // stored in Keychain
    var refreshToken: String  // stored in Keychain
    var tokenExpiresAt: Date
    var lastSyncedAt: Date?
    var syncEnabled: Bool
}
```

## Success Criteria
- [ ] Can connect/disconnect Feedbin account
- [ ] Can connect/disconnect Feedly account via OAuth
- [ ] Starred articles sync between FOLIO and Feedbin
- [ ] New article notifications appear and are clickable
- [ ] All vim-style shortcuts work in article list
- [ ] Reader view keyboard navigation works
- [ ] VoiceOver announces all elements correctly
- [ ] Settings window opens from ⌘,
