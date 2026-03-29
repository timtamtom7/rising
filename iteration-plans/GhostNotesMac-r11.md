# GhostNotesMac R11 — AI Curation

## Theme
Let AI actively surface key insights from articles, generate instant summaries, and help users extract maximum value from their reading queue.

## Features
- **AI Insight Surfacing** — On article save, the AI extracts: key claims, supporting evidence, open questions, and "what this means for you" — presented as structured insight cards
- **Automatic Summary Cards** — Every saved article gets a summary card (title, 3-sentence summary, estimated read time, difficulty level); surfaced in reading queue and search results
- **"Read This in 3 Minutes" Mode** — One-tap compression: AI distills any article to its essential argument and 3 key takeaways; ideal for triage of a large reading queue
- **Reading Progress Memory** — If an article is abandoned mid-read, GhostNotesMac remembers scroll position, highlights made, and prompts to resume later

## Technical Notes
- **SummarizerPipeline:** Two-stage: extractive headline extraction (TextRank or lead-3) + abstractive LLM rewrite; configurable length (3 sentences, 30-second read, full)
- **InsightExtractor:** Prompt-based extraction using a structured output schema (claims, evidence, questions, implications); runs asynchronously on save
- **ArticleStorage:** Parse and store articles as clean HTML/text; `Readability`-style extractor for web content; fallback to og:description if parse fails
- **ProgressTracker:** Track scroll percentage per URL + timestamp in SQLite; resume prompt triggered when article re-opened after >24h and < 90% read
