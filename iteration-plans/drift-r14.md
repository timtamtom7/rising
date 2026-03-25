# drift — Round 14: Smart Home Integration, Environmental Optimization

## Goal
Connect Drift to the smart home ecosystem — optimizing the bedroom environment for better sleep based on real-time data and personal sleep patterns.

---

## Scope

### Smart Home Integration
- **HomeKit**: Integrate with HomeKit to control bedroom devices
- **Bedroom climate**: If room is too warm/cold, suggest adjusting thermostat (Nest, ecobee, Honeywell)
- **Lights**: Suggest blue-light blocking before bed, gradual dimming; "Wind-down mode" triggers HomeKit scene
- **White noise / sound machines**: Auto-start white noise at bedtime (Sonos, Bose, Chromecast Audio)
- **Smart blinds**: Open blinds gradually in the morning (sunrise alarm alternative)

### Sleep Environment Scoring
- **Room environment score**: Based on temperature (ideal: 65-68°F), humidity, air quality, light level, noise level
- **Environmental tips**: "Your bedroom is 74°F — research shows 65-68°F is optimal for sleep"
- **Historical correlation**: Correlate room conditions with sleep quality — find user's optimal environment

### Sleep by Room
- **Multiple rooms**: Track sleep in different rooms (home bedroom, hotel, partner's place)
- **Room profiles**: Each room has its own environment settings and recommendations
- **Travel mode**: When traveling, Drift shifts to "hotel sleep" mode — lower expectations, track what's different

### Apple Home & Siri
- **Siri shortcuts**: "Hey Siri, start sleep mode" — dims lights, sets thermostat, starts white noise
- **Home app integration**: Drift appears as a device in the Apple Home app
- **Automation**: Create HomeKit automations triggered by Drift sleep/wake events

---

## Out of Scope
- Professional sleep program / therapist integration (R15)
- International expansion (R16)
