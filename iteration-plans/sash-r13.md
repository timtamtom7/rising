# Sash — R13: Enterprise & IT Features

## Goal
Position Sash for enterprise IT with MDM support, audit logging, data loss prevention, and compliance controls.

---

## Scope

### MDM / Managed Device Support
- Mobile Device Management profile for enterprise deployment
- IT can configure which folders are synced, which are blocked
- Remote wipe of Sash data from managed devices
- Device compliance check: must be enrolled in MDM to sync with team

### Data Loss Prevention (DLP)
- IT can mark certain folders as "no export" — can't download to unapproved locations
- Block sync of specific file types (e.g., .pst, encrypted archives)
- Watermarking: synced files tagged with user identity
- Alerts when sensitive files are moved to less-restricted folders

### Audit & Compliance
- Comprehensive audit log: all file access, changes, shares
- Export audit log as CSV/JSON for SIEM integration
- SOC 2 Type II documentation available
- GDPR/CCPA compliance documentation
- Custom data retention policies (30 days, 90 days, 1 year, indefinite)

### Enterprise Dashboard
- Web-based admin console at admin.sash.app
- Manage team members, folders, permissions
- View storage usage and bandwidth consumption
- Generate compliance reports

### Volume Licensing
- Apple VPP enrollment for volume distribution
- License assignment via MDM
- Enterprise pricing tiers

### SSO / SAML
- SAML 2.0 SSO for dashboard access
- Support for Okta, Azure AD, Google Workspace
- JIT provisioning from SSO groups

---

## Out of Scope
- Full DLP with content inspection (beyond file type blocking)
- Network-attached storage (NAS) integration
- Custom protocol development
