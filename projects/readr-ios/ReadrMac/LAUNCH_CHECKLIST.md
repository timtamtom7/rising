# ReadrMac — Launch Checklist

## Pre-Launch

- [ ] Bundle ID confirmed: `com.readrmac.app`
- [ ] App icon at 1024×1024 PNG ready
- [ ] App Store screenshots captured (1280×800, up to 6)
- [ ] App Store listing text finalized in APPSTORE.md
- [ ] Keywords researched and finalized
- [ ] Description reviewed for typos
- [ ] Support URL ready
- [ ] Privacy Policy URL ready (required for App Store)
- [ ] Category set: Lifestyle

## Build & Sign

- [ ] `xcodegen generate` runs cleanly
- [ ] Release build succeeds (`CODE_SIGN_IDENTITY="-"` ad-hoc)
- [ ] App notarization handled (if distributing outside App Store)
- [ ] Version number updated in project.yml / Info.plist
- [ ] Build number incremented

## Dark Mode Audit (R13)

- [ ] Theme.swift has no dark mode tokens (note: dark mode support is pending)
- [ ] All hardcoded foreground/background colors use Theme tokens
- [ ] `.white` usage reviewed — only on colored book cover backgrounds
- [ ] Genre color palette in GenreInsightsView uses hardcoded hex (acceptable for genre semantics)
- [ ] `.orange` in GenreInsightsView lines 363, 366 — flagged, non-critical

## App Store Connect

- [ ] App Record created in App Store Connect
- [ ] Pricing & Availability set
- [ ] App Privacy answers completed (no data collection)
- [ ] Build uploaded via Xcode Organizer or Transporter
- [ ] Submission review in progress

## Post-Launch

- [ ] Monitor App Store Connect for review status
- [ ] Confirm app goes live on scheduled date
- [ ] Test purchase/download flow on a fresh account
- [ ] Share launch on relevant channels (if applicable)
