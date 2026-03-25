# FOLIO — R2: Search, OPML, Reader, Instapaper

## Overview
R2 adds full-text search, OPML import/export, a proper article reader view, and Instapaper integration for "read later" functionality. Builds on R1's SQLite FTS5 index and FeedKit parser.

## Dependencies (additions)
```
- SwiftSoup (~> 2.6) — HTML parsing for reader view content extraction
- KeychainAccess (~> 4.2) — Instapaper credentials
```

## New Functionality

### F7: Full-Text Feed Search
- Search field in toolbar (`SearchField` + ⌘F)
- Searches `articles.title`, `articles.content` via FTS5
- Results highlighted with `Text(verbatim:).background(Color.yellow)` 
- Debounced 300ms after keystroke
- Search scope: All / Current Feed / Current Category
- `ArticleSearchService.search(query:)` → `[Article]`
- Recent searches stored in UserDefaults (`recentSearches: [String]`)

### F8: OPML Import/Export
- `File > Import OPML...` (⌘⇧I) — file picker for `.opml` files
- `File > Export OPML...` (⌘⇧E) — save current feeds/categories as OPML
- Parse OPML `<outline>` elements recursively
- Detect feed vs folder (category) from `xmlUrl` attribute
- Import progress sheet with feed count and success/error counts
- Duplicate URL detection → skip with warning
- Export includes category groupings as folder outlines

### F9: Article Reader View
- `ReaderView` replaces placeholder stub from R1
- Content extraction: SwiftSoup cleans HTML, removes ads/scripts/styles
- Reading width control: narrow / medium / wide (UserDefaults key: `readerWidth`)
- Font selection: System / Serif / Mono (UserDefaults key: `readerFont`)
- Font size: 12-24pt stepper (UserDefaults key: `readerFontSize`)
- Light / Dark / Sepia theme for reader (UserDefaults key: `readerTheme`)
- Estimated read time shown ("5 min read")
- Article image gallery: inline images zoomable via Quick Look
- Related articles section at bottom (same feed)
- Scroll position remembered per article (saved to SQLite `articles.lastScrollPosition`)
- `WKWebView` fallback for articles that fail content extraction
- Reader mode auto-on for articles longer than 1000 chars

### F10: Instapaper Import
- `File > Import from Instapaper...` (sheet with username/password fields)
- API: `https://www.instapaper.com/api/1.1/bookmarks/list`
- Import existing Instapaper bookmarks as feeds or starred articles
- Credentials stored in Keychain via KeychainAccess
- After import: option to add Instapaper account as a "saved articles" feed
- Progress indicator during import
- Error handling: wrong credentials → alert, rate limit → retry after delay

## UI Changes

### Reader View Layout
```
┌─────────────────────────────────────────────────────────────┐
│  ← Back │ Title                         │ ⭐ │ 📤 │ 🔗 │ Aa │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FEED NAME · March 25, 2026 · 5 min read                    │
│                                                             │
│  Article Title in Large Type                                │
│                                                             │
│  Author Name                                                │
│  ─────────────────────────────────────────────              │
│                                                             │
│  [Article body content with proper typography,             │
│   inline images, blockquotes, code blocks...]               │
│                                                             │
│  ─────────────────────────────────────────────              │
│  Related Articles                                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │ thumb    │ │ thumb    │ │ thumb    │                    │
│  │ title    │ │ title    │ │ title    │                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
└─────────────────────────────────────────────────────────────┘
```

### Toolbar Additions
- Search field (center, expands on focus)
- Import OPML button
- Reader settings popover button

### New Menu Items
```
File
  ├── Import OPML...               ⌘⇧I
  ├── Export OPML...               ⌘⇧E
  ├── Import from Instapaper...    ⌘⇧⌥I
  └── ─────────────
  └── Close Window                 ⌘W

View
  ├── Reader Settings...           ⌘⇧R
  ├── Toggle Reader Mode           ⌘⇧⌥R
  └── Reading Width ▶             (Narrow / Medium / Wide)

Article
  ├── Mark as Read                 ⌘⇧M
  ├── Mark as Unread               ⌘⇧U
  ├── Save to Instapaper           ⌘⇧S
  ├── Copy Link                    ⌘L
  └── Open in Browser              ⌘⇧↩
```

## File Structure Additions
```
FOLIO/
├── Services/
│   ├── ArticleSearchService.swift   (FTS5 queries)
│   ├── OPMLService.swift            (import/export)
│   ├── InstapaperService.swift      (API calls)
│   └── ContentExtractor.swift       (SwiftSoup HTML cleaning)
├── Views/
│   ├── ReaderView.swift             (rewritten)
│   ├── ReaderSettingsView.swift
│   ├── ImportOPMLSheet.swift
│   ├── InstapaperImportSheet.swift
│   └── SearchResultsView.swift
├── ViewModels/
│   └── ReaderViewModel.swift
└── Resources/
    └── FOLIO.entitlements           (outgoing network, keychain)
```

## Success Criteria
- [ ] Search returns relevant articles within 200ms
- [ ] OPML export produces valid OPML 2.0 file
- [ ] OPML import correctly creates categories and feeds
- [ ] Reader view displays clean, readable article content
- [ ] Reader settings (font, size, theme) persist across sessions
- [ ] Instapaper import fetches and stores bookmarks
- [ ] Keyboard shortcuts all functional
- [ ] All sheets dismiss correctly with Esc
