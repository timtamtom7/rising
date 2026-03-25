# Chronicle — R18: Advanced Widgets & Shortcuts Automation

## Goal
Deepen widget capabilities and Shortcuts integration to make Chronicle actionable from the desktop, Lock Screen, and Home Screen without opening the app.

---

## Scope

### macOS Widgets (WidgetKit)
- Small: single next-bill countdown
- Medium: 3 upcoming bills with amounts, due dates, and pay status
- Large: full monthly calendar view with bill markers
- Fund widget: spending bar chart for current month
- Interactive: mark bill as paid via widget button (no app launch required)
- Widget refresh: configurable update frequency (hourly, every 15 min on-demand)

### Lock Screen Widgets
- Countdown to next bill (Lock Screen widget on supported Macs)
- Bills due today count

### Shortcuts App Integration
- Native Shortcuts actions (full action/app capability):
  - "Get Upcoming Bills" → returns list
  - "Mark Bill as Paid" → updates status
  - "Add New Bill" → opens sheet
  - "Get Monthly Spending Total" → number output
  - "Get Spending by Category" → dictionary output
  - "Create Bill from Text" → parses natural language ("Netflix $15.99 monthly on the 15th")
- Siri Suggestions: "You have 3 bills due this week" proactive suggestion

### Menu Bar Extra (updated)
- Native menu bar app (replacing or augmenting StatusBarItem)
- Live update of upcoming bills
- Quick actions: mark paid, snooze, add

### Desktop Widgets (if WidgetKit extends to macOS desktop widgets)
- macOS 14+ supports desktop widgets — Chronicle dashboard widget on the desktop

### Automation Triggers
- Triggers for Shortcuts/Automator: "When a bill becomes overdue"
- "When monthly total exceeds budget threshold"
- "When a bill amount changes"

---

## Out of Scope
- Native Apple Watch standalone app (covered in R15)
- Background refresh push notifications from third-party services
