# Coin — R17: Shortcuts & Automation

## Goal
Make Coin deeply automatable through Shortcuts, AppleScript, and financial automation triggers.

---

## Scope

### Shortcuts App Integration
- "Get Account Balance" → returns balances
- "Get Monthly Spending" → spending total
- "Add Transaction" → create transaction
- "Get Budget Status" → budget progress
- "Get Financial Health Score" → score and trend
- "Get Cash Flow Forecast" → upcoming balance prediction
- Siri Suggestions: proactive when unusual spending detected

### AppleScript / JXA
- Full AppleScript dictionary
- `tell application "Coin" to get account balances`
- `tell application "Coin" to add transaction "Grocery" amount 87.50 category "Food"`
- `tell application "Coin" to get budget status`
- Automator actions for all Coin functions

### Menu Bar Extra
- Native MenuBarExtra API
- Quick balance display in menu bar
- Click for recent transactions
- Budget progress bar

### Automation Triggers
- Triggers: "When spending exceeds budget" → notify
- "When balance goes below threshold" → alert
- "Every Monday at 9am" → weekly spending summary
- "When recurring transaction expected" → remind to log

### Receipt Automation
- Folder Action: new receipt image → prompt to scan with Coin
- Email: forward receipt to Coin → auto-extract and log

### Calendar Integration
- Bill due date → auto-add to Coin as pending transaction
- Paycheck date → expected income in cash flow

---

## Out of Scope
- Automatic bank transaction import (privacy choice — manual only)
- Bill pay integration
- Investment automation
