# Caliber — R11: Advanced ML & Smart Review Scheduling

## Goal
Bring on-device ML to Caliber for intelligent spaced repetition, review scheduling optimization, and reading difficulty analysis.

---

## Scope

### Intelligent Spaced Repetition
- On-device ML model optimizes review intervals based on:
  - Historical retention rates per card
  - Time of day effects on recall
  - Card difficulty progression
  - User's overall learning curve
- Algorithm adapts: some cards need daily review, others monthly
- "Hard" cards surface more often than "Easy" cards based on predicted forgetting curve

### Reading Level Analysis
- ML analyzes text complexity of imported articles/book excerpts
- Estimated reading level (Flesch-Kincaid, Lexile equivalent)
- Sentence length / vocabulary complexity breakdown
- Suggest simplified versions for language learners

### Learning Pattern Insights
- Track which types of cards you remember best (visual, text, cloze)
- Suggest card type adjustments: "You recall visual cards 40% better"
- Learning efficiency score over time
- "Optimal review time" suggestion based on your historical performance

### Smart Card Generation
- AI-assisted card creation from article text
- Auto-generate cloze deletions from key sentences
- Suggest card variations from existing cards (paraphrasing)
- Detect duplicate cards and suggest merging

### Cross-Subject Connections
- ML identifies concepts that bridge different subjects/decks
- Suggest "bridge cards" that connect related topics
- Highlight when learning in one area could reinforce another

---

## Out of Scope
- Multi-user collaborative learning (covered in R12)
- Real-time web scraping for news articles
- Automatic translation of cards
