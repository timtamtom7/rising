# FumeMac R13 — Polish

## Theme
Polish FumeMac to App Store-readiness with a full accessibility pass, offline-first verification, and launch listing.

## Features
- **Launch Checklist** — All pre-submission items verified: TestFlight beta, screenshots (Mac 13" + 16"), App Store Connect metadata, privacy nutrition labels, age rating, export compliance
- **App Store Listing** — Title: "FumeMac — Your Thinking, Amplified"; subtitle: "AI-powered notes with semantic search"; description emphasizes local-first privacy; keywords: notes, knowledge, AI, semantic, research
- **Accessibility Audit** — Full VoiceOver pass: every control labeled, notes list navigable by heading, semantic zoom supported, all images have descriptions; Dynamic Type at all sizes
- **Offline-First Verification** — All core features (write, search, tag, summarize) work fully offline; share/sync features gracefully degrade when no connection; sync conflict UI tested

## Technical Notes
- **AccessibilityScanner:** Run `accessibilityInspect` in CI; fix all AX violations before submission
- **OfflineTestHarness:** Airplane mode test script exercising all R11/R12 features; success criteria: zero crashes, all features functional
- **SyncConflictResolver:** Document the conflict resolution algorithm in code comments; simulate split-brain scenarios and verify correct merge behavior
- **Screenshot CI:** Automated screenshot capture using macOS snapshot tests; all 3 window sizes captured in light + dark mode
