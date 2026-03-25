# Swatch — R13: Enterprise & Agency Features

## Goal
Position Swatch for design agencies and enterprises with brand management, multi-brand support, and compliance tools.

---

## Scope

### Multi-Brand Management
- Create multiple brand workspaces within one account
- Each brand has its own palette library, style guide, and tokens
- Quick brand switcher in the app
- Per-brand permissions: different team members have access to different brands

### Brand Portal
- Client-facing brand portal (read-only, shareable link)
- Clients can view approved palettes without accessing the full app
- Download assets from portal (CSS, Swift, Android, CSS variables)
- Portal branding customizable (use agency logo)

### Agency Tools
- Client onboarding workflow: create workspace, invite client, set up palette
- White-label option: agency-branded Swatch instance (enterprise tier)
- API access for agencies to build custom integrations
- Bulk palette operations: duplicate, merge, export across multiple brands

### Compliance & Audit
- Audit log: all palette changes with timestamp and user
- Export audit log as CSV for compliance
- SOC 2 Type II documentation available
- GDPR/CCPA compliance documentation

### Volume Licensing
- Agency license: unlimited brand workspaces
- Team pricing: 5+ seats = 20% discount
- Academic pricing for design schools
- License management via Apple VPP

### SSO / SAML (Enterprise)
- SAML 2.0 SSO for enterprise dashboard
- Support for Okta, Azure AD, Google Workspace
- Role mapping from SSO groups to Swatch roles

---

## Out of Scope
- Full DAM (Digital Asset Management) — use Bynder, Brandfolder
- Workflow automation beyond color approval
- ERP integration
