# ZONES — R1: World Clock Foundation

## Overview
ZONES is a native macOS world clock app. R1 establishes the city management, menu bar time display, and a popover showing all time zones.

## Reference Architecture
- **Project:** `/Users/mauriello/Projects/chronicle` (Chronicle)
- **Pattern:** SwiftUI views hosted in `NSHostingController`, AppKit for menu bar, system tray
- **Persistence:** SQLite.swift for city/timezone data, UserDefaults for preferences
- **Timezone:** `TimeZone` (Foundation), `DateFormatter`, `Locale`

## App Lifecycle
```
main.swift → AppDelegate → NSApplication.shared
  └─ ZONESApp (SwiftUI)
       └─ ContentView (NSHostingController.rootView)
```

### Window Hierarchy
- **Menu Bar Status Item:** `NSStatusItem` with clock icon (configurable)
  - Shows current local time (or configurable timezone)
  - Click → popover with all zones
- **Popover (main interface):**
  ```
  ┌─────────────────────────────────┐
  │ 🌍 ZONES              ⚙️  ✕     │
  ├─────────────────────────────────┤
  │  [🔍 Search cities...]          │
  ├─────────────────────────────────┤
  │  ● Your Time (Local)            │
  │    Los Angeles     9:05 AM PDT │
  ├─────────────────────────────────┤
  │  ○ New York         12:05 PM   │
  │  ○ London           5:05 PM GMT│
  │  ○ Tokyo            1:05 AM JST│
  ├─────────────────────────────────┤
  │  [+ Add City]                   │
  └─────────────────────────────────┘
  ```
- **Main Window (optional):** Full zone list editor

## Functionality

### Z1: City Management
- Add cities from a searchable list
- `City` model:
  ```swift
  struct City: Identifiable, Codable, Hashable {
      let id: UUID
      var name: String
      var country: String
      var timezoneIdentifier: String   // "America/Los_Angeles"
      var sortOrder: Int
      var isLocal: Bool
      var isFavorite: Bool
  }
  ```
- Default cities on first launch: New York, London, Tokyo
- City database: embedded JSON with ~400 major cities and their timezones
- Search by city name or country
- Duplicate timezone detection: warn if city with same timezone already added
- Remove city (swipe to delete or context menu)
- Reorder cities (drag and drop)

### Z2: Menu Bar Time Display
- `NSStatusItem` showing time in menu bar
- Default: shows local time in short format (9:05 AM)
- Click opens popover
- Menu bar icon options:
  - Clock icon (default)
  - First letter of local city (L)
  - Configurable: show local city abbreviation
- Icon updates every minute (timer)
- Configurable format: 12-hour / 24-hour

### Z3: Popover Zone List
- `NSPopover` with `NSPopover.Behavior.transient`
- Shows all added cities with current time
- Time updates every second
- Each row: city name, country flag emoji, current time, timezone abbreviation
- Local time at top (highlighted with bullet)
- Swipe left to remove a city
- "Add City" button at bottom
- Close on click outside (transient)

### Z4: Timezone Data
- Use `TimeZone.current` for local
- `TimeZone(identifier:)` for other zones
- `TimeZoneDisplayName` for abbreviation
- DST handling: automatic via system (`TimeZone`)
- `DateFormatter` with `timeZone` set per city

### Z5: Persistence (SQLite)
- Database file: `~/Library/Application Support/ZONES/zones.db`
- Tables:
  ```sql
  CREATE TABLE cities (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      country TEXT NOT NULL,
      timezone_id TEXT NOT NULL,
      sort_order INTEGER NOT NULL,
      is_local INTEGER NOT NULL DEFAULT 0,
      is_favorite INTEGER NOT NULL DEFAULT 0
  );
  
  CREATE TABLE settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
  );
  ```
- `SettingsStore` for key-value preferences
- Sync settings to iCloud (R5)

### Z6: AppKit Integration
- Standard macOS menus:
  - File: Add City (⌘N), Close (⌘W)
  - Edit: Copy Time (⌘C)
  - View: Refresh (⌘R), Settings (⌘,)
  - Help: ZONES Help
- Launch at login option (via `SMAppService`)
- `NSUserNotificationCenter` for future notification features

## City Database Format
```json
[
  {
    "name": "Los Angeles",
    "country": "United States",
    "timezone": "America/Los_Angeles",
    "countryCode": "US"
  },
  {
    "name": "New York",
    "country": "United States",
    "timezone": "America/New_York",
    "countryCode": "US"
  },
  ...
]
```

## File Structure
```
ZONES/
├── App/
│   ├── main.swift
│   ├── ZONESApp.swift
│   ├── AppDelegate.swift
│   └── AppState.swift
├── Models/
│   ├── City.swift
│   └── TimezoneData.swift
├── Views/
│   ├── ContentView.swift
│   ├── ZoneListView.swift
│   ├── ZoneRowView.swift
│   ├── AddCitySheet.swift
│   ├── CitySearchView.swift
│   └── CityRowView.swift
├── ViewModels/
│   ├── ZoneListViewModel.swift
│   └── CitySearchViewModel.swift
├── Services/
│   ├── DatabaseManager.swift
│   ├── CityStore.swift
│   ├── TimeFormatterService.swift
│   └── CityDataLoader.swift
├── MenuBar/
│   ├── MenuBarController.swift
│   └── MenuBarPopoverView.swift
└── Resources/
    ├── Assets.xcassets
    └── cities.json
```

## Keyboard Shortcuts
| Shortcut | Action |
|---|---|
| ⌘N | Add City |
| ⌘C | Copy selected time |
| ⌘R | Refresh times |
| ⌘, | Open Settings |
| Space | Open/close popover |
| Esc | Close popover |

## Success Criteria
- [ ] Can add cities from searchable list
- [ ] Cities persist across app restarts
- [ ] Menu bar shows current local time
- [ ] Popover shows all cities with correct times
- [ ] Time updates every second in popover
- [ ] Can remove cities
- [ ] Can reorder cities via drag-and-drop
- [ ] Search filters city list correctly
- [ ] DST transitions handled automatically
- [ ] App launches at login when enabled
- [ ] Standard menus are functional
