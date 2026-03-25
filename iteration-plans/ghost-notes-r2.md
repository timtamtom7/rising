# Ghost Notes — Iteration 2 Plan

## What was built (Iteration 1 deep pass)
- Pricing page (Free/Pro/Team)
- Onboarding flow (4 screens)
- Error states (network, empty, session expired, image upload, article load)
- Subscriptions UI (upgrade prompts, plan badges, settings)
- Custom SVG graphics (ghost, paper stack, card animations)
- All real copy, no lorem ipsum

## What's still missing (Iteration 2 focus)

### 1. Lists / Collections
- Create named lists ("Deep Dives", "Research", "Recipes")
- Move items between lists
- List-specific view with item count
- Move to list from Haul card

### 2. Stats Page
- "You've saved X articles. Read Y. Cull rate: Z%."
- Shown subtly in Archive, not a main nav item
- Reading time saved (sum of all article reading times)
- Cull reason tracking (optional: why did you cull?)

### 3. Article Reading Mode Polish
- Better reading view (Mercury parser integration)
- Reading progress indicator (% scrolled)
- Estimated reading time prominently shown
- "Done reading" → marks as read + archives
- Font size controls (small/medium/large)
- Theme controls (light/sepia/dark within reading mode)

### 4. Search
- Search across all saves (title, domain, description)
- Search in archive
- Keyboard shortcut: `Cmd+K` for search

### 5. Share Extension (if time)
- iOS share sheet to save to Ghost Notes
- macOS share extension
- Browser right-click "Save to Ghost Notes"

## Custom Graphics for Iteration 2
- Stats visualization (saves vs read vs culled — could be a pie chart or bar)
- Reading progress indicator design
- Empty state for empty lists
- Empty state for empty archive
- Search input design

## Pricing Upgrade Opportunities
- Team tier: real team management (invite by email, role: admin/member)
- Pro: "Read offline" feature (save article for offline reading)
