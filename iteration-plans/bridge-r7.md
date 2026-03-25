# Bridge — R7: Internationalization, Localization, Cloud Storage Expansion

## Goal
Prepare Bridge for international audiences and expand backup destination options.

---

## Scope

### Internationalization (i18n)
- All user-facing strings externalized to `.strings` files
- Base localization: English (en)
- Localizable.strings structured by feature (Messages.strings, Photos.strings, Settings.strings)
- Pluralization rules via `.stringsdict` format
- Date, time, number formatting via `DateFormatter`, `NumberFormatter` with locale awareness
- Currency display for backup storage sizes (GB, TB vs GiB, TiB)
- RTL layout support via `.layoutDirection`

### Localization — Phase 1
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Portuguese (pt-BR)
- Japanese (ja)
- Chinese Simplified (zh-Hans)
- Use `genstrings` to extract strings; crowdin or manual translation
- Date formats adapt per locale

### Cloud Storage Destinations
- Add backup destination options beyond local:
  - **Google Drive**: OAuth2 flow, upload backup archives, list/manage from Bridge
  - **Dropbox**: OAuth2, same pattern
  - **S3-compatible**: endpoint URL + access key/secret, upload via AWS SDK
- Destination settings in Preferences with connection status
- Per-destination free/used quota display
- Encrypted upload (still AES-256 before upload; cloud provider never sees plaintext)

### Cloud Restore
- Browse backed-up files in cloud storage directly from Bridge
- Selective restore from any cloud backup point
- Download + decrypt to local, then restore to device

### Network Resilience
- Bandwidth-aware sync: slow connection = reduce photo thumbnail quality during preview
- Resume interrupted cloud uploads (multipart upload with checkpointing)
- Verify cloud upload integrity post-transfer

---

## Out of Scope (R8+)
- App Store launch
- Marketing assets
- Press kit
