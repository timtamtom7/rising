# Zones — R13: Enterprise & Team Features

## Goal
Position Zones for enterprise with team spaces, office zone management, and access control.

---

## Scope

### Office Zone Management
- Create office zones: Floor 1, Floor 2, Conference Rooms, etc.
- Room booking integration: when room is booked, associate with Zone
- Hot desk zone: shared desks with availability awareness

### Team Spaces
- Teams can have their own zones
- "Engineering team space" with custom configurations
- Zone availability: "Is the UX lab free?"

### Access Control
- Per-zone access permissions: who can enter which zone
- Badge/access card integration (via API): zone entry logged
- "This zone requires manager approval to modify"

### Analytics Dashboard
- Zone usage analytics: how much time in each zone
- Office utilization: which zones are most/least used
- Optimization suggestions: "The north side is underutilized"

### MDM / Managed Device Support
- MDM profile for enterprise Mac deployment
- IT can push zone configurations
- Device compliance: must be MDM-enrolled for office zones

### SSO / SAML
- SAML 2.0 SSO for enterprise dashboard
- Support for Okta, Azure AD, Google Workspace

---

## Out of Scope
- Physical access control integration (use dedicated systems)
- Timeclock / attendance tracking
- Payroll integration
