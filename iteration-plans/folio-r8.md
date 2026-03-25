# FOLIO — R8: Advanced Social, Federation, Team Workspaces

## Overview
R8 implements ActivityPub federation for decentralized social features, team workspaces for shared feed subscriptions, and advanced article analysis.

## New Functionality

### F40: ActivityPub Federation
- Implement FOLIO as an ActivityPub actor (`application.actor`)
- Outbox: publish user's shared articles as `Create` activities
- Inbox: receive `Create`, `Like`, `Announce` activities from followed users
- Deliver articles to followers via ActivityPub `public` audience
- Fetch remote user inboxes
- WebFinger for user discovery: `https://folio.app/.well-known/webfinger?resource=acct:{username}@folio.app`
- AP JSON-LD context: `https://www.w3.org/ns/activitystreams`
- `Follow`, `Undo Follow`, `Block` activities supported
- Background polling for inbox (every 5 minutes)
- AP endpoint: `https://folio.app/ap/u/{username}` (actor JSON)
- Outbox: `https://folio.app/ap/u/{username}/outbox`

### F41: Team Workspaces
- Create/join team workspaces (shared folders)
- Team admins can add/remove members
- Shared feeds: all team members see same subscriptions
- Shared annotations: team members see each other's annotations
- Team roles: Owner, Admin, Member
- Team feed list: `teams` table + `team_members` join table
- Invite link: `foliords://join-team/{inviteCode}`
- Team discussions (simple threaded comments on shared feeds)

### F42: Article Readability Score
- Calculate Flesch-Kincaid readability score for articles
- Show score badge in reader (e.g., "Grade 8", "College Level")
- "Plain language" toggle: simplify content using local rules
- Reading time adjusted based on readability
- Score computed by `ReadabilityAnalyzer.analyze(content:)`

### F43: Feed Health Monitor
- Per-feed health dashboard: update frequency, last success, error history
- `feeds.error_count`, `feeds.last_error`, `feeds.avg_response_time`
- Health status: Healthy / Degraded / Down
- Auto-disable feeds with 5 consecutive failures (user prompt)
- Email notification option for feed failures
- Feed response time graph (last 30 days)

### F44: Article Translation
- Detect article language via `NLLanguageRecognizer`
- Offer translation via `NMTranslator` (on-device Neural Engine)
- Translate button in reader toolbar
- Translated content shown in reader (original accessible via toggle)
- Language pairs: 50+ languages
- No network required for translation

### F45: Enhanced Search
- Search by author
- Search by date range
- Search by feed
- Search by tag
- Boolean search: `AND`, `OR`, `NOT`
- Search suggestions based on previous queries
- Recent searches (last 20)

## Database Additions
```sql
CREATE TABLE teams (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    owner_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    invite_code TEXT UNIQUE
);

CREATE TABLE team_members (
    team_id TEXT REFERENCES teams(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',  -- 'owner', 'admin', 'member'
    joined_at TEXT NOT NULL,
    PRIMARY KEY (team_id, user_id)
);

CREATE TABLE team_feeds (
    team_id TEXT REFERENCES teams(id) ON DELETE CASCADE,
    feed_id TEXT REFERENCES feeds(id) ON DELETE CASCADE,
    added_by TEXT NOT NULL,
    added_at TEXT NOT NULL,
    PRIMARY KEY (team_id, feed_id)
);

CREATE TABLE activitypub_actors (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    domain TEXT NOT NULL,
    inbox_url TEXT NOT NULL,
    outbox_url TEXT,
    public_key TEXT,
    last_fetched_at TEXT
);

CREATE TABLE fediverse_follows (
    id TEXT PRIMARY KEY,
    remote_actor_id TEXT NOT NULL,
    local_user_id TEXT NOT NULL,
    status TEXT NOT NULL,  -- 'pending', 'active', 'rejected'
    created_at TEXT NOT NULL
);
```

## File Structure Additions
```
FOLIO/
├── Services/
│   ├── ActivityPubService.swift
│   ├── WebFingerService.swift
│   ├── TeamService.swift
│   ├── ReadabilityAnalyzer.swift
│   ├── FeedHealthMonitor.swift
│   └── TranslationService.swift
├── Views/
│   ├── TeamWorkspaceView.swift
│   ├── TeamMembersView.swift
│   ├── TeamFeedListView.swift
│   ├── FeedHealthView.swift
│   ├── ArticleTranslationView.swift
│   └── FederationStatusView.swift
├── ViewModels/
│   ├── TeamViewModel.swift
│   └── FeedHealthViewModel.swift
└── Models/
    ├── Team.swift
    ├── TeamMember.swift
    ├── ActivityPubActor.swift
    ├── FediverseFollow.swift
    └── ReadabilityResult.swift
```

## Success Criteria
- [ ] FOLIO actor JSON is valid ActivityPub
- [ ] Can follow a remote Fediverse user
- [ ] Shared articles appear in followers' inboxes
- [ ] Can create a team workspace
- [ ] Team feeds are visible to all members
- [ ] Team annotations are visible to members
- [ ] Readability score shows on articles
- [ ] Translation works offline
- [ ] Feed health dashboard shows accurate data
- [ ] Enhanced search filters work correctly
