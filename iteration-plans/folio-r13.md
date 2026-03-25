# Folio — R13: Enterprise & Compliance Features

## Goal
Position Folio for enterprise with document retention policies, compliance reporting, and legal hold.

---

## Scope

### Retention Policies
- Configure retention rules per document type
- "Tax documents: retain 7 years, then auto-archive"
- "Contracts: retain for term + 3 years"
- Auto-archive, auto-delete, or review-required at expiration

### Legal Hold
- Place documents under legal hold (litigation, audit)
- Held documents cannot be deleted
- Hold reason and date logged
- Bulk hold: apply hold to all documents matching criteria

### Compliance Reporting
- Document retention compliance report
- Documents approaching expiration
- Documents under hold
- Export compliance report as CSV/PDF

### Audit Trail
- Full audit log: all document access, views, downloads, changes
- Export audit log for compliance
- SOC 2 Type II documentation available
- GDPR/CCPA compliance documentation

### Enterprise Search
- Global search across all org documents
- Search filters: type, date, author, retention status
- Search analytics for admins

### SSO / SAML
- SAML 2.0 SSO for enterprise dashboard
- Support for Okta, Azure AD, Google Workspace

### Volume Licensing
- Apple VPP enrollment
- Enterprise pricing tiers

---

## Out of Scope
- Full ECM (Enterprise Content Management)
- Integration with legal case management systems
- eBilling
