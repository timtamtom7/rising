# Chronicle — R11: AI Integration, Smarter Features, Deeper System Integration

## Goal
Add AI-powered bill prediction, smart categorization, anomaly detection, and deeper system integration for Chronicle's Round 2.

---

## Scope

### AI Bill Prediction Engine
- **Smart Due Date Prediction**: Use local ML (CoreML/MLCompute) to predict optimal payment dates based on historical payment patterns
- **Cash Flow Analysis**: AI-powered insights on upcoming bills vs. available funds
- **Predictive Reminders**: Instead of fixed reminders, intelligent reminders that adapt to user's past behavior (e.g., "You typically pay X within 3 days of receiving notification")
- Model: Train a simple time-series model on payment history stored locally in SQLite
- Privacy: All ML inference runs on-device, no data leaves the Mac

### AI Bill Categorization
- **Auto-Categorization**: Use text analysis to automatically categorize new bills based on name/vendor
- **Category Suggestions**: When adding a bill, suggest a category based on similar past bills
- **Learning**: As user corrects categories, the model improves
- Implementation: Use `NaturalLanguage` framework for vendor name embedding + simple k-NN classifier

### Smart Bill Duplicate Detection
- **Duplicate Alert**: Warn when adding a bill that looks similar to an existing one (same vendor, similar amount, nearby date)
- **Merge Suggestions**: Propose merging duplicate recurring bills

### Deeper System Integration

#### Focus Integration
- Integrate with macOS Focus modes: suppress non-urgent bill notifications when "Do Not Disturb" or Work Focus is active
- Respect `NSUserNotification` delivery settings

#### Shortcuts Integration (Enhanced)
- New Shortcuts actions:
  - "Get Upcoming Bills" → returns list of bills due in next N days
  - "Add Bill to Chronicle" → creates a new bill entry
  - "Pay Bill" → marks a bill as paid
  - "Get Total Monthly Bills" → returns sum of bills for current month
- Use `Intents` framework for Shortcuts integration

#### Widget Improvements (macOS 14+)
- Add widget configuration: allow users to select which bills to display
- Smart widget: show the most urgent upcoming bill with amount

#### Siri Suggestions
- When Siri detects user is asking about bills, surface relevant Chronicle data

### Proactive Budget Alerts
- AI-powered alerts when bill patterns suggest budget will be exceeded
- Monthly summary notification with AI-generated insights ("You typically spend $X on utilities — you're at $Y so far this month")

### File Structure Additions
```
Chronicle/
├── AI/
│   ├── BillPredictionModel.swift      (CoreML model wrapper)
│   ├── CategorizationEngine.swift      (NL-based categorizer)
│   ├── DuplicateDetector.swift         (Similarity-based duplicate detection)
│   └── InsightsGenerator.swift         (Text generation for insights)
├── Intents/
│   ├── GetUpcomingBillsIntent.swift
│   ├── AddBillIntent.swift
│   └── PayBillIntent.swift
└── Services/
    └── AIInsightsService.swift
```

### Shortcuts App Integration
- Add Intent Extension target for Shortcuts
- Define App Intents using the modern `@AppIntents` macro (macOS 13+)
- Export Intents: `GetUpcomingBills`, `AddBill`, `MarkBillPaid`, `GetMonthlyTotal`

### Localization for AI Strings
- All AI-generated insights strings must be localizable
- Use `String(localized:)` for all user-facing AI text

---

## Build & Commit
```bash
cd /Users/mauriello/Dev/chronicle-macos
xcodegen generate && xcodebuild -scheme Chronicle -configuration Release build CODE_SIGN_IDENTITY="-" 2>&1 | tail -10
git add -A && git commit -m "Round 11: AI bill prediction, smart categorization, Shortcuts integration"
TOKEN=$(gh auth token) && git push
```
