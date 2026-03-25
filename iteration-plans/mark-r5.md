# Mark R5 — Cloud & iCloud Sync

## Overview
Cloud export (PNG to cloud), iCloud sync of presets.

## Features

### Cloud Export
- [ ] **Upload Provider Interface** — Abstract upload API (plug-in style)
- [ ] **Implements: Imgur** — Anonymous image upload to Imgur
- [ ] **Share Link** — Copy share URL to clipboard after upload

### iCloud Sync
- [ ] **Presets Sync** — Sync annotation presets via iCloud Documents
- [ ] **NSUbiquitousKeyValueStore** or **UIDocument** — for preset data
- [ ] **Conflict Resolution** — Last-write-wins or merge strategy

## Technical Approach
- Cloud export: URLSession upload to Imgur API (anonymous or user-auth)
- iCloud: `FileManager.default.url(forUbiquityContainerIdentifier:)`
- Store presets as JSON in iCloud container

## Files to Modify/Create
- `CloudExportService.swift` — upload providers
- `ImgurUploader.swift` — Imgur implementation
- `ICloudSyncService.swift` — iCloud preset sync
- `PresetStore.swift` — update to support iCloud

## Build
```bash
cd /Users/mauriello/Dev/mark-macos
xcodegen generate && xcodebuild -scheme Mark -configuration Debug build 2>&1 | tail -5
```

## Success Criteria
- Annotated image uploads to cloud and share link copies to clipboard
- Presets sync across machines via iCloud
