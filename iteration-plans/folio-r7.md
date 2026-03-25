# FOLIO — R7: RSS Discovery, Social Features, Plugin System

## Overview
R7 adds RSS feed discovery from websites, a social layer (following other FOLIO users' shared feeds), and a plugin system for extensibility.

## New Functionality

### F34: Feed Discovery Engine
- `File > Discover Feeds...` (⌘⇧D)
- Enter a website URL → auto-discover all RSS/Atom feeds
- Parse HTML for `<link rel="alternate">` tags
- Also check common paths: `/rss`, `/feed`, `/atom.xml`, `/feed.xml`, `/rss.xml`
- Display discovered feeds in a picker with feed title, description, update frequency estimate
- Select multiple feeds to subscribe
- Discovery service: `FeedDiscoveryService.discover(url:)` → `[DiscoveredFeed]`
- Background: `CrawlService` for finding related feeds from discovered sites

### F35: Feed Directory / Browse
- Built-in feed directory: curated list of popular feeds by category
- Browse by: Technology, News, Science, Design, Business, Entertainment, Sports, Gaming
- Featured feeds section (editorial picks)
- "Trending" feeds based on FOLIO user subscriptions (aggregated, anonymous)
- Search directory
- One-click subscribe from directory
- Directory data hosted at `api.folio.app/directory` (JSON endpoint)

### F36: Social — Follow Other Users
- Create FOLIO profile: username, display name, bio
- Share your public favorites feed: `folio.app/u/{username}`
- Follow other users → their shared favorites appear in sidebar under "Following"
- Block/mute users
- Profile stored in CloudKit (private) + public record type
- Feed sync: following feed updates every hour
- "Discover Users" section in sidebar

### F37: Plugin System
- Plugin API: macOS plug-in target (`FOLIOPlugin` protocol)
- Plugin manifest (`plugin.json`):
  ```json
  {
    "name": "Readability",
    "version": "1.0",
    "author": "FOLIO Team",
    "description": "Enhanced readability scoring",
    "permissions": ["article.content", "article.metadata"],
    "actions": ["articleToolbar", "articleContextMenu"]
  }
  ```
- Plugin types:
  - **Content Processor** — modify article content before display
  - **Toolbar Action** — add button to reader toolbar
  - **Context Menu** — add items to article right-click menu
  - **Feed Processor** — transform feed data on import
- Plugins bundled in `.folioplugin` bundles
- Plugin manager in Settings > Plugins
- Sandboxed plugin execution (no filesystem, no network by default)
- Plugins can request additional entitlements

### F38: Social Sharing of Articles
- "Share to FOLIO Social" → your followers see this article
- Like/heart articles shared by people you follow
- Comments on shared articles (threaded)
- Notification when someone shares an article from your subscriptions
- Simple Activitypub-style federation (future R8/R9)

### F39: Reading Progress Sync
- Sync reading progress (scroll position, % read) to CloudKit
- "Resume reading" on any device
- `ReadingProgress` record: `articleId`, `percentRead`, `lastPosition`, `deviceId`, `updatedAt`

## Plugin API Specification

```swift
@objc public protocol FOLIOPlugin {
    var manifest: FOLIOPluginManifest { get }
    func process(content: String, for article: FOLIOArticle) -> String
    func toolbarAction(for article: FOLIOArticle) -> FOLIOPluginAction?
}

@objc public protocol FOLIOContentPlugin {
    func process(content: String, for article: FOLIOArticle) -> String
}

@objc public protocol FOLIOToolbarPlugin {
    func toolbarAction(for article: FOLIOArticle) -> FOLIOPluginAction?
}

@objc public protocol FOLIOContextMenuPlugin {
    func contextMenuItems(for article: FOLIOArticle) -> [NSMenuItem]
}
```

## File Structure Additions
```
FOLIO/
├── Services/
│   ├── FeedDiscoveryService.swift
│   ├── FeedDirectoryService.swift
│   ├── SocialService.swift
│   ├── PluginManager.swift
│   └── PluginSandbox.swift
├── Views/
│   ├── FeedDiscoverySheet.swift
│   ├── DiscoveredFeedRow.swift
│   ├── FeedDirectoryView.swift
│   ├── FeedDirectoryCategoryView.swift
│   ├── SocialFeedView.swift
│   ├── ProfileView.swift
│   ├── FollowUserSheet.swift
│   ├── PluginManagerView.swift
│   └── PluginSettingsView.swift
├── ViewModels/
│   ├── FeedDiscoveryViewModel.swift
│   ├── SocialFeedViewModel.swift
│   └── PluginViewModel.swift
├── Models/
│   ├── DiscoveredFeed.swift
│   ├── FeedDirectoryEntry.swift
│   ├── FOLIOUser.swift
│   ├── PluginManifest.swift
│   └── PluginAction.swift
└── FOLIOPlugin/
    ├── FOLIOPluginProtocol.swift
    └── FOLIOPluginHost.swift
```

## Success Criteria
- [ ] Feed discovery finds all feeds on a website
- [ ] Feed directory loads and categories are browsable
- [ ] Can create profile and share favorites publicly
- [ ] Following another user shows their shared articles
- [ ] Plugin manager shows installed plugins
- [ ] Sample plugin loads and executes content processing
- [ ] Social share appears in share menu
- [ ] Reading progress syncs between devices
