# Sash R6 — Widgets & Notification Center

**Tagline:** Your workspace, at a glance.

---

## Concept

R6 brings Sash into the macOS Notification Center and Home Screen (on supported Macs with widgets). Layout switching without switching apps — just glance at your desktop or use Today View.

---

## R6 Scope

**In scope:**
- macOS widgets (widget extension) for Dashboard/Notification Center
- Layout switching via widget
- Notification on layout apply (brief confirmation)
- Notification Center widget showing current layout and quick-snap actions

**Out of scope:**
- VoiceOver/full accessibility (R7), App Store assets (R8)

---

## Widget Types

### 1. Small Widget: Current Layout

```
┌──────────────────┐
│  🔵 Sash         │
│                  │
│  Current:        │
│  📐 Code + Docs  │
│                  │
│  [3 windows]     │
└──────────────────┘
```

- Shows the currently active layout name
- Tap opens Sash app (no action from widget itself — it's informational)

### 2. Medium Widget: Layout Switcher

```
┌────────────────────────────────────────┐
│  🔵 Sash                   Quick Layout │
├────────────────────────────────────────┤
│  [Code + Docs] [Email + Browser]        │
│  [Music]      [Presentation]            │
│                                        │
│  Tap any layout to apply it            │
└────────────────────────────────────────┘
```

- 4 layout buttons in a 2×2 grid
- Tapping a layout applies it immediately (via App Group shared state)
- No need to open Sash

### 3. Small Widget: Quick Snap

```
┌──────────────────┐
│  🔵 Sash         │
│                  │
│  [←] [→] [↑] [↓] │
│  [◉] [⤡]        │
│                  │
│  Tap to snap     │
└──────────────────┘
```

- 6 mini snap position buttons
- Tap triggers that snap on the focused window

---

## Widget Implementation

**Widget Extension target:**
- Name: `SashWidgets`
- Bundle ID: `com.sash.app.widgets`
- Supported families: `.systemSmall`, `.systemMedium`

**App Group:**
- Group ID: `group.com.sash.shared`
- Used to share layout data between main app and widget extension
- Main app writes current layout to App Group `UserDefaults`
- Widget reads from App Group `UserDefaults`

**Widget configuration:**
- Static (no configuration needed — layouts are fetched from shared container)
- Renders based on latest shared state

**Timeline:**
- `.never` refresh — widget reads current state on every render
- App pushes updates via `WidgetCenter.shared.reloadAllTimelines()` when layouts change

```swift
// Sash main app: notify widget of changes
import WidgetKit
WidgetCenter.shared.reloadAllTimelines()
```

**Widget views using WidgetKit:**
```swift
struct SashWidgetEntry: TimelineEntry {
    let date: Date
    let currentLayout: String?
    let layouts: [LayoutSummary]
    let recentLayouts: [String]  // 4 most recently used
}

struct SashWidget: Widget {
    let kind: String = "SashWidget"
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            SashWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Sash")
        .description("Quick layout switching and window snaps.")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}
```

---

## Notification Center Integration

### Layout Applied Notification

When a layout is applied (via widget, shortcut, or menu bar), show a brief notification:

```
┌──────────────────────────────────────┐
│  🔵 Sash                             │
│                                      │
│  Applied: Code + Docs                │
│  3 windows arranged                  │
│                                      │
│  [Undo]                              │
└──────────────────────────────────────┘
```

- Auto-dismisses after 3 seconds
- "Undo" action available for 10 seconds (matches undo state)
- Implementation: `UNUserNotificationCenter`

### Snap Confirmation Notification

Optional (user can disable in settings). When a snap shortcut fires:

```
┌─────────────┐
│ Sash         │
│ Left Half ✓  │
└─────────────┘
```

- Very brief (1.5s), non-intrusive
- Position name shown with checkmark
- Disabled by default, enable in Settings

---

## App Group Shared State

**Shared container:** `~/Library/Group Containers/group.com.sash.shared/`

**Shared UserDefaults keys:**
```swift
// Keys in UserDefaults(suiteName: "group.com.sash.shared")
"sash.currentLayoutId": String?          // UUID of active layout
"sash.currentLayoutName": String?        // display name
"sash.recentLayoutIds": [String]         // last 4 used
"sash.layouts": Data                    // JSON of all layouts (condensed version)
"sash.quickSnapEnabled": Bool           // default true
```

**Widget reads from shared container, main app writes to it.**

---

## Widget Extension Structure

```
Sash/
├── SashWidgets/                        (Widget Extension target)
│   ├── SashWidgets.swift
│   ├── SashWidgetsBundle.swift
│   ├── Provider.swift
│   ├── LayoutSwitcherView.swift
│   ├── CurrentLayoutView.swift
│   └── QuickSnapView.swift
├── Shared/
│   └── SharedLayoutStore.swift        (reads from App Group)
└── Sash/
    └── Sources/...
```

---

## Technical Approach

**WidgetKit (built-in, no external dependency)**

**App Group setup:**
- Entitlements must include `com.apple.security.application-groups`
- Add both main app and widget extension to the same App Group in Xcode

**Widget rendering:**
- `TimelineProvider` returns `Timeline<SashWidgetEntry>` with `.never` policy
- `SashWidgetEntryView` uses standard SwiftUI, adapting for `.systemSmall` vs `.systemMedium`

**Notification implementation:**
- `UserNotifications` framework (`UNUserNotificationCenter`)
- Request authorization on first layout apply
- Notification categories: `SASH_LAYOUT_APPLIED` with `.undo` action

**Widget Extension entitlements:**
```xml
<key>com.apple.security.application-groups</key>
<array>
    <string>group.com.sash.shared</string>
</array>
```

---

## Success Criteria

- [ ] Small widget shows current layout name
- [ ] Medium widget shows 4 layout buttons that trigger layout apply on tap
- [ ] Quick Snap widget buttons trigger correct snap actions
- [ ] Widget reflects layout changes immediately after main app updates
- [ ] Notification appears when layout is applied
- [ ] "Undo" action in notification restores previous window positions
- [ ] App Group correctly shared between main app and widget extension
- [ ] Widget works in Notification Center (swipe from right edge)
