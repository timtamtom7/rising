import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PLANS } from '../utils/subscriptions';
import './Pricing.css';

function PlanCard({ planKey, plan, selected, onSelect, currentPlan }) {
  const isCurrent = currentPlan === planKey;
  const isUpgrade = !isCurrent && ['free', 'homebuyer', 'investor'].indexOf(planKey) > ['free', 'homebuyer', 'investor'].indexOf(currentPlan);

  return (
    <div className={`plan-card ${plan.highlight ? 'plan-card--highlight' : ''} ${selected ? 'plan-card--selected' : ''} ${isCurrent ? 'plan-card--current' : ''}`}>
      {plan.highlight && <div className="plan-badge">{plan.badge}</div>}

      <div className="plan-header">
        <div className="plan-name-wrap">
          <h3 className="plan-name">{plan.name}</h3>
          {isCurrent && <span className="plan-current-badge">Current plan</span>}
        </div>
        <div className="plan-price">
          <span className="plan-price-amount">
            {plan.price === 0 ? 'Free' : `$${plan.price}`}
          </span>
          {plan.price > 0 && <span className="plan-price-period">/month</span>}
        </div>
        <p className="plan-description">{plan.description}</p>
      </div>

      <ul className="plan-features">
        {plan.features.map((f, i) => (
          <li key={i} className={`plan-feature ${!f.included ? 'plan-feature--disabled' : ''}`}>
            {f.included ? (
              <svg className="plan-feature-icon plan-feature-icon--check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg className="plan-feature-icon plan-feature-icon--lock" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            )}
            <span>{f.label}</span>
            {f.badge && <span className="plan-feature-badge">{f.badge}</span>}
          </li>
        ))}
      </ul>

      <div className="plan-cta">
        {isCurrent ? (
          <button className="btn btn-secondary btn-full" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Current plan
          </button>
        ) : plan.price === 0 ? (
          <button className="btn btn-secondary btn-full" onClick={() => onSelect(planKey)}>
            Downgrade to Free
          </button>
        ) : isUpgrade ? (
          <button className="btn btn-primary btn-full" onClick={() => onSelect(planKey)}>
            Upgrade to {plan.name}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        ) : (
          <button className="btn btn-ghost btn-full" onClick={() => onSelect(planKey)}>
            Switch to {plan.name}
          </button>
        )}
      </div>
    </div>
  );
}

function DepositCalculator() {
  const [homePrice, setHomePrice] = useState('425000');
  const [downPct, setDownPct] = useState(20);

  const price = parseFloat(homePrice.replace(/[^0-9.]/g, '')) || 0;
  const downPayment = price * (downPct / 100);
  const loanAmount = price - downPayment;
  const rate = 0.07; // 7% APR
  const term = 30;
  const monthlyRate = rate / 12;
  const numPayments = term * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalMonthly = monthlyPayment + (price * 0.0012); // ~$500/mo property tax estimate + insurance

  return (
    <div className="calc-section">
      <h3 className="calc-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
        Mortgage calculator
      </h3>

      <div className="calc-grid">
        <div className="calc-field">
          <label>Home price</label>
          <div className="calc-input-wrap">
            <span className="calc-prefix">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value.replace(/[^0-9.]/g, ''))}
            />
          </div>
        </div>

        <div className="calc-field">
          <label>Down payment</label>
          <div className="calc-slider-wrap">
            <input
              type="range"
              min="3"
              max="50"
              step="1"
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="calc-slider"
            />
            <div className="calc-slider-labels">
              <span>{downPct}%</span>
              <span className="calc-slider-amount">${downPayment.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="calc-results">
        <div className="calc-result-item">
          <span className="calc-result-label">Loan amount</span>
          <span className="calc-result-value amount">${loanAmount.toLocaleString()}</span>
        </div>
        <div className="calc-result-item">
          <span className="calc-result-label">Principal & interest</span>
          <span className="calc-result-value amount">${Math.round(monthlyPayment).toLocaleString()}/mo</span>
        </div>
        <div className="calc-result-item calc-result-item--total">
          <span className="calc-result-label">Est. total monthly (P&I + tax + ins.)</span>
          <span className="calc-result-value amount">${Math.round(totalMonthly).toLocaleString()}/mo</span>
        </div>
        <p className="calc-disclaimer">Based on 7% APR, 30-year fixed, 1.2% annual property tax, $150/mo insurance.</p>
      </div>
    </div>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    {
      q: 'Can I change plans later?',
      a: 'Yes — upgrade or downgrade at any time. Upgrades take effect immediately; downgrades apply at the next billing cycle.',
    },
    {
      q: 'Is my data stored securely?',
      a: 'All data is stored locally in your browser. Nothing leaves your device unless you export it. We have no access to your goals, deposits, or personal information.',
    },
    {
      q: 'What counts as a "property"?',
      a: 'Each home you\'re actively saving toward counts as one property. You can track one property on the Free plan, and unlimited on Investor.',
    },
    {
      q: 'What are market alerts?',
      a: 'You can set price thresholds for neighborhoods you\'re watching. When median prices cross your threshold, you\'ll be notified. Powered by publicly available market data.',
    },
    {
      q: 'What does "export data" include?',
      a: 'A full JSON export of all your goals, deposits, notes, and settings — ready to back up or migrate to another platform.',
    },
  ];

  return (
    <div className="faq-section">
      <h3 className="faq-title">Common questions</h3>
      <div className="faq-list">
        {faqs.map((faq, i) => (
          <div key={i} className={`faq-item ${open === i ? 'faq-item--open' : ''}`}>
            <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
              <span>{faq.q}</span>
              <svg className="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {open === i && <p className="faq-answer">{faq.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Pricing({ currentPlan = 'free' }) {
  const [selected, setSelected] = useState(currentPlan);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingPlan, setPendingPlan] = useState(null);
  const navigate = useNavigate();

  function handleSelect(planKey) {
    if (planKey === currentPlan) return;
    setPendingPlan(planKey);
    setShowConfirm(true);
  }

  function confirmSelect() {
    // In a real app, this would trigger payment flow
    // For now, just navigate to settings to update
    navigate('/app/settings', { state: { upgradeTo: pendingPlan } });
    setShowConfirm(false);
  }

  return (
    <div className="pricing-page page-enter">
      <div className="pricing-header">
        <p className="pricing-eyebrow">Simple pricing</p>
        <h1 className="pricing-headline">Choose your plan.</h1>
        <p className="pricing-subhead">
          Start free. Upgrade when you need more tools to close the deal.
        </p>
      </div>

      <div className="pricing-grid">
        {Object.entries(PLANS).map(([key, plan]) => (
          <PlanCard
            key={key}
            planKey={key}
            plan={plan}
            selected={selected === key}
            onSelect={handleSelect}
            currentPlan={currentPlan}
          />
        ))}
      </div>

      <div className="pricing-calculator">
        <DepositCalculator />
      </div>

      <div className="pricing-faq">
        <FAQ />
      </div>

      {showConfirm && (
        <div className="overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm plan change</h3>
            </div>
            <div className="modal-body">
              <p>
                {pendingPlan === 'free' && 'Downgrade to Free? You\'ll keep access until your current billing period ends.'}
                {pendingPlan === 'homebuyer' && 'Upgrade to Homebuyer ($9.99/mo)? You\'ll get deposit calculator, market alerts, and agent contacts.'}
                {pendingPlan === 'investor' && 'Upgrade to Investor ($19.99/mo)? You\'ll get unlimited properties, portfolio view, ROI calculations, and market trends.'}
              </p>
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={confirmSelect}>
                {pendingPlan === 'free' ? 'Downgrade' : 'Confirm upgrade'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
