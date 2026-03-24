import { useState } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { formatCurrency, CURRENCY_SYMBOLS } from '../utils/formatCurrency';
import './DepositFlow.css';

const NOTE_OPTIONS = ['Paycheck', 'Freelance', 'Gift', 'Bonus', 'Birthday money', 'Tax refund', 'Other'];

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

  if (!goal) {
    return (
      <div className="deposit-not-found page-enter">
        <h2>Goal not found</h2>
        <Link to="/app" className="btn btn-primary">Back to goals</Link>
      </div>
    );
  }

  const parsedAmount = parseFloat(amount.replace(/[^0-9.]/g, '')) || 0;
  const newTotal = goal.currentAmount + parsedAmount;
  const newProgress = Math.min(100, (newTotal / goal.targetAmount) * 100);
  const willComplete = parsedAmount > 0 && newTotal >= goal.targetAmount && goal.currentAmount < goal.targetAmount;

  function handleAmountChange(e) {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(val);
    setError('');
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
          {error && <span className="field-error">{error}</span>}
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
