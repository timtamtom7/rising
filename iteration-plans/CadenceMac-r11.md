# CadenceMac R11 — AI Focus

## Theme
Use AI to dynamically generate and adapt ambient soundscapes that optimize for focus, and detect when the user enters a flow state.

## Features
- **AI-Generated Focus Playlists** — Given a task type (deep work, creative, review) and user preferences, generate a layered ambient soundscape: rain, brown noise, lo-fi elements, nature — each layer's volume/mix tuned for the session
- **Adaptive Ambient Sound** — During a focus session, the AI monitors elapsed time and task type and subtly adjusts the soundscape (e.g., introduces a binaural beat at the 45-minute mark to counter fatigue)
- **Flow State Detection** — Combine passive signals (keystroke cadence, app focus, time-on-task, optional camera-based heart rate via Continuity) with a Core ML classifier to detect when focus is deep; notify user with an option to extend
- **Session Type Classifier** — Auto-detect session type from the app in focus (Xcode = deep work, Figma = creative, Notes = review) and pre-configure the soundscape accordingly

## Technical Notes
- **SoundscapeGenerator:** Procedural audio engine (AVAudioEngine) mixing multiple audio layers with dynamic gain nodes; audio generated locally (no streaming)
- **FlowMLModel:** Core ML binary classifier; features: keystroke velocity (accessibility), frontmost app bundle ID, session duration, time of day; retrained weekly on user-labeled flow states
- **AdaptiveMixController:** Real-time parameter updates to audio graph based on session elapsed time and flow probability score
- **FocusSessionService:** Orchestrates session lifecycle: timer, audio graph, flow detection, and notification scheduling
