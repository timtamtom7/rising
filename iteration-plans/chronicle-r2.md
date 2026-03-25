# Chronicle — R2: Notifications, Due Date Reminders, Recurrence Patterns

## Goal
Chronicle sends reminders before bills are due. Full notification pipeline with UserNotifications, including scheduling, rescheduling on edit, and overdue detection.

---

## Scope

### UserNotifications Setup
- On first launch, request notification permission via `UNUserNotificationCenter.requestAuthorization`
- If denied: show in-app banner explaining how to enable in System Settings
- Store permission state in `UserDefaults` to avoid re-prompting

### Notification Scheduler
- `NotificationScheduler` service class
- `scheduleNotifications(for bill: Bill)` — cancels existing, then schedules new
- Each enabled `ReminderTiming` (.threeDays, .oneDay, .dueDate) → one `UNCalendarNotificationTrigger`
- All notifications fire at **9:00 AM local time** on the reminder day
- Notification `UNMutableNotificationContent`:
  - Title: "Chronicle"
  - Body: "[Bill Name] is due [in 3 days / tomorrow / today]" + "$[Amount]"
  - Sound: `.default`
  - Category: "BILL_REMINDER" with action "Mark Paid"

### Rescheduling
- `BillStore.updateBill` calls `NotificationScheduler.cancelNotifications(for: bill)` then `scheduleNotifications(for: bill)`
- On bill deletion: cancel all notifications for that bill
- On app launch: re-evaluate all upcoming notifications (they persist across restarts)

### Overdue Detection
- On app launch: iterate all active bills, check if `nextDueDate < today && !paidThisPeriod`
- If overdue: send "overdue" notification (once per overdue bill per day max)
- Background overdue check: timer every 60 minutes while app is running
- Overdue notification body: "[Bill Name] is overdue — was due [date]"

### Recurrence Edge Cases
- Monthly: handle month-end correctly (e.g., Jan 31 → Feb 28 → Mar 31)
- Biweekly/weekly: always advance to next future occurrence, skip past dates
- Annual: Feb 29 → Feb 28 in non-leap years

### Notification Actions
- Category "BILL_REMINDER":
  - Action "Mark Paid" → marks bill as paid for current period, removes badge
  - Action "Snooze 1 Day" → reschedules notification for tomorrow at 9am
- Handle actions in `UNUserNotificationCenterDelegate.userNotificationCenter(response:completionHandler:)`

### Menu Bar Badge
- Overdue count badge on status item button (`button.badgeLabel` or overlay image)
- Amber dot for bills due today
- Red dot for overdue bills
- Clears when all overdue are resolved

### Settings — Notification Preferences
- Default reminder timing (per-bill default in add/edit)
- Notification sound toggle (on/off)
- In settings sheet: test notification button

---

## Out of Scope (R3+)
- Payment history / marking paid
- Monthly overview
- Categories and spending trends
- Export
