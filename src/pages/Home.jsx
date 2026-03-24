import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoalCard } from '../components/GoalCard';
import { HouseIllustration } from '../components/Graphics';
import { formatCurrency } from '../utils/formatCurrency';
import './Home.css';

export function Home({ goals, totalSaved, currency }) {
  const [filter, setFilter] = useState('active'); // 'active' | 'completed' | 'archived'

  const activeGoals = goals.filter((g) => !g.archived && g.currentAmount < g.targetAmount);
  const completedGoals = goals.filter((g) => !g.archived && g.currentAmount >= g.targetAmount);
  const archivedGoals = goals.filter((g) => g.archived);

  const displayedGoals =
    filter === 'active' ? activeGoals :
    filter === 'completed' ? completedGoals :
    archivedGoals;

  return (
    <div className="home page-enter">
      <div className="home-header">
        <div>
          <h1 className="home-title">Your Goals</h1>
          {totalSaved > 0 && (
            <p className="home-total">
              <span className="home-total-label">Total saved</span>
              <span className="amount home-total-amount">{formatCurrency(totalSaved, currency)}</span>
            </p>
          )}
        </div>
        <Link to="/app/goals/new" className="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          New Goal
        </Link>
      </div>

      {goals.length > 0 && (
        <div className="home-filters">
          {[
            { key: 'active', label: 'Active', count: activeGoals.length },
            { key: 'completed', label: 'Completed', count: completedGoals.length },
            { key: 'archived', label: 'Archived', count: archivedGoals.length },
          ].map((f) => (
            <button
              key={f.key}
              className={`filter-btn ${filter === f.key ? 'filter-btn--active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
              {f.count > 0 && <span className="filter-count">{f.count}</span>}
            </button>
          ))}
        </div>
      )}

      {displayedGoals.length === 0 ? (
        <div className="home-empty">
          {filter === 'active' && (
            <>
              <div className="home-empty-graphic">
                <HouseIllustration style={{ width: 120, height: 'auto', opacity: 0.5, filter: 'grayscale(0.3)' }} />
              </div>
              <div className="home-empty-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <h3>Your home is waiting.</h3>
              <p>
                Set your deposit goal, pick a photo of your future home, and start watching your progress come alive with every dollar you save.
              </p>
              <Link to="/app/goals/new" className="btn btn-primary">
                Create your first goal
              </Link>
            </>
          )}
          {filter === 'completed' && (
            <>
              <div className="home-empty-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>No completed goals yet</h3>
              <p>Keep saving — your first goal will be here soon.</p>
            </>
          )}
          {filter === 'archived' && (
            <>
              <div className="home-empty-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="21 8 21 21 3 21 3 8"/>
                  <rect x="1" y="3" width="22" height="5"/>
                  <line x1="10" y1="12" x2="14" y2="12"/>
                </svg>
              </div>
              <h3>No archived goals</h3>
              <p>Goals you archive will appear here.</p>
            </>
          )}
        </div>
      ) : (
        <div className={`goals-grid stagger-in`}>
          {displayedGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} currency={currency} />
          ))}
        </div>
      )}

      {goals.length > 0 && (
        <div className="home-nav-links">
          <Link to="/app/history" className="nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            All deposits
          </Link>
          <Link to="/app/settings" className="nav-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            Settings
          </Link>
        </div>
      )}
    </div>
  );
}
