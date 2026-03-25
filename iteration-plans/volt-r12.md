# Volt — R12: Collaboration & Team Power Management

## Goal
Enable IT administrators and teams to share power configurations, monitor fleet battery health, and enforce energy policies.

---

## Scope

### Shared Power Profiles
- Export and import power profiles as `.voltprofile` files
- Community profile sharing: upload/download profiles at volt.app/profiles
- Profile ratings and reviews from community
- Staff pick profiles for specific use cases (video editing, software development, travel)

### Team/Fleet Dashboard (for IT Admins)
- Aggregate view of all team Macs' battery health (anonymized, no individual tracking without consent)
- Average battery health across fleet
- Alert when a device falls below service threshold
- Export fleet battery health report as CSV for asset management

### Managed Configuration (MDM)
- Mobile Device Management profile for enterprise deployment
- IT can push power profile configurations to all managed Macs
- Lock certain settings (e.g., disable sleep mode for shared workstations)
- Configurable: force low power mode on specific devices during certain hours

### Remote Notification
- IT admin can push a notification to team Macs ("Meeting room Macs: please plug in now")
- Works via APNs (Apple Push Notification service)
- Optional opt-in for personal Macs

### Collaboration Features
- Share custom power mode on social media / dev communities
- Integration with dev.to, Hacker News, Reddit share buttons
- Embeddable widget: "My Mac runs on Volt — see my power mode"

---

## Out of Scope
- Remote control of another user's Mac (security risk)
- Automatic billing for shared electricity costs
- Team messaging within the app
