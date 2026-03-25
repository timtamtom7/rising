# blink — Round 11: AI Highlights, On-Device ML, Smart Compression

## Goal
Transform Blink from a video diary into an intelligent memory engine. Use on-device ML to automatically identify, compress, and surface the most meaningful moments — reducing storage while improving recall quality.

---

## Scope

### On-Device AI Highlights
- **Automatic highlight detection**: Use Vision framework to analyze clips for laughter, faces, motion peaks, scenic beauty; rank moments by "memorability score"
- **AI-generated monthly reel**: Concatenate top 10 moments of the month into a 60-second highlight reel, auto-generated at month end
- **"On This Day" 2.0**: Surface not just clips from same date past years, but AI-identified "similar mood" moments (all beach trips, all birthday celebrations)
- **Smart skip**: Auto-detect and trim dead air / static shots (longer than 3s with no motion)

### On-Device ML Pipeline
- All analysis runs on-device via Core ML (no cloud, no AI API costs)
- Model: Vision+NLP cascade — detect faces, speech sentiment, scenic quality, activity type
- User can disable any analysis layer in Settings
- Privacy-first: no clip ever leaves the device for analysis

### Storage Optimization
- **Adaptive quality**: Record at full quality initially, then auto-compress clips older than 90 days that weren't favorited or shared
- **Deduplication**: Detect near-identical clips (same 30s window captured twice) and prompt to keep one
- **Storage dashboard**: Show "Blink has saved you X GB" based on compression and deduplication

### AI Captioning
- On-device speech-to-text (Speech framework) to generate captions for clips with audio
- Captions searchable — tap a word in search to jump to that moment
- Auto-generate a one-line description for each clip: "Beach sunset with friends" (generatable from audio transcription + scene analysis)

---

## Out of Scope
- Social sharing platform (R12)
- Cross-device sync beyond iCloud (R13)
