# Readr — iOS App Spec

## Concept

Readr solves the "I saw this in a book and wanted to remember it" problem. You photograph a page of any physical book. It OCRs the page, extracts a quote you select, and logs the book to your library. Not storage — *engagement*. The goal is to make it so easy that you actually capture the things you want to remember from physical books, instead of just... forgetting them.

**Core mechanic:** Photograph a page → select a quote → book is logged. 10 seconds.

---

## Brand Identity

**Name:** Readr  
**Tagline:** "Remember what you read."  
**Vibe:** Warm, editorial, library-like. Think a beautiful bookshop meets a well-designed读书笔记 app. Paper textures, serif type, warm amber tones.

**Aesthetic direction:** iOS 26 but with warmth. Cream/paper tones on light mode, warm dark tones on dark mode. Not cold — inviting. The kind of app a book lover would actually use.

**Reference:** Readwise Reader meets Darkroom's elegance. Warmth of a Moleskine with the precision of Linear.

**Colors:**
- Background light: `#faf8f5` (warm cream)
- Background dark: `#141210` (warm black)
- Surface light: `#ffffff`
- Surface dark: `#1e1c1a`
- Text primary: `#1c1917` (warm black)
- Text secondary: `#78716c`
- Accent: `#c87b4f` (warm amber/caramel)
- Book cover placeholder: `#e8e0d5`

**Typography:**
- UI: SF Pro
- Quote text: `New York` (iOS serif, or `Charter` as fallback)
- Book titles: SF Pro, semibold

---

## App Structure

### Library Tab
Grid of book covers (or placeholder spines). Each book shows:
- Cover image (or placeholder)
- Book title
- Number of quotes captured
- Tap → book detail

### Capture Flow
```
Step 1: Camera
┌─────────────────────────────┐
│  [X]           [Flash ⚡]  │
│                             │
│    ┌───────────────────┐    │
│    │                   │    │
│    │   Camera Preview  │    │  ← Large viewfinder, auto-detect page
│    │   (photograph     │    │
│    │    a book page)   │    │
│    │                   │    │
│    └───────────────────┘    │
│                             │
│  [Photo Library]             │  ← Also allow selecting from library
│                             │
│  Tip: Hold parallel to page  │
└─────────────────────────────┘

Step 2: Crop
┌─────────────────────────────┐
│  [Back]    Crop    [Done]  │
│                             │
│    ┌───────────────────┐    │
│    │ ░░░░░░░░░░░░░░░ │    │  ← Draggable crop corners
│    │ ░░░░░░░░░░░░░░░ │
│    │ ░░ PAGE ░░░░░░░ │
│    │ ░░░░░░░░░░░░░░░ │
│    └───────────────────┘    │
│                             │
│  [Retake]                   │
└─────────────────────────────┘

Step 3: Quote Selection
┌─────────────────────────────┐
│  [X]    Select a Quote      │
│                             │
│  ┌───────────────────────┐   │
│  │ "The only way to do  │   │  ← OCR'd text, selectable
│  │ great work is to love│   │     Drag handles to select quote
│  │ what you do."        │   │
│  └───────────────────────┘   │
│                             │
│  Book title: [___________]  │  ← Auto-filled if detectable, else manual
│  Author:  [___________]     │
│                             │
│  [Save Quote]               │
└─────────────────────────────┘
```

### Book Detail View
- Cover image (or placeholder)
- Book title, author
- List of captured quotes
- Each quote: text + date captured
- Tap quote → full page view of the original photo

---

## Key Interaction Design

### Auto Page Detection
When camera opens, use `VNDetectRectanglesRequest` to detect the page boundary. If a rectangle is found, show guides — user just needs to photograph the page, app handles the crop.

### Quote Selection
After OCR:
- Full page text is shown
- User drags handles to select the exact quote they want
- Quote highlights as selected
- Book title and author are auto-filled from the OCR text if possible (using on-device ML)

### Book Cover
- If user photographed a cover, use it
- If photographing a random page, generate a placeholder cover with book title in a nice serif font on a warm colored background

---

## Technical Approach

**Framework:** SwiftUI (iOS 26 target)  
**OCR:** `Vision` framework (`VNRecognizeTextRequest`) — on-device, no API needed  
**Camera:** `AVFoundation` / `CameraPreview` SwiftUI  
**Image Cropping:** `CIAffineTransform` or manual coordinate mapping  
**Data Persistence:** `SQLite.swift` for books and quotes

**Dependencies (SPM):**
- `SQLite.swift`

**Architecture:**
- `BooksLibraryView` — main library grid
- `CameraCaptureView` — camera with auto page detection
- `CropView` — manual crop adjustment
- `QuoteSelectionView` — OCR result + quote selection
- `BookDetailView` — individual book with quotes
- `QuoteDetailView` — single quote + original page photo

---

## iOS 26 Design Tokens

```swift
struct DesignTokens {
    static let bgLight = Color(hex: "#faf8f5")
    static let bgDark = Color(hex: "#141210")
    static let accent = Color(hex: "#c8a97e")
    static let textPrimary = Color(hex: "#1c1917")
    static let textSecondary = Color(hex: "#78716c")
    
    static let quoteFont = "NewYork-Regular"  // or "Charter"
    static let quoteFontBold = "NewYork-Bold"
}
```

---

## Human Inputs Needed
- [ ] App Store developer account ($99/year)
- [ ] App icon (Readr wordmark + book/quote icon)
- [ ] "Readr" App Store name availability
- [ ] Optional: book metadata API (Google Books API) to auto-fill author/title from OCR text
