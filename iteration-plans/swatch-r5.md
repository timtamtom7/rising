# Swatch — R5: Shortcuts, iCloud Sync, Keyboard Shortcuts, Global Eyedropper

## Goal
Integrate with Shortcuts app, sync palettes via iCloud, expose and customizable keyboard shortcuts, and implement a persistent global hotkey for the eyedropper.

---

## Scope

### Shortcuts Integration
- Register as a Shortcuts-compatible app (no special entitlement needed)
- Expose palette operations via `Intents` framework:
  - **"Pick a Color"** intent → runs eyedropper → returns selected color hex
  - **"Get Current Color"** intent → returns the current selected color
  - **"Add Color to Palette"** intent → adds color to named palette
  - **"Create Palette"** intent → creates a new named palette
  - **"Get Palette Colors"** intent → returns colors from a named palette
- Shortcuts appear in the Shortcuts app under "Apps → Swatch"
- Example Shortcuts:
  - "Pick a color, add to my brand palette"
  - "Every Monday, pick a color and set as desktop picture tint"
- Implement `INIntentDefinition` for rich parameter descriptions

### iCloud Sync (CloudKit / NSUbiquitousKeyValueStore)
- Use `NSUbiquitousKeyValueStore` for lightweight palette sync (key-value, 1MB limit)
  - Store palettes as JSON blobs keyed by palette UUID
  - `NSUbiquitousKeyValueStore` syncs automatically via iCloud
  - Changes propagate when device is online
  - Works on macOS 13+ without CloudKit entitlements
- If quota exceeded (1MB), fall back to `CKContainer.default().privateCloudDatabase`
  - Requires CloudKit entitlement (`com.apple.developer.icloud-services`)
  - `CKRecord` per palette, linked to user Apple ID
- Sync indicator in UI: cloud icon with state (synced ✓, syncing ↻, offline ⚠)
- Conflict resolution: last-write-wins using `updatedAt` timestamp
- On new device: pull palettes from iCloud on first launch
- Sync triggers: on palette create, update, delete, and on app foreground

### Keyboard Shortcuts Customization
- All app-level shortcuts stored in `UserDefaults` (via `NSUserShortcutCenter` concepts)
- Preferences panel: "Keyboard Shortcuts" tab
  - List all actions with their current shortcut
  - Click to record new shortcut
  - "Reset to Defaults" per action or global reset
- Default shortcuts (R5 additions beyond R2):
  - `⌘⇧V` — Open Swatch popover
  - `⌘⇧M` — Mix Colors sheet
  - `⌘⇧G` — Gradient Builder sheet
  - `⌘⇧K` — Contrast Checker
  - `⌘⇧I` — Extract from Image
  - `⌘⇧B` — Color Blindness Simulation
  - `⌘⇧S` — iCloud Sync Now
- Shortcuts work even when Swatch popover is not open (via global event monitor)

### Global Eyedropper Hotkey
- `⌘⇧C` registered as a system-wide hotkey using `CGEvent` tap or `DDHotKey` equivalent
- When triggered (even with popover closed):
  1. If popover is not showing, briefly show it then activate eyedropper
  2. Activate eyedropper immediately
  3. Picked color is set as selected color
  4. Popover updates to show the new color
- Uses `NSEvent.addGlobalMonitorForEvents` + `CGEvent.tapCreate` for global capture
- Accessibility permission required (prompt user to grant in System Settings → Privacy → Accessibility)
- On macOS 14+: use `CGEventTap` with proper entitlements
- Hotkey shown in menu bar tooltip and in Shortcuts app

### iCloud Sync Data Model Extension
```swift
// Palette stored as JSON in NSUbiquitousKeyValueStore
struct CloudPalette: Codable {
    let id: UUID
    let name: String
    let colors: [SwatchColor]
    let createdAt: Date
    let updatedAt: Date
}
```

### Build & Run
- Target: macOS 13.0+
- `NSUbiquitousKeyValueStore` requires an Apple Developer account enrolled in iCloud (not a personal ID)
- If not signed into iCloud: silently disable sync, no error shown
- CloudKit path requires `com.apple.developer.icloud-container-identifiers` entitlement
- Zero warnings, clean build

---

## Out of Scope (R6+)
- Widgets
- Notification Center integration
- Full VoiceOver accessibility audit
- App icon / onboarding
- App Store metadata
