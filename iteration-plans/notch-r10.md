# Notch — R10: Long-Term Maintenance, Major Version Planning

## Goal
Establish sustainable maintenance and plan Notch 2.0.

---

## Scope

### Maintenance Cadence
- Monthly minor updates
- Quarterly feature updates
- Annual major version

### Technical Debt
- Migrate from deprecated AppKit APIs
- Review notch dimension detection (may need update for new Mac models)
- Re-evaluate `host_statistics64` for CPU/RAM (APIs may change)
- Clean up UserDefaults schema

### Platform Evolution
- Monitor WWDC for notch-related API changes
- Support latest macOS + 2 previous versions
- Adapt to new Apple Silicon power management features
- New Mac models with different notch sizes: dynamic detection

### Major Version Planning (2.0)
- **Dynamic Island**: if Apple brings Dynamic Island to Mac, Notch adapts to show similar live activities
- **Touch Bar support**: Notch for MacBook Pro Touch Bar (optional bar above keyboard)
- **Notch App Store**: public marketplace for third-party notch apps
- **Widgets 2.0**: interactive widgets
- **Collaborative notch**: share notch bar configuration with friends
- **AI suggestions**: "Your CPU is high — add System Monitor to your notch?"

### End-of-Life
- 6-month minimum notice
- Settings export
- Migration path to v2

---

## Out of Scope
- Nothing. Ongoing.
