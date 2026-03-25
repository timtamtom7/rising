# Coin — R11: Advanced ML & Predictive Analytics

## Goal
Bring on-device ML to Coin for spending prediction, budget anomaly detection, and intelligent financial insights.

---

## Scope

### Spending Pattern Analysis
- On-device CoreML model analyzes spending history
- Predict next month's spending per category
- Detect unusual spending patterns: "You spent 3x more on dining this week"
- Alert before budget is exceeded based on trajectory

### Cash Flow Prediction
- Predict account balance for next 30/60/90 days
- Account for recurring transactions, variable income
- "Based on your patterns, you'll be $500 short on the 15th"
- Warning before paycheck: "Bills exceed expected income"

### Category Classification
- ML auto-categorizes new transactions
- Learns user's custom categories
- Detects when a transaction should be recategorized
- "This looks like a subscription — want to tag it?"

### Receipt OCR Enhancement
- Enhanced OCR with ML for better receipt reading
- Auto-extract: merchant, date, total, line items
- Match receipt to transaction automatically
- "Receipt detected for $47.23 at Whole Foods — matches transaction?"

### Financial Health Score
- ML generates a weekly financial health score
- Factors: savings rate, spending variability, budget adherence, debt payments
- Historical score trend
- "Your financial health improved 15% this month"

---

## Out of Scope
- Investment advice or portfolio management
- Tax preparation (basic export in scope)
- Loan/credit recommendations
