# Blink — Iteration R11: AI Video Moments & Smart Categories

## Goal
Add AI-powered intelligence to Blink: auto-detect meaningful moments, group clips by theme/location/people, and surface the best memories.

---

## Feature List

### R11.1 — AI Moment Detection
- Use Vision framework to analyze each clip on capture
- Detect: faces, speech activity, scene type (indoor/outdoor/celebration)
- Tag each video with metadata (faces count, dominant scene, mood score)
- Run analysis in background after recording completes

### R11.2 — Smart Categories
- **People** — group clips with same face(s) detected
- **Celebrations** — birthdays, holidays, events (scene + audio detection)
- **Travel** — clips taken away from usual location pattern
- **Quiet Days** — low speech activity, calm scenes
- **Best Moments** — top 10 clips by "memorability score" (speech clarity + scene variety)
- Category filters in calendar view

### R11.3 — Monthly Memory Reel
- Auto-generate a "monthly reel" — 60-second montage of best moments
- Use AVFoundation to stitch clips together
- Available at end of each month
- Stored alongside regular clips

### R11.4 — Smart Search
- Natural language search across video metadata
- "Show me birthday moments from last year"
- "Find clips with [person name]" (after manual tagging)

---

## Technical Approach
- **Vision framework** (`VNRecognizeAnimalsRequest`, `VNDetectFaceRectanglesRequest`)
- **Speech detection** via `AVAudioEngine` analysis or `SFSpeechRecognizer`
- **ML model** for scene classification (built-in `VNClassifyImageRequest`)
- **Core Data** or **SQLite.swift** for metadata storage (video metadata DB alongside files)
- **AVFoundation** for video stitching (`AVMutableComposition`)

---

## UI Changes
- New "Categories" tab in sidebar: People, Celebrations, Travel, Quiet, Best
- Each category shows filtered video grid
- Monthly reel appears as special card at top of Calendar for current month

---

## Milestones
- [ ] Vision analysis pipeline (R11.1)
- [ ] Smart categories (R11.2)
- [ ] Monthly reel generation (R11.3)
- [ ] Smart search UI (R11.4)
