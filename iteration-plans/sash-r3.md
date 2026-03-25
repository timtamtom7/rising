# Sash R3 — Layouts, Spaces Binding, App Launching

**Tagline:** Your workspace, one keystroke away.

---

## Concept

R3 introduces layouts — saved sets of window positions that you can recall instantly. Bind a layout to a Space, launch apps with a specific layout, and control margins with precision. Sash graduates from a snap tool to a workspace automation tool.

---

## R3 Scope

**In scope:**
- Named window layouts (save/restore sets of window positions)
- Bind layouts to macOS Spaces/Desktops
- Launch apps with a specific layout applied on open
- Margin/padding control for snap positions

**Out of scope:**
- iCloud sync (R5), Shortcuts integration (R5), widgets (R6)

---

## App Structure

### Menu Bar Popover R3

```
┌──────────────────────────────────────┐
│  Sash                    [⌘ , ] [⏻] │
├──────────────────────────────────────┤
│  [Snap] [Layouts] [Settings]         │  ← tab bar
├──────────────────────────────────────┤
│  LAYOUTS                             │
│                                      │
│  ┌────────────────────────────────┐  │
│  │ 📐 Code + Docs                │  │
│  │    3 windows · Space 2        │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ 📧 Email + Browser            │  │
│  │    2 windows · All Spaces     │  │
│  └────────────────────────────────┘  │
│  ┌────────────────────────────────┐  │
│  │ 🎧 Music + Notes               │  │
│  │    2 windows · Space 4         │  │
│  └────────────────────────────────┘  │
│                                      │
│  [+ New Layout]                      │
│                                      │
│  ─────────────────────────────────   │
│  Active: Code + Docs  [▶ Apply]      │
└──────────────────────────────────────┘
```

### New/Edit Layout Sheet

```
┌──────────────────────────────────────────┐
│  New Layout                    [Cancel]   │
├──────────────────────────────────────────┤
│  Layout Name                             │
│  ┌────────────────────────────────────┐  │
│  │ Development Setup                  │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Bound to Space                          │
│  [Specific Space ▼]                     │
│  ○ All Spaces (global)                  │
│  ● Space: 2                             │
│                                          │
│  Apps to Launch with Layout              │
│  ┌──────────────────────────────────┐    │
│  │ + Add App...                     │    │
│  │ [X] Xcode          → Left Half  │    │
│  │ [X] Safari          → Right Half │    │
│  │ [ ] Terminal        → Custom    │    │
│  └──────────────────────────────────┘    │
│                                          │
│  ─── WINDOW POSITIONS ─────────────────  │
│  Add windows from current workspace:     │
│  ┌──────────────────────────────────┐    │
│  │ [✓] Xcode         1280×800 @ 0,0│    │
│  │ [✓] Safari        1440×900 @1280,0│  │
│  └──────────────────────────────────┘    │
│                                          │
│  [Delete Layout]            [Save Layout]│
└──────────────────────────────────────────┘
```

### Settings Tab

```
┌──────────────────────────────────────┐
│  SETTINGS                            │
│                                      │
│  SNAP MARGINS                        │
│  Screen Edge Margin                  │
│  [0] ━━━━━━━━● [40px]               │
│                                      │
│  Window Gap (between snapped windows)│
│  [0] ━━●━━━━━━━ [8px]                │
│                                      │
│  ─────────────────────────────────   │
│  GENERAL                             │
│  [✓] Launch Sash at Login            │
│  [✓] Show Sash icon in Dock          │
│  [ ] Launch focused app on layout    │
│                                      │
│  ─────────────────────────────────   │
│  ABOUT                               │
│  Sash v0.3.0                         │
│  [Check for Updates]                 │
└──────────────────────────────────────┘
```

---

## Layout Data Model

```swift
struct WindowSnapshot: Codable, Identifiable {
    let id: UUID
    var appBundleIdentifier: String?   // nil = any app
    var appName: String                 // display name
    var frame: CGRect                   // position on specific monitor
    var monitorIndex: Int               // which monitor
    var snapPosition: SnapPosition?     // reference position
    var windowTitlePattern: String?     // regex pattern to match window title (optional)
}

struct Layout: Codable, Identifiable {
    let id: UUID
    var name: String
    var windows: [WindowSnapshot]
    var boundSpace: Int?                // nil = all spaces, specific space number
    var appsToLaunch: [AppLaunchConfig]
    var createdAt: Date
    var updatedAt: Date
}

struct AppLaunchConfig: Codable {
    var bundleIdentifier: String
    var appName: String
    var snapPosition: SnapPosition?
    var customZoneId: UUID?
}
```

**Storage:** SQLite via `~/Library/Application Support/Sash/sash.db` (R3 begins using SQLite; migration from UserDefaults for zones happens on first launch).

---

## Spaces/Desktop Binding

macOS Spaces are tracked via the `CGSSpace` API (`#import <CoreGraphics/CoreGraphics.h>`):
```swift
// Get current space for a screen
let runningSpaces = CGSSpaceCopyAllAssociatedSpacesIDs(displayID, spaceType)
let currentSpace = CGSSpaceGetCurrentSpace(displayID)
```

- Layouts can be bound to a specific space number or marked `allSpaces`
- When user switches to a bound space, Sash can optionally auto-apply the layout (toggle in settings)
- `CGSSpace` notification observer: `CGSNotifyRegisterForSpaceChange`

**Auto-apply behavior:**
- When user navigates to a bound space, show a notification: "Apply layout 'Code + Docs'? [Apply] [Skip]"
- Or: auto-apply silently (configurable)
- If apps in the layout aren't running, launch them

---

## App Launching with Layout

When applying a layout:
1. For each `AppLaunchConfig` where `snapPosition` is set, launch the app if not already running
2. Wait for app to open a window (poll `NSWorkspace.shared.runningApplications` or `kAXWindowsAttribute` for ~2 seconds)
3. Snap the new window to the specified position
4. Apply all `WindowSnapshot` positions

**Bundle ID resolution:**
```swift
let workspace = NSWorkspace.shared
let appURL = workspace.urlForApplication(withBundleIdentifier: bundleId)
workspace.openApplication(at: appURL, configuration: ...)
```

---

## Margin/Padding Control

New settings:
- `screenEdgeMargin: CGFloat` (0–40px, default 0): applied to `visibleFrame` before calculating snap zones
- `windowGap: CGFloat` (0–40px, default 0): when two windows are snapped to halves, gap between them

**Snap frame calculation (R3):**
```swift
let adjustedFrame = screen.visibleFrame.insetBy(dx: margin, dy: margin)
// For left half:
CGRect(
    x: adjustedFrame.origin.x,
    y: adjustedFrame.origin.y,
    width: (adjustedFrame.width - windowGap) / 2,
    height: adjustedFrame.height
)
// For right half:
CGRect(
    x: adjustedFrame.midX + windowGap / 2,
    y: adjustedFrame.origin.y,
    width: (adjustedFrame.width - windowGap) / 2,
    height: adjustedFrame.height
)
```

---

## Layout Persistence

Migrate from `UserDefaults` to SQLite at R3:
- `~/Library/Application Support/Sash/sash.db`
- Tables: `layouts`, `custom_zones`, `settings`
- Use `SQLite.swift` library

**Migration on first R3 launch:**
1. Read `sash.customZones` from `UserDefaults`
2. Create `custom_zones` table
3. Insert existing zones
4. Clear old `UserDefaults.customZones` key (or leave for rollback)

---

## Technical Approach

**New dependencies:**
- `SQLite.swift` (SPM)

**New modules:**
- `LayoutManager`: CRUD operations for layouts, space binding logic
- `SpaceTracker`: monitors space changes via `CGSSpace` API
- `AppLauncher`: handles launching apps with layout application

**Directory Structure Changes:**
```
Sash/
├── Sources/
│   ├── App/
│   │   └── AppDelegate.swift
│   ├── WindowManager/
│   │   ├── WindowManager.swift
│   │   ├── WindowCycler.swift
│   │   └── EdgeDragMonitor.swift
│   ├── Layouts/
│   │   ├── LayoutManager.swift       (new)
│   │   ├── SpaceTracker.swift        (new)
│   │   ├── AppLauncher.swift         (new)
│   │   └── LayoutStore.swift         (new, ObservableObject)
│   ├── UI/
│   │   ├── SashPopoverView.swift      (R3: tab bar)
│   │   ├── SnapPositionRow.swift
│   │   ├── CustomZoneListView.swift
│   │   ├── CustomZoneEditorView.swift
│   │   ├── LayoutListView.swift       (new)
│   │   ├── LayoutEditorView.swift     (new)
│   │   ├── WindowSnapshotRow.swift    (new)
│   │   ├── SettingsView.swift         (R3: margins)
│   │   └── StatusLineView.swift
│   └── Models/
│       ├── SnapPosition.swift
│       ├── CustomZone.swift
│       ├── Layout.swift               (new)
│       ├── WindowSnapshot.swift       (new)
│       └── AppLaunchConfig.swift      (new)
├── Database/
│   └── DatabaseManager.swift          (new)
└── Resources/
```

**CoreGraphics Space API:**
```swift
// Getting space info requires bridging to CoreGraphics
// Use a small C helper or @_silgen_name if needed
// Space notifications: CGSNotifyRegisterForSpaceChange
```

---

## Success Criteria

- [ ] Layouts can be created with a name and set of window positions
- [ ] Layouts persist in SQLite
- [ ] Applying a layout snaps all windows to their saved positions
- [ ] Layouts can be bound to a specific Space
- [ ] Switching to a bound Space shows apply notification
- [ ] Apps in `appsToLaunch` launch and get snapped when layout is applied
- [ ] Screen edge margin setting is applied to all snap calculations
- [ ] Window gap setting creates visible gap between snapped halves
- [ ] Settings persist across app restarts
- [ ] Migration from UserDefaults to SQLite works on first launch
