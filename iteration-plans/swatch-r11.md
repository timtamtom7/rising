# Swatch — R11: Advanced ML & Color Intelligence

## Goal
Bring on-device ML to Swatch for intelligent color extraction, palette prediction, and design compatibility suggestions.

---

## Scope

### Intelligent Color Extraction
- On-device CoreML model improves extraction accuracy
- Detect dominant colors vs. accent colors vs. background colors
- Automatic color role classification: "This is a primary color", "This is a highlight"
- Extract from complex images: gradients, photographs, illustrations with better accuracy
- Batch extraction: process entire folder, auto-tag and organize

### Palette Prediction
- ML model predicts complementary, analogous, triadic palettes from a single color
- Predicts "what colors would look good with this design"
- Suggests palette adjustments for accessibility (WCAG contrast)
- Predicts color harmony score for existing palettes

### Design Style Detection
- Detect design style from image: Material, flat, skeuomorphic, brutalist, pastel, etc.
- Suggest palettes that match the detected style
- "Your palette is very Material — here are more Material-style colors"
- Extract color from images matching a specific style

### Color Trend Analysis
- Learn from user's color pick history
- Suggest colors based on user's palette history: "You tend to pick cool tones"
- Year/season color trends (from public design trend data)
- "These colors are trending in web design right now"

### Accessible Color Suggestions
- Auto-check palette contrast ratios against WCAG 2.1 AA/AAA
- Suggest adjustments to meet contrast requirements while preserving aesthetic
- "This text/background pair fails WCAG AA — here's a nearby color that passes"
- Colorblind-safe palette checking (deuteranopia, protanopia, tritanopia simulations)

---

## Out of Scope
- Cloud-based color trend analysis
- Social color sharing (yet)
- Print-specific color space conversions (CMYK, Pantone — basic support in scope)
