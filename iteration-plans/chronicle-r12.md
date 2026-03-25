# Chronicle — R12: Collaboration & Household Sharing

## Goal
Enable Chronicle to be shared across a household for joint bill tracking, roommate splits, and family financial visibility.

---

## Scope

### Household Profiles
- Create a household with shared bill list (stored locally, shared via encrypted peer-to-peer or iCloud Drive)
- Each household member has their own user profile with name and avatar
- Assign bill ownership: who is responsible for each bill
- Bill status visible to all household members in real-time

### Split Bills & Roommate Tracking
- Mark a bill as "split" — divide equally or custom percentages
- Track who has paid their share
- Reminder sent individually to each person who owes
- Running balance: who owes whom within the household
- "Settle up" action — marks debts as resolved

### Household Dashboard
- Combined view: all household bills this month
- Total household bill spend vs. last month
- Who's paid / who hasn't
- Shared payment history log

### Real-Time Sync
- iCloud Drive document-based storage (Core Data with NSPersistentCloudKit or SQLite + CloudKit)
- Changes sync across all household Macs automatically
- Conflict resolution: last-write-wins with manual override option
- Offline-first: full functionality without internet, syncs when available

### Invite via QR Code or Link
- Share household via QR code (scanned via iPhone Camera or Mac webcam)
- Or share via share link for iCloud Drive folder
- Accept invitation on another Mac — household config syncs

---

## Out of Scope
- Bank integration or automated payment
- Credit/debit card tracking
- Multi-currency support
