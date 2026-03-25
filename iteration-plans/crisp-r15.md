# crisp — Round 15: Internationalization, Accessibility, Localization

## Goal
Prepare Crisp for global audiences — full i18n, localization, accessibility improvements, and regional pricing to support international growth.

---

## Scope

### Full Internationalization (i18n)
- All user-facing strings in `Localizable.strings` (or `.stringsdict`)
- Languages at launch: English (base), German, French, Spanish, Italian, Portuguese (Brazilian), Japanese, Korean, Simplified Chinese, Arabic (RTL)
- Localized screenshots for App Store in top 5 languages
- Pluralization rules: handle "1 meeting" vs "3 meetings" in all locales
- Number formatting: use `NumberFormatter` — respects locale
- Currency formatting: for any paid features, respect locale currency

### Accessibility (Accessibility Audit)
- Full VoiceOver pass: every screen, every control labeled
- Dynamic Type: all text resizes correctly up to XXXL
- Reduce Motion support: all animations can be disabled
- Color contrast: WCAG AA compliance (4.5:1 for body text)
- Accessibility linter in CI: catch accessibility regressions
- haptic feedback for key actions (optional in settings)

### Regional Pricing
- PPP-adjusted pricing for India, Brazil, Southeast Asia, Eastern Europe
- Regional pricing page with clear explanations
- Local payment methods: Alipay (China), UPI (India), Boleto (Brazil)

### International Marketing
- Local SEO: App Store pages optimized per locale
- Local press outreach in Germany, France, Japan
- International ASO: keyword research per locale
- Time-zone-aware scheduling: meeting reminders respect locale time zones

---

## Out of Scope
- Android app (R16)
- Awards and press push (R17)
