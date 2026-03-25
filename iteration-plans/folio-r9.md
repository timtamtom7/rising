# FOLIO — R9: AI Summaries, Predictive Fetch, Advanced Analytics

## Overview
R9 integrates on-device AI for article summarization, predictive feed fetching based on update patterns, and comprehensive reading analytics dashboards.

## New Functionality

### F46: AI Article Summaries
- On-device summarization using Apple Silicon Neural Engine
- Use `NaturalLanguage` framework + custom model for summarization
- Summary lengths: 1 sentence, 3 sentences, paragraph
- "Summary" tab in reader next to full content
- TL;DR badge on articles list for long articles
- Summary generated on first open (cached in SQLite)
- `ArticleSummary` table: `articleId`, `summary1`, `summary3`, `summaryPara`, `generatedAt`
- Falls back to first 3 sentences if AI unavailable

### F47: Smart Article Routing
- AI classifies articles into categories automatically
- Suggest category based on content (shown as "Suggested: Tech")
- "Fast Read" mode: filter to articles < 5 min read
- "Deep Dive" mode: filter to articles > 10 min read
- Article importance score (1-10) based on content analysis
- Sort by importance score option
- Routing model: custom `ArticleRouter` using `NaturalLanguage` framework

### F48: Predictive Feed Fetching
- Learn feed update patterns (ML model on update timestamps)
- Predict next update time for each feed
- Pre-fetch feeds 5 minutes before predicted update
- Confidence indicator: Low / Medium / High based on pattern strength
- `FeedUpdatePrediction` model: `feedId`, `predictedAt`, `confidence`, `patternType`
- Override predictions manually per feed
- Pattern learning: after 14 days of data, predictions become actionable
- `PredictiveFetchScheduler` background task

### F49: Reading Analytics Dashboard
- Weekly/monthly reading reports
- Charts: articles read per day, reading time per feed, favorite feeds
- Reading streaks (consecutive days with reading activity)
- Export analytics as PDF report
- "Year in Reading" annual summary (December)
- Privacy mode: analytics are 100% local, never transmitted
- Dashboard view: `View > Reading Analytics` (⌘⇧A)
- Charts built with Swift Charts (native, no dependency)

### F50: Content Deduplication
- Detect duplicate articles (same content from different feeds)
- URL normalization: strip query params, trailing slashes
- Content hash (SHA256) for semantic deduplication
- "X duplicates merged" indicator
- Duplicate detection on import: if exact match, skip
- Manual merge for near-duplicates (user confirms)

### F51: Offline Reading Mode
- Download full content for offline reading
- "Available Offline" toggle per feed (download all new articles)
- Storage management: show cache size, clear old articles
- `DownloadedContent` table: `articleId`, `localPath`, `downloadedAt`, `sizeBytes`
- Automatic cleanup: delete downloaded content after 7 days (configurable)
- Works completely offline after initial sync

### F52: Accessibility Improvements
- Dynamic Type support throughout (all text scales)
- Reduce Motion support (disable animations)
- High contrast mode
- VoiceOver improvements: custom actions, live regions for new articles
- Switch Control support
- Full keyboard navigation (already R3, but audit and polish)

## Database Additions
```sql
CREATE TABLE article_summaries (
    article_id TEXT PRIMARY KEY REFERENCES articles(id) ON DELETE CASCADE,
    summary_short TEXT,
    summary_medium TEXT,
    summary_long TEXT,
    importance_score REAL,
    language_code TEXT,
    generated_at TEXT NOT NULL
);

CREATE TABLE feed_predictions (
    feed_id TEXT PRIMARY KEY REFERENCES feeds(id) ON DELETE CASCADE,
    predicted_hour INTEGER,
    predicted_minute INTEGER,
    confidence REAL,
    pattern_type TEXT,    -- 'daily', 'hourly', 'twice-daily', 'weekly'
    updated_at TEXT NOT NULL
);

CREATE TABLE reading_analytics (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    articles_read INTEGER NOT NULL DEFAULT 0,
    minutes_read INTEGER NOT NULL DEFAULT 0,
    feeds_visited INTEGER NOT NULL DEFAULT 0,
    streak_day INTEGER
);

CREATE TABLE downloaded_content (
    article_id TEXT PRIMARY KEY REFERENCES articles(id) ON DELETE CASCADE,
    local_path TEXT NOT NULL,
    downloaded_at TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    last_accessed_at TEXT
);
```

## AI/ML Stack
```swift
// Summarization pipeline
struct SummarizationPipeline {
    let tokenizer: NLTokenizer
    let model: NLModel?           // custom summarization model (.mlmodel)
    let translator: NMTTranslator
    
    func summarize(_ text: String, length: SummaryLength) -> String
    func estimateReadingTime(_ text: String) -> TimeInterval
    func calculateImportance(_ article: Article) -> Double
}

// Prediction model (Core ML)
struct FeedPredictionModel {
    let model: MLModel   // trained on historical update times
    
    func predictNextUpdate(for feed: Feed, history: [Date]) -> Date
}
```

## File Structure Additions
```
FOLIO/
├── Services/
│   ├── SummarizationService.swift
│   ├── ArticleRouter.swift
│   ├── PredictiveFetchService.swift
│   ├── AnalyticsService.swift
│   ├── DeduplicationService.swift
│   └── OfflineContentService.swift
├── Views/
│   ├── ReadingAnalyticsDashboard.swift
│   ├── AnalyticsChartView.swift
│   ├── FeedPredictionView.swift
│   ├── OfflineContentManager.swift
│   └── StorageUsageView.swift
├── ViewModels/
│   ├── AnalyticsViewModel.swift
│   └── OfflineViewModel.swift
├── Models/
│   ├── ArticleSummary.swift
│   ├── FeedPrediction.swift
│   ├── ReadingAnalytics.swift
│   └── DownloadedContent.swift
└── Resources/
    └── FeedPredictionModel.mlmodel
```

## Success Criteria
- [ ] AI summary generates in under 2 seconds
- [ ] Summary accuracy is reasonable (catches main points)
- [ ] Article routing suggestions are relevant
- [ ] Feed predictions become accurate after 14 days
- [ ] Analytics dashboard shows correct data
- [ ] Reading streak counts correctly
- [ ] Duplicate detection catches known duplicates
- [ ] Offline mode works without network
- [ ] Cache can be cleared manually
- [ ] Dynamic Type scales all UI elements
