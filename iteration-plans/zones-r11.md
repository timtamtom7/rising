# Zones — R11: Advanced ML & Predictive Zoning

## Goal
Bring on-device ML to Zones for intelligent zone prediction, activity detection, and smart context awareness.

---

## Scope

### Predictive Zone Switching
- On-device ML learns your routine: where you are at what time
- Predict next zone based on time, location, calendar
- "Based on your 6pm Tuesday pattern, you're likely heading to Home Zone"
- Pre-emptively offer to switch zones

### Activity Detection
- ML detects current activity from context (time, location, apps in use)
- Activity types: Work, Meeting, Break, Commute, Home, Exercise
- Auto-suggest zone based on detected activity
- "You're in a video call — suggest switching to Meeting Zone"

### Contextual App Suggestions
- Suggest relevant apps based on current zone
- Work Zone → suggest Slack, Xcode, Mail
- Home Zone → suggest Safari, Photos, Music
- Learns your per-zone app preferences

### Smart Notifications
- ML determines notification importance based on zone and activity
- During Work zone: urgent notifications only
- During Focus: all notifications held
- "This notification is from your boss — deliver now despite Focus"

### Location-Based Automation
- Geofencing: trigger zone change on arrival/departure
- "Arrive at office → switch to Work Zone"
- Bluetooth beacon support for room-level accuracy
- "Enter conference room → switch to Meeting Zone"

---

## Out of Scope
- Cloud-based tracking
- Sharing location with others
- GPS history storage
