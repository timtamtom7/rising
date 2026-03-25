# COIN — R7: Premium Features, Paywall, Analytics

## Goal
Monetization: freemium model, premium upgrades, usage analytics.

---

## Scope

### Freemium Model
- Free tier:
  - Manual scans only
  - Last 7 days history
  - Basic checks (Gatekeeper, Firewall, FileVault)
  - Score display
- Premium tier:
  - Scheduled scans
  - Unlimited history
  - All checks (including extended)
  - Widgets
  - Export reports
  - Priority support

### Paywall UI
- "Upgrade to Premium" modal
- Feature comparison: Free vs Premium
- Monthly/Annual toggle
- "Start 7-Day Free Trial"
- `StoreKit` purchase flow
- Restore purchases

### Usage Analytics (Local)
- Track: scans run, issues found, fixes applied
- Dashboard: "Your Security Journey" — scans completed, issues resolved, score improvement
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
- First launch: explain COIN value proposition
- Run first audit immediately
- Show score with explanation
- Suggest first fix (if issues found)

---

## Out of Scope (R8+)
- Customer support portal
- Referral program
