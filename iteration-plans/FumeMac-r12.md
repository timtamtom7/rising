# FumeMac R12 — Sharing

## Theme
Transform personal notes into shared knowledge bases where friends and collaborators can ask questions and contribute research together.

## Features
- **Share Knowledge Bases** — Select a notebook or tag and share it with specific friends; they can read, search, and ask questions against your shared notes
- **"Ask My Notes" Public Pages** — Generate a public, read-only URL for a curated set of notes; anyone with the link can ask the AI a question; responses cite your notes
- **Collaborative Research Spaces** — Shared writable notebooks where invited friends can add notes, annotate each other's entries, and co-build a knowledge base; version history preserved
- **Permission Levels** — Owner, editor, commenter, reader roles for shared spaces; revocation instant and complete

## Technical Notes
- **SharingService:** Handles notebook ACLs; issues time-limited tokens for public pages; server-side Q&A inference pipeline with RAG over shared notes
- **PublicPageGenerator:** Static site or serverless function renders a read-only page backed by the shared notes index; includes an embedded Q&A widget
- **CollaborationService:** Real-time sync via CRDTs or operational transformation; conflict resolution for concurrent edits; per-user edit attribution
- **AuditLog:** All shared-space actions logged; owners can see read counts and Q&A topics on public pages
