# FumeMac R11 — AI Intelligence

## Theme
Bring the power of a local LLM to personal knowledge management so users can query, summarize, and auto-organize their notes intelligently.

## Features
- **On-Device LLM Q&A** — Ask natural-language questions against your notes ("When did I last discuss AI regulation?") and receive concise answers with source citations
- **Semantic Search** — Beyond keyword matching: embed notes using an on-device embedding model and retrieve by semantic similarity; handles paraphrased queries
- **AI Summarization of Articles** — Paste or link an article URL; LLM generates a 3-bullet summary and a "verdict" rating; saved alongside the source link
- **Automatic Tagging** — On each note save, run NL classification to propose tags/topics; user confirms or dismisses; over time the model learns personal taxonomy

## Technical Notes
- **LocalLLMService:** Bundle a quantized open LLM (e.g., Mistral 7B Q4) via CoreML + MLX or llama.cpp; inference on Apple Silicon GPU
- **EmbeddingService:** On-device sentence-transformer (e.g., `all-MiniLM-L6-v2`) for semantic search; FAISS or SQLite FTS5 index for retrieval
- **SummarizerPipeline:** Two-stage: extractive (lead-3 sentences) + abstractive (LLM rewrite); configurable length
- **AutoTagClassifier:** `NLModel` or fine-tuned on-device classifier trained on user's confirmed tags; stores label mappings in SQLite
