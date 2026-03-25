# Swatch — R6: Widgets, Notification Center

## Goal
Ship macOS widgets (Color of the Day, Palette Widget) and integrate with Notification Center for color reminders and palette-of-the-day delivery.

---

## Scope

### WidgetKit Widgets
Implement three widget families (WidgetKit on macOS 14+, fallback message on macOS 13):

#### Widget 1: Color of the Day (`.systemSmall`)
- Displays a single featured color with its HEX code
- Refreshes daily at 6:00 AM local time via `TimelineProvider`
- Color source: "Featured Palette" (user-designated palette, first color)
- UI: full-widget color fill + HEX label overlaid with semi-transparent scrim
- Tap → opens Swatch popover with that color selected

#### Widget 2: Palette Widget (`.systemMedium`)
- Shows a named palette's first 5 colors as horizontal swatches
- Palette name + "Swatch" branding below swatches
- Refreshes when palette changes (via `WidgetCenter.shared.reloadAllTimelines()`)
- Configurable via widget configuration sheet (choose which palette to display)
- Tap swatch → deep link to Swatch with that color: `swatch://color?hex=#4A90D9`

#### Widget 3: Gradient Preview (`.systemSmall`)
- Shows the most recently created gradient as a live preview bar
- Gradient angle/name displayed below
- Tap → opens gradient builder

### Widget Configuration
- Users can configure which palette drives the Palette Widget
- Uses `IntentConfiguration` with a custom "Select Palette" intent
- `@Environment(\.widgetFamily)` to adapt UI per size

### Notification Center Integration
- **Daily Color Reminder** (optional, opt-in):
  - Delivered via `UNUserNotificationCenter` at user-configurable time (default 9 AM)
  - Notification content: "Color of the day: #4A90D9" with color swatch image attachment
  - Tap notification → opens Swatch with that color
  - Configurable in Preferences: enable/disable, time picker

- **Weekly Palette Digest** (optional):
  - Every Monday at 9 AM: "Your palettes this week — [Palette Name]: #xxx #xxx #xxx"
  - Notification actions: "View Palette", "Pick Random Color"

- **New Color Added:** When a color is added to a palette, optionally notify (configurable per palette)

### Widget Timeline Provider
```swift
struct SwatchTimelineProvider: TimelineProvider {
    func timeline(for intent: SelectPaletteIntent, in context: Context, completion: @escaping (Timeline<PaletteEntry>) -> Void) {
        // Refresh at 6 AM, or when palette changes
        let entry = PaletteEntry(date: nextRefreshDate, palette: selectedPalette)
        let timeline = Timeline(entries: [entry], policy: .after(nextRefreshDate))
        completion(timeline)
    }
}
```

### Widget App Group
- App Group: `group.com.layton.swatch` for sharing data between main app and widget extension
- Palette data written to app group container as JSON on every change
- Widget extension reads from app group (not from iCloud directly — widget runs in separate process)

### Notification Authorization
- On first notification enable: request via `UNUserNotificationCenter.requestAuthorization`
- Denied state: show inline guidance in Preferences to re-enable in System Settings

### Widget Extension Target
- New target: `SwatchWidgets` (WidgetKit extension)
- Main app and widget share a framework: `SwatchKit` (shared color models, persistence helpers)
- No third-party dependencies in widget target
- Widget extension bundle ID: `com.layton.swatch.widgets`

### Build & Run
- Target: macOS 13.0+ (widgets require macOS 14, graceful unavailability message on 13)
- WidgetKit requires the widget extension to be embedded in the main app bundle
- Zero warnings, clean build

---

## Out of Scope (R7+)
- Full VoiceOver accessibility audit
- Dynamic Type throughout the app
- App icon / onboarding
- App Store metadata and screenshots
