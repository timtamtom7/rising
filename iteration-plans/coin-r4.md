# COIN — R4: Scheduled Scans, Notifications, History, Menu Bar Extra

## Goal
Automated security monitoring: scheduled audits, notifications for issues, history tracking, and Menu Bar Extra.

---

## Scope

### Scheduled Scans
- `ScanScheduler`: periodic security audits
- Schedule options: Daily, Weekly (default), Monthly
- Time picker: default 9:00 AM
- Run on battery: optional (default: skip on low battery)
- Background scan via `NSBackgroundActivityScheduler`
- Resume on wake from sleep

### Background Scan Engine
- Low-priority background execution
- Rate-limited checks to minimize system impact
- Check for changes since last scan
- Report new issues found

### Notification System
- `UNUserNotificationCenter` for alerts
- Notification types:
  - "New Security Issue Found" — with issue summary, "View" action
  - "Security Score Changed" — if score drops by >5 points
  - "Critical Issue Detected" — immediate for severe issues
  - "Scan Complete" — weekly summary notification
- Notification preferences per type
- Do Not Disturb integration

### Audit History
- `AuditHistory`: timestamp, score, issues found, issues fixed
- Store last 90 days of audits in `UserDefaults`
- History chart: score over time (line graph with Swift Charts)
- Filter history by: date range, severity, check category
- Export history as CSV/JSON

### Issue Tracking
- Track issues over time: opened, fixed, ignored
- "Ignore Issue" option: suppresses from future scans (with reason)
- "Issue Recurred" detection: ignored issue reappears → alert
- Snooze: remind again in X days

### Menu Bar Extra (NSMenuBarExtra)
- `NSMenuBarExtra` with shield icon
- Quick score display: colored circle with number
- Menu items:
  - Current score + trend arrow
  - "Run Quick Scan" button
  - "Top Issues" submenu (top 3)
  - "View All Issues" → open main window
  - "Preferences" / "Quit"
- Badge for critical issues count

### Mini Dashboard (Popover)
- Circular score gauge
- Top 3 issues with quick fix buttons
- "Last Scan" timestamp
- "Next Scan" countdown
- Quick actions: Refresh, Fix All Safe

### Weekly Security Digest
- Email digest option (local, no server): weekly report saved to ~/Downloads
- Digest includes: score change, new issues, fixed issues, recommendations
- "Email Digest" in settings (generates PDF, opens Mail)

### Preferences
- Scan schedule configuration
- Notification toggles
- Score thresholds for alerts
- Menu Bar Extra style

---

## Out of Scope (R5+)
- Widgets
- Shortcuts
- App Store launch
