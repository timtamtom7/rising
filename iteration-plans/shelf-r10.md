# Shelf — R10: Launch Day, Privacy Policy, Localization

## Goal
Ship. Get Shelf into users' hands, publish the privacy policy, finalise localisation, and set up post-launch monitoring.

---

## Scope

### Launch Day
- Push notarized build to App Store Connect and submit for review
- Confirm Setapp build is submitted (if applicable)
- Publish privacy policy page at `shelf.app/privacy` (static HTML on a CDN or GitHub Pages)
  - Include: data collected, how it's used, third-party SDKs, accessibility API usage, contact info
  - Reviewed by legal before publishing
- Update website (`shelf.app`) with product page:
  - Hero: app icon + tagline ("Your menu bar, your way.")
  - Feature bullets (3–4): grouping, layouts, spacers, idle auto-hide, shortcuts
  - Screenshots (same as App Store assets)
  - Download button → Mac App Store link
  - "Available on Setapp" badge if applicable
- Coordinate social launch:
  - Tweet: "Shelf is live on the Mac App Store. Tidy up your menu bar."
  - Product Hunt submission (coordinate for launch day)
  - Hacker News Show HN post if appropriate
  - Subreddit posts: r/macapps, r/MacSetapp

### Localization Finalisation
- All `Localizable.strings` files reviewed for completeness
- At minimum: English (en) complete
- Localizable.strings file structure:
  ```
  /* Window title */
  "window.title" = "Shelf";
  
  /* Accessibility labels */
  "accessibility.hide_item" = "Hide %@";
  "accessibility.show_item" = "Show %@";
  
  /* Groups */
  "group.always_visible" = "Always Visible";
  "group.hide_when_idle" = "Hide When Idle";
  "group.hide_always" = "Hide Always";
  
  /* Actions */
  "action.show_all" = "Show All";
  "action.hide_item" = "Hide";
  "action.show_item" = "Show";
  "action.switch_layout" = "Switch Layout";
  
  /* Settings */
  "settings.idle_timeout" = "Idle timeout";
  "settings.shortcut" = "Keyboard shortcut";
  ...
  ```
- All strings use `String(localized:)` or `NSLocalizedString` — no hardcoded strings anywhere
- Plural strings handled via `.stringsdict` where needed (e.g., "%d items hidden")
- Currency, date, number formatting uses system formatters with locale

### Localization Distribution
- Prepare `.xliff` file for community translations
- Announce translation open call on launch social posts
- Translations accepted via GitHub PRs or a simple crowdsourcing setup

### Launch Communications
- Personal email to network (brief, genuine — not a press release)
- Email to relevant Mac indie dev communities
- If Setapp: notify Setapp team for potential featuring

### Launch Metrics to Track
- App Store page views (App Store Connect)
- Download count
- Crash reports: monitor Xcode Cloud / Firebase Crashlytics if added
- User feedback emails (monitor inbox)
- Social mentions: set up alerts for "Shelf macOS" / "Shelf menu bar"

### Post-Launch Bug Triage
- Monitor Feedback Assistant and App Store Connect crash logs daily for first 2 weeks
- Severity levels: crash > data loss > notification/API failure > UI polish
- Critical bugs (crashes, data corruption): fix within 24h, push patch build
- Minor bugs: queue for v1.1

### Post-Launch: Community
- Respond to r/macapps thread comments
- Engage with Product Hunt comments
- Answer support emails promptly

### Maintenance
- Update `CHANGELOG.md` with every release (Semantic Versioning: MAJOR.MINOR.PATCH)
- Increment build number on every TestFlight/App Store push
- Keep dependencies (SQLite.swift) up to date with security patches
- Monitor macOS version adoption; bump minimum supported version annually
- Refresh app icon for macOS version updates if needed

### Archive
- All R1–R9 deliverables reviewed and confirmed complete
- Design source files archived in `Design/Source/`
- This spec is the source of truth — update before starting v1.1
- Final checklist:
  - [ ] App Store Connect build submitted
  - [ ] Setapp build submitted (if applicable)
  - [ ] Privacy policy page live
  - [ ] Website live
  - [ ] Social posts published
  - [ ] Product Hunt submitted
  - [ ] CHANGELOG.md updated
  - [ ] All source files committed
  - [ ] Design source files archived
