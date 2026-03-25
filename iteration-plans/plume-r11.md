# plume — Round 11: AI Book Recommendations, Reading Intelligence, Social Discovery

## Goal
Transform Plume from a reading tracker into an AI-powered reading intelligence platform — recommending books, analyzing reading patterns, and connecting readers with their next favorite book.

---

## Scope

### AI Book Recommendations
- **Personalized recommendations**: Based on reading history, pace, ratings, abandoned books — AI recommends next reads
- **"Because you read X"**: Explain why each book is recommended
- **Genre exploration**: AI identifies genres you haven't explored enough — "You love sci-fi but haven't tried Chinese sci-fi"
- **Author discovery**: "If you like this author, you'll like X" — follow reading trails through genres
- **Seasonal picks**: AI-curated lists for seasons ("winter reading: intimate character studies")

### Reading Intelligence
- **Reading score**: 0-100 score per book based on pace, completion, notes taken, engagement
- **Reading efficiency**: "You read 45 pages/hour this book — fastest this month"
- **Book difficulty analysis**: AI estimates book difficulty (sentence length, vocabulary, topic complexity)
- **Attention tracking**: Does reading in 15-minute chunks vs. 1-hour sessions affect completion?
- **Monthly reading report**: AI-written summary of your reading month — what you read, patterns, insights

### Reading Social Graph
- **Book clubs**: Join or create book clubs — share highlights, discuss chapters
- **Library sync**: Sync with Open Library API — pull book metadata, covers, descriptions
- **Goodreads import**: Import Goodreads library — bring in all your reading history
- **Reading neighbors**: "People who read what you read also loved X" — collaborative filtering

### Book Discovery
- **ISBN scanning**: Scan book barcode — auto-add with full metadata
- **AI book description**: When metadata is missing, AI generates a description from the first chapter
- **Book preview**: Show first 3 pages of any book before adding to "Want to Read"

---

## Out of Scope
- Social sharing / public reviews (R12)
- Subscription optimization (R13)
