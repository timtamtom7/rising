import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import './GoalCard.css';

export function GoalCard({ goal, currency }) {
  const progress = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100);
  const isCompleted = goal.currentAmount >= goal.targetAmount;

  const daysRemaining = goal.deadline
    ? Math.max(0, Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)))
    : null;

  const clipPercent = 100 - progress;

  return (
    <Link to={`/app/goals/${goal.id}`} className="goal-card-link">
      <article className={`goal-card ${isCompleted ? 'goal-card--completed' : ''}`}>
        <div className="goal-card-photo-wrap">
          {goal.photoUrl ? (
            <div
              className="goal-card-photo"
              style={{ backgroundImage: `url(${goal.photoUrl})` }}
            >
              <div
                className="goal-card-photo-mask"
                style={{ clipPath: `inset(${clipPercent}% 0 0 0)` }}
              />
            </div>
          ) : (
            <div className="goal-card-photo goal-card-photo--placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="M21 15l-5-5L5 21"/>
              </svg>
            </div>
          )}
          {isCompleted && (
            <div className="goal-card-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              Reached!
            </div>
          )}
        </div>

        <div className="goal-card-body">
          <h3 className="goal-card-name">{goal.name}</h3>

          <div className="goal-card-amounts">
            <span className="goal-card-current amount">{formatCurrency(goal.currentAmount, currency)}</span>
            <span className="goal-card-sep">/</span>
            <span className="goal-card-target amount">{formatCurrency(goal.targetAmount, currency)}</span>
          </div>

          <div className="goal-card-progress">
            <div className="progress-bar">
              <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="goal-card-percent">{Math.round(progress)}%</span>
          </div>

          {daysRemaining !== null && !isCompleted && (
            <div className="goal-card-meta">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
              {daysRemaining === 0 ? 'Due today' : `${daysRemaining} days left`}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
