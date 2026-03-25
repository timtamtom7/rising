# Nimbus — R11: Advanced ML & Smart Summarization

## Goal
Bring on-device ML to Nimbus for intelligent note summarization, topic clustering, and writing assistance.

---

## Scope

### Intelligent Summarization
- On-device ML model generates summaries of long notes
- Configurable summary length: brief (3 sentences), standard (paragraph), detailed (bullet points)
- Summary updates automatically as note changes
- "TL;DR" banner at top of long notes

### Topic Clustering
- ML automatically clusters notes by topic
- Cluster view: notes grouped by theme, not just folder
- Discover related notes: "Notes similar to this one"
- Topic labels auto-generated (editable)
- "You have 12 notes about Project X across 3 folders — want to consolidate?"

### Writing Assistance
- Grammar and style suggestions (on-device, like Apple Write)
- Clarity improvements: "This sentence is complex — here are simpler alternatives"
- Readability score based on Flesch-Kincaid
- "This paragraph sounds like an email — want to make it more concise?"

### Smart Linking
- Detect when one note mentions another and suggest linking
- "This note mentions 'Q4 Planning' — want to link to that note?"
- Backlinks: see all notes that link to current note
- Graph view of note connections

### Search Enhancement
- Semantic search: find notes by meaning, not just keywords
- "Find notes about budget meetings" → understands context
- Search within PDFs and scanned documents (OCR + semantic indexing)
- Search suggestions based on calendar events

---

## Out of Scope
- Cloud-based LLM inference
- Real-time collaborative writing
- Automatic meeting note generation from audio
