# Drift — R12 Iteration Plan

## Focus
**AI Sleep Insights & Personalized Recommendations**

## Goals
- Build the AI Insight Service that analyzes sleep patterns and generates 3 personalized tips per week
- Weekly Report generation: summarize 7 days of sleep, compare to prior week, highlight anomalies
- Implement the `SleepInsight` model with categories: Consistency, Duration, Stage Quality, Lifestyle
- Add "Sleep Score Breakdown" detail view showing contribution of each factor

## Technical Details
- `AIInsightService`: Use local ML models or API (OpenAI) to generate insights based on `WeeklyReport` data
- `WeeklyReportService`: Aggregate `SleepRecord[]` into a structured report
- Store reports in SQLite (already have SQLite.swift dependency)
- `SleepInsight` model categories: `consistency`, `duration`, `stageQuality`, `lifestyle`, `趋势`

## UI Updates
- **Insights Tab**: Card-based layout, 3 insight cards per week with icon, title, body
- **Weekly Report View**: Summary stats + bar chart comparison vs prior week
- **Score Breakdown**: Expandable ring showing contribution weights

## Dependencies
- SQLite.swift (already in project)
- OpenAI API key or on-device ML

## Milestones
- [ ] WeeklyReportService
- [ ] AIInsightService (MVP with rule-based insights)
- [ ] Insights tab in iOS app
- [ ] Weekly report card in macOS app
- [ ] Score breakdown detail view

## Notes
- Keep AI insights private — no data leaves device unless user opts in
- Consider using Apple's `TextRecognition` or `NaturalLanguage` framework for local analysis
