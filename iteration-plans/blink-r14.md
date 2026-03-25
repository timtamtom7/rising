# blink — Round 14: Web Platform, API, Developer Ecosystem

## Goal
Build a web presence for Blink and open a lightweight API for third-party integrations — making Blink the backend for any app that deals with personal video memories.

---

## Scope

### Web App (Pro/Web Tier)
- Responsive web app at blink.app — log in with Apple ID / Google
- View all clips in browser: grid view, calendar view, search
- Download clips, share links
- "My Year in Blink" — web version of the annual highlight reel
- Embeddable clip player for sharing on any platform

### Shared Album Web View
- Anyone (even without Blink app) can view a shared album via a private link
- No account needed to view shared albums
- Download disabled for shared albums (creator controls)

### Developer API
- REST API for third-party developers: `api.blink.app/v1/`
- Endpoints: list clips, get clip metadata, upload clip, delete clip
- OAuth 2.0 with Apple Sign In
- Use cases: home security cameras auto-saving to Blink, baby monitors, dash cams
- Rate limits: 1000 req/hour free, unlimited for Pro partners

### Widgets (iOS/macOS)
- Home Screen widget: "Memory of the Day" — one clip thumbnail with date
- Lock Screen widget: compact — just date and clip count for today
- Smart Stack integration: Blink surfaces in stack when you're near a location from a past memory

---

## Out of Scope
- Full social platform on web (keep it clip viewing/downloading/sharing)
- Mobile app for Android (R15)
