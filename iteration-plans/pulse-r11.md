# Pulse — R11: Advanced ML & Predictive Analytics

## Goal
Bring on-device ML to Pulse for heartbeat anomaly detection, health trend prediction, and personalized health insights.

---

## Scope

### Anomaly Detection
- On-device CoreML model trained on user's baseline heart rate patterns
- Detect irregular rhythms: elevated resting HR, sudden spikes, sustained high HR during sleep
- Early warning alerts for potential health concerns (not medical diagnosis — clearly labeled)
- "This reading looks different from your normal pattern — consider retaking"

### Health Trajectory Prediction
- Predict health score trends over 30/60/90 days based on historical data
- Weekly health digest: "Your average resting HR has improved 5% this month"
- Risk indicators: "Your HRV has been declining — possible stress buildup"
- Personalized benchmarks based on user's own historical range, not population averages

### Sleep Heart Rate Analysis
- Separate ML model for sleep vs. awake heart rate patterns
- Detect sleep quality from HRV during sleep
- Nighttime anomaly alerts: unusually high/low HR during sleep
- Sleep HR trend: how is your resting heart rate during sleep changing over time?

### Activity Correlation
- Correlate heart rate data with Apple Health activity data (workouts, steps)
- "Your HR tends to spike after the 3pm meeting — possible stress pattern"
- Recovery rate analysis after workouts
- Stress score estimation based on HR + HRV patterns

### Data-Driven Insights
- Weekly AI-generated insights in plain language
- "You had 4 elevated HR events this week, mostly after coffee"
- Trend analysis: long-term view of cardiovascular health indicators
- Motivational nudges: "Your resting HR is the lowest it's been in 6 months"

---

## Out of Scope
- Medical diagnosis — Pulse is wellness, not clinical
- ECG / ECG data integration (requires Apple Watch Series 4+)
- Blood oxygen integration
- Integration with insurance or health providers
