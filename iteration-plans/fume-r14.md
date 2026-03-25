# fume — Round 14: Developer API, Integrations, Automation

## Goal
Build a Fume developer ecosystem — enabling third-party developers to build on Fume's knowledge graph, and integrating Fume into the tools people already use.

---

## Scope

### Fume API
- REST API: `api.fume.app/v1/`
- OAuth 2.0 (Apple Sign In, Google, email)
- Endpoints:
  - Sources: list, create, read, update, delete
  - Notes: list, create per source
  - Libraries: list, manage members
  - Search: semantic search over user's library
  - Graph: get concept graph for user
- Rate limits: 1000 req/hour free, unlimited for paid partners
- Webhooks: subscribe to events (source added, note created, library updated)

### Integration Hub
- **Obsidian plugin**: Native Obsidian plugin — view Fume sources inside Obsidian, link notes both directions
- **Notion integration**: Import/export between Fume and Notion databases
- **Readwise integration**: Sync highlights from Readwise reader apps into Fume
- **Instapaper/Pocket integration**: Import articles from read-later apps
- **Zotero integration**: Import academic sources from Zotero
- **Kindle integration**: Import highlights from Kindle (via Amazon takeout)

### Automations
- **IFTTT / Zapier**: Via Fume API — connect to 5000+ apps
- Example automations: "Save all starred tweets to Fume", "When Fume adds a philosophy source, post to Slack"
- **Apple Shortcuts**: Native Shortcuts actions for Fume (add source, search, get insights)

### Fume for Teams
- **Team workspace**: Shared library for teams (Pro for Teams tier)
- **Team admin dashboard**: Manage members, permissions, data retention
- **Team analytics**: What topics is the team researching most? Who's most active?
- **Shared knowledge base**: A Fume library as a team wiki / research database

---

## Out of Scope
- Subscription business optimization (R15)
- International expansion (R16)
