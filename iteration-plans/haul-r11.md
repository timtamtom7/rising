# haul — Round 11: AI Packing Genius, Weather Intelligence, Smart Suggestions

## Goal
Transform Haul from a manual packing list into an AI-powered packing intelligence — predicting what to pack based on destination, weather, trip duration, and personal patterns.

---

## Scope

### AI Packing Genius
- **"Where are you going?"**: Enter destination → AI generates a packing list based on: weather, trip type (business/leisure/adventure), duration, activities planned
- **Weather-aware packing**: Pull weather forecast for destination — if rain, add umbrella; if cold, add jacket
- **Activity-based suggestions**: "You mentioned hiking — add these 5 items" — AI suggests based on activities
- **"You packed for a 5-day trip last time"**: Uses past packing history to personalize
- **On-device AI**: All AI suggestions run on-device via Core ML

### Weather Intelligence
- **Destination weather**: Pull 10-day forecast for destination
- **Packing weather alerts**: "It's going to rain in Tokyo — consider a rain jacket"
- **Temperature-based layers**: Suggest packing layers if temperature varies significantly
- **Seasonal awareness**: "It's monsoon season in Bali — add a rain poncho"
- **Multiple destinations**: If trip has multiple stops, pull weather for each

### Smart Suggestions
- **Duration scaling**: AI auto-calculates quantities based on trip length — 3 days = 3 t-shirts, 7 days = 7
- **Space optimization**: "Your suitcase is 70% full — consider rolling clothes to save space"
- **Weight estimation**: Estimate packed weight — warn if approaching airline limit
- **"You forgot X"**: Before departure, AI checks — "You didn't add any socks"

### Trip Context
- **Event-based packing**: If traveling for a wedding, suggest formal attire and gifts
- **Business trip mode**: Add laptop, charger, business cards, portfolio
- **Beach trip mode**: Bikini, sunscreen, beach towel, sandals
- **Camping mode**: Tent, sleeping bag, flashlight, first aid kit

---

## Out of Scope
- Social features / share packing lists (R12)
- Subscription optimization (R13)
