# fume — Round 18: Platform Ecosystem, AI Agents, Long-Term Architecture

## Goal
Build a rich platform ecosystem around Fume — enabling AI agents, third-party developers, and spatial computing experiences that extend Fume's knowledge graph into the next era.

---

## Scope

### AI Agents for Knowledge
- **Fume Agent**: An AI agent that researches topics on your behalf — searches the web, reads sources, adds to your library with annotations
- **Research task**: "Research the history of Stoicism" → Agent finds, reads, and summarizes 20 sources
- **Weekly briefing**: Agent compiles a weekly briefing on topics in your library
- **Gap detection**: Agent looks at your library and says "you've been researching X but haven't looked at Y (which is related)"
- Works via Apple Intelligence + custom agent framework

### Fume for Apple Vision Pro
- **Spatial knowledge graph**: View your knowledge graph in 3D space — walk through your concept map
- **Immersive reading**: Read sources in a distraction-free spatial environment
- **Collaboration**: Share a spatial knowledge session with others (Vision Pro to Vision Pro)
- **Research meeting**: Two researchers in Vision Pro review sources together in spatial space

### Plugin & Extension Ecosystem
- **Plugin store**: Third-party plugins that extend Fume (citation managers, academic tools, writing enhancers)
- **Plugin SDK**: Publish Fume's plugin API — allow developers to build plugins
- **VS Code extension**: Fume sidebar in VS Code — browse your library while coding
- **Figma plugin**: Browse Fume sources while designing — relevant research at your fingertips

### Long-Term Architecture
- **Scalable backend**: If/when we hit 100K users, migration path from Firebase to own backend
- **Federation**: Allow users to federate their knowledge graph — connect with other users' knowledge graphs (like the Fediverse but for knowledge)
- **Data portability**: Full data export at any time — JSON, Markdown, CSV

---

## Out of Scope
- Fume 3.0 planning (R19)
- Company building (R20)
