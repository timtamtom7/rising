# drift — Round 11: Advanced Health Integration, On-Device ML Sleep Analysis

## Goal
Make Drift the most comprehensive sleep health platform by integrating deeply with Apple Health, adding on-device ML sleep analysis, and providing clinical-grade sleep insights.

---

## Scope

### Deep Apple Health Integration
- **Health app sync**: Bidirectional — Drift reads and writes to Apple Health
- Read: sleep stages, heart rate, HRV, respiratory rate, blood oxygen, temperature
- Write: Drift sleep score, sleep phase data, smart alarm events
- **HealthKit queries**: On each wake-up, pull previous night's full health data for analysis
- **Health app badge**: Show last night's sleep score in the Apple Health app

### On-Device ML Sleep Analysis
- **Sleep stage classification**: Use Core ML to classify sleep stages ( Awake, Core, Deep, REM) based on heart rate + HRV + movement
- Train or fine-tune a sleep stage model on Apple's private framework data (with user consent)
- **Sleep quality scoring**: Beyond just duration — rate sleep quality on 0-100 scale incorporating efficiency, fragmentation, REM%, Deep%
- **Sleep debt calculation**: Track cumulative sleep debt over 7 and 14 days
- **Sleep latency**: How long it takes to fall asleep — track over time, flag anomalies

### Respiratory Health
- Track respiratory rate overnight (from Apple Watch)
- Detect apneic events (if HRV + oxygen dip pattern suggests sleep apnea)
- "Your respiratory rate spiked 3 times — consider discussing with a doctor"
- Export health report for doctor visits (PDF format)

### Environmental Correlations
- **Weather correlation**: Correlate sleep quality with barometric pressure, temperature, humidity (from weather data)
- **Moon phase**: Light sleep tied to full moon? Track and correlate
- **Seasonal patterns**: How does sleep change across seasons?

---

## Out of Scope
- Sleep coaching program (R12)
- Community / social features (R13)
