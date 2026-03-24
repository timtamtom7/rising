import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import './Nav.css';

export function Nav({ totalSaved, currency }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/app';

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/app" className="nav-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Rising</span>
        </Link>

        {isHome && (
          <div className="nav-right">
            {totalSaved > 0 && (
              <div className="nav-total">
                <span className="nav-total-label">Total saved</span>
                <span className="nav-total-amount amount">{formatCurrency(totalSaved, currency)}</span>
              </div>
            )}
            <Link to="/app/goals/new" className="btn btn-primary btn-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              New Goal
            </Link>
          </div>
        )}

        {!isHome && (
          <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm nav-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back
          </button>
        )}
      </div>
    </nav>
  );
}
