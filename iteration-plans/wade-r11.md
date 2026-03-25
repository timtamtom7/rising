# wade — Round 11: AI Financial Advisor, Predictive Spending, Investment Tracking

## Goal
Transform Wade from a conversational expense tracker into an AI-powered personal financial advisor — providing predictive insights, investment tracking, and proactive financial guidance.

---

## Scope

### AI Financial Advisor
- **Proactive insights**: "You're spending 30% more on dining this month — is this temporary?" — AI surfaces patterns without being asked
- **Monthly financial briefing**: AI writes a personalized monthly financial report — income vs. expenses, trends, surprises
- **"What if" modeling**: Ask Wade: "What if I cut my subscription spending by $50?" — AI models the impact
- **Savings recommendations**: Based on spending patterns, AI recommends specific savings opportunities
- **Financial health score**: 0-100 score — tracks financial health over time

### Investment Tracking
- **Portfolio sync**: Connect to brokerage accounts (via Plaid or similar) — track stocks, bonds, crypto
- **Net worth tracking**: Bank accounts + investments = total net worth — tracked over time
- **Investment performance**: Track how investments perform vs. benchmarks
- **Dividend tracking**: Log and track dividend income
- **Investment advice (non-licensed)**: Educational content only — "Historically, index funds have outperformed active trading"

### Predictive Spending
- **Next month prediction**: AI predicts next month's spending by category based on history
- **Upcoming bills**: "You have 3 subscriptions renewing next week — $49 total"
- **Balance forecasting**: "Based on your spending, your account will hit $500 by March 15"
- **Irregular expense detection**: "Your quarterly insurance payment is due in 2 weeks — have you budgeted for it?"

### Enhanced NLP
- **Multi-currency**: Log expenses in multiple currencies — auto-converts to base currency
- **Split transactions**: "Split $50 dinner between food and business"
- **Recurring vs. one-time**: AI learns which expenses are recurring — "This subscription renews monthly"
- **Receipt parsing**: Upload a receipt photo — AI extracts line items and amounts

---

## Out of Scope
- Social features / shared finances (R12)
- Subscription optimization (R13)
