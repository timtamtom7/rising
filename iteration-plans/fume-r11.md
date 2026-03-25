# fume — Round 11: On-Device AI, Knowledge Graph, Semantic Search

## Goal
Transform Fume into a personal knowledge intelligence engine — using on-device ML to build a semantic knowledge graph that connects ideas across all your sources, enabling truly intelligent search and discovery.

---

## Scope

### On-Device AI Engine
- **Core ML integration**: All AI analysis runs on-device — no cloud AI API calls
- **Source embedding**: Each source is processed into an embedding vector stored locally (using Apple's Natural Language framework or custom Core ML model)
- **Semantic search**: Search by meaning, not keywords — "find notes about creative work" returns sources about creative projects, artistic endeavors, innovation
- **Privacy-first**: No data ever leaves the device for AI analysis

### Knowledge Graph
- **Concept graph**: AI identifies key concepts in your sources and links them — "Philosophy" connects to "stoicism", "ethics", "Marcus Aurelius"
- **Source relationships**: Visual graph showing which sources discuss the same concepts
- **Discovery paths**: "People who saved this also saved..." — recommend sources based on your graph
- **Clustering**: Auto-group sources into topic clusters (visualized as a force-directed graph)

### Advanced Note Features
- **Block-level notes**: Highlight specific paragraphs/sections within a source — not just a note about the whole source
- **Inline comments**: Add comments at the paragraph level — like margin notes in a book
- **Voice notes**: Record a voice note that links to a specific source or paragraph
- **Drawing/annotation**: Apple Pencil support for handwriting on iPad

### Multi-Modal Sources
- **Audio file support**: Import MP3, M4A — AI transcribes and indexes the content
- **Video support**: Import video — AI extracts transcript and key frames
- **Image OCR**: Import images with text — extract and index via Vision framework

---

## Out of Scope
- Social features / shared libraries (R12)
- Platform expansion (Android, web) (R13)
