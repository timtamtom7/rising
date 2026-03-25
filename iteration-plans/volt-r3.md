# Volt — R3: Profiles, Quick Actions, Keyboard Shortcuts

## Goal
Introduce multiple named charging profiles (Home, Work, Travel), quick-switch actions from the menu bar, and global keyboard shortcuts.

---

## Scope

### Profiles Data Model (SQLite.swift)
- New `profiles` table: id INTEGER PRIMARY KEY, name TEXT, charge_limit INTEGER, is_active INTEGER 0/1, created_at INTEGER, icon TEXT (SF Symbol name)
- Seed three default profiles on first launch:
  - Home: 80%, icon `house.fill`
  - Work: 100% (no limit), icon `building.2.fill`
  - Travel: 50%, icon `airplane`
- User can add, edit, and delete profiles
- `settings` table update: replace `charge_limit` with `active_profile_id` (INTEGER FK)

### Profile Management UI
- New "Profiles" section in popover (accessible via toolbar or tab)
- List of profiles with name, icon, limit value
- Active profile highlighted with checkmark
- Tap to activate (saves immediately)
- Edit button → sheet to rename, change icon (SF Symbol picker), change limit
- `+` button to add new profile
- Delete button (with confirmation) for user-created profiles; default 3 cannot be deleted

### Quick Actions from Menu Bar
- Right-click (or secondary click) on status item shows `NSMenu`
- Menu structure:
  - Header: "Volt — [Profile Name]"
  - Separator
  - List of all profiles as radio menu items (checkmark on active)
  - Separator
  - "Open Volt..." (opens main popover)
  - "Quit"
- Left-click opens the popover as before
- `NSStatusItem.button.sendAction(on: [.leftMouseUp, .rightMouseUp])` to differentiate

### Keyboard Shortcuts
- Global hotkeys via `CGEvent` tap or `MASShortcut` (recommend `KeyboardShortcuts` Swift package for clean implementation)
- Default shortcuts:
  - `⌘⇧1`: Activate Profile 1 (Home)
  - `⌘⇧2`: Activate Profile 2 (Work)
  - `⌘⇧3`: Activate Profile 3 (Travel)
  - `⌘⇧L`: Open Volt popover
- Shortcuts configurable via Preferences (accessible from popover toolbar gear icon)
- Store custom shortcuts in SQLite `settings` table

### Preferences Window
- Minimal `NSWindow` (400×300pt) opened from gear icon in popover toolbar
- Tabs: "General", "Shortcuts"
- General tab: launch at login toggle, show percentage in menu bar toggle, default profile picker
- Shortcuts tab: list of all shortcuts with record button to rebind
- Use `KeyboardShortcuts` package for shortcut recording UI

### Launch at Login
- Already partially done in R1; now use `SMAppService` (macOS 13+) for proper Login Items API
- Toggle in Preferences General tab
- Gracefully fall back to `LSSharedFileList` for older macOS if needed

### Profile Switching Logic
- `VoltStore.activateProfile(_ profile: Profile)`:
  1. Update `settings.active_profile_id`
  2. Update `VoltStore.chargeLimit` and `limitEnabled`
  3. If profile limit == 100 && limit was previously enabled → disable limit
  4. Re-read battery state, update UI
  5. Show brief floating notification: "Switched to [Profile Name]"

### Build & Run
- Target: macOS 13.0+
- New SPM dependency: `KeyboardShortcuts` (by `sindresorhus`)
- Test: right-click menu shows all profiles, ⌘⇧1 switches to Home, shortcut configurable

---

## Out of Scope (R4+)
- Time-to-full/empty display
- Charge history export
- Menu bar extra stats (cycles, temp)
- iCloud sync
