# FOLIO — R1: RSS Feed Reader (Foundation)

## Overview
FOLIO is a native macOS RSS news reader built with SwiftUI + AppKit hybrid architecture. R1 establishes the core feed subscription system, article list with thumbnails, read/unread state, feed categories, and SQLite persistence.

## Reference Architecture
- **Project:** `/Users/mauriello/Projects/chronicle` (Chronicle)
- **Pattern:** SwiftUI views hosted in `NSHostingController`, AppKit for menu bar, notifications, drag-drop
- **Database:** SQLite.swift (SPM) — `ChronicleDatabase` wrapper
- **Models:** `Feed`, `Article`, `Category`, `FeedGroup` in `ChronicleModels`
- **Networking:** `FeedService` (URLSession + XMLParser), async/await
- **Persistence:** `SQLiteFeedStore`, `SQLiteArticleStore`

## Dependencies (SPM)
```
- SQLite.swift (~> 0.14)
- FeedKit (~> 9.1)
- Kingfisher (~> 7.0) — image caching/thumbnails
```

## UI Structure

### App Lifecycle
```
main.swift → AppDelegate → NSApplication.shared
  └─ SwiftUI App (FOLIOApp)
       └─ ContentView (NSHostingController.rootView)
```

### Window Hierarchy
- **Main Window:** `MainWindowController` (NSWindowController) hosting `ContentView`
  - `SidebarView` (SwiftUI) — categories + feed list
  - `ArticleListView` (SwiftUI) — article rows with thumbnails
  - `ReaderView` (SwiftUI) — article content (stub for R2)
- **Menu Bar Extra:** `MenuBarExtraView` (SwiftUI popover) — quick unread count

### Navigation
- `NavigationSplitView` (SwiftUI) for sidebar → article list → reader flow
- Keyboard shortcuts via `keyboardShortcut()`, `FocusedValue`

## Functionality

### F1: Feed Subscription
- Add feed by URL (manual entry)
- Auto-discover feed from website URL (parsing `<link rel="alternate" type="application/rss+xml">`)
- Parse RSS 2.0, Atom 1.0 feeds via FeedKit
- Store feeds in `feeds` table with columns: `id`, `url`, `title`, `siteUrl`, `iconUrl`, `categoryId`, `addedAt`, `lastFetchedAt`
- Manual refresh (⌘R) and background fetch every 30 minutes
- `FeedService.fetchFeed(url:)` → `[Article]` (async)

### F2: Article List with Thumbnails
- `ArticleRowView`: thumbnail (from `og:image` or first `<img>`), title, feed name, date, unread indicator
- Thumbnails loaded via Kingfisher with placeholder
- Sort: newest first
- Filter: All / Unread / Favorites (star icon, state in `articles.isFavorite`)
- Pagination: load 50 articles at a time, infinite scroll trigger

### F3: Read/Unread State
- `articles.isRead` (bool), `articles.readAt` (Date?)
- Mark read on selection → `articleStore.markRead(articleId)`
- Mark unread on ⌘⇧U
- Unread badge count in sidebar per feed and total

### F4: Feed Categories
- `categories` table: `id`, `name`, `sortOrder`, `color`
- Drag-drop feeds to categories in sidebar
- Category colors shown as sidebar icons/tints
- Uncategorized = "All Articles" virtual category

### F5: SQLite Persistence
- Database file: `~/Library/Application Support/FOLIO/folio.db`
- `DatabaseManager` singleton — opens/migrates schema
- Migrations via `Migrator` protocol (version-based)
- Tables: `feeds`, `articles`, `categories`, `feed_categories` (join table)
- Full-text search on `articles.title`, `articles.content` using SQLite FTS5

### F6: AppKit Integration
- `AppDelegate.applicationSupportsSecureRestorableState` = false (persistence via our own store)
- Standard macOS menus: File (New Feed ⌘N, Import OPML...), Edit (Copy ⌘C), View (Refresh ⌘R, Toggle Sidebar ⌘\), Help
- Menu bar icon: custom SF Symbol `newspaper.fill`
- `NSPasteboard` for article URL copy

## Data Models

```swift
struct Feed: Identifiable, Codable, Hashable {
    let id: UUID
    var url: URL
    var title: String
    var siteUrl: URL?
    var iconUrl: URL?
    var categoryId: UUID?
    var addedAt: Date
    var lastFetchedAt: Date?
    var errorMessage: String?
}

struct Article: Identifiable, Codable, Hashable {
    let id: UUID
    let feedId: UUID
    var title: String
    var url: URL
    var author: String?
    var summary: String?      // first 500 chars of content
    var content: String?      // full HTML content
    var imageUrl: URL?
    var publishedAt: Date
    var isRead: Bool
    var isFavorite: Bool
    var readAt: Date?
}

struct Category: Identifiable, Codable, Hashable {
    let id: UUID
    var name: String
    var sortOrder: Int
    var colorHex: String   // "#4A90D9"
}
```

## Database Schema

```sql
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    color_hex TEXT NOT NULL DEFAULT '#4A90D9'
);

CREATE TABLE feeds (
    id TEXT PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    site_url TEXT,
    icon_url TEXT,
    category_id TEXT REFERENCES categories(id),
    added_at TEXT NOT NULL,
    last_fetched_at TEXT
);

CREATE TABLE articles (
    id TEXT PRIMARY KEY,
    feed_id TEXT NOT NULL REFERENCES feeds(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL UNIQUE,
    author TEXT,
    summary TEXT,
    content TEXT,
    image_url TEXT,
    published_at TEXT NOT NULL,
    is_read INTEGER NOT NULL DEFAULT 0,
    is_favorite INTEGER NOT NULL DEFAULT 0,
    read_at TEXT
);

CREATE INDEX idx_articles_feed_id ON articles(feed_id);
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE VIRTUAL TABLE articles_fts USING fts5(title, content, content=articles, content_rowid=rowid);
```

## Keyboard Shortcuts
| Shortcut | Action |
|---|---|
| ⌘N | New Feed (sheet) |
| ⌘R | Refresh selected feed |
| ⌘⇧R | Refresh all feeds |
| ⌘[ | Previous article |
| ⌘] | Next article |
| Space | Toggle read/unread |
| ⌘⇧U | Mark unread |
| ⌘F | Search (focus search field) |
| ⌘1-9 | Jump to nth category |

## File Structure
```
FOLIO/
├── App/
│   ├── main.swift
│   ├── FOLIOApp.swift
│   ├── AppDelegate.swift
│   └── FOLIOAppState.swift
├── Models/
│   ├── Feed.swift
│   ├── Article.swift
│   └── Category.swift
├── Views/
│   ├── ContentView.swift
│   ├── SidebarView.swift
│   ├── ArticleListView.swift
│   ├── ArticleRowView.swift
│   ├── ReaderView.swift
│   ├── AddFeedSheet.swift
│   └── CategoryEditorSheet.swift
├── ViewModels/
│   ├── FeedListViewModel.swift
│   └── ArticleListViewModel.swift
├── Services/
│   ├── FeedService.swift
│   ├── DatabaseManager.swift
│   ├── SQLiteFeedStore.swift
│   └── SQLiteArticleStore.swift
├── MenuBar/
│   └── MenuBarExtra.swift
└── Resources/
    └── Assets.xcassets
```

## Success Criteria
- [ ] Can add a feed by URL and see it in the sidebar
- [ ] Articles appear in list with thumbnail, title, feed name, date
- [ ] Unread count shows in sidebar and on app icon
- [ ] Can mark articles read/unread via space bar
- [ ] Can create categories and drag feeds into them
- [ ] Data persists across app restarts
- [ ] Keyboard navigation (↑↓) through article list works
- [ ] Standard macOS menus functional
- [ ] Menu bar popover shows unread count and recent articles
- [ ] App builds and runs without crashes on Apple Silicon
