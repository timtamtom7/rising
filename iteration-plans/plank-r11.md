# Plank — R11: Advanced ML & Smart Customization

## Goal
Bring on-device ML to Plank for intelligent theme generation, layout prediction, and design analysis.

---

## Scope

### AI Theme Generation
- On-device ML generates complete themes from a single image or color
- "Generate a dark theme from this photo"
- Analyzes image → extracts dominant colors → generates complete palette + tones
- Suggests accent colors that complement extracted palette
- Generates both light and dark variants from one input

### Layout Intelligence
- ML learns your app usage patterns to suggest layout arrangements
- Predict which apps you want grouped together
- "You usually have Xcode and Safari together — want a preset for that?"
- Analyzes workflow: morning setup vs. afternoon vs. end of day

### Design Analysis
- Analyze any theme: contrast ratios, harmony scores, accessibility
- "This theme fails WCAG AA in 3 places"
- Suggest specific fixes to improve accessibility
- Colorblind simulation: deuteranopia, protanopia, tritanopia views

### Smart Presets
- ML suggests presets based on:
  - Time of day (warm tones morning, cool tones evening)
  - Connected displays (different preset for external monitor)
  - Workload (busy day = simpler layout)
- Auto-switch presets on schedule

### Theme Marketplace Curation
- Use ML to curate theme marketplace (R12)
- Recommend themes based on user's existing choices
- "Themes you'll like" recommendations

---

## Out of Scope
- Cloud-based theme generation
- Social theme sharing (yet — R12)
- Real-time theme switching based on music/activity
