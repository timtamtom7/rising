# ZONES — R10: Pro Tier, Enterprise, Final Polish

## Overview
R10 is the App Store launch milestone with Professional tier, enterprise features, and comprehensive polish.

## New Functionality

### Z60: ZONES Professional Tier
- In-App Purchase: "ZONES Pro" ($2.99/month or $19.99/year)
- Pro features from all iterations:
  - Widgets (R5)
  - iCloud sync (R5)
  - Meeting planner (R3)
  - Alarms/events (R3)
  - World map (R4)
  - AQI display (R7)
  - Shared groups (R8)
  - Automation rules (R9)
  - Calendar integration (R9)
  - Siri integration (R9)
  - Advanced export (R9)
- Free tier: 5 cities, no widgets, no sync
- Paywall UI: Pro badge, upgrade prompt
- StoreKit 2 subscription management

### Z61: Enterprise Features
- Managed App Configuration (MDM)
- Configurable defaults:
  - Pre-populated city list
  - Default format (12h/24h)
  - Default home city
  - Force local-only mode
  - Disable cloud sync
- Organization dashboard: `enterprise.zones.app`
- SSO via SAML 2.0
- Volume license (VPP) support
- Corporate Managed Apple ID support

### Z62: Developer API
- REST API: `api.zones.app/v1/`
- Endpoints:
  - `GET /cities` — list cities
  - `POST /cities` — add city
  - `DELETE /cities/{id}`
  - `GET /convert?time=...&from=...&to=...`
  - `GET /meeting-slots`
- API key in Settings
- OAuth 2.0 for third-party apps
- Rate limiting: 100 requests/minute

### Z63: Browser Extension (Safari/Chrome)
- Quick access to ZONES from browser toolbar
- Shows time in current tab's region (guess from domain)
- One-click add current website's timezone
- "Save timezone" from any page

### Z64: Final Accessibility Audit
- WCAG 2.1 AA compliance
- VoiceOver full support
- Dynamic Type
- Reduce Motion support
- Color contrast 4.5:1
- Focus indicators
- Keyboard navigation

### Z65: Performance Audit
- Launch time: < 0.3 seconds cold start
- Memory: < 30MB
- CPU: < 1% during idle
- Popover open: < 50ms
- Smooth 60fps animations
- Battery efficient

### Z66: App Store Submission
- Screenshots: all UI states
- App preview video (15 seconds)
- Localization: English + 5 languages
- Marketing: `zones.app`
- Privacy policy
- TestFlight: 100+ beta testers
- Crash-free rate: > 99.5%

## Enterprise Configuration Schema
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PrepopulatedCities</key>
    <array>
        <string>America/New_York</string>
        <string>Europe/London</string>
        <string>Asia/Tokyo</string>
    </array>
    <key>DefaultTimeFormat</key>
    <string>12h</string>
    <key>DefaultHomeCity</key>
    <string>America/Los_Angeles</string>
    <key>AllowCloudSync</key>
    <true/>
    <key>ForceLocalOnly</key>
    <false/>
    <key>OrganizationName</key>
    <string>Acme Corp</string>
</dict>
</plist>
```

## Success Criteria
- [ ] App Store listing approved
- [ ] All Pro features behind paywall
- [ ] Restore purchases works
- [ ] MDM configuration applies
- [ ] API returns correct data
- [ ] Browser extension installs
- [ ] WCAG 2.1 AA compliance
- [ ] Launch time under 0.3 seconds
- [ ] No accessibility violations
- [ ] TestFlight has 100+ testers
- [ ] Crash-free rate above 99.5%
