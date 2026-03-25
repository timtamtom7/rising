# Chronicle — R17: Enterprise Features & Team Management

## Goal
Expand Chronicle for small business teams with admin controls, audit logging, and managed deployments.

---

## Scope

### Team Admin Console
- Create a team workspace (team admin dashboard)
- Invite team members via email — role-based access (Admin, Member, Viewer)
- Admin can configure which bills are visible to which roles
- Team-level bills: shared team expenses (software subscriptions, office rent)

### Audit Log
- Immutable log of all changes: who changed what, when
- Log entries: bill created, amount changed, paid status updated, member added
- Export audit log as CSV for compliance reporting
- Retention: 2 years of log history

### Managed iCloud / Mobile Device Management
- Support for Managed Apple IDs (Apple Business Manager)
- Deploy Chronicle via MDM with pre-configured team settings
- Configurable policy: force certain categories, block personal bills, set reminder defaults
- Remote wipe of team data if device lost

### Data Residency
- Option to restrict data storage to specific geographic region (EU, US, APAC)
- Compliance with GDPR, CCPA for team accounts
- Data Processing Agreement (DPA) available for enterprise customers

### Team Billing
- Single team invoice covering all members
- Volume pricing: 10+ seats = 20% discount, 50+ seats = 40% discount
- Purchase order support for enterprise

### SSO / SAML Support
- Enterprise Single Sign-On via SAML 2.0
- Supported IdPs: Okta, Azure AD, Google Workspace
- JIT (Just-In-Time) provisioning — auto-create account on first SSO login

---

## Out of Scope
- Full ERP integration (SAP, Oracle)
- Custom domain email for team members
- White-label option
