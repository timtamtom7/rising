# GraftMac R11 — AI Coaching

## Theme
Use AI to act as an always-available practice coach that adapts to the user's skill-building patterns and detects optimal practice moments.

## Features
- **AI Practice Coach** — Conversational AI module that asks about today's practice goals, reviews session logs, and gives targeted advice ("You tend to rush scales — try a 60bpm countdown timer this week")
- **Flow State Detection** — Combine keystroke/mouse cadence, time-on-task, and self-reported focus signals via an on-device ML model to detect when the user is in a flow state; suggest extending sessions
- **Adaptive Session Recommendations** — Analyze historical sessions (duration, skill area, self-rated difficulty) to suggest next session type and length; avoid over-practicing the same skill
- **Pattern-Based Focus Suggestions** — Identify recurring patterns: "Your best practice sessions are 25 min, Tuesday mornings, after a walk" and surface them proactively

## Technical Notes
- **CoachService (AI):** Integrate a local LLM (e.g., llama.cpp via CoreML or Apple Silicon optimized model) for coach persona; keep all conversation data on-device
- **FlowMLModel:** Core ML classifier using sensor + interaction features to score flow probability; retrained periodically on user data
- **RecommendationsEngine:** Rules-based + lightweight ML hybrid that generates session suggestions from historical SQLite data
- **SessionAnalytics:** New `SessionAnalyzer` aggregates data and feeds both the coach and the flow model
