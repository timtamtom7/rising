# haul — Round 14: Android App, Web Platform, Cross-Platform Sync

## Goal
Expand Haul to Android and web — making packing accessible on any device, with full cross-platform sync and a web packing assistant.

---

## Scope

### Android App
- Full Haul app on Android (Google Play Store)
- Feature parity: packing lists, AI suggestions, weather integration, shared packing
- Material Design 3 UI
- Android widgets: upcoming trip widget, quick-check item widget
- Google Maps integration: auto-detect destination when you book a trip

### Web Platform
- Responsive web app at haul.travel
- View all trips, packing lists, household inventory
- Browser-based packing list management
- Trip planner: plan future trips with AI packing suggestions
- Share packing lists via web link (no app required to view)

### Cross-Platform Sync
- Unified backend (Firebase or custom)
- All trip data, packing lists, household inventory sync across iOS + Android + web
- Offline support: pack offline, sync when online
- Real-time sync for shared packing (all travelers see updates live)

### Travel Booking Integration
- **Google Maps / City data**: Auto-fill destination with map data
- **Kayak / Expedia**: If user has booking confirmation in email, Haul can parse it (via email integration)
- **Calendar import**: Pull trip dates from Apple Calendar — auto-create packing reminder

---

## Out of Scope
- Haul 2.0 redesign (R15)
- International expansion (R16)
