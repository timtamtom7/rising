# Caliber — R14: API, Web App & Developer Platform

## Goal
Expose Caliber via REST API and build a companion web app for study access, class management, and third-party integrations.

---

## Scope

### Local REST API
- Built-in HTTP server on localhost (port 8770)
- Endpoints:
  - `GET /decks` — list decks
  - `GET /decks/:id/cards` — cards in a deck
  - `POST /decks` — create deck
  - `POST /decks/:id/cards` — add card
  - `PUT /cards/:id` — update card
  - `GET /reviews/due` — cards due for review
  - `POST /reviews/:cardId` — submit review result
  - `GET /stats` — personal learning statistics
  - `GET /export/:deckId` — export deck
- API key in macOS Keychain
- OpenAPI 3.0 spec at `/openapi.json`
- Rate limit: 100 requests/minute

### Web App (caliber.app)
- PWA for studying from any browser
- Full review experience (spaced repetition, card display)
- Deck management, class management for instructors
- Progress tracking and analytics
- Responsive: iPhone, iPad, desktop
- Apple Sign-In for authentication

### Webhooks
- Event webhooks:
  - `deck.updated` — deck changed
  - `card.added` — new card in deck
  - `review.completed` — user completed a review session
  - `assignment.due` — assignment coming due
  - `class.progress` — class milestone reached
- HMAC-signed payloads

### Developer Portal
- docs.caliber.app/developers
- API reference, integration guides
- LMS integration guides (LTI)
- Sample code (Swift, Python, JavaScript)
- Postman collection

### LMS Integration (LTI)
- LTI 1.3 provider: Caliber appears in Canvas, Blackboard, Moodle
- Deep linking: embed specific cards/decks in LMS
- Grade sync: Caliber scores sent to LMS gradebook

### Zapier / Make
- Triggers: deck updated, assignment due, study streak at risk
- Actions: create card, add to deck, enroll student

---

## Out of Scope
- Full gradebook integration beyond LTI
- Real-time collaborative study sessions via web
- Automated content generation from video
