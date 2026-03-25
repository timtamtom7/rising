# Drift — Rounds 3, 4, 5

## Round 3: Deeper Health, Smart Wake, Polish

### Deeper Health Integration
- Heart rate variability (HRV) analysis
- Respiratory rate overnight
- Blood oxygen (if Apple Watch supports)
- Temperature wrist data (Apple Watch Series 8+)
- Correlate sleep quality with: exercise, caffeine, alcohol, stress

### Smart Wake / Alarms
- Smart alarm: wake up at optimal time (within window, during light sleep)
- Gentle wake vibration pattern (not jarring)
- Sunrise alarm simulation (watch screen brightens)
- "Wake up between 7:00-7:30 when in light sleep"

### Weekly Report
- Generate a weekly sleep report (text summary) every Sunday
- Store in SQLite
- Show in the app when ready
- Share as image

---

## Round 4: Family, Social, Platform

### Family / Multi-user
- Share sleep data with family member (Complete tier)
- Compare sleep patterns with partner
- "Family sleep score" — aggregate household sleep health

### Platform
- iOS app (native)
- watchOS app (sleep tracking from watch, smart alarm on watch)
- macOS app

### Notifications Expansion
- "Weekly report ready" — Sunday evening
- Low sleep warning ("You only slept 4h last night. Here's why that matters.")
- "Your sleep debt is X hours"

---

## Round 5: AI, Integrations, Scale

### AI Correlations
- "You slept 20% better on days you exercised"
- "Alcohol after 8pm reduces your deep sleep by 30%"
- "Your best sleep this month was after a 7+ hour sleep the night before"
- Seasonal patterns ("Your sleep is 20 min shorter in winter")

### Integrations
- Oura ring integration (补充更多数据)
- Withings scale integration
- Apple Health export

### Freemium Polish
- Free: 7-day history, basic stats
- Insights: 30-day history, weekly AI insights, heart rate analysis
- Complete: unlimited history, advanced patterns, family sharing, consultation recommendations

## Custom Graphics for R3-5
- HRV trend chart
- Smart alarm UI
- Family comparison view
- watchOS app mockup
