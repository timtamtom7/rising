# ZONES — R4: World Map, Day/Night, Menu Bar Extra

## Overview
R4 adds an interactive world map with day/night visualization, a proper Menu Bar Extra, and enhanced visual presentation.

## New Functionality

### Z18: Interactive World Map
- Full world map view in main window / popover
- City markers at correct geographic coordinates
- Click marker to see city time
- Pan and zoom supported
- `MKMapView` or custom `Canvas` rendering
- City coordinates in city database
- Day/night terminator line on map
- `WorldMapView`:
  ```
  ┌────────────────────────────────────────────────────┐
  │                                                    │
  │         [Interactive World Map]                   │
  │                                                    │
  │    ● Los Angeles    ● New York                    │
  │                                                    │
  │                      ● London                      │
  │                                                    │
  │                                       ● Tokyo      │
  │                                                    │
  │    ═══════════ day/night terminator ═══════════   │
  │    (light = day, dark = night)                    │
  │                                                    │
  └────────────────────────────────────────────────────┘
  ```

### Z19: Day/Night Visualization
- Calculate sun position based on coordinates and date
- `SunPositionCalculator` using solar declination algorithm
- Animated day/night transition (smooth 30-minute fade)
- Current day/night state per city
- "Is it daytime in Tokyo?" quick answer
- Map updates every minute
- Option: show city as sun/moon icon based on local time

### Z20: Enhanced Menu Bar Extra
- Replace basic status item with full Menu Bar Extra
- `NSStatusItem` with custom view
- Left-click: popover with full interface
- Right-click: quick menu
- Popover redesign:
  ```
  ┌──────────────────────────────────────┐
  │ 🌍 ZONES                 ⚙️    ✕    │
  ├──────────────────────────────────────┤
  │                                      │
  │  Los Angeles        9:05 AM PDT ☀️  │
  │  [analog mini]                     │
  │                                      │
  │  New York          12:05 PM EDT ☀️  │
  │  12:05:32 PM                       │
  │                                      │
  │  London            5:05 PM GMT (DST)│
  │  [analog mini]                     │
  │                                      │
  │  Tokyo             1:05 AM JST 🌙   │
  │  01:05:32                         │
  │                                      │
  ├──────────────────────────────────────┤
  │  [🌐 World Map] [📅 Meeting]        │
  ├──────────────────────────────────────┤
  │  [+ Add City]    [Open ZONES ⌘↩]   │
  └──────────────────────────────────────┘
  ```
- Live clock update every second
- Launch at login option

### Z21: City Weather Integration (Simple)
- Show weather icon for each city (optional, via wttr.in)
- Simple weather: ☀️ ⛅ ☁️ 🌧️ ⛈️ ❄️
- Fetched on app launch, cached 30 minutes
- No API key required (using wttr.in)
- Toggle in Settings: Show weather
- `WeatherService.fetchWeather(for:city:)`

### Z22: Upcoming DST Transitions
- Settings view showing all cities with upcoming DST changes
- "Next DST change" per city with countdown
- Global DST calendar view
- DST transition dates:
  - US: Second Sunday March / First Sunday November
  - EU: Last Sunday March / Last Sunday October
  - etc.

### Z23: Quick Actions Menu
- Right-click menu on status item:
  ```
  Quick Actions
  ─────────────
  What time is it in...  ▶
  Add City...
  ─────────────
  Open ZONES
  Settings...
  ─────────────
  Quit ZONES
  ```
- Submenu: list of added cities for quick time check

## File Structure Additions
```
ZONES/
├── Services/
│   ├── SunPositionService.swift
│   ├── WorldMapRenderer.swift
│   ├── WeatherService.swift
│   └── DSTCalendarService.swift
├── Views/
│   ├── WorldMapView.swift
│   ├── CityMarkerView.swift
│   ├── DayNightTerminatorView.swift
│   ├── MenuBarPopoverView.swift
│   ├── WeatherBadgeView.swift
│   └── DSTCalendarView.swift
├── ViewModels/
│   └── WorldMapViewModel.swift
└── MenuBar/
    ├── MenuBarController.swift
    ├── QuickActionsMenu.swift
    └── StatusItemView.swift
```

## Sun Position Algorithm
```swift
struct SunPosition {
    var azimuth: Double      // degrees from north
    var elevation: Double   // degrees above horizon
}

func calculateSunPosition(latitude: Double, longitude: Double, date: Date) -> SunPosition {
    let dayOfYear = Calendar.current.ordinality(of: .day, in: .year, for: date) ?? 1
    let declination = 23.45 * sin(Double(360 * (284 + dayOfYear) / 365))
    let hourAngle = (15 * (hourOfDay - 12))
    // ... full calculation
    return SunPosition(azimuth: azimuth, elevation: elevation)
}
```

## Success Criteria
- [ ] World map shows all added cities at correct coordinates
- [ ] Map is pannable and zoomable
- [ ] Day/night terminator is accurate
- [ ] Day/night animation transitions smoothly
- [ ] Menu bar popover shows analog and digital times
- [ ] Weather icons display correctly
- [ ] DST transitions show countdown
- [ ] Right-click menu shows quick actions
- [ ] Launch at login works
- [ ] Weather updates without API key
