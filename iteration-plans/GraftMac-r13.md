# GraftMac R13 — Polish

## Theme
Ready GraftMac for App Store release with a full performance audit, onboarding refinement, and launch preparation.

## Features
- **Launch Checklist** — TestFlight beta closed, screenshots captured (all device sizes), App Store metadata finalized, EULA, support URL, and marketing URL configured
- **App Store Listing** — Crisp subtitle highlighting AI coaching, feature callouts in description, 5-star keyword set covering all skill categories, screenshots showing streak + coach UI
- **Performance Optimization** — Profile app launch time (target < 2s cold start); reduce memory footprint of ML models (quantization or model distillation); lazy-load friend data; scroll 60fps on all list views
- **Onboarding Flow** — Redesign first-run: skill selection → first session type → practice goal setting → optional friend invite; total steps ≤ 5; progress indicator shown

## Technical Notes
- **App Launch Profiler:** Use Instruments (Time Profiler + Allocations) to find startup bottlenecks; target < 1200ms on M1
- **ML Quantization:** Convert float32 models to float16 or int8 using Core ML tools; benchmark accuracy loss stays < 2%
- **OnboardingState:** Persist onboarding progress in UserDefaults; re-entrant if interrupted
- **Fastlane/Firebase:** CI pipeline for screenshot generation and delivery; Crashlytics + Analytics enabled for launch
