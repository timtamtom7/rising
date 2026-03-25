# ZONES — R3: Meeting Planner, Compare Zones, Advanced Features

## Overview
R3 adds a meeting planner (find overlapping available times), zone comparison view, and advanced scheduling features.

## New Functionality

### Z13: Meeting Planner
- Input: meeting duration, required attendees (zones)
- Output: suggested time slots that are within working hours (9am-6pm) for all participants
- `MeetingPlannerView` sheet:
  ```
  ┌─ Plan a Meeting ────────────────────────────────────┐
  │                                                   │
  │  Duration: [1 hour        ▾]                      │
  │                                                   │
  │  Participants:                                    │
  │  ┌─────────────────────────────────────────────┐  │
  │  │ Los Angeles       [×]                       │  │
  │  │ New York          [×]                       │  │
  │  │ London            [×]                       │  │
  │  └─────────────────────────────────────────────┘  │
  │  [+ Add Timezone]                                 │
  │                                                   │
  │  Working Hours: [9:00 AM] to [6:00 PM]            │
  │                                                   │
  │  ─────────────────────────────────────────────    │
  │  Suggested Times for Today:                       │
  │                                                   │
  │  9:00 AM LA → 12:00 PM NY → 5:00 PM London       │
  │  ✓ All within working hours                       │
  │                                                   │
  │  10:00 AM LA → 1:00 PM NY → 6:00 PM London       │
  │  ⚠ London is 1 hour past working hours           │
  │                                                   │
  │  ─────────────────────────────────────────────    │
  │  Suggested Times for Tomorrow:                   │
  │  ...                                              │
  │                                                   │
  │            [ Cancel ]  [ Copy to Clipboard ]      │
  └───────────────────────────────────────────────────┘
  ```
- Copy meeting time as formatted text
- Highlight conflicting times (outside working hours)
- `MeetingPlannerService.calculateSlots(duration:participants:workingHours:)`

### Z14: Compare Zones View
- Side-by-side comparison of 2-4 zones
- Comparison shows:
  - Current time each zone
  - Time difference between zones
  - Date difference (if crossing midnight)
  - Working hours visualization bar
  - "Best time to call" indicator
- `CompareZonesView`:
  ```
  ┌─ Compare Zones ───────────────────────────────────┐
  │                                                   │
  │  Los Angeles    New York    London       Tokyo    │
  │  ──────────────────────────────────────────────  │
  │  9:05 AM        12:05 PM   5:05 PM     1:05 AM  │
  │  Mon Mar 25      Mon Mar 25  Mon Mar 25  Tue Mar 26│
  │  ──────────────────────────────────────────────  │
  │  PDT             EDT        GMT        JST       │
  │  ──────────────────────────────────────────────  │
  │  [░░░░░░░░░░░▓▓▓] [▓▓▓▓▓▓▓▓▓▓▓▓] [▓▓▓▓░░░░░░░░░] │
  │  ← working hours (9am-6pm local) →               │
  │                                                   │
  │  LA is 3h behind NY                              │
  │  LA is 8h behind London                          │
  │  Tokyo is next day (+9h from London)              │
  │                                                   │
  └───────────────────────────────────────────────────┘
  ```

### Z15: Quick Time Converter
- Input a time in one zone → show equivalent time in all other zones
- "What time is X in Y?" query
- Inline in popover or as separate tool
- `TimeConverterService.convert(time:inZone:toZones:)`

### Z16: Alarm / Event Notifications
- Set one-time or recurring alarm for a specific zone's time
- `EventNotification` model:
  ```swift
  struct EventNotification: Identifiable, Codable {
      let id: UUID
      var title: String
      var zoneId: UUID           // which city
      var triggerTime: Date      // in that zone's time
      var isRecurring: Bool
      var repeatInterval: RepeatInterval?
      var isEnabled: Bool
  }
  ```
- Uses `UNUserNotificationCenter`
- Notification shows city name + time + event title
- Click notification → opens ZONES to that city
- List of upcoming events in Settings

### Z17: Working Hours Overlay
- Per-city working hours configuration (default 9am-6pm)
- Visual bar showing if current time is within working hours
- Color coding: green (within), yellow (outside within 1hr), red (far outside)
- Meeting planner uses these hours automatically
- Auto-detect working hours from common patterns (future)

## File Structure Additions
```
ZONES/
├── Services/
│   ├── MeetingPlannerService.swift
│   ├── TimeConverterService.swift
│   ├── EventNotificationService.swift
│   └── WorkingHoursService.swift
├── Views/
│   ├── MeetingPlannerSheet.swift
│   ├── CompareZonesView.swift
│   ├── TimeConverterView.swift
│   ├── EventEditorSheet.swift
│   ├── EventListView.swift
│   └── WorkingHoursBarView.swift
├── ViewModels/
│   ├── MeetingPlannerViewModel.swift
│   └── CompareZonesViewModel.swift
└── Models/
    ├── MeetingSlot.swift
    ├── EventNotification.swift
    └── WorkingHours.swift
```

## Success Criteria
- [ ] Meeting planner suggests valid time slots
- [ ] Working hours respected in suggestions
- [ ] Time conflicts highlighted
- [ ] Compare view shows all zones correctly
- [ ] Time difference calculations are accurate
- [ ] Date difference shows correctly across midnight
- [ ] Quick converter works in popover
- [ ] Alarms fire at correct time
- [ ] Alarm notifications show city and event
- [ ] Working hours bar shows status correctly
