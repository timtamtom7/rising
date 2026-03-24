import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PLANS, getPlanFromKey } from '../utils/subscriptions';
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

function SubscriptionSection({ subscription, onUpdateSettings }) {
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const plan = getPlanFromKey(subscription?.plan || 'free');
  const planOrder = ['free', 'homebuyer', 'investor'];
  const planIndex = planOrder.indexOf(subscription?.plan || 'free');

  function handleUpgradeTo(newPlan) {
    onUpdateSettings({
      subscription: {
        ...subscription,
        plan: newPlan,
        subscribedAt: new Date().toISOString(),
      },
    });
    setShowUpgradePrompt(false);
  }

  const lockedFeatures = [];
  if (planIndex < 1) {
    lockedFeatures.push({ feature: 'deposit_calculator', label: 'Deposit calculator' });
    lockedFeatures.push({ feature: 'market_alerts', label: 'Market alerts' });
    lockedFeatures.push({ feature: 'agent_contacts', label: 'Agent contacts' });
  }
  if (planIndex < 2) {
    lockedFeatures.push({ feature: 'portfolio_view', label: 'Portfolio view' });
    lockedFeatures.push({ feature: 'roi_calculations', label: 'ROI calculations' });
    lockedFeatures.push({ feature: 'market_trends', label: 'Market trends' });
    lockedFeatures.push({ feature: 'unlimited_properties', label: 'Unlimited properties' });
  }

  return (
    <section className="settings-section">
      <div className="section-title-row">
        <h2 className="section-title">Subscription</h2>
        <span className="plan-name-badge" style={{ color: plan.color }}>
          {plan.name} {plan.price > 0 ? `· ${plan.priceDisplay}` : '· Free'}
        </span>
      </div>

      <div className="settings-card">
        <div className="setting-row">
          <div>
            <div className="setting-label">Current plan</div>
            <div className="setting-desc">
              {plan.price === 0
                ? 'Free forever. Track one property with basic tools.'
                : `You\'re on the ${plan.name} plan.`}
            </div>
          </div>
          <Link to="/pricing" className="btn btn-secondary btn-sm">
            View plans
          </Link>
        </div>

        {lockedFeatures.length > 0 && (
          <>
            <div className="setting-row setting-row--column">
              <div>
                <div className="setting-label">Locked features</div>
                <div className="setting-desc">
                  Upgrade to unlock these tools
                </div>
              </div>
              <div className="locked-features">
                {lockedFeatures.map((f) => (
                  <div key={f.feature} className="locked-feature">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <span>{f.label}</span>
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => {
                        const nextPlan = planIndex < 1 ? 'homebuyer' : 'investor';
                        handleUpgradeTo(nextPlan);
                      }}
                    >
                      Unlock
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {subscription?.plan !== 'free' && (
          <div className="setting-row">
            <div>
              <div className="setting-label">Manage billing</div>
              <div className="setting-desc">
                {subscription?.status === 'active' ? 'Next billing date: never (demo mode)' : `Status: ${subscription.status}`}
              </div>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => handleUpgradeTo('free')}
            >
              Cancel plan
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export function Settings({ data, onUpdateSettings, onExportData }) {
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const subscription = data.settings.subscription || { plan: 'free', status: 'active' };

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
        <SubscriptionSection
          subscription={subscription}
          onUpdateSettings={onUpdateSettings}
        />

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
