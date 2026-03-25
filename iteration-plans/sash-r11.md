# Sash — R11: Advanced ML & Smart Sync

## Goal
Bring on-device ML to Sash for intelligent conflict resolution, usage pattern analysis, and predictive folder syncing.

---

## Scope

### Intelligent Conflict Resolution
- On-device ML model analyzes conflict patterns
- Learns user's preference for "local wins" vs. "remote wins" based on resolution history
- Detects conflict severity: text conflict vs. structural conflict vs. identical edits
- Suggests resolution strategy: auto-merge, manual review, or backup both versions
- "This file keeps having merge conflicts — want to use a three-way merge tool?"

### Usage Pattern Analysis
- ML learns which folders user syncs most frequently
- Predicts which folders need syncing when Mac wakes: "You usually sync Downloads after a meeting"
- Sync priority ranking based on usage
- Background sync optimized for active folders, lower priority for dormant ones

### Predictive Sync
- Predict when conflicts will occur based on change patterns
- Preemptively notify user of high-conflict-risk changes
- Suggest locking a file during critical work periods

### Bandwidth Optimization
- ML compresses sync traffic based on file type patterns
- "Images in this folder are similar to previous ones — apply delta compression"
- Sync batching: group small changes together to reduce connection overhead

### Sync Health Score
- Dashboard showing sync health: uptime, conflicts resolved, bandwidth used
- Historical sync reliability trend
- Alerts when sync health degrades

---

## Out of Scope
- Direct integration with third-party cloud providers (Dropbox, Google Drive — covered in R12)
- Multi-device sync orchestration
- Network latency optimization at the infrastructure level
