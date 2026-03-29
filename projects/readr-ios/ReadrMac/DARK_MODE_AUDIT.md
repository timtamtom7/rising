# Dark Mode Audit — R13

## Status: ⚠️ Needs Attention

Theme.swift defines only light-mode color tokens. No `@Environment(\.colorScheme)` handling exists.
Dark mode will render with raw system defaults — likely broken contrast.

---

## Findings

### ✅ Colors Using Theme Tokens (Good)
All views primarily use `Theme.textPrimary`, `Theme.textSecondary`, `Theme.warmBrown`, `Theme.forestGreen`, `Theme.accent` for foreground and structural colors. No inline RGB hex codes for UI chrome.

### ⚠️ Acceptable Hardcoded Usages

| File | Usage | Reason |
|------|-------|--------|
| FinishedBooksView.swift:180, 184 | `.white`, `.white.opacity(0.7)` | On colored book cover backgrounds — intentional contrast |
| AddBookView.swift:212 | `.white` | On colored cover preview |
| MenuBarView.swift:44 | `.white` | On colored book cover |
| GenreInsightsView.swift:571 | `.white.opacity(0.7)` | On colored cover background |
| GenreInsightsView.swift:156-163 | Genre hex colors | Semantic genre palette — designed for vibrancy, not theming |

### ❌ Hardcoded Colors to Fix

| File | Line | Color | Fix |
|------|------|-------|-----|
| GenreInsightsView.swift | 363 | `.orange` | Replace with `Theme.accent` or add `Theme.orange` |
| GenreInsightsView.swift | 366 | `.orange` | Replace with `Theme.accent` or add `Theme.orange` |

---

## Recommended Fix for Dark Mode

Add dark-mode-aware color tokens to Theme.swift:

```swift
import SwiftUI

enum Theme {
    // Light mode
    static let cream = Color(hex: "FDF6E3")
    static let warmBrown = Color(hex: "8B4513")
    static let forestGreen = Color(hex: "228B22")
    static let burgundy = Color(hex: "722F37")
    static let surface = Color(hex: "FAF8F5")
    static let cardBg = Color(hex: "FFFFFF")
    static let textPrimary = Color(hex: "1c1917")
    static let textSecondary = Color(hex: "78716c")
    static let accent = Color(hex: "c87b4f")

    // Dark mode
    static let creamDark = Color(hex: "1c1917")
    static let warmBrownDark = Color(hex: "D4A574")
    static let forestGreenDark = Color(hex: "4CAF50")
    static let burgundyDark = Color(hex: "8B3A40")
    static let surfaceDark = Color(hex: "121212")
    static let cardBgDark = Color(hex: "1E1E1E")
    static let textPrimaryDark = Color(hex: "F5F5F5")
    static let textSecondaryDark = Color(hex: "A8A29E")
    static let accentDark = Color(hex: "E8A87C")

    // Adaptive
    static func adaptive(light: Color, dark: Color) -> Color {
        Color(UIColor { $0.userInterfaceStyle == .dark ? UIColor(dark) : UIColor(light) })
    }
}
```

Then wrap views in `ColorScheme` environment and swap tokens.

---

## Severity

- **Low:** `.orange` in GenreInsightsView (cosmetic only)
- **Medium:** No dark mode infrastructure — app will render incorrectly in system dark mode
