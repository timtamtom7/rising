# Chronicle — R16: Subscription Tiers & Monetization

## Goal
Introduce Chronicle Pro and Chronicle Household subscription tiers with meaningful, differentiated features.

---

## Scope

## Tier 1 — Free (Core)
- Up to 10 bills
- Basic recurrence (weekly, monthly, yearly)
- Menu bar popover
- Local-only data storage
- 1 household profile

## Tier 2 — Chronicle Pro ($2.99/month or $19.99/year)
- Unlimited bills
- All recurrence options (custom intervals, bi-weekly, quarterly)
- Smart ML reminders (R11)
- Spending pattern insights and anomaly detection
- Tax category export (CSV/PDF)
- Business expense tagging
- Advanced widgets
- Shortcuts & App Intents integration
- Priority support

## Tier 3 — Chronicle Household ($5.99/month or $39.99/year)
- Everything in Pro
- Up to 6 household members
- Real-time iCloud sync across devices
- Split bill tracking and settle-up
- Household dashboard
- Shared invoice attachments
- Roommate/partner notification system

## Subscription Infrastructure
- StoreKit 2 integration for in-app purchases
- RevenueCat or equivalent for subscription management
- Cross-platform subscription status (same iCloud account unlocks on all devices)
- Free 14-day trial for Pro and Household
- Grace period: 3 days of access after payment failure before locking features

## Upgrade Prompts
- Upgrade nudge in-app when Free tier limit hit (10 bills)
- Feature gates clearly labeled with tier name and lock icon
- Non-intrusive banner: "Unlock Pro for $2.99/month"

---

## Out of Scope
- Lifetime license purchase option
- Team/enterprise tier (separate R17)
