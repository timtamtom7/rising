# ZONES — R6: Advanced Features, Customization, Data

## Overview
R6 adds advanced customization, data export/import, and enhanced timezone database.

## New Functionality

### Z31: Custom City Support
- Add any timezone, not just from preset list
- Search by timezone identifier: "America/Indiana/Tell_City"
- Recent timezones list (last 10 used)
- Favorite timezones section
- "Search timezone" in add city sheet

### Z32: World Time Database Updates
- Bundled timezone database: tzdata 2024a
- Check for tzdata updates on launch
- Download updated tzdata from IANA
- Apply database updates without app update
- `TimezoneDatabaseService.updateIfNeeded()`

### Z33: Timezone Aliases
- Known timezone aliases (EST → America/New_York, PST → America/Los_Angeles)
- Search by common name variants
- "Pacific Time" → "America/Los_Angeles"
- Alias database in JSON

### Z34: Data Export/Import
- Export all data as JSON
- Export includes: cities, settings, alarms, events
- Import from JSON backup
- Import from CSV (cities only)
- Auto-backup to `~/Library/Application Support/ZONES/backups/`
- Last 10 backups retained

### Z35: Calendar Integration
- Add timezone event to Calendar app
- Create calendar event from meeting planner result
- "Add to Calendar" button
- Uses `EventKit` to create event
- Pre-fill event with meeting details and all timezone times

### Z36: Sunrise/Sunset Times
- Calculate sunrise and sunset for each city
- Display below city time in popover
- Based on coordinates and date
- "Sunrise 6:45 AM, Sunset 7:23 PM"
- Toggle in Settings

### Z37: Moon Phase Display
- Current moon phase for each city
- Phase icon: 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘
- Based on date and city longitude
- `MoonPhaseService.calculate(for:date:)`

### Z38: Home City vs Travel City
- Mark one city as "Home"
- All other cities considered "Travel"
- Home city always shown at top
- Travel cities show time difference from home
- "NYC +3h" notation

### Z39: Timezone Abbreviation Customization
- Some zones have ambiguous abbreviations (IST = India/Ireland/Israel)
- Option to show full timezone name instead: "India Standard Time"
- Configurable in Settings per city

### Z40: Batch Operations
- Select multiple cities
- Batch actions: delete, reorder, change format, set label color
- Multi-select via ⌘-click or shift-click

## File Structure Additions
```
ZONES/
├── Services/
│   ├── TimezoneDatabaseService.swift
│   ├── SunriseSunsetService.swift
│   ├── MoonPhaseService.swift
│   ├── CalendarIntegrationService.swift
│   ├── BackupService.swift
│   └── CSVImportService.swift
├── Views/
│   ├── TimezoneSearchView.swift
│   ├── SunriseSunsetView.swift
│   ├── ExportImportView.swift
│   ├── CalendarEventSheet.swift
│   └── BatchOperationsView.swift
├── ViewModels/
│   └── SettingsViewModel.swift
└── Resources/
    └── timezone-aliases.json
```

## Sunrise/Sunset Calculation
```swift
func calculateSunriseSunset(latitude: Double, longitude: Double, date: Date, timezone: TimeZone) -> (sunrise: Date, sunset: Date) {
    let dayOfYear = Calendar.current.ordinality(of: .day, in: .year, for: date) ?? 1
    let zenith = 90.833  // official sunrise/sunset
    let declination = 23.45 * sin(Double(360 * (284 + dayOfYear) / 365))
    let latRad = latitude * .pi / 180
    let declRad = declination * .pi / 180
    
    // cos(hourAngle) = (cos(zenith) / cos(lat) * cos(decl)) - tan(lat) * tan(decl)
    // ... full calculation returning sunrise/sunset in UTC, then convert to timezone
}
```

## Success Criteria
- [ ] Can search by timezone identifier
- [ ] Timezone database can be updated
- [ ] Aliases resolve to correct timezone
- [ ] Export produces valid JSON
- [ ] Import restores data correctly
- [ ] Calendar events are created properly
- [ ] Sunrise/sunset times are accurate
- [ ] Moon phase matches actual phase
- [ ] Home city shows difference from travel cities
- [ ] Batch delete/reorder works
