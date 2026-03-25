# ZONES — R9: AI Features, Automation, Advanced Sync

## Overview
R9 adds AI-powered features, automation rules, and advanced sync options.

## New Functionality

### Z54: Smart Timezone Suggestions
- AI suggests timezones based on:
  - Your calendar events (meeting times suggest timezone)
  - Frequent contacts (where do people you email live?)
  - Travel patterns (flight bookings suggest destinations)
- Suggestions appear in Add City sheet
- "Suggested based on your calendar"

### Z55: Meeting Timezone Intelligence
- Scan calendar for meeting invites
- Automatically suggest adding that timezone
- Pre-populate meeting planner with calendar attendees
- Uses `EventKit` to read calendar events

### Z56: Automation Rules
- IFTTT-style rules for timezone events:
  - "When I add a city, sync to iOS"
  - "When DST changes, notify me"
  - "When I arrive at location, switch home city"
- Rule engine:
  ```swift
  struct AutomationRule: Identifiable, Codable {
      let id: UUID
      var trigger: AutomationTrigger
      var action: AutomationAction
      var isEnabled: Bool
  }
  
  enum AutomationTrigger {
      case cityAdded
      case dstChanging(cityId: UUID)
      case calendarEventAdded
      case timeReached(time: String, cityId: UUID)
  }
  
  enum AutomationAction {
      case syncToiOS
      case sendNotification(message: String)
      case addCity(name: String)
      case switchHomeCity(cityId: UUID)
  }
  ```

### Z57: Cross-Platform Sync (iOS)
- Sync with ZONES iOS app via CloudKit
- Same data model on both platforms
- Seamless handoff between Mac and iPhone
- Shared CloudKit container

### Z58: SiriKit Integration
- "Hey Siri, what's the time in Tokyo right now?"
- "Hey Siri, set an alarm for London 9 AM"
- SiriKit app extension
- Handle `GetTimeInZoneIntent`, `SetAlarmIntent`

### Z59: Advanced Export Options
- Export as image (PNG/JPG) with all zones
- Export as PDF report
- Export as wallpaper (multi-monitor setup)
- Customizable export template

## File Structure Additions
```
ZONES/
├── Services/
│   ├── AISuggestionService.swift
│   ├── CalendarIntelligenceService.swift
│   ├── AutomationRuleEngine.swift
│   ├── SiriIntegrationService.swift
│   └── AdvancedExportService.swift
├── Views/
│   ├── AISuggestionsView.swift
│   ├── AutomationRulesView.swift
│   ├── RuleEditorSheet.swift
│   └── ExportAsImageView.swift
└── Models/
    ├── AutomationRule.swift
    └── AutomationTrigger.swift
```

## Success Criteria
- [ ] AI suggestions appear in Add City
- [ ] Calendar scanning finds timezone hints
- [ ] Automation rules execute correctly
- [ ] iOS sync works between devices
- [ ] Siri handles timezone queries
- [ ] Export as image works
- [ ] Export as PDF works
