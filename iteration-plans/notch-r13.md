# Notch — R13: Enterprise & IT Management

## Goal
Position Notch for enterprise IT with MDM configuration, compliance, and fleet management.

---

## Scope

### MDM Configuration Profiles
- MDM profile for enterprise Mac deployment
- IT can configure which menu bar items are visible/hidden
- Policy enforcement: some items must remain, some must not appear
- Per-department configurations

### Compliance Controls
- Menu bar compliance: ensure Macs meet organization standards
- Report which Macs are out of compliance
- "This Mac has unauthorized menu bar apps installed"
- Auto-remediate: restore compliant configuration

### Fleet Management Dashboard
- Web-based admin console at admin.notch.app
- View all managed Macs' menu bar configurations
- Deploy configurations to fleet
- Compliance reporting

### Audit Logging
- Log all menu bar configuration changes
- Who changed what and when
- Export audit log for compliance

### Volume Licensing
- Apple VPP enrollment for volume distribution
- Enterprise pricing tiers

### SSO / SAML
- SAML 2.0 SSO for dashboard
- Support for Okta, Azure AD, Google Workspace

---

## Out of Scope
- Full endpoint management (use Jamf, etc.)
- Software distribution
- Security policy enforcement beyond menu bar
