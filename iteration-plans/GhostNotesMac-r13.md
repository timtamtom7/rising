# GhostNotesMac R13 — Polish

## Theme
Polish GhostNotesMac for App Store launch with reading-mode refinement, offline reading verification, and full listing preparation.

## Features
- **Launch Checklist** — TestFlight build ready, screenshots captured (Mac 13" + 16"), App Store Connect metadata finalized, privacy nutrition labels updated (reading stats are personal data), age rating configured
- **App Store Listing** — Title: "GhostNotesMac — Read Smarter"; subtitle: "AI summaries, shared queues, and insights from your reading"; description highlights AI curation and social features; keywords: read later, summaries, articles, bookmarks, reading list, highlights
- **Reading Mode Polish** — Typography: Georgia or Charter serif body text at 18pt/1.7 line height; margin width 20% of screen; dark mode: warm sepia (#F4ECD8 background); no ads, no clutter; smooth scroll with reduced motion support
- **Offline Reading Verification** — Every article is fully downloadable for offline reading; verify all offline features: search, highlights, summary cards, annotation comments (synced when back online); test on slow Wi-Fi and airplane mode

## Technical Notes
- **OfflineCache:** Articles cached as parsed plain text + metadata in SQLite; images cached via URLSession with disk cache policy; verify full render without network
- **ReadabilityParser:** `Readability` port or custom HTML sanitizer; strip scripts, ads, tracking pixels; preserve headings and article structure for outline view
- **ScreenshotCI:** Automated capture of article reader view, queue view, and annotation view in light + dark; all three Mac screen sizes
- **PrivacyAudit:** Confirm no analytics SDKs send article content or URL without explicit consent; reading stats opt-in and encrypted at rest
