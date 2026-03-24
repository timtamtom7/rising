import { formatCurrency } from '../utils/formatCurrency';
import './MilestoneTracker.css';

const MILESTONE_DEFS = [
  {
    type: 'pre_approved',
    label: 'Get Pre-Approved',
    description: 'Get mortgage pre-approval',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    type: 'down_payment_saved',
    label: 'Save Down Payment',
    description: 'Save your target down payment',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        <path d="M6 11h.01M6 15h.01M10 11h8"/>
      </svg>
    ),
  },
  {
    type: 'offer_made',
    label: 'Make Offer',
    description: 'Submit an offer on a property',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    type: 'closed',
    label: 'Close',
    description: 'Keys in hand — you own it!',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
  },
];

export function MilestoneTracker({ milestones = [], currentAmount = 0, targetAmount = 0, onToggle, onUpdate }) {
  const completedCount = milestones.filter((m) => m.completedAt).length;
  const progress = MILESTONE_DEFS.length > 0 ? (completedCount / MILESTONE_DEFS.length) * 100 : 0;

  function getMilestoneState(type) {
    const m = milestones.find((m) => m.type === type);
    return m;
  }

  function handleToggle(type) {
    const existing = milestones.find((m) => m.type === type);
    if (existing) {
      onToggle(existing.id, !existing.completedAt);
    } else {
      onUpdate({
        type,
        completedAt: new Date().toISOString(),
      });
    }
  }

  return (
    <div className="milestone-tracker">
      {/* Overall progress bar */}
      <div className="milestone-overall">
        <div className="milestone-overall-header">
          <span className="milestone-overall-label">Homebuying Journey</span>
          <span className="milestone-overall-pct">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar milestone-overall-bar">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Milestone steps */}
      <div className="milestone-steps">
        {MILESTONE_DEFS.map((def, index) => {
          const state = getMilestoneState(def.type);
          const isCompleted = !!state?.completedAt;
          const isLast = index === MILESTONE_DEFS.length - 1;

          return (
            <div key={def.type} className={`milestone-step ${isCompleted ? 'milestone-step--completed' : ''}`}>
              <div className="milestone-step-left">
                <button
                  className={`milestone-icon ${isCompleted ? 'milestone-icon--done' : ''}`}
                  onClick={() => handleToggle(def.type)}
                  aria-label={isCompleted ? `Mark ${def.label} as incomplete` : `Mark ${def.label} complete`}
                >
                  {isCompleted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  ) : (
                    def.icon
                  )}
                </button>
                {!isLast && <div className={`milestone-connector ${isCompleted ? 'milestone-connector--done' : ''}`} />}
              </div>
              <div className="milestone-step-body">
                <div className="milestone-step-header">
                  <span className="milestone-step-label">{def.label}</span>
                  {isCompleted && (
                    <span className="milestone-step-date">
                      {new Date(state.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
                <p className="milestone-step-desc">{def.description}</p>
                {state?.amount && (
                  <span className="milestone-step-amount amount">{formatCurrency(state.amount)}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { MILESTONE_DEFS };
