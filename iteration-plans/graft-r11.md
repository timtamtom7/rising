# graft — Round 11: AI Coach, Adaptive Practice Plans, Skill Assessment

## Goal
Transform Graft from a simple practice tracker into an AI-powered skill coach — generating personalized practice plans, providing adaptive feedback, and assessing skill level objectively.

---

## Scope

### AI Practice Coach
- **Personalized practice plan**: Based on skill, current level, and goal, AI generates a 4-week practice plan
- **Session recommendations**: "Today: practice chord transitions for 20 min at 80% speed, then 10 min at full speed"
- **Adaptive difficulty**: After each session, AI adjusts tomorrow's plan based on performance
- **Technique focus**: AI identifies weak areas and prescribes targeted exercises
- **On-device ML**: All coaching logic runs locally via Core ML — no cloud dependency

### Skill Assessment Engine
- **Self-assessment quizzes**: Per skill — AI-generated questions that assess current level
- **Skill score 0-100**: Graft rates your current skill level objectively based on session data + quiz results
- **Progress visualization**: See your skill score trend over time — are you actually improving?
- **Plateau detection**: AI detects when skill score hasn't changed in 2+ weeks → suggest new approach

### Practice Music Integration
- **Setlist tracking**: For musicians — track which songs/sections you're practicing
- **Metronome integration**: Auto-log BPM used in practice sessions
- **Music app sync**: Pull practice data from GarageBand, Ableton, Tuned apps
- **Sight-reading practice**: Specific tracking for sight-reading exercises (sheet music apps)

### Gamification 2.0
- **Skill level badges**: Bronze, Silver, Gold, Platinum per skill
- **XP system**: Earn XP per practice session — levels unlock practice content
- **Daily challenges**: AI generates a daily mini-challenge for each skill ("Play the G major scale 10 times perfectly")
- **Achievement hunting**: Specific achievements for milestones ("First 100 hours in guitar")

---

## Out of Scope
- Social / community features (R12)
- Teacher/mentor platform (R13)
