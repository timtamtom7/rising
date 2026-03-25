# FOLIO — R6: Feed Filters, Automation Rules, Collaborative Sharing

## Overview
R6 adds feed filtering rules, basic automation (like Mail rules), collaborative feed sharing, and进一步 performance refinements.

## New Functionality

### F28: Feed Filter Rules
- `View > Filter Rules...` (⌘⌥F)
- Rules engine: IF conditions THEN actions
- Conditions:
  - Feed is [specific feed]
  - Author contains [string]
  - Title contains [string] / matches [regex]
  - Content contains [string]
  - Published after/before [date]
  - Is older than [X hours/days]
- Actions:
  - Mark as read automatically
  - Add to category
  - Add tag
  - Add to favorites
  - Send notification
  - Apply label color
- Rules stored in `automation_rules` table:
  ```sql
  CREATE TABLE automation_rules (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      conditions TEXT NOT NULL,    -- JSON
      actions TEXT NOT NULL,       -- JSON
      is_enabled INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL
  );
  ```
- Rules evaluated on article import (after fetch)
- Rule priority ordering (drag to reorder)
- Test rule against existing articles

### F29: Article Tags
- Add custom tags to any article
- Tags shown as colored pills in article list and reader
- Tag autocomplete from existing tags
- Filter by tag (sidebar filter)
- Tags stored in `article_tags` join table:
  ```sql
  CREATE TABLE tags (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      color_hex TEXT NOT NULL
  );
  CREATE TABLE article_tags (
      article_id TEXT REFERENCES articles(id) ON DELETE CASCADE,
      tag_id TEXT REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY (article_id, tag_id)
  );
  ```
- Tags synced via CloudKit (R5)

### F30: Collaborative Feed Sharing
- Share a feed subscription link: `foliords://shared-feed/{base64-encoded-feed-url}`
- Generate shareable web page: `folio.app/shared/{id}`
- Public shared feed page: shows feed title, article list (no content), subscribe button
- "Subscribe in FOLIO" button on shared page → opens FOLIO and adds feed
- Share to Messages/Email with rich link preview (Open Graph meta tags on `folio.app`)
- Shared feed analytics: view count, subscriber count

### F31: Smart Feed Bins
- Auto-categorize feeds into "bins" based on rules
- Predefined bins: "Morning Reads", "Tech News", "Development", "Design"
- Bins are virtual categories (not shown in sidebar, just filter views)
- Rule: IF feed is [X] THEN add to bin [Y]
- Drag existing rules to create bin

### F32: Article Queue / Reading List
- "Read Later" queue (separate from favorites)
- Queue items ordered manually or by scheduled read time
- `View > Reading Queue` (⌘⇧L)
- Queue integration with Siri Suggestions
- Queue badge in toolbar

### F33: Performance — Parallel Feed Fetching
- Concurrent feed fetching: up to 5 feeds in parallel
- `FeedFetchScheduler` using Swift concurrency (`TaskGroup`)
- Individual feed timeout: 30 seconds
- Progress indicator in toolbar during bulk refresh
- `URLCache` for HTTP response caching (5-minute TTL)

## UI Changes

### Rules Editor
- Sheet with two-column layout: conditions (left), actions (right)
- Add condition: "+ Condition" button → inline picker
- Add action: "+ Action" button → inline picker
- Preview: "This rule will affect X articles"
- Drag handles for reordering rules

### Tags View
- Tag manager in Settings > Tags
- Create/edit/delete tags with color picker
- Bulk-tag operations on selected articles

### Shared Feed Web Page
- Minimal design matching FOLIO aesthetic
- Feed title, favicon, article count
- List of recent 10 articles with title, date, author
- "Subscribe" button (deep links to FOLIO)
- Share buttons

## File Structure Additions
```
FOLIO/
├── Services/
│   ├── RulesEngine.swift
│   ├── TagService.swift
│   ├── SharedFeedService.swift
│   └── SharedFeedWebServer.swift   (serve folio.app locally for dev)
├── Views/
│   ├── RulesEditorSheet.swift
│   ├── RuleConditionRow.swift
│   ├── RuleActionRow.swift
│   ├── TagManagerView.swift
│   ├── TagPillView.swift
│   ├── ReadingQueueView.swift
│   └── SharedFeedPageView.swift
├── ViewModels/
│   ├── RulesViewModel.swift
│   └── ReadingQueueViewModel.swift
└── Models/
    ├── FilterRule.swift
    ├── Tag.swift
    └── SharedFeed.swift
```

## Success Criteria
- [ ] Can create/edit/delete filter rules
- [ ] Rules apply to new articles on fetch
- [ ] Can test rules against existing articles
- [ ] Tags can be added/removed from articles
- [ ] Tag filter shows correct articles
- [ ] Shared feed page loads with correct Open Graph meta
- [ ] Shared feed subscribe opens FOLIO and adds feed
- [ ] Reading queue accepts article drops
- [ ] Concurrent feed fetch shows progress
- [ ] 50 feeds refresh in under 10 seconds
