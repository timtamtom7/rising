# DUST — R7: Premium Features, Paywall, Analytics

## Goal
Monetization layer: freemium model with premium upgrade, usage analytics, and paywall UI.

---

## Scope

### Freemium Model
- Free tier:
  - 3 manual scans per week
  - Duplicate finder only
  - Basic recommendations
- Premium tier ($4.99/month or $29.99/year):
  - Unlimited scans
  - Large file finder
  - Old file finder
  - Scheduled scans
  - iCloud sync
  - Widgets
  - Priority support

### Paywall UI
- "Upgrade to Premium" modal
- Feature comparison table (Free vs Premium)
- Price display with monthly/annual toggle
- "Start Free Trial" (7 days)
- `StoreKit` purchase flow
- Restore purchases button

### Usage Tracking
- `Analytics` service using local-only storage
- Track: scans run, files deleted, space recovered, features used
- Weekly summary notification
- NO external analytics SDK (privacy-first)

### Premium Status Management
- Check entitlement on launch
- Grace period for offline use
- Sync purchase status via App Store

### Feature Gating
- `@Observable` or `Environment` for premium status
- Gated UI: show lock icon on premium features
- Upgrade prompt on premium action in free mode

### Onboarding
- First launch: feature tour (3 screens)
- Scan setup wizard
- Quick win: run first scan to demonstrate value
- Upgrade prompt after 3rd scan (if free user)

### Analytics Dashboard
- "Your Impact" screen: total space recovered, files cleaned, time saved
- Privacy-respecting: all local, no server

---

## Out of Scope (R8+)
- Subscription management portal
- Customer support integration
- Referral program
