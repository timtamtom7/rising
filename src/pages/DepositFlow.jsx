import { useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { formatCurrency, CURRENCY_SYMBOLS } from '../utils/formatCurrency';
import './DepositFlow.css';

const NOTE_OPTIONS = ['Paycheck', 'Freelance', 'Gift', 'Bonus', 'Birthday money', 'Tax refund', 'Other'];

// Typical minimum down payments by home price
function getMinDownPayment(targetAmount) {
  if (targetAmount <= 100000) return 3000;
  if (targetAmount <= 300000) return 5000;
  if (targetAmount <= 500000) return 10000;
  if (targetAmount <= 750000) return 20000;
  return 35000;
}

export function DepositFlow({ goals, onAddDeposit, currency }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const goal = goals.find((g) => g.id === id);

  const prefill = location.state || {};

  const [amount, setAmount] = useState(prefill.amount ? String(prefill.amount) : '');
  const [note, setNote] = useState(prefill.note || '');
  const [customNote, setCustomNote] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [error, setError] = useState('');
  const [showLowAmountWarning, setShowLowAmountWarning] = useState(false);

  if (!goal) {
    return (
      <div className="deposit-not-found page-enter">
        <div className="deposit-not-found-graphic">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
        </div>
        <h2>Goal not found</h2>
        <p>This goal may have been deleted or the link is invalid.</p>
        <Link to="/app" className="btn btn-primary">Back to goals</Link>
      </div>
    );
  }

  const parsedAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
  const newTotal = goal.currentAmount + parsedAmount;
  const newProgress = Math.min(100, (newTotal / goal.targetAmount) * 100);
  const willComplete = parsedAmount > 0 && newTotal >= goal.targetAmount && goal.currentAmount < goal.targetAmount;
  const isCompleted = goal.currentAmount >= goal.targetAmount;
  const amountLeft = Math.max(0, goal.targetAmount - goal.currentAmount);
  const minDownPayment = getMinDownPayment(goal.targetAmount);

  function handleAmountChange(e) {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(val);
    setError('');
    setShowLowAmountWarning(false);
  }

  function handleNoteSelect(n) {
    if (n === 'Other') {
      setShowCustom(true);
      setNote('');
    } else {
      setNote(n);
      setShowCustom(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!parsedAmount || parsedAmount <= 0) {
      setError('Enter an amount to deposit.');
      return;
    }

    // Check if below typical down payment minimum
    if (parsedAmount > 0 && parsedAmount < 100) {
      setError(`$${parsedAmount} seems too low for a home deposit. Most deposits are at least $100.`);
      return;
    }

    if (parsedAmount > amountLeft && !isCompleted) {
      setError(`You only need ${formatCurrency(amountLeft, currency)} more to reach your goal.`);
      return;
    }

    const finalNote = showCustom ? customNote : note;
    onAddDeposit(goal.id, { amount: parsedAmount, note: finalNote });
    navigate(`/app/goals/${goal.id}`, { state: { justDeposited: true } });
  }

  const clipPercent = 100 - newProgress;

  return (
    <div className="deposit-flow page-enter">
      <div className="deposit-header">
        <button onClick={() => navigate(`/app/goals/${goal.id}`)} className="btn btn-ghost btn-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1>Add deposit</h1>
        <div style={{ width: 32 }} />
      </div>

      <div className="deposit-preview">
        {goal.photoUrl ? (
          <div className="deposit-preview-photo">
            <img src={goal.photoUrl} alt={goal.name} />
            <div className="deposit-preview-mask" style={{ clipPath: `inset(${clipPercent}% 0 0 0)` }} />
          </div>
        ) : (
          <div className="deposit-preview-gradient">
            <div className="deposit-preview-bar">
              <div className="deposit-preview-fill" style={{ width: `${newProgress}%` }} />
            </div>
          </div>
        )}
        <div className="deposit-preview-info">
          <span className="deposit-preview-goal">{goal.name}</span>
          <div className="deposit-preview-amounts">
            <span className="amount deposit-preview-current">{formatCurrency(newTotal, currency)}</span>
            <span className="deposit-preview-sep">/</span>
            <span className="deposit-preview-target">{formatCurrency(goal.targetAmount, currency)}</span>
          </div>
          {amountLeft > 0 && (
            <p className="deposit-preview-remaining">
              {formatCurrency(amountLeft, currency)} to go
            </p>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="deposit-form">
        <div className="form-group">
          <label htmlFor="amount">How much are you depositing?</label>
          <div className="amount-input-wrap">
            <span className="amount-prefix">{CURRENCY_SYMBOLS[currency] || '$'}</span>
            <input
              id="amount"
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={amount}
              onChange={handleAmountChange}
              autoFocus
            />
          </div>
          {error && (
            <span className="field-error">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01"/>
              </svg>
              {error}
            </span>
          )}
          {!error && parsedAmount > 0 && parsedAmount < 100 && (
            <span className="field-warning">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Small deposit noted — every bit counts toward your goal!
            </span>
          )}
        </div>

        <div className="form-group">
          <label>What's this deposit for? <span className="label-hint">(optional)</span></label>
          <div className="note-options">
            {NOTE_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                className={`note-chip ${note === n || (showCustom && n === 'Other') ? 'note-chip--selected' : ''}`}
                onClick={() => handleNoteSelect(n)}
              >
                {n}
              </button>
            ))}
          </div>
          {showCustom && (
            <input
              type="text"
              placeholder="Describe your deposit..."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="custom-note-input"
              autoFocus
            />
          )}
        </div>

        {willComplete && (
          <div className="completion-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            This deposit will complete your goal!
          </div>
        )}

        {parsedAmount > 0 && !willComplete && amountLeft > 0 && (
          <div className="deposit-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
            At this rate, you need {formatCurrency(amountLeft / Math.max(1, parsedAmount), currency).replace('$', '')} more deposits to reach your goal.
          </div>
        )}

        <button
          type="submit"
          className="btn btn-primary btn-lg btn-full deposit-submit"
          disabled={!parsedAmount}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Confirm deposit
        </button>
      </form>
    </div>
  );
}
