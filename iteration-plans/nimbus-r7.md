# NIMBUS — R7: Premium Features, Paywall, Analytics

## Goal
Monetization layer: freemium model, premium upgrades, usage analytics.

---

## Scope

### Freemium Model
- Free tier:
  - 2 cloud accounts
  - Basic file browsing
  - Standard transfer speeds
  - 2GB cache limit
- Premium tier:
  - Unlimited accounts
  - Encryption at rest
  - Priority transfers
  - 50GB cache
  - Advanced sync options
  - Widgets
  - Priority support

### Paywall UI
- "Upgrade to Premium" modal
- Feature comparison: Free vs Premium
- Monthly/Annual toggle with savings highlight
- "Start 7-Day Free Trial"
- `StoreKit` purchase flow
- Restore purchases button

### Usage Analytics (Local Only)
- `Analytics`: track scans, transfers, storage accessed
- Dashboard: "Your Activity" — total data transferred, files accessed
- Weekly digest notification
- NO external analytics (privacy-first)

### Premium Status
- Check subscription status on launch
- Cache status locally with expiry
- Sync via App Store receipt validation
- Grace period: 3 days offline

### Feature Gating
- Locked features show lock icon
- Upgrade prompt on premium action
- Trial badge during free trial

### Onboarding
- First launch: connect first cloud account wizard
- Provider selection grid
- OAuth flow per provider
- Mount success celebration

### Referral Program (Future)
- Share link for extra storage
- Not in R7 scope

---

## Out of Scope (R8+)
- Localization expansion
- Customer support portal
