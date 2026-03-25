# Sash R10 — Launch, Privacy Policy, Localization

**Tagline:** Sash is live. Sash is everywhere.

---

## Concept

R10 is launch day. The app is built, polished, notarized, and ready. R10 focuses on the final pre-launch and launch activities: making the privacy policy live, localizing the app into the most important languages, coordinating the launch, and setting up the infrastructure for ongoing support.

---

## R10 Scope

**In scope:**
- Privacy policy page (final copy, live)
- Localization into top 5 languages: English, German, French, Spanish, Japanese
- Launch day coordination and announcements
- Email support infrastructure
- Post-launch bug triage process

**Out of scope:**
- Ongoing feature development (R10 is shipping only)
- Additional localization beyond top 5 languages

---

## Privacy Policy

### Where It Lives

`https://sash.app/privacy`

A static HTML page (no JS, minimal, loads fast). Hosted as a simple page on the Sash website.

### Final Copy

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Privacy Policy — Sash</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 680px; margin: 0 auto; padding: 40px 20px; line-height: 1.6; color: #333; }
        h1 { font-size: 24px; margin-bottom: 8px; }
        h2 { font-size: 18px; margin-top: 32px; border-bottom: 1px solid #eee; padding-bottom: 8px; }
        .date { color: #888; font-size: 14px; margin-bottom: 32px; }
        code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; }
        a { color: #3b82f6; }
    </style>
</head>
<body>
    <h1>Privacy Policy</h1>
    <p class="date">Last updated: June 2026</p>

    <h2>Overview</h2>
    <p>Sash is designed around a simple principle: <strong>your data stays on your Mac</strong>. We don't collect personal information. We don't track usage. We don't have servers — Sash runs entirely on your machine.</p>

    <h2>What Sash Doesn't Do</h2>
    <ul>
        <li>No analytics or telemetry</li>
        <li>No crash reporting (unless you explicitly opt in)</li>
        <li>No usage tracking or "phone home"</li>
        <li>No third-party SDKs that collect data</li>
        <li>No social features, no sharing, no accounts</li>
    </ul>

    <h2>Local Data Storage</h2>
    <p>Your layouts, custom zones, and preferences are stored in:</p>
    <p><code>~/Library/Application Support/Sash/</code></p>
    <p>This data never leaves your Mac unless you enable iCloud sync.</p>

    <h2>iCloud Sync</h2>
    <p>If you enable iCloud sync, your data moves between your Macs using Apple's iCloud Key-Value Store. This data is encrypted in transit and at rest by Apple. We cannot read your layouts, zones, or preferences.</p>

    <h2>Accessibility Permission</h2>
    <p>Sash requires Accessibility permission to move and resize windows — this is a system-level permission granted by you in System Settings. Sash only manipulates windows at your explicit command. It does not read, copy, or extract any data from your windows or applications.</p>

    <h2>Third Parties</h2>
    <p>Sash does not include any third-party analytics, advertising, or tracking services. The only external services are:</p>
    <ul>
        <li><strong>Apple</strong> (iCloud sync, if you enable it)</li>
        <li><strong>Apple</strong> (App Store, for purchasing and updates)</li>
        <li><strong>Setapp</strong> (if you obtained Sash through Setapp)</li>
    </ul>

    <h2>Changes to This Policy</h2>
    <p>If we ever change this policy in a way that changes what we collect, we will update the policy here and note it in the app's release notes.</p>

    <h2>Contact</h2>
    <p>Questions about this policy? Email us at <a href="mailto:privacy@sash.app">privacy@sash.app</a></p>
</body>
</html>
```

---

## Localization

### Languages

| Language | Code | Priority |
|----------|------|----------|
| English | `en` | Default (no `.lproj`) |
| German | `de` | High (DE market) |
| French | `fr` | High (FR market) |
| Spanish | `es` | Medium (ES, MX, AR markets) |
| Japanese | `ja` | Medium (JP market) |

### Localizable.strings Structure

Use `NSLocalizedString` throughout. Extract with `genstrings`.

**File structure:**
```
Sash/
├── Sources/
│   └── (all .swift files with NSLocalizedString)
├── Resources/
│   ├── en.lproj/
│   │   └── Localizable.strings   (base, always present)
│   ├── de.lproj/
│   │   └── Localizable.strings
│   ├── fr.lproj/
│   │   └── Localizable.strings
│   ├── es.lproj/
│   │   └── Localizable.strings
│   └── ja.lproj/
│       └── Localizable.strings
```

### Key Strings to Localize

**Menu bar popover:**
```
"snap.left_half" = "Left Half";
"snap.right_half" = "Right Half";
"snap.top_half" = "Top Half";
"snap.bottom_half" = "Bottom Half";
"snap.full_screen" = "Full Screen";
"snap.center" = "Center";
"snap.tl_corner" = "Top Left Corner";
"snap.tr_corner" = "Top Right Corner";
"snap.bl_corner" = "Bottom Left Corner";
"snap.br_corner" = "Bottom Right Corner";

"status.focused" = "Focused: %@";
"status.monitor" = "Monitor %d";
"status.no_window" = "No window focused";

"action.undo" = "Undo";
"action.cycle" = "Cycle Windows";
"action.cascade" = "Cascade Windows";

"settings.open" = "Open Settings...";
"settings.quit" = "Quit Sash";
```

**Onboarding:**
```
"onboarding.welcome.title" = "Welcome to Sash";
"onboarding.welcome.subtitle" = "Snap, resize, and organize windows faster than ever.";
"onboarding.welcome.get_started" = "Get Started";
"onboarding.welcome.skip" = "Skip Setup";

"onboarding.accessibility.title" = "Grant Accessibility Access";
"onboarding.accessibility.body" = "Sash needs Accessibility access to move and resize windows.";
"onboarding.accessibility.step1" = "Open System Settings";
"onboarding.accessibility.step2" = "Privacy & Security → Accessibility";
"onboarding.accessibility.step3" = "Add Sash to the list";
"onboarding.accessibility.open_settings" = "Open System Settings";
"onboarding.accessibility.granted" = "I've granted access";

"onboarding.demo.title" = "Try it now!";
"onboarding.demo.body" = "Press ⌘⌥→ to snap this window to the right half of your screen.";
"onboarding.demo.detected" = "We detected: %@";
"onboarding.demo.try_again" = "Try Another Snap";
"onboarding.demo.all_set" = "All Set!";
```

**Settings:**
```
"settings.title" = "Settings";
"settings.tab.snap" = "Snap";
"settings.tab.layouts" = "Layouts";
"settings.tab.zones" = "Zones";
"settings.tab.settings" = "Settings";

"settings.margin.screen_edge" = "Screen Edge Margin";
"settings.margin.window_gap" = "Window Gap";

"settings.sync.title" = "iCloud Sync";
"settings.sync.enable" = "Sync layouts via iCloud";
"settings.sync.last_synced" = "Last synced: %@";
"settings.sync.now" = "Sync Now";

"settings.launch.login" = "Launch Sash at Login";
"settings.launch.dock" = "Show dock icon";
"settings.launch.auto_apply" = "Auto-apply layouts on Space switch";

"settings.about.version" = "Version %@";
"settings.about.check_updates" = "Check for Updates";
```

**Layouts:**
```
"layout.title" = "Layouts";
"layout.new" = "New Layout";
"layout.apply" = "Apply";
"layout.edit" = "Edit";
"layout.delete" = "Delete";
"layout.delete.confirm" = "Delete layout '%@'? This cannot be undone.";
"layout.name.placeholder" = "Layout name";
"layout.windows" = "%d window(s)";
"layout.bound_space" = "Space %d";
"layout.bound_all" = "All Spaces";
"layout.apps_to_launch" = "Apps to Launch with Layout";
```

**Notifications:**
```
"notification.layout_applied" = "Applied: %@";
"notification.layout_applied.body" = "%d window(s) arranged";
"notification.undo" = "Undo";
"notification.snap_applied" = "%@ applied";
```

### Localization Implementation

**SwiftUI:**
```swift
// Correct
Text("snap.left_half", comment: "Snap position label")

// Incorrect
Text("Left Half")  // hardcoded, won't localize
```

**For dynamic strings:**
```swift
var body: some View {
    Text("status.focused", value: appName, comment: "Current focused window")
}

// Or
String(format: NSLocalizedString("status.monitor", comment: "Monitor label"), monitorNumber)
```

**Testing localization:**
- Use `UserDefaults` override to switch language without restarting:
```swift
// In Settings
UserDefaults.standard.set(["de"], forKey: "AppleLanguages")
```

### Keyboard Shortcuts in Localization

**Important:** `⌘`, `⌥`, `⇧`, `⌃`, `→`, `←`, etc. are macOS UI symbols that render correctly in all languages. Do NOT spell out shortcuts (e.g., "Command-Option-Left") — use the symbol characters:

```
⌘ = Command (U+2318)
⌥ = Option (U+2325)
⇧ = Shift (U+21E7)
⌃ = Control (U+2303)
⌫ = Delete (U+232B)
←↑→↓ = Arrow keys
⏎ = Return (U+23CE)
␣ = Space (U+2423)
```

These are part of the macOS character picker and render natively in any locale.

### RTL (Right-to-Left) Support

Sash's UI doesn't have strong directional dependencies (no LTR/RTL-specific layouts). The popover and settings window are horizontally symmetric. If any future UI needs RTL:
- Use `environment(\.layoutDirection)` in SwiftUI
- Use `.leading` / `.trailing` instead of `.left` / `.right`

---

## Launch Day

### Pre-Launch Checklist

- [ ] App Store Connect: app status is "Ready for Sale"
- [ ] Privacy policy URL is live and accessible
- [ ] Support email is monitored: `support@sash.app`
- [ ] Setapp package submitted (if applicable)
- [ ] Direct download (.dmg) ready at `https://sash.app/download`
- [ ] Launch announcement copy written and ready to send

### Launch Announcements

**Email to newsletter subscribers:**
```
Subject: Sash is live — window management, finally done right

Hey,

Sash is now available for download.

Snapping windows to screen halves used to mean dragging and guessing.
Sash makes it a single keystroke: ⌘⌥→ and your window is exactly where you want it.

Get Sash: https://sash.app
```

**Tweet / X:**
```
Finally, window management on Mac that keeps up with how you think.

Snap, layout, automate. Sash is live. ⌘⌥→

https://sash.app
#macOS #productivity
```

**Product Hunt:**
```
Sash — Snap. Resize. Automate.

We built Sash because we were tired of dragging windows around to get work done. One keystroke, any position, every display.

Try it free: https://sash.app

#producthunt #macOS
```

### Support Infrastructure

**Email:** `support@sash.app`
- Use a shared inbox or ticketing system (e.g., HelpScout, Front, or just a dedicated Gmail)
- Auto-reply with: "Thanks for reaching out about Sash. We'll get back to you within 24 hours."
- Set up email forwarding from privacy, press, and billing aliases

**Help center:** `https://sash.app/help`
- Static pages, no Zendesk/Intercom needed at launch
- Articles: "Getting Started", "Keyboard Shortcuts", "Custom Zones", "Layouts", "Troubleshooting"
- If Zendesk is added later, it should have a free tier for small teams

**Bug Reports:**
- Show a "Report Issue" option in Settings that opens `https://sash.app/support`
- For alpha/beta testers: GitHub Issues link
- Triage: P1 (crash), P2 (broken feature), P3 (annoyance), P4 (cosmetic)

### Post-Launch Cadence

- **Day 1:** Monitor for crash reports (App Store Connect → Feedback)
- **Day 2-3:** First update if critical bugs found
- **Week 1:** Respond to all App Store reviews (polite, helpful, not defensive)
- **Week 2:** Review analytics (if opted in) and support volume
- **Month 1:** Plan first post-launch update based on feedback

---

## Version Numbering

- Current version: `1.0.0`
- Build numbers: sequential integer (e.g., `1000`, `1001`)
- Semantic versioning: `Major.Minor.Patch`
  - Major: breaking changes or significant new features
  - Minor: new features, backward compatible
  - Patch: bug fixes, no new features

---

## Success Criteria

- [ ] Privacy policy page is live at `https://sash.app/privacy`
- [ ] All UI strings extracted to `Localizable.strings`
- [ ] All 5 language `.lproj` folders are complete
- [ ] App builds and runs with each language setting
- [ ] Keyboard shortcuts render correctly in all 5 languages
- [ ] Launch announcement copy is finalized and scheduled
- [ ] Support email is monitored and auto-reply is configured
- [ ] Help center pages are live at `https://sash.app/help`
- [ ] App Store Connect shows "Ready for Sale"
- [ ] Direct download .dmg is available at `https://sash.app/download`
- [ ] Post-launch bug triage process is documented
- [ ] Version `1.0.0` is submitted and approved
