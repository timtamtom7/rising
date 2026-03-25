# Shelf — R11: AI Integration, Smarter Features, Deeper System Integration

## Goal
Add AI-powered smart suggestions, usage prediction, and enhanced Shortcuts integration for Shelf's Round 2.

## Scope

### AI Smart Suggestions
- **Usage Prediction**: Predict which apps user will open based on time of day and recent usage
- **Smart App Ranking**: Reorder menu bar items based on predicted usage
- **Auto-hide Suggestions**: Suggest hiding items user hasn't used in N days

### AI Clipboard Intelligence
- **Smart Clipboard History**: AI-powered clipboard categorization and search
- **Duplicate Detection**: Detect duplicate clipboard entries
- **Intelligent Pinning**: Suggest pins based on reuse patterns

### AI Search Enhancements
- **Semantic Search**: Use NaturalLanguage framework for smarter search
- **Search Ranking**: Rank results by relevance + predicted importance

### File Structure Additions
```
Shelf/
├── AI/
│   ├── UsagePredictionEngine.swift   (App usage prediction)
│   ├── ClipboardIntelligence.swift   (Smart clipboard)
│   └── SemanticSearchEngine.swift     (NL-based search)
```

### Shortcuts Integration (already exists - enhance)
- Add "Launch Recent App in Shelf" intent
- Add "Search Shelf" intent
- Add "Get Clipboard History" intent

## Build & Commit
```bash
cd /Users/mauriello/Dev/shelf-macos
xcodegen generate && xcodebuild -scheme Shelf -configuration Release build CODE_SIGN_IDENTITY="-" 2>&1 | tail -5
git add -A && git commit -m "Round 11: AI usage prediction, clipboard intelligence, semantic search"
TOKEN=$(gh auth token) && git push
```
