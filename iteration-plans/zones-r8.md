# ZONES — R8: Collaboration, Sharing, Social Features

## Overview
R8 adds sharing timezones with others, collaborative timezone lists, and social features.

## New Functionality

### Z48: Share Timezone List
- Share current timezone configuration with others
- Export as `.zones` file (JSON bundle)
- Import `.zones` file to get someone's timezone setup
- Share via AirDrop, Messages, Email
- "Share My Zones" button

### Z49: Team/Shared Timezone Lists
- Create shared timezone group
- Invite others via link
- Shared lists sync via CloudKit
- Use case: remote teams, families
- `SharedTimezoneGroup` model:
  ```swift
  struct SharedTimezoneGroup: Identifiable, Codable {
      let id: UUID
      var name: String
      var ownerId: String
      var members: [String]
      var cities: [UUID]    // references to cities
  }
  ```

### Z50: Timezone QR Code
- Generate QR code for a specific time
- Shows: timezone name + time + QR
- Useful for quick sharing in person
- `QRCodeGenerator.generate(for:city:time:)`

### Z51: Calendar File Export
- Export timezone events as `.ics` file
- Export DST transition reminders
- Export alarms as calendar events
- Import into any calendar app

### Z52: Web Component
- Embeddable timezone widget for websites
- HTML + JavaScript snippet
- Customizable colors and zones
- `zones.app/embed?cities=LA,NY,LN,TK`

### Z53: Public Timezone Pages
- Public page for each user: `zones.app/u/{username}`
- Shows their configured zones
- Follow button for updates
- Privacy: public by opt-in only

## File Structure Additions
```
ZONES/
├── Services/
│   ├── ShareService.swift
│   ├── SharedGroupService.swift
│   ├── QRCodeGenerator.swift
│   ├── CalendarFileService.swift
│   └── PublicPageService.swift
├── Views/
│   ├── ShareSheetView.swift
│   ├── SharedGroupView.swift
│   ├── QRCodeView.swift
│   └── PublicProfileView.swift
└── Models/
    ├── SharedTimezoneGroup.swift
    └── PublicUserProfile.swift
```

## Success Criteria
- [ ] .zones file exports and imports correctly
- [ ] Shared groups sync between members
- [ ] QR code generates correctly
- [ ] .ics file opens in Calendar
- [ ] Web embed works on external sites
- [ ] Public profile pages load
