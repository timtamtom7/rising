# Shelf — R13: Enterprise & Business Features

## Goal
Expand Shelf for enterprise use with MDM support, audit logging, compliance controls, and team administration.

---

## Scope

### MDM / Managed Device Support
- Mobile Device Management profile for enterprise Mac deployment
- IT can push shared shelf configurations to managed Macs
- Managed shelves are read-only for end users (organization-provided content)
- Remote wipe of shared shelf data if device lost

### Compliance & Audit
- SOC 2 Type II compliance documentation available on request
- Audit log: all shelf interactions logged (item opens, shares, comments)
- Export audit log as CSV or JSON for compliance
- Data retention: configurable (30 days, 90 days, 1 year, indefinite)
- GDPR/CCPA compliance for team data

### Enterprise Single Sign-On
- SAML 2.0 SSO for enterprise dashboard access
- Supported: Okta, Azure AD, Google Workspace, Ping Identity
- JIT provisioning — auto-creates account on first login
- Group-based shelf access from SSO groups

### Volume Licensing
- Apple VPP enrollment for volume distribution
- License assignment via MDM
- License usage reporting for IT
- Academic pricing for education institutions

### Admin Dashboard
- Web-based admin console at admin.shelf.app
- Manage team members, shelves, permissions
- View usage analytics (most accessed items, inactive shelves)
- Generate team activity reports
- Bulk import/export of shelf configurations

### Data Residency
- Option to store team data in specific region (US, EU, APAC)
- Data Processing Agreement (DPA) for enterprise customers

---

## Out of Scope
- Full DLP (Data Loss Prevention) integration
- Custom domain / white-label for enterprises
- Integration with SAP, Oracle, or legacy ERP systems
