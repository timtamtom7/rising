# Chronicle — R5: Export, iCloud Sync (E2E Encrypted), Multiple Currencies

## Goal
Users can export their data, sync across Macs securely, and track bills in different currencies.

---

## Scope

### Multiple Currencies
- Settings: base currency selector (USD, EUR, GBP, CAD, AUD, JPY, CHF, INR, BRL, MXN)
- Each bill can override the base currency with a specific currency
- Bill form: currency picker + amount (both shown, e.g., "€120.00")
- Stored: amount in cents + currency code
- All totals in monthly overview use base currency
- Exchange rates: fetch from exchangerate.host (free, no API key) on app launch and once daily
- Rates cached in `UserDefaults` with timestamp; if fetch fails, use cached rates
- If a bill's currency differs from base currency: show both in the UI (e.g., "€89.99 (~ $97.50)")

### Export
- Settings → Export: generates a `.chronicle-export` file (ZIP containing JSON + optional CSV)
- JSON export: full bill and payment data, all fields
- CSV export: bill name, amount, currency, due date, recurrence, category, paid date (one row per payment record)
- Share sheet (NSSharingServicePicker) to send via email, AirDrop, Files, etc.
- Export includes app version and export date in metadata

### iCloud Sync (E2E Encrypted)
- Optional: opt-in via Settings toggle
- Sync uses CloudKit private database
- **End-to-end encryption:**
  - On first sync: generate a 256-bit symmetric key using `SecRandomCopyBytes`
  - Store key in Keychain (tied to user's Apple ID via `kSecAttrAccessGroup`)
  - All data encrypted with AES-256-GCM before upload to CloudKit
  - Apple never sees plaintext — only encrypted blobs
- Encrypted schema: `id`, `entity_type` ("bill" | "payment"), `encrypted_payload` (Data), `updated_at`
- Conflict resolution: last-write-wins based on `updated_at` timestamp
- Sync status indicator in Settings: "Last synced: 2 min ago" or "Syncing…" or "Sync error"
- Sync runs on: app launch, every 15 minutes, on any local data change (debounced 30s)
- Manual sync button in Settings
- Sync works across Macs (same Apple ID)
- Note in UI: "Your data is encrypted end-to-end. Even Apple cannot read it."

### Sync Key Management
- Key stored in Keychain with `kSecAttrAccessibleAfterFirstUnlock`
- If key is lost (new device, Keychain reset): offer to start fresh or re-enter a recovery key (recovery key flow: user sets a passphrase; derive key via PBKDF2 from passphrase — only practical for users who opt into this complexity)

### Database Schema Migration
- Version field in DB metadata table
- Migration runner on app launch: `applyMigrations(from: Int, to: Int)` handles any schema changes
- Migration files kept as numbered Swift scripts in a `Migrations/` folder

---

## Out of Scope (R6+)
- macOS widgets
- Shortcuts integration
- Calendar export
- App Store assets and launch prep
