import { useState } from 'react';
import { MortgageCalculator } from '../components/MortgageCalculator';
import './MortgagePage.css';

export function MortgagePage({ goals = [], properties = [], currency = 'USD' }) {
  const [selectedPrice, setSelectedPrice] = useState(0);
  const activeGoal = goals.find((g) => !g.archived);

  return (
    <div className="mortgage-page page-enter">
      <div className="mortgage-page-header">
        <h1 className="mortgage-page-title">Mortgage Calculator</h1>
        <p className="mortgage-page-subtitle">
          Estimate your monthly payment and total cost based on property price and loan terms.
        </p>
      </div>

      <div className="mortgage-page-grid">
        <div className="mortgage-page-main">
          <MortgageCalculator
            propertyPrice={selectedPrice}
            currency={currency}
          />
        </div>

        <div className="mortgage-page-sidebar">
          {activeGoal && (
            <div className="mortgage-page-tip">
              <div className="mortgage-tip-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div>
                <p className="mortgage-tip-label">Your active goal</p>
                <p className="mortgage-tip-value">{activeGoal.name}</p>
                <p className="mortgage-tip-amount amount">
                  ${Number(activeGoal.targetAmount).toLocaleString()} target
                </p>
              </div>
            </div>
          )}

          <div className="mortgage-page-tip mortgage-page-tip--rates">
            <div className="mortgage-tip-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
            </div>
            <div>
              <p className="mortgage-tip-label">Current rates (mock)</p>
              <p className="mortgage-tip-value">30-yr fixed ~7.0%</p>
              <p className="mortgage-tip-value">15-yr fixed ~6.3%</p>
            </div>
          </div>

          <div className="mortgage-page-tip mortgage-page-tip--rule">
            <div className="mortgage-tip-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <div>
              <p className="mortgage-tip-label">Rule of thumb</p>
              <p className="mortgage-tip-value">Monthly payment should be ≤ 28% of gross income</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
