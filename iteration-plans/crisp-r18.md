# crisp — Round 18: Subscription Business, Revenue Optimization, Customer Success

## Goal
Build a sustainable subscription business with strong retention, optimized pricing, and a customer success operation that turns paying users into advocates.

---

## Scope

### Pricing Tier Refinement
- Re-evaluate current tiers based on conversion data
- Introduce **annual billing** (2 months free vs. monthly)
- **Lifetime option**: one-time $199 (vs. $14.99/month) — target power users
- **Family plan**: $19.99/month for up to 5 family members (separate vaults, shared team workspace)
- **Crisp Pro+**: $29.99/month — includes video recording, cloud backup, all integrations, priority transcription
- Test anchor pricing and feature gating via A/B testing (remote config)

### A/B Testing Infrastructure
- Remote config for: pricing, feature gates, paywall copy, free trial length
- Implement: trial-to-paid funnel, churn analysis, upgrade path analysis
- Test: 7-day vs. 14-day vs. 30-day free trial
- Measure: MRR, ARR, churn rate, LTV by cohort and acquisition channel

### Customer Success
- **Onboarding email sequence**: Day 1, 3, 7 — tips for getting started
- **In-app guidance**: Progressive disclosure — don't show all features at once
- **Power user tips**: Monthly email with advanced feature highlights
- **NPS survey**: In-app, quarterly — track NPS trend over time
- **Churn prevention**: If user shows disengagement signals (no recordings in 14 days), trigger re-engagement email

### Developer / Partner Ecosystem
- **Partner program**: 30% revenue share for partners who bring teams to Crisp
- **Education discount**: 50% off for students and educators
- **Nonprofit discount**: Free Pro for registered nonprofits

---

## Out of Scope
- Crisp 2.0 major redesign (R19)
- International expansion (already done R15)
