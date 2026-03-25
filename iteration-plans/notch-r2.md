# Notch — R2: Multiple Notch Modes, Resize, Notch Wallpaper

## Goal
Notch gains multiple display modes, resizable notch content, and the ability to set a wallpaper image within the notch bar.

---

## Scope

### Multiple Notch Modes
- **Show**: notch bar always visible, widgets always shown
- **Hide**: notch bar hidden entirely, only menu bar icon active
- **Auto-hide**: notch bar visible when mouse is near top of screen (within 20pt), auto-hides after 3s of mouse leaving
- Mode toggle in menu bar dropdown and in Preferences
- Smooth fade animation for show/hide (200ms ease-in-out)
- Auto-hide uses `NSEvent.addGlobalMonitorForEvents` or `NSTrackingArea`

### Resizable Notch Content
- Allow user to resize notch bar height: 30pt (compact), 44pt (default), 60pt (expanded)
- Widget layout adapts: compact = icon only, default = icon + value, expanded = icon + value + label
- Slider in Preferences for notch bar height
- Notch bar window resizes dynamically with animation
- Respect maximum notch height (don't overlap camera)

### Notch Wallpaper
- Set a background image for the notch bar
- Image scaled/cropped to fit notch dimensions
- Wallpaper picker in Preferences: select from Photos or file picker
- Built-in wallpapers: solid color, gradient, subtle pattern
- Blur overlay option: apply `CIGaussianBlur` at configurable intensity over wallpaper
- Live preview in Preferences before applying
- Wallpaper stored as file path in UserDefaults

### Enhanced Battery Widget
- Show charging/discharging state with more detail
- Time remaining estimate (using `IOPSCopyTimeRemainingEstimate`)
- Battery health percentage (using `IOPSCopyBatteryHealthInfo`)
- Small battery icon (filled/empty/charging states)

### Enhanced Date Widget
- Multiple format options: "9:08", "9:08 AM", "Monday", "Mon 9"
- Day of week always shown
- Calendar icon with current date number

### Enhanced Weather Widget
- Add humidity percentage
- "Feels like" temperature
- Wind speed
- Compact display: show up to 2 of the above (user configurable)
- Tap weather widget to get full day forecast popup

### Preferences — Notch Tab
- Notch mode selector (Show / Hide / Auto-hide)
- Notch bar height slider
- Wallpaper: none / solid / image / blur
- Wallpaper color picker
- Global hotkey to toggle notch visibility: default `⌃N`

---

## Out of Scope (R3+)
- Notch apps (mini tools)
- Customizable notch bar
- Menu Bar Extra
- Shortcuts integration
