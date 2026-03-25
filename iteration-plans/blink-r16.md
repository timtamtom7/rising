# blink — Round 16: Subscription Business Optimization, A/B Testing, Pricing

## Goal
Maximize Blink's subscription revenue through careful pricing psychology, A/B testing infrastructure, and lifecycle-based upsell strategies.

---

## Scope

### Pricing Tier Refinement
- Re-evaluate current tiers (Free / Memories / Archive) based on real conversion data
- Test anchor pricing: show "Most Popular" badge on mid-tier
- Introduce **Annual billing** (2 months free vs. monthly) — primary conversion lever
- Introduce **Lifetime Purchase** option: one-time $149 (vs. $9.99/month ongoing) — attracts committed users
- Family plan: $14.99/month for up to 6 members (each with own vault + shared circle)

### A/B Testing Infrastructure
- Implement remote config via Firebase (or custom) for pricing, feature gates, paywall triggers
- Test: different paywall copy, different price anchors, different feature gating
- Test: free trial length (7-day vs. 14-day vs. 30-day)
- Measure: trial-to-paid conversion rate as primary metric
- Persist variant per user for consistent experience

### Lifecycle Upsell Flows
- **Day 3 engagement**: "You've captured X clips this week! Upgrade to save unlimited."
- **Day 14 retention**: "Your Blink archive is growing! Get unlimited storage."
- **Storage warning trigger**: "You're at 80% of your free limit — upgrade or auto-compress kicks in."
- **Annual reminder**: "Your Blink subscription renews in 30 days. Switch to annual and save."
- **Churn prevention**: If user cancels, show "What are you leaving?" survey + special挽留 offer

### Subscription Analytics
- MRR, ARR, churn rate, LTV, paywall impression → conversion funnel
- Cohort analysis: which acquisition channel has best conversion
- Track feature adoption by tier: which features drive upgrades

---

## Out of Scope
- Partnership / white-label deals (R17)
- Awards and press push (R18)
