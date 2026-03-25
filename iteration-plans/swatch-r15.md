# Swatch — R15: iOS Companion App

## Goal
Ship Swatch as a native iOS and iPadOS app for color picking, palette management, and design work on the go.

---

## Scope

### iOS App
- Full palette management on iPhone and iPad
- Color picker using device camera (point at anything to pick its color)
- Color extraction from photos
- Palette viewing and editing
- Color detail view with all formats (HEX, RGB, HSL, CMYK, Pantone)

### iPad Optimization
- Full iPad layout with split view
- Apple Pencil support for freeform color mixing
- External display support for color presentations
- Keyboard shortcuts matching macOS app

### Apple Watch App
- Color glance: pick a random color from your palette (for inspiration)
- Watch as a color reference — display a saved color's values
- Complication: current palette's primary color
- Haptic feedback for color selection

### iOS Widgets
- Small widget: random color from palette
- Medium widget: 3 colors from selected palette
- Large widget: full palette preview + color tap to copy
- Lock screen widget: random inspirational color
- Interactive widget: tap color to copy HEX code

### Camera Color Picker
- Use camera as a real-time color picker
- Point at any surface → get its color
- Save picked colors to clipboard (HEX) or to a palette
- Works with ARKit for better accuracy

### Share Sheet Integration
- iOS Share Sheet action: pick color from any image
- Save to Swatch palette directly from any app
- Color extracted from webpage via Share Sheet

---

## Out of Scope
- Android companion app (separate round)
- Full palette editing on watch
- Pro-level design tools on iOS
