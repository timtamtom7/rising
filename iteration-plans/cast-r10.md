# Cast — R10: Long-Term Maintenance, Major Version Planning

## Goal
Establish sustainable maintenance practices and plan the Cast 2.0 cycle.

---

## Scope

### Maintenance Cadence
- Monthly minor updates
- Quarterly feature updates
- Annual major version bump

### Technical Debt
- Audit Google Cast SDK usage — migrate if SDK goes deprecated
- Replace any deprecated AVFoundation APIs
- Re-evaluate VideoToolbox encoder usage for Apple Silicon
- Optimize memory management in long-duration casts

### Platform Evolution
- Monitor WWDC for new macOS casting/screen sharing APIs
- Adapt to new Apple Silicon GPU architectures
- Support latest macOS + 2 previous versions
- Watch for Google Cast SDK updates and new device support

### Major Version Planning (2.0)
- **Game streaming**: low-latency game streaming to TV
- **Collaboration**: share cast session with another Mac user
- **Smart home integration**: cast to smart speakers, control lights during cast
- **Widgets 2.0**: interactive widgets for cast control
- **Safari extension**: cast tab directly from Safari toolbar
- **CLI tool**: `cast` command-line tool for scripting

### End-of-Life / Deprecation
- 6-month minimum notice before discontinuing
- Data export: settings, history, recordings list
- Migration path to v2

---

## Out of Scope
- Nothing. Ongoing.
