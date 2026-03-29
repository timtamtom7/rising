# GrappleMac R13 — Polish

## Theme
Polish GrappleMac for App Store launch with an academic aesthetic refinement and full launch checklist completion.

## Features
- **Launch Checklist** — TestFlight build submitted, screenshots captured (Mac 13" + 16"), App Store Connect metadata entered, privacy labels filed, export compliance configured, content rating submitted
- **App Store Listing** — Title: "GrappleMac — Sharpen Your Thinking"; subtitle: "AI debate sparring and community argument"; description emphasizes critical thinking and structured debate; keywords: debate, argument, logic, thinking, fallacies, discussion
- **Academic Aesthetic Polish** — Full UI review: serif headings (Georgia or freight) paired with clean sans-serif body; generous whitespace (24pt section spacing); ink-on-paper palette (warm white #FDFBF7, charcoal #2C2C2C, citation blue #2563EB); citation-style footnotes in debate transcripts; no rounded-corner card bloat
- **Typography Audit** — Headings: freight-display semibold 22pt; body: SF Pro Text 14pt/1.6; debate text: Courier or SF Mono 13pt for quoted material; citations in smaller italic; all caps avoided except labels

## Technical Notes
- **FontBundle:** Confirm all fonts are bundled (not relying on system fonts for branded elements); fallback chain defined for all text styles
- **AccessibilityAudit:** Verify semantic headings (H1/H2) are used for debate structure; VoiceOver reads arguments in logical order; Fallacy annotations are accessible
- **ColorContrastCheck:** Warm white background (#FDFBF7) with charcoal text (#2C2C2C) = ~15:1 contrast ratio (pass); blue links (#2563EB) on warm white = ~7:1 (pass)
- **PerformanceCheck:** Profile the tournament bracket renderer with 128 participants; no main-thread blocking; debate transcript scroll at 60fps
