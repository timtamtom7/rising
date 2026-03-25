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

// ── Bank Sync (Plaid mock) ──────────────────────────────────
function BankSyncSection({ settings, onUpdateSettings }) {
  const [showPlaid, setShowPlaid] = useState(false);
  const [plaidStep, setPlaidStep] = useState('idle'); // idle | connecting | success
  const [linkedAccounts, setLinkedAccounts] = useState(settings.linkedAccounts || []);
  const [plaidError, setPlaidError] = useState('');

  function handleConnectBank() {
    setShowPlaid(true);
    setPlaidStep('connecting');
    setPlaidError('');

    // Simulate Plaid Link OAuth flow
    setTimeout(() => {
      // Simulate success after 2 seconds
      setPlaidStep('success');
      setTimeout(() => {
        const newAccount = {
          id: 'acct_' + Date.now(),
          institution: 'Chase',
          accountName: 'Checking ****4521',
          last4: '4521',
          balance: 8420.55,
          connectedAt: new Date().toISOString(),
          syncEnabled: true,
        };
        setLinkedAccounts((prev) => {
          const updated = [...prev, newAccount];
          onUpdateSettings({ linkedAccounts: updated });
          return updated;
        });
        setShowPlaid(false);
        setPlaidStep('idle');
      }, 1200);
    }, 2000);
  }

  function handleDisconnect(accountId) {
    setLinkedAccounts((prev) => {
      const updated = prev.filter((a) => a.id !== accountId);
      onUpdateSettings({ linkedAccounts: updated });
      return updated;
    });
  }

  function handleToggleSync(accountId) {
    setLinkedAccounts((prev) => {
      const updated = prev.map((a) =>
        a.id === accountId ? { ...a, syncEnabled: !a.syncEnabled } : a
      );
      onUpdateSettings({ linkedAccounts: updated });
      return updated;
    });
  }

  return (
    <>
      <section className="settings-section">
        <div className="section-title-row">
          <h2 className="section-title">Bank Connections</h2>
          <span className="plan-name-badge" style={{ color: '#71717a' }}>
            Powered by Plaid
          </span>
        </div>
        <div className="settings-card">
          <div className="plaid-intro">
            <div className="plaid-intro-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
            <div>
              <div className="setting-label">Auto-import deposits</div>
              <div className="setting-desc">
                Connect your checking account to automatically detect and log deposits
                toward your savings goals.
              </div>
            </div>
          </div>

          {linkedAccounts.length > 0 && (
            <div className="linked-accounts">
              {linkedAccounts.map((account) => (
                <div key={account.id} className="linked-account">
                  <div className="linked-account-info">
                    <div className="linked-account-icon">
                      {account.institution === 'Chase' ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <rect width="24" height="24" rx="4" fill="#117ACA"/>
                          <text x="12" y="17" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#71717a" strokeWidth="2">
                          <rect x="2" y="5" width="20" height="14" rx="2"/>
                          <line x1="2" y1="10" x2="22" y2="10"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="linked-account-name">{account.accountName}</div>
                      <div className="linked-account-institution">{account.institution} · ${account.balance.toLocaleString()} balance</div>
                    </div>
                  </div>
                  <div className="linked-account-actions">
                    <label className="sync-toggle">
                      <input
                        type="checkbox"
                        checked={account.syncEnabled}
                        onChange={() => handleToggleSync(account.id)}
                      />
                      <span>Auto-sync</span>
                    </label>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDisconnect(account.id)}
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="setting-row">
            <div>
              <div className="setting-label">
                {linkedAccounts.length > 0 ? 'Connect another account' : 'Connect a bank account'}
              </div>
              <div className="setting-desc">
                Your credentials are never stored. Plaid uses bank-level encryption.
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={handleConnectBank}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Connect Bank
            </button>
          </div>

          <div className="plaid-security-note">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <span>256-bit AES encryption · Read-only access · You can revoke access anytime</span>
          </div>
        </div>
      </section>

      {showPlaid && (
        <div className="overlay" onClick={() => !plaidError && setShowPlaid(false)}>
          <div className="plaid-modal" onClick={(e) => e.stopPropagation()}>
            {plaidStep === 'connecting' && (
              <div className="plaid-connecting">
                <div className="plaid-spinner" />
                <h3>Connecting to your bank…</h3>
                <p>Securely connecting via Plaid. This usually takes a few seconds.</p>
                <div className="plaid-institutions">
                  <div className="plaid-institution plaid-institution--active">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect width="24" height="24" rx="4" fill="#117ACA"/>
                      <text x="12" y="17" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">C</text>
                    </svg>
                    Chase
                  </div>
                </div>
              </div>
            )}
            {plaidStep === 'success' && (
              <div className="plaid-success">
                <div className="plaid-success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3>Bank connected!</h3>
                <p>Your checking account is now linked. Deposits will be auto-detected and logged.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

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
        <BankSyncSection
          settings={data.settings}
          onUpdateSettings={onUpdateSettings}
        />
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
