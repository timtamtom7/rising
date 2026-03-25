# Chronicle — R4: Monthly Overview, Spending Trends, Categories

## Goal
A full monthly financial overview with category breakdowns, spending trends, and richer categorization. The app becomes genuinely useful for understanding where your money goes.

---

## Scope

### Monthly Overview View
- New tab in main window (`⌘3`): "Overview"
- Large month display with ← → navigation (swipe and click)
- Summary cards at top:
  - **Total Due this month**: large number, accent color
  - **Total Paid**: in green
  - **Remaining**: bills not yet paid, in amber if any
- Month-at-a-glance bar: horizontal bar showing paid vs. unpaid proportion

### Category Breakdown
- Bar chart: horizontal bars for each category with spend totals
- Categories with color coding (consistent across the app):
  - Housing: `#6b8cae` (slate blue)
  - Utilities: `#f4a261` (amber)
  - Subscriptions: `#9b7ede` (purple)
  - Insurance: `#5a9a6e` (green)
  - Phone/Internet: `#4ecdc4` (teal)
  - Transportation: `#e07a3a` (coral)
  - Health: `#e86868` (soft red)
  - Other: `#8a8a8a` (gray)
- Tap a category bar → filter bill list to that category
- "No category" shown as uncategorized

### Spending Trends
- 6-month sparkline at bottom of Overview tab
- Simple line chart: total monthly spend for the last 6 months
- If < 6 months of data: show partial data with "Need more data" label
- Tap a point on the sparkline → navigate to that month's overview

### Bill List Improvements
- Filter by category in left sidebar (checkbox list of all categories)
- Category shown prominently on each bill card
- Sort options: by due date (default), by amount (high to low), alphabetically
- "Past bills" section in list (recurring bills that have been paid this period, collapsed by default)

### Category Management
- Settings → Categories: toggle which categories are visible (some users may not need "Health" or "Transportation")
- Custom category names not supported in v1 — stick to the fixed set for simplicity

### Stats Summary (in Bill Store)
- `totalSpentThisMonth()` → Decimal
- `totalDueThisMonth()` → Decimal
- `spendingByCategory(for month: YearMonth)` → `[Category: Decimal]`
- `monthlyTrend(months: 6)` → `[YearMonth: Decimal]`

---

## Out of Scope (R5+)
- Export
- iCloud sync
- Multiple currencies
- Widgets, Shortcuts
