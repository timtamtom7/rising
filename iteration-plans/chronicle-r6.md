# Chronicle — R6: Widgets, Shortcuts Integration, Calendar Export

## Goal
Chronicle extends beyond the app with macOS widgets, Siri Shortcuts, and calendar export — meeting users in their existing workflows.

---

## Scope

### macOS Widgets (WidgetKit)
- **Small widget (140×140pt):** Next due bill — name, amount, due date, days remaining
- **Medium widget (292×140pt):** Top 3 upcoming bills with amounts and dates
- **Large widget (292×312pt):** Monthly overview — total due, total paid, top 3 upcoming, progress bar
- Widget uses shared `App Group` container (`group.com.chronicle.app`) for data access
- Widget timeline: refresh every 15 minutes, show data for next 7 days
- Widget configuration: none (all data is user-specific; no configuration needed)
- Widget is read-only (no interaction → opens app)
- Note: WidgetKit requires a separate widget extension target

### Siri Shortcuts
- Register Chronicle as a "Bill" domain with Shortcuts
- Expose the following shortcuts:
  - "Add a Bill" → opens add bill sheet with bill name, amount, due date parameters
  - "When is [Bill Name] due?" → returns due date
  - "How much do I owe this month?" → returns total due
  - "Mark [Bill Name] as paid" → marks bill paid
  - "What's my payment history?" → returns last 5 payment records
- Built using `AppIntents` framework (macOS 13+, same as iOS)
- Shortcuts appear in Shortcuts.app automatically

### Calendar Export
- In monthly overview: "Export to Calendar" button
- Generates a `.ics` file with:
  - One event per unpaid bill: title = "[Bill Name]", date = due date, time = 9:00 AM, alert = 3 days before
  - Recurring events properly marked with RRULE (FREQ=MONTHLY, etc.)
- Share sheet to send the .ics to Calendar.app, Google Calendar, etc.
- Also available via Shortcuts: "Export bills to calendar"

### App Group for Widget/Extension Sharing
- App Group: `group.com.chronicle.shared`
- Shared SQLite database in app group container (instead of per-app container)
- Widget reads directly from this DB (read-only access)
- Main app writes to this DB; widget reads on timeline refresh
- Keychain items also shared via app group

### Shortcut Parameters
- "Add a Bill" shortcut accepts:
  - Bill name (required, text)
  - Amount (required, number)
  - Due date (required, date)
  - Recurrence (optional, from list: none/monthly/weekly/annual)
- Shortcuts validation: graceful failure if required params missing

---

## Out of Scope (R7+)
- Polish, branding, App Store assets
- Launch prep
