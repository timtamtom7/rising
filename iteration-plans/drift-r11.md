# Drift — R11 Iteration Plan

## Focus
**Apple Watch Live Metrics & Real-time Sleep Tracking**

## Goals
- Implement real-time sleep phase streaming from Apple Watch (HealthKit HKCategorySample for sleepAnalysis)
- Build a live "Now" card showing current heart rate, HRV, and sleep phase as you sleep
- Add the Smart Wake feature: detect optimal wake window within 30min alarm window based on sleep stage
- Build the Respiratory Rate card (实时呼吸频率) showing breaths-per-minute trend overnight

## Technical Details
- Use `HKAnchoredObjectQuery` with `HkType.categorySample(for: .sleepAnalysis)` for live updates
- WatchConnectivity to sync live metrics from watchOS app
- `HKStatisticsCollectionQuery` for aggregated overnight HRV/HR
- Local notifications for Smart Wake window detection

## UI Updates
- **NowCard**: Live HR, HRV, SpO2, breathing rate — pill card design, updates every 15s
- **Sleep Phases Bar**: Horizontal segmented bar showing tonight's stage distribution
- **Smart Wake Sheet**: Time picker + sleep stage awareness toggle

## Dependencies
- HealthKit (already in entitlements)
- WatchConnectivity (existing in project)

## Milestones
- [ ] Live sleep analysis query
- [ ] NowCard with live metrics
- [ ] Smart Wake sheet and notification logic
- [ ] Respiratory card

## Notes
- Requires iOS 26 / watchOS 10 as per current deployment targets
- Test on physical devices — HealthKit doesn't work well in Simulator
