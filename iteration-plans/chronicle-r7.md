# Chronicle — R7: Polish Pass, Accessibility, Performance

## Goal
A thorough quality pass: performance, accessibility, edge cases, bug fixes. Chronicle should feel production-ready before branding and launch.

---

## Scope

### Performance
- BillStore initialization: load bills in background thread, publish to main
- Large lists (> 500 bills): use lazy loading with `LazyVStack`
- SQLite queries: ensure indexes on `bills.due_day`, `payment_records.bill_id`, `payment_records.paid_at`
- Monthly overview calculations: cache results in memory, invalidate on data change
- Popover open time: < 200ms from click to content rendered
- Memory: no leaks, deinit called on all view models

### Accessibility (full VoiceOver + Dynamic Type support)
- All interactive elements: accessibility labels, hints, traits
- Bill cards: `accessibilityLabel = "Rent, $1,850, due April 1, monthly"` etc.
- Navigation: logical tab order in all views
- Dynamic Type: all text scales from 13pt to whatever the user sets; layout adapts
- Reduce Motion: respect `NSAccessibility.isReduceMotionEnabled` — disable animations
- High Contrast: support increased contrast via system setting
- Accessibility audit pass using Accessibility Inspector

### Edge Cases & Error Handling
- Month with 0 bills: show friendly "No bills due" in that month
- Notification permission denied: in-app fallback UI, no silent failure
- Database corruption: detect via integrity check on launch; offer to restore from backup or start fresh
- Currency fetch fails: use last known rates, show subtle "rates may be outdated" badge
- Bill with very long name: truncate with ellipsis at 30 chars in list, 20 chars in popover
- Many past payment records (> 1000): paginate history view, lazy load
- Leap year, Feb 29: annual bills behave correctly
- Time zone changes: store dates in UTC, display in local

### Bug Fixes (from R1–R6 testing)
- Fix any crash reports from internal/external testing
- Fix notification double-scheduling on recurrence change
- Fix overdue detection logic (ensure it only fires once per overdue event)
- Fix monthly overview totals (round-half-up for display)
- Fix iCloud sync conflict resolution (ensure no data loss on simultaneous edits)

### Keyboard Navigation
- `⌘N`: open add bill sheet
- `⌘F`: focus search bar
- `⌘W`: close current sheet
- `Esc`: close popover or sheet
- Arrow keys: navigate bill list
- `Space` on selected bill: mark as paid
- Full keyboard-only operation throughout the app

### SwiftUI Polish
- All animations: `withAnimation(.easeInOut(duration: 0.2))` — consistent feel
- Loading states: subtle shimmer placeholder views (not spinners)
- Pull to refresh in bill list: reload from DB
- Right-click context menu on bill cards: Edit, Mark Paid, Delete
- Drag to reorder: future consideration, not in v1
