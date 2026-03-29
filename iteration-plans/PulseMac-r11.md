# PulseMac R11 — AI Insights

## Theme
Leverage on-device ML to surface emotional patterns and deliver personalized mood intelligence from journal and voice data.

## Features
- **On-device emotion ML** — Train a Core ML model on journal entries and voice recordings to detect emotional patterns over time (valence, energy, anxiety, gratitude flags)
- **Weekly AI Mood Report** — Generated summary of the past 7 days: "You felt more anxious on Tuesdays, your gratitude scores peaked Thursday, sleep correlated with Wednesday lows"
- **Personalized Insight Cards** — Context-aware nudges based on combined voice + journal signals: "When you sleep < 6hrs, your anxiety scores double"
- **NaturalLanguage Sentiment Analysis** — Use Apple's NaturalLanguage framework to tag entries with sentiment polarity, emotional keywords, and phrase-level intensity

## Technical Notes
- **MLModel (on-device):** Train/publish a Core ML `.mlmodel` for emotion classification using NLClassification or TabNet; bundle with app
- **NaturalLanguage Service:** `NLTagger` pipeline for sentiment + keyword extraction; no external API calls
- **Insights Engine:** New `InsightsService` composes NL output + time-series into weekly digest JSON
- **Voice Analysis:** `AVSpeechSynthesizer` or `Speech` framework to transcribe voice logs before NL tagging
