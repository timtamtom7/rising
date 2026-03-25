# Chronicle — R3: Payment History, Mark as Paid, Upcoming Widget

## Goal
Users can mark bills as paid and see their payment history. The menu bar popover becomes a proper mini-dashboard showing the upcoming bills widget.

---

## Scope

### Mark as Paid
- Bill card checkbox in list and popover → tap to mark paid
- On mark paid:
  - Create `PaymentRecord` in DB with today's date
  - Trigger haptic feedback (if available)
  - Brief "Paid ✓" animation on the card
  - Update next occurrence date if bill is recurring
  - Cancel scheduled notifications for the paid period (reschedule for next occurrence)
  - Animate card out of "Due Soon" section into "Paid"
- Undo available for 5 seconds via floating toast: "Undo" button reverts the payment record
- For bills with `autoMarkPaid = true`: on due date, send confirmation notification then auto-create payment record after 1 hour if not dismissed

### Payment History View
- New tab in main window (`⌘2`): "History"
- Chronological list grouped by month (most recent first)
- Each entry: bill name, amount, date paid
- Monthly subtotal at top of each group: "March 2026 — $2,049.99 total"
- Search/filter by bill name
- Empty state: "No payments recorded yet."

### Menu Bar Popover — Upcoming Widget
- Redesign popover to be a proper mini-dashboard:
  - Header: "Chronicle" title + settings gear icon
  - Section "Due Soon" (next 7 days): top 3 bills as compact cards
  - Section "This Month": total due, total paid, remaining
  - Visual progress bar for month (paid / total)
  - "View All Bills →" button opens main window
- Compact cards in popover: bill name (truncated), amount, due date, days until due ("in 2 days", "tomorrow", "today")
- Clicking a card in popover → opens main window to that bill's edit sheet
- Badge count in menu bar icon updates in real time

### Payment Record Persistence
- `payment_records` table used for all paid history
- Query: `getPaymentRecords(for bill: Bill)` → array sorted by date
- Query: `getPaymentRecords(for month: YearMonth)` → all payments in that month
- Query: `wasPaidThisPeriod(for bill: Bill)` → bool, checks if a payment record exists for the current due period

### Visual Polish
- Card "paid" state: card fades to secondary appearance, strikethrough on amount, green checkmark replaces checkbox
- Smooth list animations when items move between sections (SwiftUI `withAnimation`)
- Month progress bar in popover: filled portion in accent green, unfilled in surface-secondary

---

## Out of Scope (R4+)
- Monthly overview with charts
- Categories and spending trends
- Export, iCloud sync, multi-currency
