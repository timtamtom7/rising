# FOLIO — R4: Favorites, Annotations, Sharing, Menu Bar Extra

## Overview
R4 adds a full favorites system with local annotations, sharing extensions, and a proper Menu Bar Extra (Status Bar Item) replacing the R1 popover.

## New Dependencies
```
- None (using native frameworks)
```

## New Functionality

### F16: Enhanced Favorites System
- Favorites view in sidebar ("★ Favorites") showing all saved articles
- Smart favorites: auto-categorize by feed/category
- Sort favorites: date added / article date / feed
- Bulk actions on favorites: remove from favorites, mark read, export
- Favorites search (separate from main search, searches favorites only)
- `isFavorite` synced with Feedbin starred and Feedly saved (from R3)
- Local-only favorites (not on any account) marked with "local" badge
- Favorite articles don't auto-expire (configurable auto-archive after 30/60/90 days)

### F17: Article Annotations
- Click note icon on any article → annotation panel (sheet or sidebar)
- Annotation stored in `annotations` table:
  ```sql
  CREATE TABLE annotations (
      id TEXT PRIMARY KEY,
      article_id TEXT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
      content TEXT NOT NULL,      -- Markdown
      highlight_color TEXT,       -- '#FFE066'
      selected_text TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
  );
  ```
- Highlight text in reader → "Add Note" popover appears
- Highlights stored as range + color in annotation
- Annotations searchable via FTS5 (`annotations.content`)
- Export annotations as Markdown / PDF
- Sync annotations to Feedbin (Feedbin has notes API)
- Annotation count badge on article in list

### F18: Sharing
- `Article > Share...` (⌘⇧.) → native `NSSharingServicePicker`
- Custom share targets:
  - **Copy as Markdown** — formatted link: `[Title](URL)`
  - **Save to Obsidian** — write `.md` file to specified folder
  - **Save to Apple Notes** — via AppKit `NSSharingService`
- Share extension: "Save to FOLIO" for Safari/Web
  - App Group: `group.com.folio.reader`
  - Share extension target: `FOLIOShareExtension`
- Reader view has inline share buttons: Twitter, LinkedIn, Email, Messages
- Services menu integration: FOLIO articles appear in Share menu

### F19: Menu Bar Extra (Status Bar Item)
- `NSStatusItem` with `newspaper.fill` icon (16x16 template image)
- Menu bar icon shows unread count badge (red circle with number)
- Click → `NSPopover` with full mini-reader interface:
  ```
  ┌─────────────────────────────────┐
  │ 📰 FOLIO           ⚙️  🔍        │
  ├─────────────────────────────────┤
  │ ● Tech Crunch                   │
  │   Apple announces new features   │
  │   2 hours ago                   │
  ├─────────────────────────────────┤
  │ ○ Hacker News                   │
  │   Show HN: I built...           │
  │   5 hours ago                   │
  ├─────────────────────────────────┤
  │ ─────── Favorites ───────       │
  │ ★ The future of...              │
  │   2 days ago                    │
  ├─────────────────────────────────┤
  │ Open FOLIO...              ⌘↩  │
  └─────────────────────────────────┘
  ```
- Keyboard shortcut to toggle popover: ⌘⇧F (already global hotkey)
- Mark as read from menu bar popover (swipe left on article)
- Mini search within popover
- Settings gear → opens FOLIO settings window

### F20: Reading Statistics
- Track reading history: `reading_sessions` table
- Stats shown in sidebar footer: "47 articles read this week"
- Settings > General > Show reading stats (toggle)
- Privacy: all stats stored locally only

## Database Schema Additions
```sql
CREATE TABLE annotations (
    id TEXT PRIMARY KEY,
    article_id TEXT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    highlight_color TEXT,
    selected_text TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX idx_annotations_article_id ON annotations(article_id);

CREATE TABLE reading_sessions (
    id TEXT PRIMARY KEY,
    article_id TEXT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    started_at TEXT NOT NULL,
    duration_seconds INTEGER,
    completed_reading INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE share_targets (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,          -- 'obsidian' | 'notes' | 'custom'
    config TEXT                  -- JSON: folder path, etc.
);
```

## UI Changes

### Sidebar (revised)
```
📰 All Articles (124)
○ Unread (18)
★ Favorites (7)
  📊 Statistics
──────────────
📂 Categories
  🟢 Tech (8)
  🟡 News (12)
  🔵 Science (5)
──────────────
📡 Feeds
  🟣 Tech Crunch
  🟣 Hacker News
  🟣 The Verge
──────────────
👤 Accounts
  💙 Feedbin ✓
  🟠 Feedly ↻
```

### Annotation Panel
- Right-side panel (280pt wide) sliding in from right
- Toggle with ⌘⇧N
- Shows annotation list for current article
- Edit/delete annotations inline
- Export button (dropdown: Markdown / PDF)

### Menu Bar Extra Architecture
- `MenuBarExtraController: NSObject, NSMenuDelegate`
- Uses `NSPopover` with `NSPopover.Behavior.transient`
- `MenuBarExtraView` (SwiftUI) as popover content
- `StatusBarController` managing `NSStatusItem`
- Launch at login option (via `SMAppService`)

## File Structure Additions
```
FOLIO/
├── Services/
│   ├── AnnotationService.swift
│   ├── ShareService.swift
│   ├── ReadingStatsService.swift
│   └── MenuBarExtraController.swift
├── Views/
│   ├── AnnotationPanelView.swift
│   ├── AnnotationEditorView.swift
│   ├── ShareSheetView.swift
│   ├── ObsidianSettingsView.swift
│   └── MenuBarExtra/
│       ├── MenuBarExtraView.swift
│       ├── MenuBarArticleRow.swift
│       └── StatusBarController.swift
├── ViewModels/
│   ├── FavoritesViewModel.swift
│   └── AnnotationViewModel.swift
├── ShareExtension/
│   ├── ShareViewController.swift
│   └── Info.plist
└── Models/
    ├── Annotation.swift
    └── ReadingSession.swift
```

## Success Criteria
- [ ] Can add/edit/delete annotations on articles
- [ ] Highlights persist and show in reader
- [ ] Share menu shows all configured targets
- [ ] Save to Obsidian creates correct .md file
- [ ] Menu Bar Extra popover opens and shows unread articles
- [ ] Mark read from menu bar works
- [ ] Reading stats display correctly
- [ ] Menu Bar Extra launch at login works
- [ ] Share extension installs and captures URLs from Safari
