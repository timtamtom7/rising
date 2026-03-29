# RisingMac R11 — AI Savings

## Theme
Use AI to predict savings trajectory, detect spending patterns, and provide personalized smart goal recommendations.

## Features
- **Savings Trajectory Prediction** — Based on income, recurring expenses, and savings history, predict savings balance at 3/6/12 month horizons; show confidence intervals; alert if current trajectory misses goal
- **Optimal Deposit Suggestions** — Given the user's goal and deadline, suggest a monthly deposit amount; account for irregular income (e.g., "You spent 20% more than usual in March — adjust April target?")
- **Spending Pattern Detection** — Categorize and cluster transactions; detect anomalies (e.g., "You usually spend $80 on groceries but spent $240 this week — flagged"); surface recurring surprise expenses
- **Smart Goal Recommendations** — Based on financial profile and stated goals, AI recommends goal types (emergency fund, vacation, investment cushion) and optimal savings rate; suggests milestones with realistic timelines

## Technical Notes
- **TrajectoryEngine:** Time-series forecasting using a lightweight on-device model (ARIMA or simple ML model); confidence intervals via bootstrap sampling; recalculated on each transaction
- **TransactionCategorizer:** Rule-based + ML hybrid: NL classifier for merchant name → category; user can correct and model retrains locally
- **AnomalyDetector:** Z-score based detection per category; threshold adaptive per user spending history; alerts delivered as actionable notifications
- **GoalAdvisorLLM:** Prompt-based LLM suggestion engine informed by user's transaction data and stated goals; constrained to financially sound advice (no investment recommendations without disclosures)
