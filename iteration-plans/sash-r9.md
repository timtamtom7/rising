# Sash R9 — App Store, Screenshots, Setapp, Notarization

**Tagline:** Ready for the world.

---

## Concept

R9 is about shipping. App Store listing, notarization, Setapp packaging, and all the metadata, screenshots, and compliance work that comes with distributing a paid macOS app. This is the release that goes public.

---

## R9 Scope

**In scope:**
- App Store product page (metadata, screenshots, keywords, categories)
- App Store screenshots (all required sizes and locales)
- Setapp inclusion package
- Notarization and signing pipeline
- Crash reporting and analytics opt-in setup
- Support URL and privacy policy URLs
- In-app "Rate on App Store" / "Send Feedback" actions

**Out of scope:**
- Launch day marketing (R10), localization (R10)

---

## App Store Listing

### Product Page Metadata

**Name:** Sash — Window Manager
**Subtitle:** Snap. Resize. Automate.
**Category:** Utilities
**Primary Category:** Developer Tools
**Secondary Category:** Productivity

**Description:**
```
Sash transforms how you manage windows on macOS. With a single keyboard shortcut, snap any window exactly where you want it — no dragging, no resizing, no wasted pixels.

FEATURES
— 6 snap positions: left half, right half, top half, bottom half, full screen, and center
— Custom zones: define your own regions and save them as shortcuts
— Multi-monitor support: works seamlessly across all your displays
— Window layouts: save and recall complete workspace arrangements
— Space binding: layouts that automatically apply when you switch Spaces
— Window cycling: jump between windows of the same app instantly
— Undo: restore the previous window position with a single key
— AppleScript: automate Sash from Alfred, Keyboard Maestro, or any scripting tool
— iCloud sync: your layouts are available on every Mac you own
— Shortcuts integration: trigger layouts from the Shortcuts app

Sash lives in your menu bar — always there when you need it, invisible when you don't.

Try Sash free for 14 days. Unlock unlimited layouts, custom zones, and iCloud sync with a single in-app purchase.
```

**Marketing keywords (comma-separated, ≤100 chars):**
```
window manager, snap windows, macos utilities, keyboard shortcuts, 
window layout, multi monitor, productivity tools, mac window manager
```

**What's new in this version:**
```
— New: Window opacity control — make windows semi-transparent
— New: Cascade windows with ⌘⌥K
— New: Corner snap shortcuts for all four corners
— New: Widgets for Notification Center
— Improved: Multi-monitor support
— Fixed: Crash when closing app while snap was in progress
```

### Required Screenshots

**All sizes for US English (5.5" Retina = 1284×2778px primary):**

| Size | Use Case |
|------|----------|
| 1284×2778 | iPhone 14 Pro Max (if iOS app, but this is macOS) |
| 2920×2180 | 14" MacBook Pro |
| 2580×1800 | 13" MacBook Pro |
| 2048×1536 | iPad Pro 12.9" (if iOS companion) |

For macOS App Store, screenshot sizes:
```
App Store Mac screenshots:
- 1280×720 (minimum)
- 1440×900 (recommended)
- 2880×1800 (retina)

Required: 2880×1800 screenshot set
```

**Screenshot designs:**

**Screenshot 1 — Main Popover**
```
┌──────────────────────────────────────────────────────────┐
│  [Dark desktop background]                               │
│                                                          │
│  ┌─────────────────────────────┐  ┌──────────────────┐  │
│  │ Sash                        │  │                  │  │
│  │                             │  │  [Browser window]│  │
│  │ SNAP POSITIONS              │  │                  │  │
│  │                             │  │  Snapped to      │  │
│  │ [←] Left Half    ⌘⌥←       │  │  Right Half      │  │
│  │ [→] Right Half   ⌘⌥→       │  │                  │  │
│  │ [↑] Top Half    ⌘⌥↑       │  └──────────────────┘  │
│  │ [↓] Bottom Half ⌘⌥↓       │                        │
│  │ [◉] Center     ⌘⌥C       │                        │
│  │                             │                        │
│  └─────────────────────────────┘                        │
│                                                          │
│  Caption: "Snapped to the right half in one keystroke"  │
└──────────────────────────────────────────────────────────┘
```

**Screenshot 2 — Layouts**
```
┌──────────────────────────────────────────────────────────┐
│  [Dark desktop background]                               │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ LAYOUTS                                            │   │
│  │                                                    │   │
│  │ ┌────────────────┐  ┌────────────────┐              │   │
│  │ │ 📐 Code + Docs│  │ 📧 Email Setup │              │   │
│  │ │   3 windows    │  │   2 windows    │              │   │
│  │ └────────────────┘  └────────────────┘              │   │
│  │ ┌────────────────┐  ┌────────────────┐              │   │
│  │ │ 🎧 Music Mode  │  │  📊 Data Work  │              │   │
│  │ │   2 windows    │  │   4 windows    │              │   │
│  │ └────────────────┘  └────────────────┘              │   │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  Caption: "Save your workspace — recall it instantly"  │
└──────────────────────────────────────────────────────────┘
```

**Screenshot 3 — Custom Zones**
```
┌──────────────────────────────────────────────────────────┐
│  [Dark desktop with zone editor]                         │
│                                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Custom Zones                               [+ Add]│  │
│  │                                                    │  │
│  │ ┌──────────────────────────────────────────────┐ │  │
│  │ │         [Monitor Preview with               ] │ │  │
│  │ │          draggable zone rectangles]          ] │ │  │
│  │ └──────────────────────────────────────────────┘ │  │
│  │                                                    │  │
│  │ Upper Left      Monitor 1     ⌘⌥1               │  │
│  │ 2/3 Width       Monitor 2     ⌘⌥2               │  │
│  │ Thirds          Monitor 1     ⌘⌥3               │  │
│  └──────────────────────────────────────────────────┘   │
│                                                          │
│  Caption: "Define your own zones and assign shortcuts"  │
└──────────────────────────────────────────────────────────┘
```

**Screenshot 4 — Settings**
```
┌──────────────────────────────────────────────────────────┐
│  [Settings window]                                       │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ SETTINGS                                           │ │
│  │                                                    │ │
│  │ SNAP MARGINS                                       │ │
│  │ Screen Edge Margin  [━━━━━━━●  20px]              │ │
│  │ Window Gap          [━━●━━━━━   8px]              │ │
│  │                                                    │ │
│  │ iCLOUD SYNC                                        │ │
│  │ [✓] Sync layouts via iCloud                       │ │
│  │ Last synced: 2 minutes ago                        │ │
│  │                                                    │ │
│  │ [✓] Launch Sash at Login                           │ │
│  │ [✓] Show dock icon                                 │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  Caption: "Fine-tune every detail"                      │
└──────────────────────────────────────────────────────────┘
```

### App Preview Video (optional but recommended)

- 15-30 seconds
- Shows 3-4 quick snap actions: pressing ⌘⌥→ (snaps to right half), ⌘⌥F (full screen), then applying a layout
- No narration — just the actions and a subtle ambient soundtrack
- 1920×1080 H.264, 60fps

---

## Pricing & Availability

**Pricing:** $9.99 USD (standalone)
**Free trial:** 14 days (full feature access, no limitations)
**In-app purchase:** None (one-time purchase, no subscription)

**Availability:**
- Countries: All available territories
- Age rating: 4+ (everyone)

---

## Notarization Pipeline

**Requirements:**
- Apple Developer account (paid, $99/year)
- Valid Developer ID Application certificate
- Hardened Runtime enabled
- Notarization via `xcrun notarytool`
- Stapled ticket attached to the .app bundle

**Build pipeline:**
```bash
# 1. Build with hardened runtime and signing
xcodebuild -project Sash.xcodeproj \
  -scheme Sash \
  -configuration Release \
  CODE_SIGN_STYLE=Manual \
  CODE_SIGN_IDENTITY="Developer ID Application: Your Name (TEAMID)" \
  ENABLE_HARDENED_RUNTIME=YES \
  PRODUCT_BUNDLE_IDENTIFIER=com.sash.app

# 2. Notarize
xcrun notarytool submit Sash.app \
  --apple-id "your@email.com" \
  --team-id "TEAMID" \
  --password "@keychain:AC_PASSWORD" \
  --wait

# 3. Staple
xcrun stapler staple Sash.app
```

**Entitlements file:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>com.apple.security.app-sandbox</key>
    <false/>
    <key>com.apple.security.application-groups</key>
    <array>
        <string>group.com.sash.shared</string>
    </array>
    <key>com.apple.security.files.user-selected.read-write</key>
    <true/>
</dict>
</plist>
```

**Note:** App Sandbox is disabled because Sash requires unrestricted window manipulation via Accessibility API. This means Sash cannot be distributed via the Mac App Store — only directly (website download) or Setapp.

---

## Setapp Packaging

Setapp is a subscription bundle (~$9.99/month for unlimited access to curated macOS apps). If pursuing Setapp inclusion:

**Package requirements:**
- `.pkg` installer (not `.dmg`)
- No sandbox (same as direct distribution)
- Specific bundle ID: `com.sash.app.setapp`
- Setapp provides their own license key validation system — integrate their SDK

**Setapp-specific considerations:**
- No mention of trial period in Setapp UI (Setapp handles that)
- Must strip any direct purchase / trial logic when packaged for Setapp
- Revenue: share of Setapp subscription revenue, based on "open sessions"

**Packaging steps:**
1. Build separate target: `Sash-Setapp`
2. Different bundle ID: `com.sash.app.setapp`
3. Strip IAP and trial code for Setapp build
4. Add Setapp validation SDK
5. Output as `.pkg`

**Setapp provides:**
- Their own installer (no need to build a custom PKG)
- License management
- Update infrastructure

---

## Privacy Policy URL

Required for App Store listing. Must be hosted at a reachable URL.

**Privacy Policy page** (hosted at `https://sash.app/privacy`):
```
Sash Privacy Policy

Last updated: [DATE]

Sash does not collect, store, or transmit any personal data.

WHAT WE DON'T COLLECT
- No analytics or telemetry
- No crash reporting (unless you explicitly opt in)
- No usage data
- No information about your windows or applications

WHAT WE STORE LOCALLY
- Your layouts, custom zones, and preferences are stored
  locally in ~/Library/Application Support/Sash/
- If you enable iCloud sync, this data is synced via your
  iCloud account using Apple's standard iCloud Key-Value Store.
  Apple encrypts this data in transit and at rest.

PERMISSIONS
- Accessibility: Required to move and resize windows.
  Sash only manipulates windows at your explicit direction.
  No data is extracted or transmitted.
- iCloud: Optional, for syncing layouts across your Macs.

CHANGES TO THIS POLICY
We will update this policy if our practices change.
Any material change will be noted in the app's release notes.
```

**Support URL:** `https://sash.app/support`
**Marketing URL:** `https://sash.app`

---

## In-App Actions

**Help menu additions:**
```swift
// In the app's main menu
Menu("Help") {
    Button("Sash Help") {
        NSWorkspace.open(URL(string: "https://sash.app/help")!)
    }
    Button("Send Feedback...") {
        NSWorkspace.open(URL(string: "mailto:support@sash.app")!)
    }
    Button("Rate on App Store...") {
        NSWorkspace.open(URL(string: "macappstore://apps.apple.com/app/sash/idXXXXXXXX?action=write-review")!)
    }
    Divider()
    Button("Check for Updates...") {
        // Sparkle or custom updater
    }
}
```

---

## Success Criteria

- [ ] App Store Connect product page is complete (name, description, keywords, screenshots, preview)
- [ ] All 4 screenshots meet required dimensions and display correctly
- [ ] Hardened runtime builds successfully
- [ ] Notarization succeeds with no warnings
- [ ] Stapled app passes `spctl --assess --type exec`
- [ ] App runs on a clean macOS system without Accessibility warnings blocking it
- [ ] Setapp package builds (if Setapp included)
- [ ] Privacy policy is live at `https://sash.app/privacy`
- [ ] Support URL opens correctly
- [ ] "Rate on App Store" link opens the App Store review page
- [ ] Crash reporting opt-in shown once (on first quit after R9, if crash occurs)
