# CadenceMac R13 — Polish

## Theme
Polish CadenceMac for launch with deep-sea aesthetic consistency, notification refinement, and full App Store readiness.

## Features
- **Launch Checklist** — TestFlight build submitted, screenshots captured (all Mac sizes, light + dark), App Store Connect metadata entered, support + marketing URLs live, export compliance filed
- **App Store Listing** — Title: "CadenceMac — Flow, Together"; subtitle: "AI-powered focus sessions with your team"; description emphasizes adaptive soundscapes and social accountability; keywords: focus, deep work, productivity, flow, pomodoro, ambient
- **Deep-Sea Aesthetic Consistency** — Full audit: all screens use the underwater palette (deep navy, bioluminescent teal, soft coral accents); bubble particle animations tuned (subtle, not distracting); typography uses SF Pro Display/Rounded for headings; no bright whites in dark areas
- **Notification Polish** — All notifications use the deep-sea tone (sound: soft bubble, not harsh chime); interruption level set appropriately; pre-focus reminder is actionable ("Start Focus →" inline reply); post-session summary is rich (thumbnail + stats)

## Technical Notes
- **AestheticCI:** Automated screenshot diffing against the design reference palette; CI fails if any screen deviates beyond tolerance
- **NotificationServiceAudit:** Test all notification types (reminder, partner nudge, challenge update, session complete) in Do Not Disturb and Focus modes
- **AssetVerification:** All SF Symbols replaced with consistent style (rounded weight); custom icons (focus timer, bubbles, team) validated at all sizes (16, 32, 128, 256, 512)
- **MemoryProfiling:** Profile audio graph memory (AVAudioEngine nodes) under extended sessions; cap at 80MB resident; test 8-hour continuous session stability
