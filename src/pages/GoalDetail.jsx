import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import { Confetti } from '../components/Confetti';
import './GoalDetail.css';

export function GoalDetail({ goals, onUpdateGoal, onDeleteGoal, currency }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const goal = goals.find((g) => g.id === id);

  const [showActions, setShowActions] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositNote, setDepositNote] = useState('');
  const [depositError, setDepositError] = useState('');

  if (!goal) {
    return (
      <div className="goal-not-found page-enter">
        <h2>Goal not found</h2>
        <p>This goal may have been deleted.</p>
        <Link to="/app" className="btn btn-primary">Back to goals</Link>
      </div>
    );
  }

  const progress = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
  const isCompleted = goal.currentAmount >= goal.targetAmount;
  const clipPercent = 100 - progress;

  const daysRemaining = goal.deadline
    ? Math.max(0, Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)))
    : null;

  const amountLeft = Math.max(0, goal.targetAmount - goal.currentAmount);

  function handleDepositSubmit(e) {
    e.preventDefault();
    const amount = parseFloat(depositAmount.replace(/[^0-9.]/g, ''));
    if (!amount || amount <= 0) {
      setDepositError('Enter a valid amount.');
      return;
    }
    navigate(`/app/goals/${goal.id}/deposit`, { state: { amount, note: depositNote } });
  }

  function handleArchive() {
    onUpdateGoal(goal.id, { archived: !goal.archived });
    setShowActions(false);
  }

  function handleDelete() {
    if (window.confirm(`Delete "${goal.name}"? This cannot be undone.`)) {
      onDeleteGoal(goal.id);
      navigate('/app');
    }
  }

  return (
    <div className="goal-detail page-enter">
      <Confetti active={isCompleted} />

      <div className="goal-hero">
        {goal.photoUrl ? (
          <div className="goal-hero-photo">
            <img src={goal.photoUrl} alt={goal.name} />
            <div className="goal-hero-mask" style={{ clipPath: `inset(${clipPercent}% 0 0 0)` }} />
          </div>
        ) : (
          <div className="goal-hero-photo goal-hero-placeholder">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="M21 15l-5-5L5 21"/>
            </svg>
          </div>
        )}

        {isCompleted && (
          <div className="goal-completed-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            Goal reached! You did it.
          </div>
        )}
      </div>

      <div className="goal-body">
        <div className="goal-header">
          <div>
            <h1 className="goal-name">{goal.name}</h1>
            {goal.deadline && !isCompleted && (
              <p className="goal-deadline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                {daysRemaining === 0 ? 'Due today' : `${daysRemaining} days left`}
              </p>
            )}
          </div>

          <div className="goal-actions-wrap">
            <button
              className="btn btn-ghost btn-icon"
              onClick={() => setShowActions(!showActions)}
              aria-label="More options"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
              </svg>
            </button>
            {showActions && (
              <div className="goal-actions-menu">
                <Link to={`/app/goals/${goal.id}/edit`} className="action-item" onClick={() => setShowActions(false)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit goal
                </Link>
                <button className="action-item" onClick={handleArchive}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="21 8 21 21 3 21 3 8"/>
                    <rect x="1" y="3" width="22" height="5"/>
                    <line x1="10" y1="12" x2="14" y2="12"/>
                  </svg>
                  {goal.archived ? 'Unarchive' : 'Archive'}
                </button>
                <button className="action-item action-item--danger" onClick={handleDelete}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                  Delete goal
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="goal-stats">
          <div className="stat-main">
            <span className="stat-current amount">{formatCurrency(goal.currentAmount, currency)}</span>
            <span className="stat-sep">of {formatCurrency(goal.targetAmount, currency)}</span>
          </div>
          <div className="stat-right">
            <span className="stat-pct">{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="goal-progress-section">
          <div className="progress-bar goal-progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          {/* Milestone markers */}
          {[25, 50, 75].map((m) => (
            <div
              key={m}
              className={`milestone ${progress >= m ? 'milestone--reached' : ''}`}
              style={{ left: `${m}%` }}
              title={`${m}% milestone`}
            >
              <span className="milestone-dot" />
            </div>
          ))}
        </div>

        {amountLeft > 0 && !isCompleted && (
          <p className="goal-amount-left">
            {formatCurrency(amountLeft, currency)} left to go
          </p>
        )}

        <div className="goal-actions-btns">
          <Link to={`/app/goals/${goal.id}/deposit`} className="btn btn-primary btn-lg btn-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Add deposit
          </Link>
          {isCompleted && (
            <Link to={`/app/goals/${goal.id}/deposit`} className="btn btn-secondary btn-lg btn-full">
              Keep adding
            </Link>
          )}
        </div>

        {/* Deposit history */}
        {goal.deposits.length > 0 && (
          <div className="goal-history">
            <h2 className="history-title">Deposit history</h2>
            <div className="history-list">
              {goal.deposits.map((deposit) => (
                <div key={deposit.id} className="history-item">
                  <div className="history-item-left">
                    <div className="history-item-icon">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                    </div>
                    <div>
                      <div className="history-item-note">
                        {deposit.note || 'Deposit'}
                      </div>
                      <div className="history-item-date">
                        {new Date(deposit.createdAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                        })}
                      </div>
                    </div>
                  </div>
                  <span className="history-item-amount amount">
                    +{formatCurrency(deposit.amount, currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {goal.deposits.length === 0 && (
          <div className="goal-no-deposits">
            <p>No deposits yet. Make your first deposit to start watching your goal reveal!</p>
          </div>
        )}
      </div>
    </div>
  );
}
