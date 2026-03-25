# crisp — Round 14: Integrations, API, Workflow Automation

## Goal
Connect Crisp to the broader productivity ecosystem — syncing with calendar apps, CRM, project management tools, and communication platforms to become a central hub of meeting intelligence.

---

## Scope

### Calendar Integrations
- **Google Calendar**: Full two-way sync — see Crisp notes inline with Google Calendar events
- **Microsoft Outlook**: Full integration via Microsoft Graph API
- **Fantastical**: Deep link integration (open Crisp from Fantastical event)
- **Zoom / Google Meet / Microsoft Teams**: "Join with Crisp" button that auto-starts recording when you join a video call

### CRM & Productivity Integrations
- **Salesforce**: After a client call, auto-create a meeting note linked to the Salesforce opportunity
- **Notion**: Export Crisp notes directly to a Notion page or database
- **Obsidian**: Export meeting notes as markdown to Obsidian vault
- **Linear / Asana**: Create tasks from Crisp action items — assign to team member, set due date
- **Slack**: Post a meeting summary to Slack channel after recording ends
- **Apple Reminders**: Send Crisp action items directly to Apple Reminders

### Crisp API
- REST API for third-party developers: `api.crisp.ai/v1/`
- Webhooks: subscribe to events (meeting started, action item created, note shared)
- OAuth 2.0 authentication
- Rate limits: 100 req/min free, unlimited for paid partners

### Automation Builder
- **IFTTT / Zapier integration** (via Crisp API): Connect Crisp to 5000+ apps
- Example automations: "When I tag a note 'client', send a Slack message to #sales"
- **Shortcuts integration**: Native Apple Shortcuts for power users

---

## Out of Scope
- Internationalization / localization (R15)
- Platform expansion (Android, web) (R16)
