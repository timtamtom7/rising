# GrappleMac R11 — AI Sparring

## Theme
Deploy an AI debate opponent that challenges users with counter-arguments, surfaces logical fallacies, and runs structured debate rounds.

## Features
- **AI Debate Opponent** — State your argument; the AI plays the opposing side with a well-structured counter-position, citing realistic (but cited) reasoning
- **Counter-Argument Generator** — Given any claim, generate 3 strongest counter-arguments ranked by logical force; highlights weak points in the user's original framing
- **Logical Fallacy Detector** — Real-time analysis of debate text; flags specific fallacies (straw man, ad hominem, false dilemma, slippery slope, etc.) with inline annotations and brief explanations
- **Structured Debate Rounds** — Time-boxed debate format: opening statement (2 min) → counter-argument (2 min) → rebuttal (1 min) → closing (1 min); AI moderates and enforces time limits

## Technical Notes
- **DebateLLMService:** Use a local LLM with system prompt engineering for the "opponent" persona; structured output (JSON) for fallacies and counter-arguments
- **FallacyClassifier:** Fine-tuned NL classifier or rule-based detector for common fallacies; labels each detected fallacy with type + explanation
- **DebateSessionManager:** State machine managing debate phases (opening, counter, rebuttal, closing); timer enforcement; session transcript saved to SQLite
- **ArgumentGraphBuilder:** Build a directed graph of claims and their supporting/subverting relationships as the debate progresses; used for both the AI opponent and the user
