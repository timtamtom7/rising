# CrispMac R11 — AI Organization

## Theme
Use AI to automatically organize, categorize, and extract actionable items from voice notes with minimal user effort.

## Features
- **AI Topic Organization** — Transcribe voice notes via on-device Speech framework; AI then groups notes by topic cluster (work, personal, project, ideas) and labels each cluster automatically
- **Automatic Themes and Tags** — On each transcription, the AI extracts 3-5 relevant tags and proposes a theme label; user confirms/edits once and the model learns preferences over time
- **Smart Reminders from Voice** — Detect action items ("I need to call Dr. Patel by Friday") in transcription; prompt user "Create a reminder for this?" with pre-filled details; supports due dates, locations, and notes
- **Search Across All Notes** — Full-text search with semantic understanding (use embedding-based retrieval); finds "that idea about reducing friction in onboarding" even if those exact words weren't spoken

## Technical Notes
- **SpeechTranscription:** `SFSpeechRecognizer` for on-device transcription (available in macOS 13+); fallback to server-based if offline for >30s
- **TopicClustering:** Use embeddings (on-device sentence transformer) + K-means clustering on transcription vectors; cluster count adaptive per data size; assign labels via LLM description of centroid
- **ActionItemDetector:** Prompt-based extraction using local LLM; identifies task-like utterances and parses into structured reminder fields (who, what, when, where)
- **SemanticSearchIndex:** FAISS or SQLite VSS index of transcription embeddings; re-indexed on each new note; similarity search returns top-k with timestamp offsets
