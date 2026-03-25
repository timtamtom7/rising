# Chronicle — R1: App Shell, Bill List, Add/Edit, Persistence

## Goal
A working menu bar app with a bill list, add/edit capability, and SQLite persistence. No notifications yet — just the core data loop.

---

## Scope

### Menu Bar Entry Point
- `NSStatusItem` with calendar SF Symbol icon
- `NSPopover` (480×400pt) showing upcoming bills summary
- Proper click-outside dismissal
- Main window opens via "View All Bills" button

### Data Model (SQLite.swift)
- `bills` table: id, name, amount_cents, due_day, recurrence, category, notes, reminder_timings (JSON), auto_mark_paid, is_active, created_at
- `payment_records` table: id, bill_id, amount_paid_cents, paid_at
- Database at `~/Library/Application Support/Chronicle/chronicle.db`
- Auto-create directory and tables on first launch

### BillStore
- `ObservableObject` held by `@MainActor AppDelegate`
- CRUD operations: `addBill`, `updateBill`, `deleteBill`, `getAllBills`, `getUpcomingBills`
- `calculateNextDueDate(for: Date, recurrence:)` helper
- Loads from SQLite on init

### Bill List View (main window)
- Left sidebar: month nav + category filter (static in R1)
- Right content: bills grouped into **Due This Week / Upcoming / Past Due** sections
- Bill card: checkbox, name, amount, due date, recurrence badge, category tag
- Status border: amber for due soon, green for paid, red for overdue
- Click bill card → opens edit sheet
- `+` button in toolbar → opens add sheet
- Search bar (filters in-memory, no DB query in R1)
- Empty state when no bills

### Add/Edit Bill Sheet
- All fields from spec: name, amount (decimal input), due date (date picker), recurrence (segmented picker), category (dropdown), notes (text area)
- Validation: name required, amount ≥ 0, due date required
- Save button disabled until valid
- Cancel dismisses without saving
- Delete button in edit mode (with confirmation alert)

### Due Date Calculation
- `calculateNextDueDate(bill: Bill, from: Date = today) → Date`
- Handles: weekly (every 7 days), biweekly (14 days), monthly (same day), quarterly (+3 months), semiAnnual (+6 months), annual (+1 year)
- For monthly: if due day > days in month, use last day of month
- Properly advances to future dates (never shows past due from a past occurrence)

### macOS App Lifecycle
- `main.swift` (no @main attribute) → `NSApplication.shared → AppDelegate`
- `applicationDidFinishLaunching`: init BillStore, load data, build status item
- App does NOT auto-show main window on launch — starts in menu bar
- Standard app menu: About, Preferences (→ settings), Quit
- Launch at login via `SMAppService` (if available, else `LSSharedFileList`)

### Build & Run
- Target: macOS 13.0+
- Swift Package Manager: SQLite.swift
- No third-party UI dependencies
- Zero warnings, clean build
- Test: add a bill, close app, reopen — bill persists

---

## Out of Scope (R2+)
- Notifications
- Payment history tab
- Monthly overview tab
- Categories beyond the picker
- Export
- Settings beyond basic preferences
