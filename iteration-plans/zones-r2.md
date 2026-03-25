# ZONES — R2: Formats, DST, Advanced Display

## Overview
R2 adds analog/digital clock formats, enhanced DST handling with visual indicators, and customizable display options.

## New Functionality

### Z7: Analog Clock Display
- Toggle view mode per city: digital or analog
- Analog clock uses `SwiftUI Canvas` or `CAShapeLayer`
- Clock face: 12-hour dial with hour/minute/second hands
- Hand colors: configurable (default: dark on light)
- Smooth second-hand sweep (no tick)
- Optional: show timezone ring around analog clock
- Analog clock size: compact (50pt) or large (80pt)
- Preference per city: remember format choice

### Z8: Digital Clock Customization
- Multiple digital format presets:
  - `HH:mm` — 24-hour (14:05)
  - `h:mm a` — 12-hour with AM/PM (2:05 PM)
  - `HH:mm:ss` — with seconds (14:05:32)
  - `HH:mm z` — with timezone (14:05 PDT)
  - `HH:mm Z` — full timezone name (14:05 GMT-7)
- Custom format string support
- Font: System, Monospaced, Rounded
- Color: Auto (follows system), Light, Dark

### Z9: DST Handling
- DST detection per timezone: `timeZone.isDaylightSavingTime(for: Date())`
- Visual indicator for DST-active zones:
  - ☀️ Sun icon next to timezone name
  - "(DST)" label
  - Different color highlight
- DST transition countdown: "DST ends in X days" when applicable
- Next DST transition date per zone: `timeZone.nextDaylightSavingTimeTransition(after:)`
- DST history info on hover/inspector
- Settings: show/hide DST indicators

### Z10: Per-City Settings
- Double-click city → city detail popover:
  - City name (editable nickname)
  - Time format (analog/digital/custom)
  - Notification alarm (see R3)
  - Color label (8 colors)
  - Hide from menu bar (show only in main window)
- `CitySettings` stored per city in SQLite

### Z11: Theme Support
- Follow system appearance (Light/Dark/System)
- Light theme: white background, dark text
- Dark theme: dark background, light text
- Accent color: system accent or custom
- Compact mode: reduce row height, smaller fonts
- High contrast mode

### Z12: World Time Map (Mini)
- Optional mini world map in popover showing:
  - Dot for each added city
  - Day/night terminator line
- `WorldMapMiniView` using `MapKit` or custom `Canvas`
- Click map dot to highlight city
- Toggle map in Settings

## View Toggle UI
```
┌────────────────────────────────────────────────────┐
│  🌍 ZONES                    [⚙ Settings]  [✕]    │
├────────────────────────────────────────────────────┤
│  [🔍 Search cities...]                             │
│  View: [●Digital] [○Analog] [○Both]                │
├────────────────────────────────────────────────────┤
│  🟢 Los Angeles     9:05:32 AM PDT    ☀️          │
│     [analog clock]                                 │
│  ─────────────────────────────────────────────    │
│  🔵 New York         12:05:32 PM EDT    ☀️         │
│     12 : 05 : 32 PM                               │
│  ─────────────────────────────────────────────    │
│  🟡 London           5:05:32 PM GMT     (DST)     │
│     [analog clock]                                 │
│  ─────────────────────────────────────────────    │
│  🔴 Tokyo            1:05:32 AM JST               │
│     01 : 05 : 32                                  │
└────────────────────────────────────────────────────┘
```

## File Structure Additions
```
ZONES/
├── Models/
│   ├── CitySettings.swift
│   └── ClockFormat.swift
├── Views/
│   ├── ZoneRowView.swift
│   ├── AnalogClockView.swift
│   ├── DigitalClockView.swift
│   ├── CityDetailPopover.swift
│   ├── WorldMapMiniView.swift
│   └── ClockFaceCanvas.swift
├── ViewModels/
│   └── ClockDisplayViewModel.swift
└── Services/
    ├── DSTService.swift
    └── ClockFormatService.swift
```

## Clock Format Options
```swift
enum ClockDisplayMode: String, CaseIterable {
    case digital
    case analog
    case both
}

struct ClockFormat: Codable {
    var displayMode: ClockDisplayMode
    var digitalFormat: String        // "HH:mm:ss a"
    var use24Hour: Bool
    var showSeconds: Bool
    var showTimezoneAbbreviation: Bool
    var fontStyle: FontStyle
    
    enum FontStyle: String, Codable {
        case system
        case monospaced
        case rounded
    }
}
```

## Success Criteria
- [ ] Analog clock renders with correct hands
- [ ] Second hand sweeps smoothly
- [ ] Digital formats show correct times
- [ ] DST indicator shows for DST-active zones
- [ ] DST transition countdown is accurate
- [ ] Per-city settings persist
- [ ] Theme follows system setting
- [ ] World map shows city locations
- [ ] Compact mode reduces visual size
- [ ] All format combinations work correctly
