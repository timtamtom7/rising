# BunkerMac R11 — AI Advisor

## Theme
Deploy an AI decision advisor that simulates outcomes, generates scenarios, and actively challenges assumptions to improve decision quality.

## Features
- **AI Decision Advisor** — Present a decision context (options, stakes, timeline); AI returns a structured analysis: trade-offs, risks, second-order effects, and a confidence-weighted recommendation
- **Outcome Simulation** — Monte Carlo-style simulation: model each option against 100+ randomized scenarios; return probability distributions of outcomes rather than point estimates
- **Scenario Generator** — Given a decision, AI auto-generates 3-5 plausible future scenarios ("What if interest rates spike?", "What if the key hire doesn't work out?"); each scenario scored against your stated goals
- **Assumption Challenger** — AI actively surfaces hidden assumptions: "You assume the market will grow 20%. What's your basis? Here are 3 cases where similar assumptions failed." Forces explicit belief articulation

## Technical Notes
- **AdvisorLLMService:** Use a structured output-capable local LLM (JSON mode) to produce decision analyses in a typed schema; temperature tuned for balanced, not sycophantic, output
- **SimulationEngine:** Lightweight scenario engine using parameter perturbation + rule-based outcome scoring; no heavy external model needed; configurable simulation count
- **AssumptionExtractor:** Prompt-based extraction from user's decision description to identify unstated assumptions; backed by NL framework for entity/relation extraction
- **DecisionStorage:** SQLite schema for decisions, options, simulations, and assumptions; linked to user's decision journal for future reference
