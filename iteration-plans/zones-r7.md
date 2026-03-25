# ZONES — R7: Complications, AQI, Advanced Widgets

## Overview
R7 adds watch face complications (for ZONES iOS/macOS widgets), air quality index integration, and advanced widget types.

## New Functionality

### Z41: Watch Face Complications (iOS Widgets)
- For future ZONES iOS companion app
- Circular complication: shows time in one zone
- Rectangular complication: time + city name
- Corner complications: simple time
- Family sharing ready

### Z42: Air Quality Index (AQI)
- Show AQI for each city (optional)
- Data from `aqicn.org` API (free tier, no key required)
- AQI values: Good (0-50 green), Moderate (51-100 yellow), Unhealthy (101+ orange/red)
- Display as colored badge: 🟢 42
- Cached for 30 minutes
- `AQIService.fetchAQI(for:city:)`
- Toggle in Settings: Show AQI

### Z43: Advanced Widget Types
- **World Map Widget:** Small map with city dots
- **Timeline Widget:** Shows timezone progression through a day
- **Meeting Widget:** Shows best meeting times for saved groups
- **Clock Face Widget:** Analog clock face with configurable zone
- **Quick Convert Widget:** Input field to convert times

### Z44: Widget Stacking (macOS)
- Stack multiple ZONES widgets
- Automatic cycle through zones
- Cycle interval: configurable (30s, 1m, 5m)
- Auto-advance toggle

### Z45: Live Activities (iOS 16.1+ / macOS 13+)
- Live Activity showing current time for a zone
- Updates every minute
- Shown on Lock Screen / Dynamic Island
- Start Live Activity from Menu Bar Extra

### Z46: Siri Shortcuts Suggestions
- "What's the time in Tokyo?" → suggest ZONES shortcut
- "Add alarm for Tokyo 9 AM" → suggest ZONES action
- Siri donation on use

### Z47: Notification Improvements
- Alarm snooze option: 5m, 10m, 15m, 30m
- Notification sound options
- Do Not Disturb aware
- Critical alerts for important events

## File Structure Additions
```
ZONES/
├── Services/
│   ├── AQIService.swift
│   └── LiveActivityService.swift
├── Views/
│   ├── AQIBadgeView.swift
│   └── WidgetGalleryView.swift
└── Widgets/
    ├── WorldMapWidget.swift
    ├── TimelineWidget.swift
    ├── MeetingWidget.swift
    ├── ClockFaceWidget.swift
    └── QuickConvertWidget.swift
```

## Success Criteria
- [ ] AQI shows for cities with data
- [ ] AQI color matches value range
- [ ] Widget stack cycles automatically
- [ ] Live Activity starts and shows time
- [ ] Siri suggestions appear
- [ ] Notification snooze works
- [ ] Widgets are configurable
