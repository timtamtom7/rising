# Volt — R10: Launch Day, Privacy Policy, Localizable.strings

## Goal
Ship. Execute the launch day checklist, publish the privacy policy, finalize localization files, and set up post-launch monitoring.

---

## Scope

### Launch Day Execution
- Push build to App Store Connect and submit for review
  - Build number incremented (e.g., 1.0.0 → 1.0.1 for TestFlight, then App Store)
  - All R1–R9 deliverables verified complete before submission
  - Confirm Setapp build is submitted if applicable
- App Store Review notes: be prepared to explain battery limiting (note that Apple does not provide public SMC API for hardware-level limiting — this is a display/tracking tool)
- Review submission checklist:
  - [ ] All 12 screenshots uploaded
  - [ ] Metadata fields complete (name, subtitle, description, keywords)
  - [ ] Privacy manifest included and accurate
  - [ ] Build signed and notarized
  - [ ] No debug code in release build
  - [ ] Sandbox enabled, hardened runtime on
  - [ ] Localization files present (even if only English)

### Privacy Policy
- Published at `https://volt.app/privacy`
- Must be accurate and complete before App Store submission
- Policy covers:
  - **Data collected**: none (battery stats are device-local only)
  - **iCloud data**: if iCloud sync is enabled, profile data syncs via user's iCloud account (explain that Volt stores profile settings in iCloud KVS under the user's own account — no Volt servers involved)
  - **Third parties**: no third-party analytics, no SDKs that collect data
  - **Siri Shortcuts**: no data shared with Siri; shortcuts are processed by Apple's Siri infrastructure
  - **Widgets**: widget extension reads local data only
  - **Export**: exported data is user-controlled (saved to user-chosen location)
  - **Children's Privacy**: not directed at children under 13
- Privacy policy generator tool or lawyer-reviewed
- Link in App Store listing and in-app (Settings → About → Privacy Policy)

### Localizable.strings Finalization
- Audit all user-facing strings in the codebase:
  - Run `find . -name "*.swift" | xargs grep -E "\"[^\"]+\"" | grep -v "//\|url\|path\|regex\|sql"` to find candidates
  - Or use SwiftGen's `stringsdict` generation
- All strings moved to `Localizable.strings` (English base) + `Localizable.stringsdict` for plural variants
- Key naming convention: `volt.[section].[description]`
  - Examples: `volt.control.limit_slider_label`, `volt.stats.health_format`, `volt.notification.full_charge_title`
- Strings that should NOT be localized (technical identifiers, SMC key names, file paths)
- Test: change system language to German/French/Japanese, verify UI adapts (no hardcoded English in UI)

### Localized Number/Date Formatting
- Use `NumberFormatter.localizedString()` for charge percentages
- Use `DateFormatter` with `.current` locale for timestamps in history export
- Use `MeasurementFormatter` for temperature (°C/°F adapts to locale)
- Decimal separator adapts to locale (e.g., 87,5% in German, 87.5% in English)

### Post-Launch Monitoring
- Monitor App Store Connect for:
  - Review status (approved / rejected)
  - Any crash reports in first 24h
- Crash reporting: enable Firebase Crashlytics or use Xcode Cloud crash logs
- Crash response:
  - Crash → hotfix build within 24h
  - Data corruption → immediate priority
  - UI glitch → schedule fix
- Set up email alias `volt-feedback@example.com` (or Tommaso's actual email) for user submissions
- Set up App Store Connect user feedback view

### Launch Announcements
- Personal network email (brief, authentic)
- Product Hunt submission (launch day)
- Relevant subreddits: r/macapps, r/MacBook (check each subreddit's self-promotion rules)
- Twitter/X: "Volt is live — protect your MacBook battery with smart charge limiting."
- Hacker News: "Show HN" if appropriate
- If Setapp: notify Setapp team for potential featuring

### Post-Launch: User Feedback Loop
- Collect first 2 weeks of feedback
- Identify top 3 user requests
- File issues for v1.1 planning
- Common early requests to anticipate:
  - More profile customization (custom icons, colors)
  - Export history in more formats
  - Menu bar percentage font size customization
  - Low battery notification
  - Charging speed / power draw display

### Maintenance
- Update `CHANGELOG.md` for every release
- Increment build number on every push
- Keep SQLite.swift and other dependencies up to date (watch for security patches)
- Monitor macOS version adoption; bump minimum supported version annually
- Annual: review privacy policy and App Store listing for accuracy

### Archive
- All R1–R9 deliverables confirmed complete
- Design source files archived in `Design/Source/`
- This spec is the source of truth — update before starting any v1.1 work
