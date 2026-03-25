import { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import './MortgageRates.css';

// Mock mortgage rate API (simulates Freddie Mac PMMS data)
const MOCK_RATES = {
  asOf: new Date().toISOString().split('T')[0],
  rates: [
    {
      id: '30-yr-fixed',
      label: '30-Year Fixed',
      rate: 6.875,
      apr: 6.98,
      description: 'Most popular — spreads risk over 30 years',
      bestFor: 'First-time buyers, long-term homeowners',
    },
    {
      id: '15-yr-fixed',
      label: '15-Year Fixed',
      rate: 6.125,
      apr: 6.30,
      description: 'Pay off faster — higher monthly, less total interest',
      bestFor: 'Move-up buyers, those with larger down payments',
    },
    {
      id: '7-yr-arm',
      label: '7/1 ARM',
      rate: 6.375,
      apr: 6.55,
      description: 'Fixed for 7 years, then adjusts annually',
      bestFor: 'Plan to sell before year 7',
    },
    {
      id: '5-yr-arm',
      label: '5/1 ARM',
      rate: 6.250,
      apr: 6.42,
      description: 'Fixed for 5 years, then adjusts annually',
      bestFor: 'Short-term owners, higher risk tolerance',
    },
    {
      id: '30-yr-fha',
      label: '30-Year FHA',
      rate: 6.250,
      apr: 7.15,
      description: 'Lower down payment (3.5%), but includes MIP',
      bestFor: 'Lower down payment, lower credit score',
    },
    {
      id: '30-yr-va',
      label: '30-Year VA',
      rate: 5.990,
      apr: 6.12,
      description: 'For eligible veterans — no down payment required',
      bestFor: 'Veterans and active military',
    },
  ],
  trends: [
    { month: 'Oct', rate: 7.50 },
    { month: 'Nov', rate: 7.25 },
    { month: 'Dec', rate: 6.99 },
    { month: 'Jan', rate: 6.75 },
    { month: 'Feb', rate: 6.88 },
    { month: 'Mar', rate: 6.875 },
  ],
  marketNote:
    'Rates shown are national averages based on Freddie Mac PMMS. Your actual rate depends on credit score, down payment, and lender.',
};

// Simulate API fetch
async function fetchRates() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_RATES), 800);
  });
}

function RateCard({ rate, selected, onSelect, homePrice }) {
  const price = parseFloat(homePrice) || 425000;
  const downPct = 0.20;
  const downPayment = price * downPct;
  const loanAmount = price - downPayment;
  const monthlyRate = rate.rate / 100 / 12;
  const numPayments = rate.id.includes('15-yr') ? 15 * 12 : 30 * 12;
  const monthlyPI =
    loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  const monthlyTax = price * 0.012 / 12;
  const monthlyIns = 150;
  const monthlyTotal = Math.round(monthlyPI + monthlyTax + monthlyIns);

  return (
    <button
      className={`rate-card ${selected ? 'rate-card--selected' : ''}`}
      onClick={() => onSelect(rate.id)}
    >
      <div className="rate-card-header">
        <span className="rate-label">{rate.label}</span>
        {rate.id === '30-yr-fixed' && <span className="rate-badge">Most popular</span>}
      </div>
      <div className="rate-card-body">
        <div className="rate-main">
          <span className="rate-pct">{rate.rate}%</span>
          <span className="rate-apr">APR {rate.apr}%</span>
        </div>
        <div className="rate-description">{rate.description}</div>
        <div className="rate-payment">
          <span className="rate-payment-label">Est. monthly</span>
          <span className="rate-payment-value">{formatCurrency(monthlyTotal)}/mo</span>
        </div>
      </div>
    </button>
  );
}

function RateChart({ trends }) {
  const maxRate = Math.max(...trends.map((t) => t.rate));
  const minRate = Math.min(...trends.map((t) => t.rate));
  const range = maxRate - minRate;

  return (
    <div className="rate-chart">
      <h3 className="rate-chart-title">Rate trend (6 months)</h3>
      <div className="rate-chart-area">
        {trends.map((t, i) => {
          const heightPct = range > 0 ? ((t.rate - minRate) / range) * 100 : 50;
          const isLast = i === trends.length - 1;
          return (
            <div key={t.month} className="rate-chart-bar-wrap">
              <div className="rate-chart-bar-track">
                <div
                  className={`rate-chart-bar ${isLast ? 'rate-chart-bar--current' : ''}`}
                  style={{ height: `${100 - heightPct}%` }}
                  title={`${t.month}: ${t.rate}%`}
                />
              </div>
              <span className="rate-chart-month">{t.month}</span>
              <span className="rate-chart-value">{t.rate}%</span>
            </div>
          );
        })}
      </div>
      <div className="rate-chart-legend">
        <span className="rate-chart-legend-item rate-chart-legend-item--down">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
          </svg>
          {maxRate > trends[trends.length - 1].rate ? 'Trending down' : 'Trending up'}
        </span>
        <span className="rate-chart-note">
          {trends[0].month}–{trends[trends.length - 1].month} national avg.
        </span>
      </div>
    </div>
  );
}

function AffordabilityCalc() {
  const [income, setIncome] = useState('95000');
  const [debt, setDebt] = useState('400');
  const [rate, setRate] = useState(6.875);
  const [price, setPrice] = useState('425000');

  const p = parseFloat(price) || 0;
  const annualIncome = parseFloat(income) || 0;
  const monthlyDebt = parseFloat(debt) || 0;
  const downPct = 0.20;
  const downPayment = p * downPct;
  const loanAmount = p - downPayment;
  const monthlyRate = rate / 100 / 12;
  const numPayments = 30 * 12;
  const monthlyPI =
    loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  const monthlyTax = p * 0.012 / 12;
  const monthlyIns = 150;
  const monthlyTotal = Math.round(monthlyPI + monthlyTax + monthlyIns);

  // 28% front-end ratio, 36% back-end ratio
  const maxMonthlyHousing = annualIncome * 0.28 / 12;
  const maxMonthlyPayment = annualIncome * 0.36 / 12 - monthlyDebt;
  const maxAffordable = Math.min(maxMonthlyHousing, maxMonthlyPayment);

  const affordablePrice =
    maxAffordable > 0
      ? Math.round(
          maxAffordable * ((Math.pow(1 + monthlyRate, numPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) +
          maxAffordable * 12 * 0.012 * numPayments / 12 +
          150
        )
      : 0;

  const qualifies = monthlyTotal <= maxAffordable;

  return (
    <div className="afford-section">
      <h3 className="afford-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
        Affordability calculator
      </h3>
      <p className="afford-subtitle">
        Based on the 28/36 rule — lenders typically allow $
        {Math.round(maxAffordable).toLocaleString()}/mo for this income
      </p>

      <div className="afford-inputs">
        <div className="afford-field">
          <label>Home price</label>
          <div className="afford-input-wrap">
            <span className="afford-prefix">$</span>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="afford-field">
          <label>Annual income</label>
          <div className="afford-input-wrap">
            <span className="afford-prefix">$</span>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
        </div>
        <div className="afford-field">
          <label>Monthly debt</label>
          <div className="afford-input-wrap">
            <span className="afford-prefix">$</span>
            <input
              type="number"
              value={debt}
              onChange={(e) => setDebt(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className={`afford-result ${qualifies ? 'afford-result--green' : 'afford-result--red'}`}>
        <div className="afford-result-status">
          {qualifies ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          )}
          <span>{qualifies ? 'Likely qualifies' : 'Above typical limits'}</span>
        </div>
        <p className="afford-result-detail">
          {monthlyTotal > maxAffordable
            ? `Payment of ${formatCurrency(monthlyTotal)} exceeds ${formatCurrency(Math.round(maxAffordable))} limit by ${formatCurrency(monthlyTotal - maxAffordable)}`
            : `Payment of ${formatCurrency(monthlyTotal)} fits within ${formatCurrency(Math.round(maxAffordable))} budget`
          }
        </p>
      </div>

      <div className="afford-summary">
        <div className="afford-summary-item">
          <span>20% down</span>
          <span>{formatCurrency(downPayment)}</span>
        </div>
        <div className="afford-summary-item">
          <span>Loan amount</span>
          <span>{formatCurrency(loanAmount)}</span>
        </div>
        <div className="afford-summary-item">
          <span>Principal & interest</span>
          <span>{formatCurrency(Math.round(monthlyPI))}/mo</span>
        </div>
        <div className="afford-summary-item">
          <span>Taxes & insurance</span>
          <span>{formatCurrency(Math.round(monthlyTax + monthlyIns))}/mo</span>
        </div>
        <div className="afford-summary-item afford-summary-item--total">
          <span>Total monthly</span>
          <span>{formatCurrency(monthlyTotal)}/mo</span>
        </div>
      </div>
    </div>
  );
}

export function MortgageRates() {
  const [rateData, setRateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedRate, setSelectedRate] = useState('30-yr-fixed');
  const [homePrice, setHomePrice] = useState('425000');

  useEffect(() => {
    fetchRates().then((data) => {
      setRateData(data);
      setLoading(false);
    });
  }, []);

  const selected = rateData?.rates.find((r) => r.id === selectedRate);

  return (
    <div className="mortgage-rates-page page-enter">
      <div className="rates-header">
        <div className="rates-header-eyebrow">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          Live rate data
        </div>
        <h1 className="rates-title">Mortgage Rates</h1>
        <p className="rates-subtitle">
          Current national averages — update your quote with your lender for exact pricing.
        </p>
        {rateData && (
          <p className="rates-as-of">Last updated: {rateData.asOf}</p>
        )}
      </div>

      {loading ? (
        <div className="rates-loading">
          <div className="rates-loading-spinner" />
          <span>Fetching current rates…</span>
        </div>
      ) : (
        <>
          <div className="rates-home-price">
            <label>Calculate for home price:</label>
            <div className="rates-home-price-input">
              <span className="afford-prefix">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
              />
            </div>
          </div>

          <div className="rates-grid">
            {rateData.rates.map((rate) => (
              <RateCard
                key={rate.id}
                rate={rate}
                selected={selectedRate === rate.id}
                onSelect={setSelectedRate}
                homePrice={homePrice}
              />
            ))}
          </div>

          <div className="rates-bottom-grid">
            <RateChart trends={rateData.trends} />
            <AffordabilityCalc />
          </div>

          <div className="rates-disclaimer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>
              {rateData.marketNote} Rates vary by lender, credit score, loan type, and down payment.
              This tool is for informational purposes only and does not constitute financial advice.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
