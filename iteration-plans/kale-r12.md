# kale — Round 12: Smart Home, Pharmacy Integration, Auto-Refills

## Goal
Connect Kale to the broader health ecosystem — smart home devices, pharmacies, and health providers — making supplement management seamless and automatic.

---

## Scope

### Smart Home Integration
- **Pill dispenser integration**: Connect to smart pill dispensers (Hero, MedMinder) — log doses automatically when dispenser opens
- **HomeKit**: Control bedroom lighting for evening supplement reminder routine
- **Alexa / Google Home**: Voice commands — "Alexa, did I take my Vitamin D today?"
- **Scale / body composition**: Pull body composition data (Apple Watch, Withings) — correlate with supplement efficacy

### Pharmacy Integration
- **Prescription import**: Photograph a prescription — AI extracts supplement/dosage info
- **Pharmacy sync**: Connect to CVS, Walgreens, Amazon Pharmacy — track prescription supplements
- **Auto-refill alerts**: When supply runs low, suggest refilling — integrate with pharmacy for one-click refill
- **Supplement history for doctor**: Generate a PDF "supplement passport" for your doctor — all supplements, dosages, duration

### Auto-Refill System
- **Supply tracking**: Track how many doses remain in each supplement
- **Auto-reorder**: Set "auto-reorder when 7 days remaining" — Kale sends order to preferred pharmacy
- **Subscription supplements**: Support for subscription supplement services (Nutrisystem, Care/of, Rootine)
- **Price comparison**: Compare supplement prices across Amazon, iHerb, local stores

### Inventory Management
- **Barcode scanning**: Scan supplement bottle barcode to add to inventory
- **Auto-decrement**: Each dose logged decrements inventory automatically
- **Expiration tracking**: Alert when supplements are about to expire
- **Multi-location tracking**: Supplements at home, office, gym bag — track all locations

---

## Out of Scope
- Subscription optimization (R13)
- Family / multi-user features (R13)
