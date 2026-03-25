# Chronicle — R13: Enterprise & Business Features

## Goal
Expand Chronicle beyond personal use into small business and professional financial management with invoicing, tax categories, and business-specific views.

---

## Scope

### Business Bill Categories
- Tax-deductible vs. personal classification per bill
- Business expense tagging for common categories (office, software, utilities, travel)
- Mark bills as "reimbursable" — tracks money owed back to the business
- Export category report for accountant/bookkeeper

### Tax Preparation Export
- Annual summary by category — generates CSV or PDF
- Deductible amount total for the fiscal year
- Filter by date range (tax year vs. calendar year)
- Compatible with TurboTax / QuickBooks import formats (CSV)
- Accountant mode: read-only view with date-range lock

### Invoice Reference Linking
- Link a recurring bill to a vendor/invoice number
- Attach an invoice file (PDF) to a bill entry — stored locally
- Quick search by vendor name or invoice number

### Multi-Currency Support
- Configure base currency for display
- Bills in foreign currencies show converted amount alongside original
- Exchange rates updated daily via Apple Exchange Rates API (or built-in)
- Historical rate at time of payment for accurate record-keeping

### Business Widgets
- Monthly business expense total
- Tax-deductible amount this quarter
- Upcoming bills this week (business only)

---

## Out of Scope
- Full accounting ledger (use QuickBooks)
- Payroll tracking
- Multi-business/company support in single app
