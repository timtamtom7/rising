# PLANK — R7: Premium Features, Paywall, Analytics

## Goal
Monetization: freemium model, premium upgrades, usage analytics.

---

## Scope

### Freemium Model
- Free tier:
  - 3 sidebar configs
  - Basic widgets (clock, calendar)
  - 10 bookmarks per config
  - Standard hotkeys
  - Single device
- Premium tier:
  - Unlimited configs
  - All widgets (weather, notes, running apps)
  - Unlimited bookmarks
  - Custom hotkeys
  - iCloud sync
  - Widgets (WidgetKit)
  - Priority support

### Paywall UI
- "Upgrade to Premium" modal
- Feature comparison: Free vs Premium
- Monthly/Annual toggle
- "Start 7-Day Free Trial"
- `StoreKit` purchase flow
- Restore purchases

### Usage Analytics (Local)
- Track: sidebar opens, bookmarks used, widgets viewed
- Dashboard: "Your Activity" — most used bookmarks, sidebar hours
- Weekly digest notification
- NO external analytics

### Premium Status
- Check subscription on launch
- Cache status with expiry
- Grace period: 3 days offline

### Feature Gating
- Lock icon on premium features
- Upgrade prompt on premium action
- Trial badge

### Onboarding
- First launch: feature tour
- Quick setup: add first bookmark
- Suggest pinning to menu bar

---

## Out of Scope (R8+)
- Customer support portal
- Referral program
