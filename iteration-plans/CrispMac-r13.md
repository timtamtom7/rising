# CrispMac R13 — Polish

## Theme
Polish CrispMac for App Store launch with a waveform aesthetic refinement and full launch checklist completion.

## Features
- **Launch Checklist** — TestFlight build ready, screenshots captured (Mac 13" + 16"), App Store Connect metadata finalized, privacy labels updated (voice data is sensitive — explicit handling disclosure), content rating configured
- **App Store Listing** — Title: "CrispMac — Voice Notes, Organized"; subtitle: "AI-powered voice notes with team sharing"; description emphasizes fast transcription, smart organization, and team workflow; keywords: voice notes, transcription, voice memos, team, organization, speech to text
- **Waveform Aesthetic Polish** — Every audio player UI uses consistent waveform visualization: teal (#14B8A6) waveform bars at 2px width, 6px gap; playback head is a glowing accent (#0D9488); scrubbing is smooth and lag-free; waveform darkens already-played sections; mini-player uses inline waveform, not a static icon
- **Mini-Player Polish** — Floating mini-player is always available; tap to expand; swipe gestures work for skip 15s back/forward; no dead-touch areas; mini-player position persists across app states

## Technical Notes
- **WaveformRenderer:** Pre-compute waveform peaks on save and cache as compact array; render with Metal or Core Animation for 60fps playback sync; lazy-load waveform for recordings > 30 min
- **MiniPlayerPersistence:** Mini-player state (note ID, playback position, isPlaying) stored in UserDefaults; restored on app restart; NSWindow-level mini-player is non-modal
- **VoicePrivacyAudit:** Verify no voice data leaves the device without explicit user consent; transcription is on-device by default; team sharing is opt-in per note
- **MemoryTest:** Profile with 500+ voice notes loaded in the list; thumbnail generation is lazy; waveform cache bounded to 50MB; no memory leaks on repeated record/playback cycles
