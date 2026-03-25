# Coin — R15: iOS Companion App

## Goal
Ship Coin as a native iOS and iPadOS app for financial tracking on the go.

---

## Scope

### iOS App
- Full financial dashboard on iPhone and iPad
- Account balances, transactions, budgets
- Add/edit transactions with camera receipt scan
- Push notifications for budget alerts and balance warnings

### iPad Optimization
- Full iPad layout with sidebar + detail split
- Keyboard shortcuts for transaction entry
- External display for financial presentations

### Apple Watch App
- Glance: account balance
- Complication: balance as a number
- Tap to open iPhone for details
- Haptic alert for low balance

### iOS Widgets
- Small widget: account balance
- Medium widget: balance + budget status + recent transaction
- Large widget: full financial dashboard — accounts, spending chart, budget progress
- Lock screen widget: balance
- Interactive widget: add transaction directly

### Camera Receipt Scan
- Point camera at receipt → auto-extract merchant, total, date
- Match to transaction or create new
- ML-enhanced OCR for accuracy

### Siri & Shortcuts
- "How much did I spend this month?" → Siri reads total
- "Add a transaction" → voice entry
- Shortcuts: get balance, add transaction, get budget status

---

## Out of Scope
- Android companion (separate round)
- Investment tracking on watch
