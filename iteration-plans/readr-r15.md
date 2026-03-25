# readr — Round 15: International Expansion, Localization, Global Literature

## Goal
Take Readr global — full localization, international book databases, cultural adaptation for quote traditions that vary by region.

---

## Scope

### Full Localization (i18n)
- All user-facing strings in `Localizable.strings` / `.stringsdict`
- Languages: English (base), German, French, Spanish, Italian, Portuguese, Japanese, Korean, Simplified Chinese, Arabic (RTL)
- Localized screenshots for App Store in top 5 languages
- Pluralization, date/time formatting — all locale-aware

### International Quote Databases
- **Local book APIs**: Open Library (global), regional:
  - **Germany**: Deutsche Nationalbibliothek
  - **France**: BnF (Bibliothèque nationale de France)
  - **Japan**:国立国会図書館 / Calil
  - **China**: Douban
  - **Korea**: Naver Books
- **Quote databases**: BrainyQuote, Goodreads quotes, Wikiquote — international coverage

### Regional Quote Culture
- **Local literary traditions**: Track quotes from local classics alongside international books
- **Multilingual quotes**: A quote may exist in original language and translation — support both
- **Regional reading challenges**: "Read 5 books by Japanese authors this year" — localized discovery
- **RTL support**: Full support for Arabic, Hebrew, Farsi — right-to-left quote layouts

### International Pricing & Payments
- PPP-adjusted pricing for developing markets
- Local payment methods: Alipay, UPI, Boleto, Paytm
- Regional App Store page optimization

---

## Out of Scope
- Readr 2.0 redesign (R16)
- Awards and press (R17)
