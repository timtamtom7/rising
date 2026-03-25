# Folio — R11: Advanced ML & Smart Capture

## Goal
Bring on-device ML to Folio for intelligent document classification, smart capture, and content extraction.

---

## Scope

### Intelligent Document Classification
- On-device CoreML model classifies documents automatically
- Categories: Invoice, Receipt, Contract, Letter, Note, Photo, Article, Other
- Confidence score per classification
- "This looks like an invoice — tag as Invoice?"
- Learns user's custom categories over time

### Smart Capture Enhancement
- ML-enhanced edge detection for document boundaries
- Auto-correct perspective and skew
- Detect and skip duplicate pages
- "This page is a duplicate of page 3 — skip?"

### Content Extraction
- OCR with ML-enhanced accuracy
- Extract: text, dates, amounts, names, addresses
- Structured data extraction: invoices → vendor, total, date, line items
- "Found 3 amounts on this receipt — save as expense?"

### Semantic Search
- Full-text + semantic search across all documents
- "Find documents about the kitchen renovation" → understands context
- Search filters: date range, document type, tags
- Search suggestions based on usage patterns

### Automatic Tagging
- ML suggests tags based on document content
- "Contract" → tag with parties involved, expiration date
- "Receipt" → tag with vendor, category
- Tags refined as user corrects suggestions

---

## Out of Scope
- Cloud-based OCR or ML inference
- Handwriting recognition beyond basic OCR
- Automatic document routing (future)
