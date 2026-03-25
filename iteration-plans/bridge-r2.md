# Bridge — R2: Messages, Call History, Notes, App Management, File Browser

## Goal
Expand Bridge to view and manage iOS device messages, call history, notes, installed apps, and browse the device filesystem.

---

## Scope

### Message Viewing
- Use `AMDeviceLookupContacts` or read from device SQLite: `sms.db`, `chat.db`
- Display conversations in a list: contact name/avatar, last message preview, timestamp
- Open conversation thread: bubbles grouped by sender, timestamps, attachments shown as thumbnails
- Search messages by contact name or content
- Export conversation as PDF or text file via sheet in main window
- Pagination: load 50 messages at a time, "Load More" button

### Call History
- Read from device SQLite: `call_history.db` or `addressbook.db`
- List view: contact name, call type icon (missed/incoming/outgoing), duration, timestamp
- Filter tabs: All, Missed, Incoming, Outgoing
- Tap to initiate call on device (via `AMDeviceStartService` with tel:// URL scheme)
- Clear call history button (with confirmation alert)

### Notes Sync
- Access device notes via `CKContainer.default()` if iCloud notes, or local SQLite
- Sync notes to Mac Notes app via `NOTES` framework or direct SQLite read
- Fields: title, body text, last modified date, folder
- Two-way sync with conflict resolution (newer wins)
- Notes list view in main window with search

### App Management
- List installed apps via `AMDeviceCopyApplications` or IPA directory scan
- Display: app name, bundle ID, version, size, icon
- Filter: system apps vs user-installed
- Uninstall app via `AMDeviceRemoveApplication` (with confirmation)
- Show app storage breakdown: documents, cache, data

### Selective File Browser
- AFC (AppleFileCook) client: navigate device filesystem via `AFCDirectoryOpen/Read/Write`
- Browse `/var/mobile/Media/` and app sandbox directories (if jailbroken or via device trust)
- For standard devices: access photo roll, media directories only
- List view with file type icons, size, modified date
- Download files from device to Mac
- Basic preview for images, PDFs, text files

### UI Enhancements
- Main window becomes a tabbed interface: Device, Photos, Messages, Calls, Notes, Files
- Tab bar with SF Symbol icons
- Keyboard navigation (arrow keys, Enter to open, Delete to delete)
- Toolbar: refresh, search field, device selector dropdown

### BridgeStore Updates
- Add `MessageStore`, `CallHistoryStore`, `NotesStore`, `AppStore`, `FileBrowserStore` as observable objects
- Each manages its own data domain and CRUD operations

---

## Out of Scope (R3+)
- Selective backup with granularity
- Encrypted transfers
- Wi-Fi sync
- Multi-device support
- Duplicate photo detection
