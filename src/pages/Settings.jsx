import { useState } from 'react';
import './Settings.css';

const CURRENCIES = [
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'GBP', label: 'British Pound', symbol: '£' },
  { code: 'JPY', label: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', label: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', label: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', label: 'Swiss Franc', symbol: 'CHF' },
  { code: 'INR', label: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', label: 'Brazilian Real', symbol: 'R$' },
  { code: 'MXN', label: 'Mexican Peso', symbol: 'MX$' },
];

export function Settings({ data, onUpdateSettings, onExportData }) {
  const [copied, setCopied] = useState(false);

  function handleCurrencyChange(e) {
    onUpdateSettings({ currency: e.target.value });
  }

  function handleThemeChange(theme) {
    onUpdateSettings({ theme });
    document.documentElement.setAttribute('data-theme', theme);
  }

  function handleExport() {
    const json = onExportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rising-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleCopyData() {
    const json = onExportData();
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="settings-page page-enter">
      <div className="settings-header">
        <h1>Settings</h1>
      </div>

      <div className="settings-sections">
        <section className="settings-section">
          <h2 className="section-title">Appearance</h2>
          <div className="settings-card">
            <div className="setting-row">
              <div>
                <div className="setting-label">Theme</div>
                <div className="setting-desc">Choose how Rising looks to you</div>
              </div>
              <div className="theme-toggle">
                <button
                  className={`theme-btn ${data.settings.theme === 'light' ? 'theme-btn--active' : ''}`}
                  onClick={() => handleThemeChange('light')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                  Light
                </button>
                <button
                  className={`theme-btn ${data.settings.theme === 'dark' ? 'theme-btn--active' : ''}`}
                  onClick={() => handleThemeChange('dark')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                  Dark
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="section-title">Currency</h2>
          <div className="settings-card">
            <div className="setting-row">
              <div>
                <div className="setting-label">Display currency</div>
                <div className="setting-desc">Amounts shown in your chosen currency</div>
              </div>
              <select
                value={data.settings.currency}
                onChange={handleCurrencyChange}
                className="currency-select"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.symbol} {c.label} ({c.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="section-title">Data</h2>
          <div className="settings-card">
            <div className="setting-row setting-row--column">
              <div>
                <div className="setting-label">Export your data</div>
                <div className="setting-desc">Download all your goals and deposits as a JSON file</div>
              </div>
              <div className="setting-actions">
                <button className="btn btn-secondary btn-sm" onClick={handleExport}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download JSON
                </button>
                <button className="btn btn-ghost btn-sm" onClick={handleCopyData}>
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                      Copy to clipboard
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="section-title">About</h2>
          <div className="settings-card">
            <div className="about-row">
              <div className="about-logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Rising</span>
              </div>
              <p className="about-desc">Watch your goal come into view.</p>
              <p className="about-version">Version 1.0 · All data stored locally on your device</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
