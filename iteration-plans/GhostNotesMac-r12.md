# GhostNotesMac R12 — Social

## Theme
Transform reading from a solitary activity into a shared knowledge experience through collaborative queues, recommendations, and annotation.

## Features
- **Shared Reading Queues** — Create or join a reading queue with friends; all members can add articles; queue is ordered by votes and recency
- **Article Recommendations from Friends** — When a friend saves and endorses an article, you receive a recommendation card with their 1-line take ("Changed how I think about X — @t")
- **Collaborative Annotation** — Highlight any passage in an article; your highlight is visible to friends who also have the article; threaded comment on any highlight; reactions (💡/🔥/🙃)
- **Reading Stats Sharing** — Opt-in weekly reading digest shared to friends: articles read, topics explored, top highlights; gamified with reading badges (Speed Reader, Deep Diver, etc.)

## Technical Notes
- **QueueService:** Shared queue CRUD with vote tracking; ordering algorithm = recency score + vote score + diversity penalty (prevents topic clustering)
- **RecommendationEngine:** When friend endorses, push a notification to their followers; endorsement includes a short AI-assisted take ("why I recommended this")
- **AnnotationSync:** Highlights stored per user + per article; friends see highlights only after they've opened the article (no spoilers); conflict resolution for same-passage highlights
- **DigestGenerator:** Weekly automated email/in-app digest with article thumbnails, highlights, and stats; configurable send day/time; opt-out per recipient
