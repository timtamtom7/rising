# Pulse — R9: App Store Metadata, Screenshots, Setapp Packaging, Notarization

## Goal
Prepare Pulse for distribution: App Store listing with metadata and screenshots, Setapp packaging, notarization via Apple's developer pipeline, and hardened runtime configuration.

---

## Scope

### App Store Connect Setup
- Create developer account entry (if not already)
- Bundle ID: `com.pulse.app`
- Category: Utilities → System Utilities
- Pricing: Free (with optional "Pro" features via Setapp or IAP — document in metadata)
- Age rating: 4+ (no age restrictions)
- Privacy manifest (`PrivacyInfo.xcprivacy`):
  - `NSPrivacyAccessedAPITypes`: `UserDefaults` (no tracking), Darwin stats (no personal data)
  - `NSPrivacyCollectedDataTypes`: none (app does not collect personal data)
  - `NSPrivacyTracking`: false

### App Store Metadata
- **App name**: Pulse — System Monitor
- **Subtitle**: System stats at a glance
- **Description** (App Store formatting with paragraphs and bullets):
  ```
  Pulse keeps you informed about your Mac's performance without interrupting your workflow.
  
  • Live CPU, RAM, and disk usage in your menu bar
  • Temperature monitoring for CPU, GPU, and battery
  • Network activity with real-time upload/download speeds
  • 24-hour historical graphs
  • Customizable metrics and refresh rates
  • macOS Notifications for high resource usage
  • Widgets for your desktop
  
  Your data stays on your Mac. Pulse doesn't collect, share, or sell any personal information.
  ```
- **Keywords**: macos, system monitor, cpu, ram, memory, disk, temperature, menubar, stats, performance
- **Marketing URL**: landing page (placeholder if not yet live)
- **Support URL**: link to GitHub Issues or support email
- **Version**: 1.0.0

### Screenshots
- Required sizes:
  - macOS (Retina): 1280×800, 2880×1800
  - Menu bar apps: show the menu bar + popover clearly
- 5 screenshots:
  1. Menu bar (compact mode) + popover with all stats
  2. Wide menu bar mode
  3. History graphs (7-day view)
  4. Settings panel
  5. Widgets on desktop (large + medium + small)
- Use device frames: MacBook Pro 14" and 16" frames
- Dark mode screenshot variant required
- Localized screenshots not required for initial launch

### Setapp Packaging
- Setapp: `setapp.com` — subscription Mac app marketplace
- Requirements:
  - DMG installer or `.app` bundle
  - No code signing requirements (Setapp signs)
  - Setapp SDK integration: `SetappSDK` pod (if required by Setapp)
  - License activation via Setapp's own system
  - Submit as `.pkg` for Setapp's pipeline
- Setapp metadata: description, screenshots, 2–3 bullet points (differ from App Store)
- Note: Setapp and App Store can coexist — not mutually exclusive

### Notarization & Hardened Runtime
- **Hardened Runtime**: enabled in Xcode Signing & Capabilities
  - Exception: `com.apple.security.automation.apple-events` (for Shortcuts integration)
- **Notarization**: submit via `xcrun notarytool`
  - Required for distribution outside the Mac App Store
  - Staple the notarization ticket to the `.app` bundle
  - CI/CD: integrate into Xcode Cloud or GitHub Actions
- **Signing**:
  - Developer ID Application certificate
  - Target: `com.pulse.app`
  - Development: individual Apple Developer account
  - Distribution: either App Store or Developer ID (for direct distribution)
- **Entitlements**:
  ```xml
  com.apple.security.app-sandbox: false (required for system stats access)
  com.apple.security.automation.apple-events: true
  com.apple.security.temporary-exception.apple-events: com.apple.systemevents
  ```

### Distribution Artifacts
- **Direct distribution**: signed + notarized `.dmg` with app bundle
- **App Store**: `.pkg` or `.app` via Xcode Organizer
- **Setapp**: `.pkg` via Setapp portal
- **GitHub Releases**: attach signed `.zip` with release notes

---

## Out of Scope (R10)
- Localization (beyond English)
- Privacy policy hosting
- Post-launch monitoring and crash reporting
- Ongoing maintenance
