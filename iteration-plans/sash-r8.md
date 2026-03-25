# Sash R8 — App Icon, Onboarding, Design System

**Tagline:** A tool worth looking at.

---

## Concept

R8 is about polish and identity. A strong app icon that communicates "window management" at a glance. A thoughtful onboarding flow that teaches users what Sash does in under a minute. And a coherent design system that makes every screen feel like it belongs to the same product.

---

## R8 Scope

**In scope:**
- App icon (menu bar + dock) design and all required sizes
- Onboarding flow (first launch)
- Complete design system (colors, typography, spacing tokens)
- Launch at login prompt and Accessibility permission flow (polished from R1)

**Out of scope:**
- App Store metadata (R9), localization (R10)

---

## App Icon

### Design Direction

The icon should communicate "window management" — a sense of divided space, precision, and control.

**Concept:** A stylized window frame divided into quadrants, with a subtle sash/ribbon element running through it. Clean geometry, not a literal screenshot.

**Color:** Electric blue accent on a dark background (matching the app's dark UI aesthetic).

**Alternative concept:** A macOS window shape with four directional arrows pointing inward to a center — representing the "snap" action.

### Icon Construction

**Canvas:** 1024×1024px source

**Layers (bottom to top):**
1. Background: Rounded rectangle, `#0d0d0d` (dark), corner radius ~180px
2. Window frame: 3px stroke white/light gray, inset 80px from edges
3. Divider: Vertical and horizontal lines splitting the window into quarters
4. Accent: A small blue square at the intersection point (the "sash")
5. Optional: Four small arrows pointing toward center

**Menu bar icon:** 18×18pt template (monochrome, adapts to light/dark automatically). Simplified version: just the window frame with the center blue dot.

### Required Sizes

```
AppIcon.appiconset/
  Contents.json
  Icon-16.png    (16×16)
  Icon-32.png    (32×32)
  Icon-64.png    (64×64)
  Icon-128.png   (128×128)
  Icon-256.png   (256×256)
  Icon-512.png   (512×512)
  Icon-1024.png  (1024×1024)
```

Also provide:
- Menu bar template image (18×18pt @1x and @2x, `template` rendering mode)
- Widget icon (optional, if widget has separate icon)

---

## Onboarding Flow

### First Launch Sequence

On first launch, Sash shows a 3-step onboarding flow in a compact window (480×360pt).

**Step 1: Welcome**
```
┌──────────────────────────────────────────┐
│                                          │
│          [App Icon, large]               │
│                                          │
│          Welcome to Sash                 │
│                                          │
│   Snap, resize, and organize windows     │
│   faster than ever. Let's get you        │
│   set up in 30 seconds.                 │
│                                          │
│          [Get Started →]                 │
│                                          │
│          [Skip Setup]                    │
│                                          │
└──────────────────────────────────────────┘
```

**Step 2: Grant Accessibility**
```
┌──────────────────────────────────────────┐
│                                          │
│          🔑                              │
│                                          │
│   Sash needs Accessibility access        │
│   to move and resize windows.            │
│                                          │
│   1. Open System Settings                │
│   2. Privacy & Security → Accessibility  │
│   3. Add Sash to the list                │
│                                          │
│          [Open System Settings]          │
│                                          │
│   [I've granted access →]                │
│                                          │
└──────────────────────────────────────────┘
```

- "Open System Settings" button: `NSWorkspace.open(URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility"))`
- Sash checks `AXIsProcessTrusted()` and auto-advances if already granted

**Step 3: Quick Demo**
```
┌──────────────────────────────────────────┐
│                                          │
│   Try it now!                            │
│                                          │
│   Press ⌘⌥→ to snap this window          │
│   to the right half of your screen.      │
│                                          │
│   ┌─────────────────────────────────┐    │
│   │  [Live preview area]            │    │
│   │  Sash detects your frontmost    │    │
│   │  window here                    │    │
│   └─────────────────────────────────┘    │
│                                          │
│   We detected: Safari                    │
│                                          │
│   [Try Another Snap]  [All Set!]         │
│                                          │
└──────────────────────────────────────────┘
```

**Onboarding state:**
```swift
// UserDefaults
"sash.hasCompletedOnboarding": Bool   // default false
"sash.onboardingSkipped": Bool        // default false
```

**Onboarding window:**
- Shown on first launch (when `!hasCompletedOnboarding`)
- Skippable via "Skip Setup"
- After completion: `hasCompletedOnboarding = true`, never shown again
- A separate "Show Onboarding" option in Settings for users who skipped

---

## Design System

### Colors (Runtime)

```swift
// SashColors.swift
enum SashColors {
    // Backgrounds
    static let background = Color(hex: "0d0d0d")
    static let surface = Color(hex: "1a1a1a")
    static let surfaceElevated = Color(hex: "252525")

    // Accent
    static let accent = Color(hex: "3b82f6")
    static let accentSecondary = Color(hex: "60a5fa")

    // Text
    static let textPrimary = Color(hex: "f5f5f5")
    static let textSecondary = Color(hex: "a0a0a0")
    static let textTertiary = Color(hex: "666666")

    // Borders
    static let border = Color(hex: "2a2a2a")
    static let borderFocused = Color(hex: "3b82f6")

    // Feedback
    static let success = Color(hex: "22c55e")
    static let error = Color(hex: "ef4444")
    static let warning = Color(hex: "f59e0b")
}
```

### Typography

```swift
// SashTypography.swift
enum SashTypography {
    static let heading1 = Font.system(size: 18, weight: .semibold)
    static let heading2 = Font.system(size: 14, weight: .semibold)
    static let heading3 = Font.system(size: 12, weight: .semibold)
    static let body = Font.system(size: 13, weight: .regular)
    static let caption = Font.system(size: 11, weight: .regular)
    static let shortcut = Font.system(size: 12, weight: .medium, design: .monospaced)
    static let sectionHeader = Font.system(size: 11, weight: .semibold)
        .smallCaps()
}
```

### Spacing

```swift
// SashSpacing.swift
enum SashSpacing {
    static let xxs: CGFloat = 4
    static let xs: CGFloat = 8
    static let sm: CGFloat = 12
    static let md: CGFloat = 16
    static let lg: CGFloat = 24
    static let xl: CGFloat = 32
    static let xxl: CGFloat = 48
}
```

### Corner Radii

```swift
enum SashRadius {
    static let small: CGFloat = 4
    static let medium: CGFloat = 8
    static let large: CGFloat = 12
}
```

### Component Styles

**Primary Button:**
- Background: `accent`
- Text: white, `body`
- Padding: `xs` vertical, `sm` horizontal
- Corner radius: `medium`
- Hover: `accentSecondary`

**Secondary Button:**
- Background: `surface`
- Border: `border`, 1px
- Text: `textPrimary`, `body`
- Hover: `surfaceElevated`

**List Row:**
- Background: transparent
- Padding: `xs` vertical, `sm` horizontal
- Hover: `surface`
- Selected: `accent` left border 2px
- Corner radius: `small`

**Popover Container:**
- Background: `surface`
- Border: `border`, 1px
- Corner radius: `large`
- Shadow: none (flat design)
- Padding: `sm`

**Text Field:**
- Background: `background`
- Border: `border`, 1px
- Focus border: `accent`
- Corner radius: `small`
- Padding: `xs` vertical, `sm` horizontal

**Segmented Control:**
- Background: `background`
- Selected: `surfaceElevated`
- Corner radius: `small`

---

## Design System Implementation

**Asset catalog:**
```
Sash/
├── Resources/
│   └── Assets.xcassets/
│       ├── AppIcon.appiconset/
│       ├── MenuBarIcon.imageset/     (template)
│       ├── AccentColor.colorset/
│       └── (component-specific colors)
```

**SwiftUI ViewModifier for consistent styling:**
```swift
struct SashCard: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(SashSpacing.sm)
            .background(SashColors.surface)
            .cornerRadius(SashRadius.medium)
    }
}

struct SashListRow: ViewModifier {
    var isSelected: Bool = false
    func body(content: Content) -> some View {
        content
            .padding(.vertical, SashSpacing.xs)
            .padding(.horizontal, SashSpacing.sm)
            .background(isSelected ? SashColors.surfaceElevated : Color.clear)
            .overlay(alignment: .leading) {
                if isSelected {
                    Rectangle()
                        .fill(SashColors.accent)
                        .frame(width: 2)
                }
            }
            .contentShape(Rectangle())
    }
}
```

**Usage:**
```swift
Text("Left Half")
    .font(SashTypography.body)
    .modifier(SashListRow(isSelected: currentPosition == .leftHalf))
```

---

## Launch at Login

**First-launch prompt:** At the end of onboarding, ask:
```
┌──────────────────────────────────────────┐
│   Launch Sash at Login?                  │
│                                          │
│   ○ Yes — Sash will start automatically  │
│   ○ No — I'll launch it manually         │
│                                          │
│   You can change this anytime in         │
│   Settings.                              │
│                                          │
│            [Save and Finish]             │
└──────────────────────────────────────────┘
```

**Implementation:**
- Uses `SMAppService` (macOS 13+) for modern login item management
- No more deprecated `LSSharedFileList`

```swift
import ServiceManagement

func setLaunchAtLogin(_ enabled: Bool) {
    do {
        if enabled {
            try SMAppService.mainApp.register()
        } else {
            try SMAppService.mainApp.unregister()
        }
    } catch {
        // handle error
    }
}
```

---

## Success Criteria

- [ ] App icon renders correctly at all sizes (16-1024px)
- [ ] Menu bar icon is a proper template image (works in light/dark)
- [ ] Onboarding flow shows on first launch
- [ ] Step 1 → 2 → 3 navigates correctly
- [ ] "Open System Settings" opens Accessibility pane
- [ ] Onboarding detects if Accessibility is already granted and auto-advances
- [ ] All 3 onboarding screens match design system
- [ ] "Skip Setup" sets `onboardingSkipped = true` and shows Settings
- [ ] All UI components (buttons, rows, fields, cards) match design system tokens
- [ ] Launch at login prompt shown at end of onboarding
- [ ] Launch at login toggle in Settings reflects actual state
- [ ] `SMAppService` correctly registers/unregisters login item
