# MarginMac R11 — AI Reflection

## Theme
Deploy AI to discover patterns across micro-reflections, synthesize weekly emotional weather reports, and surface recurring thoughts.

## Features
- **Pattern Detection Across Reflections** — Analyze all micro-reflections (quick journaling prompts, one-liners) over weeks/months; detect recurring themes ("you've mentioned feeling overwhelmed at work 8 times this month"), emotional trends, and trigger detection
- **Weekly Synthesis** — AI-generated "weekly reflection digest": key themes, emotional arc (chart), standout moments, growth edges, and a prompted reflection question for the week ahead
- **"You've Been Thinking About X a Lot"** — Real-time notification: after 3+ reflections mentioning the same topic within a week, surface a gentle nudge ("You've mentioned 'career direction' 5 times — want to explore that deeper?")
- **Emotional Weather Forecast** — Based on reflection tone, recency, and stated upcoming events, predict the emotional "weather" for the next 3 days; gentle preparation, not a guarantee ("Your reflections suggest a potentially stressful week — consider scheduling a break Wednesday")

## Technical Notes
- **ReflectionStore:** SQLite storage for micro-reflections with timestamp, mood tag, and full text; encrypted at rest using Data Protection
- **PatternMiningEngine:** Topic modeling (LDA or embedding-based clustering) over reflection corpus; frequency + recency weighting; threshold for "mentioned a lot" is adaptive per user baseline
- **WeeklyDigestGenerator:** LLM-generated digest from structured input (themes, mood scores, event mentions, standout quotes); tone is warm, non-judgmental, encouraging
- **WeatherForecastModel:** Simple classifier or rule-based forecast using: reflection sentiment scores (last 7 days), upcoming calendar events (if connected), time-of-year (seasonal adjustment factor); confidence interval displayed
