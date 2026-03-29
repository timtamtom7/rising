# BunkerMac R13 — Polish

## Theme
Finalize BunkerMac for App Store submission with a focused audit on the dark command-center aesthetic and full launch readiness.

## Features
- **Launch Checklist** — All submission items verified: TestFlight, screenshots (Mac 13" + 16" + iPad), App Store Connect metadata, privacy labels, age rating; Dark Mode assets fully populated
- **App Store Listing** — Title: "BunkerMac — Decide with Confidence"; subtitle: "AI decision advisor for important choices"; description highlights outcome simulation and advisor collaboration; keywords: decision, AI, advisor, choices, strategy
- **Dark Command Center Aesthetic Audit** — Every screen verified in dark mode: surfaces, cards, dividers, and chart colors all on-brand; no bright/oversaturated elements bleeding through; SF Symbols tinted consistently; HUD-style overlays tested
- **Typography & Spacing Polish** — Decision titles: SF Pro Display Bold 20pt; body: SF Pro Text Regular 14pt; spacing system: 8pt grid; margin/padding consistent across all view types

## Technical Notes
- **SemanticColorAudit:** All colors referenced via `UIColor(named:)` or `Color(named:)` semantic tokens; grep for raw hex in storyboards/XIBs and replace
- **DarkModePreview:** Screenshot CI runs in both light + dark; diff tool flags any unintended color regressions
- **LaunchAssets:** App icon, spotlight icon, watch icon, and alternate icons all submitted at required sizes
- **ComplianceCheck:** Verify HTTPS for all network calls, no IDFA without permission, no private APIs before submission
