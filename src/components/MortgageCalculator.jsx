import { useState, useCallback } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import './MortgageCalculator.css';

function calculateMortgage(principal, annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  const payment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return payment;
}

export function MortgageCalculator({ propertyPrice = 0, currency = 'USD', onCalculated }) {
  const [price, setPrice] = useState(propertyPrice || '');
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(7.0);
  const [loanYears, setLoanYears] = useState(30);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  function handleCalculate() {
    setError('');
    const p = parseFloat(price);
    if (!p || p <= 0) {
      setError('Please enter a valid property price.');
      return;
    }
    if (p > 100_000_000_000) {
      setError('Property price is too large to calculate.');
      return;
    }
    const downPayment = p * (downPaymentPct / 100);
    const principal = p - downPayment;
    if (principal <= 0) {
      setError('Down payment must be less than the property price.');
      return;
    }
    const monthly = calculateMortgage(principal, interestRate, loanYears);
    if (!isFinite(monthly) || isNaN(monthly)) {
      setError('Could not calculate mortgage. Please check your inputs.');
      return;
    }
    if (monthly > 10_000_000_000) {
      setError('Monthly payment exceeds calculable range.');
      return;
    }
    const totalPaid = monthly * loanYears * 12;
    const totalInterest = totalPaid - principal;
    const res = { monthly, downPayment, principal, totalPaid, totalInterest };
    setResult(res);
    if (onCalculated) onCalculated(res);
  }

  const monthly = result?.monthly;
  const downPayment = result?.downPayment;
  const principal = result?.principal;
  const totalInterest = result?.totalInterest;

  return (
    <div className="mortgage-calc">
      <div className="mortgage-calc-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
        <h3 className="mortgage-calc-title">Mortgage Calculator</h3>
      </div>

      <div className="mortgage-calc-fields">
        <div className="mortgage-calc-field">
          <label className="mortgage-calc-label">Property Price</label>
          <div className="mortgage-calc-input-wrap">
            <span className="mortgage-calc-prefix">$</span>
            <input
              type="number"
              min="0"
              max="100000000000"
              placeholder="e.g. 650000"
              value={price}
              onChange={(e) => { setPrice(e.target.value); setError(''); }}
              className="mortgage-calc-input"
            />
          </div>
        </div>

        <div className="mortgage-calc-row">
          <div className="mortgage-calc-field">
            <label className="mortgage-calc-label">Down Payment %</label>
            <div className="mortgage-calc-input-wrap">
              <input
                type="number"
                min="1"
                max="90"
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(parseFloat(e.target.value) || 0)}
                className="mortgage-calc-input mortgage-calc-input--pct"
              />
              <span className="mortgage-calc-suffix">%</span>
            </div>
          </div>
          <div className="mortgage-calc-field">
            <label className="mortgage-calc-label">Interest Rate</label>
            <div className="mortgage-calc-input-wrap">
              <input
                type="number"
                min="0.1"
                max="30"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                className="mortgage-calc-input mortgage-calc-input--pct"
              />
              <span className="mortgage-calc-suffix">%</span>
            </div>
          </div>
          <div className="mortgage-calc-field">
            <label className="mortgage-calc-label">Years</label>
            <select
              value={loanYears}
              onChange={(e) => setLoanYears(parseInt(e.target.value))}
              className="mortgage-calc-input"
            >
              <option value={15}>15 yr</option>
              <option value={20}>20 yr</option>
              <option value={30}>30 yr</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary btn-full" onClick={handleCalculate}>
          Calculate Payment
        </button>

        {error && (
          <div className="mortgage-calc-error">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="mortgage-calc-result">
          <div className="mortgage-calc-monthly">
            <span className="mortgage-calc-monthly-label">Monthly Payment</span>
            <span className="mortgage-calc-monthly-amount amount">{formatCurrency(monthly, currency)}</span>
            <span className="mortgage-calc-monthly-sub">per month</span>
          </div>

          <div className="mortgage-calc-breakdown">
            <div className="mortgage-calc-breakdown-row">
              <span>Down payment ({downPaymentPct}%)</span>
              <span className="amount">{formatCurrency(downPayment, currency)}</span>
            </div>
            <div className="mortgage-calc-breakdown-row">
              <span>Loan amount</span>
              <span className="amount">{formatCurrency(principal, currency)}</span>
            </div>
            <div className="mortgage-calc-breakdown-row">
              <span>Total interest</span>
              <span className="amount mortgage-calc-interest">{formatCurrency(totalInterest, currency)}</span>
            </div>
            <div className="mortgage-calc-breakdown-row mortgage-calc-breakdown-row--total">
              <span>Total cost</span>
              <span className="amount">{formatCurrency(monthly * loanYears * 12 + downPayment, currency)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
