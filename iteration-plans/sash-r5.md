# Sash R5 — iCloud Sync, Shortcuts, Global Hotkeys, Window Opacity

**Tagline:** Your workspace, everywhere and always.

---

## Concept

R5 bridges Sash to the cloud and the system. iCloud sync means your layouts follow you across Macs. Shortcuts integration brings Sash into the automation mainstream. Global hotkeys work even when Sash isn't the frontmost app (they already should in R1, but R5 refines and documents the behavior). Window opacity adds a visual dimension Sash hasn't touched yet.

---

## R5 Scope

**In scope:**
- iCloud sync of layouts, zones, and settings via CloudKit/NSUbiquitousKeyValueStore
- Shortcuts integration (Shortcuts app actions)
- Global hotkey refinement (document behavior, edge cases)
- Window opacity control (make windows semi-transparent)

**Out of scope:**
- Widgets (R6), VoiceOver accessibility (R7)

---

## iCloud Sync

### Strategy

Use `NSUbiquitousKeyValueStore` (simple key-value, no CloudKit complexity) for:
- Layouts JSON
- Custom zones JSON
- User preferences (margins, gaps, dock icon preference)

**Why not CloudKit container?** Layouts are human-readable JSON, under the 1MB `NSUbiquitousKeyValueStore` limit. Simpler to implement and sufficient.

**Sync behavior:**
- On app launch: pull from iCloud if newer (`NSUbiquitousKeyValueStore.didChangeExternallyNotification`)
- On every save: push to iCloud
- Conflict resolution: last-write-wins (timestamp comparison)
- iCloud data is end-to-end encrypted via iCloud's existing encryption; no additional encryption layer needed

**Data stored in iCloud:**
```swift
// Key: "sash.layouts"
// Value: JSON of [Layout]
NSUbiquitousKeyValueStore.default.set(layoutsData, forKey: "sash.layouts")

// Key: "sash.zones"
// Value: JSON of [CustomZone]
NSUbiquitousKeyValueStore.default.set(zonesData, forKey: "sash.zones")

// Key: "sash.preferences"
// Value: JSON of Preferences struct
NSUbiquitousKeyValueStore.default.set(prefsData, forKey: "sash.preferences")
```

### Sync UI

In Settings tab:
```
┌──────────────────────────────────────┐
│  iCLOUD SYNC                         │
│                                      │
│  [✓] Sync layouts via iCloud         │
│                                      │
│  Last synced: 2 minutes ago         │
│  [Sync Now]                          │
│                                      │
│  ⚠ This Mac only · 3 layouts        │
│                                      │
│  Note: Enable iCloud on all Macs     │
│  to keep layouts in sync.            │
└──────────────────────────────────────┘
```

### Multi-Mac Considerations

- Each Mac has its own `NSScreen` configuration — monitor frames differ
- Layouts store `monitorIndex` — on a different Mac, map `monitorIndex` to the corresponding display by matching resolution/order
- If target monitor doesn't exist on the current Mac, fall back to `NSScreen.main`
- Display a notification if layout is applied with fallback: "Layout applied to main display (Monitor 2 not connected)"

---

## Shortcuts Integration

Sash registers shortcuts with the Shortcuts app via `NSUserActivity` and `Intents` framework.

**Shortcuts actions:**

```
┌─────────────────────────────────────┐
│  Sash Actions                       │
│                                     │
│  Apply Layout                       │
│  ┌─────────────────────────────┐   │
│  │ Layout: [Code + Docs     ▼]  │   │
│  └─────────────────────────────┘   │
│                                     │
│  Snap Window                        │
│  ┌─────────────────────────────┐   │
│  │ Position: [Left Half    ▼]  │   │
│  └─────────────────────────────┘   │
│                                     │
│  Cycle Windows                      │
│                                     │
│  Undo Last Snap                     │
└─────────────────────────────────────┘
```

**Implementation:**
- Define `SashIntents.intentdefinition` bundle
- Implement `ApplyLayoutIntent` and `SnapWindowIntent` using `AppIntents` framework (macOS 13+)
- App must be running for Shortcuts to invoke (no background URL scheme needed)

**App Intents (modern approach, macOS 14+):**
```swift
import AppIntents

struct ApplyLayoutAppIntent: AppIntent {
    static var title: LocalizedStringResource = "Apply Sash Layout"
    static var description = IntentDescription("Apply a saved Sash window layout")

    @Parameter(title: "Layout")
    var layoutName: String

    func perform() async throws -> some IntentResult {
        LayoutManager.shared.applyLayout(named: layoutName)
        return .result()
    }
}
```

---

## Global Hotkeys Refinement

Global hotkeys (registered via `NSEvent.addGlobalMonitorForEvents`) should already work when Sash is not focused — the OS delivers events to all apps regardless of frontmost status.

R5 documents and refines edge cases:

**Known edge cases:**
1. **Secure Input mode:** When a password field is focused, macOS enables Secure Input globally and blocks `CGEvent` taps. Show a notification: "Shortcuts unavailable while Secure Input is active."
2. **Full-screen apps:** Some full-screen apps capture all events. Sash shortcuts won't work in true full-screen (not Sash's fault, system behavior).
3. **Accessibility permissions:** Already handled in R1 — R5 adds a "Test Hotkeys" button in Settings to verify all shortcuts fire.

**Test Hotkeys panel:**
```
┌──────────────────────────────────────┐
│  HOTKEY TEST                         │
│                                      │
│  Press each shortcut to verify it   │
│  registers correctly.                │
│                                      │
│  ⌘⌥←  [waiting...]   ✓ received    │
│  ⌘⌥→  [waiting...]   ✓ received    │
│  ⌘⌥↑  [waiting...]   ✓ received    │
│  ⌘⌥↓  [waiting...]   ✓ received    │
│  ⌘⌥F  [waiting...]   ✓ received    │
│  ⌘⌥C  [waiting...]   ✓ received    │
│  ⌘\   [waiting...]   ✓ received    │
│  ⌘⌥Z  [waiting...]   ✓ received    │
│                                      │
│  [Close]                             │
└──────────────────────────────────────┘
```

---

## Window Opacity Control

Ability to set a window's opacity (alpha) — useful for always-on-top reference windows.

**New shortcut set:**

| Action | Shortcut |
|--------|----------|
| Opacity +10% | `⌘⌥=` |
| Opacity -10% | `⌘⌥-` |
| Opacity 50% | `⌘⌥5` |
| Opacity 100% (opaque) | `⌘⌥0` |

**Implementation:**
- macOS doesn't natively support per-window opacity via AXUIElement
- Use `NSWindow.setAlphaValue()` via `AXUIElement`... but AXUIElement doesn't expose alpha
- Alternative: use `CGWindow` level manipulation is limited
- **Best approach:** Use `NSWindow` API by getting the `NSWindow` reference from the app's windows
  ```swift
  // Get NSWindow from AXUIElement
  var nsWindowRef: CFTypeRef?
  AXUIElementCopyAttributeValue(window, kAXParentAttribute as CFString, &nsWindowRef)
  // Then set alpha
  (nsWindowRef as? NSWindow)?.alphaValue = 0.5
  ```
- Not all apps use `NSWindow` (Electron, Qt apps may have their own window hierarchy) — for those, opacity is silently ignored

**Opacity persists per-window per-session (not saved to layout — too fragile across app restarts).**

---

## Technical Approach

**New dependencies:** None (uses built-in `NSUbiquitousKeyValueStore`, `AppIntents`)

**Directory Structure Changes:**
```
Sash/
├── Sources/
│   ├── Automation/
│   │   ├── AppleScriptHandler.swift
│   │   └── SashShortcuts.swift        (new: AppIntents)
│   ├── Cloud/
│   │   └── iCloudSyncManager.swift   (new)
│   ├── WindowManager/
│   │   ├── WindowManager.swift
│   │   ├── WindowCycler.swift
│   │   ├── EdgeDragMonitor.swift
│   │   ├── CornerSnap.swift
│   │   └── WindowOpacity.swift       (new)
│   ├── Layouts/
│   │   └── LayoutManager.swift       (R5: add sync)
│   └── UI/
│       ├── SettingsView.swift         (R5: add sync panel, hotkey test)
│       ├── HotkeyTestPanel.swift      (new)
│       └── OpacityIndicator.swift     (new)
```

---

## Success Criteria

- [ ] Layouts sync to iCloud and appear on second Mac
- [ ] Sync conflict (simulated) resolves with last-write-wins
- [ ] Sync status shown in settings ("Last synced: X ago")
- [ ] Shortcuts app shows Sash actions: Apply Layout, Snap Window, Cycle Windows
- [ ] Running a Sash Shortcut action works from Shortcuts app
- [ ] Hotkey test panel correctly detects all registered shortcuts
- [ ] Window opacity changes via shortcuts (`⌘⌥=`, `⌘⌥-`, `⌘⌥5`, `⌘⌥0`)
- [ ] Opacity shown briefly in status line when adjusted
- [ ] Works on all apps that use NSWindow (Xcode, Safari, etc.)
