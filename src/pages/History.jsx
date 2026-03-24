import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import './History.css';

function groupByMonth(deposits) {
  const groups = {};
  deposits.forEach((d) => {
    const date = new Date(d.createdAt);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!groups[key]) groups[key] = { label, deposits: [], total: 0 };
    groups[key].deposits.push(d);
    groups[key].total += d.amount;
  });
  return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
}

export function History({ goals, getAllDeposits, getTotalSaved, currency }) {
  const allDeposits = getAllDeposits();
  const totalSaved = getTotalSaved();
  const grouped = groupByMonth(allDeposits);

  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const thisYear = now.getFullYear();

  const thisMonthTotal = grouped.find(([k]) => k === thisMonth)?.[1].total || 0;
  const thisYearTotal = grouped
    .filter(([k]) => k.startsWith(String(thisYear)))
    .reduce((sum, [, g]) => sum + g.total, 0);

  return (
    <div className="history-page page-enter">
      <div className="history-header">
        <div>
          <h1>All Deposits</h1>
          <p className="history-subtitle">Every deposit across all your goals</p>
        </div>
      </div>

      <div className="history-summary">
        <div className="summary-card">
          <span className="summary-label">Total saved</span>
          <span className="summary-amount amount">{formatCurrency(totalSaved, currency)}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">This month</span>
          <span className="summary-amount amount">{formatCurrency(thisMonthTotal, currency)}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">This year</span>
          <span className="summary-amount amount">{formatCurrency(thisYearTotal, currency)}</span>
        </div>
      </div>

      {allDeposits.length === 0 ? (
        <div className="history-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <h3>No deposits yet</h3>
          <p>When you add deposits to your goals, they'll appear here.</p>
          <Link to="/app" className="btn btn-primary">Go to goals</Link>
        </div>
      ) : (
        <div className="history-groups">
          {grouped.map(([key, group]) => (
            <div key={key} className="history-group">
              <div className="history-group-header">
                <span className="history-group-label">{group.label}</span>
                <span className="history-group-total amount">
                  {formatCurrency(group.total, currency)}
                </span>
              </div>
              <div className="history-group-list">
                {group.deposits.map((deposit) => (
                  <Link
                    key={deposit.id}
                    to={`/app/goals/${deposit.goalId}`}
                    className="history-row"
                  >
                    <div className="history-row-left">
                      <div className="history-row-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 5v14M5 12h14"/>
                        </svg>
                      </div>
                      <div>
                        <div className="history-row-note">{deposit.note || 'Deposit'}</div>
                        <div className="history-row-meta">
                          <span className="history-row-goal">{deposit.goalName}</span>
                          <span className="history-row-dot">·</span>
                          <span className="history-row-date">
                            {new Date(deposit.createdAt).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="history-row-amount amount">
                      +{formatCurrency(deposit.amount, currency)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
