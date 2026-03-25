# Wade — Round 6: Polish, Stability & Depth

## Context
Fix reported crashes/UI issues and push every screen to genuinely excellent quality.

---

## Fixes & Stability
- Clean build, no errors
- Fix signing configuration
- All force unwraps → safe alternatives
- SQLite resolves correctly for simulator
- Conversation AI — responses accurate and helpful

---

## Design & UI Polish

### Conversation UI
- Messages send and display correctly
- AI responses render in cards
- Budget alerts — clear, not alarming
- Weekly summary — readable, chart accurate

### Transaction List
- Transactions listed with merchant, amount, category
- Filter by category/date works
- Search works
- Tap → transaction detail

### Transaction Detail
- Category, amount, date all correct
- Edit category works
- Delete → confirm dialog
- Note attached shows

### Budget View
- Monthly budget ring accurate
- Category breakdown chart correct
- Over budget → red warning clear
- Budget set → save works

### Export
- CSV export — correct format
- PDF report — formatted correctly
- QuickBooks export — correct fields
- Year summary — all data accurate

### AI Insights
- Insights specific and actionable
- Shared wallet — balances correct
- "We spent" queries → accurate data
- Savings suggestions — realistic

### Shared Wallet
- Members listed with balances
- Split correctly calculated
- Settlement suggestions work
- Add transaction → shared split works

---

## Edge Cases
- No transactions → empty state
- Budget not set → prompt to set
- Shared wallet with 1 person → handled
- AI gives bad advice → disclaimer shown

---

## Custom Graphics (R6)
- App icon
- Empty state illustrations
- Budget ring design
- Shared wallet card design
