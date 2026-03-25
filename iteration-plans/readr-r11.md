# readr — Round 11: AI Quote Intelligence, Semantic Search, Knowledge Graph

## Goal
Transform Readr from a quote collection tool into an AI-powered knowledge graph — where quotes are connected to ideas, authors, books, and your own thoughts — enabling truly intelligent discovery.

---

## Scope

### AI Quote Intelligence
- **Quote summarization**: AI generates a one-sentence summary of each quote's meaning
- **Concept tagging**: AI auto-tags quotes with key concepts — "freedom", "mortality", "creativity" — without manual tagging
- **Quote clustering**: AI groups related quotes — "These 5 quotes from different books are all about the same theme"
- **"You have X quotes about Y"**: Surface ideas you've been thinking about across books
- **Quote insight**: "You have 12 quotes about time — you're clearly preoccupied with mortality"

### Semantic Search
- **Natural language search**: "Find quotes about letting go" → semantic search returns relevant quotes even if those exact words aren't present
- **Search by meaning**: "Show me quotes about resilience" → all resilience-related quotes
- **Author voice analysis**: "What is Marcus Aurelius's philosophy on death?" → all relevant quotes
- **Cross-book discovery**: "What do all my books say about love?" → synthesized answer

### Knowledge Graph
- **Concept graph**: Visual graph of concepts across your quotes — see how ideas connect
- **Author relationships**: "You have quotes from 8 authors — here are the themes they share"
- **Book connections**: "These 2 books have similar ideas about creativity" — discover connections
- **Discovery paths**: "People who saved this quote also saved X" — collaborative filtering

### On-Device AI
- All AI analysis runs on-device via Core ML — no cloud, no AI API costs
- Privacy-first: your intellectual life never leaves your device
- User can disable any analysis layer in Settings

---

## Out of Scope
- Social features / shared collections (R12)
- Export and citation features (R12)
