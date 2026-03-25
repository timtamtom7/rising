# Dust — R11: Advanced ML & Intelligent Blocking

## Goal
Bring on-device ML to Dust for intelligent distraction prediction, optimal focus session analysis, and website categorization.

---

## Scope

### Intelligent Distraction Prediction
- On-device CoreML model learns your unique distraction patterns
- Predicts high-risk times for distraction (late afternoon slump, post-lunch)
- Detects "almost-distracted" patterns: mouse moving toward Dock, hand reaching for phone
- Pre-emptive pause: "You seem to be getting distracted — want to pause?"

### Dynamic Allowlist/Blocklist
- ML refines block rules based on your behavior over time
- "You always check Twitter at 11am for news — add to allowlist during that window"
- Smart exceptions: allow 5 minutes on blocked site if you've been focused for 30 minutes
- Predicts which new websites you'll want to visit during focus and pre-blocks them

### Focus Effectiveness Analysis
- ML analyzes what makes your focus sessions successful
- Correlates focus success with: time of day, day of week, apps used before, sleep from Apple Health
- Personalized insights: "Your best focus sessions are Tuesday mornings after you've used BreakTracker"
- Optimal focus duration recommendation based on your patterns

### Workload Analysis
- Analyze your work calendar (if granted access) to predict workload intensity
- Adjust block sensitivity: higher workload = stricter blocking
- "Tomorrow is light — relax blocking rules" vs. "Crunch week — tighten blocking"

### App Usage Forecasting
- Predict which apps you'll open in the next hour based on patterns
- Flag predicted distracting apps before you open them
- "You usually open Slack around 2pm — want to schedule a focus block?"

---

## Out of Scope
- Cloud-based ML or cross-device model training
- Social sharing of focus data
- Automatic pharmaceutical/health recommendations
