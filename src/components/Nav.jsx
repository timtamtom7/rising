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
            <Link to="/pricing" className="btn btn-ghost btn-sm nav-pricing">
              Pricing
            </Link>
            <Link to="/app/milestones" className="btn btn-ghost btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              Milestones
            </Link>
            <Link to="/app/properties" className="btn btn-ghost btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Properties
            </Link>
            <Link to="/app/mortgage" className="btn btn-ghost btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              Calculator
            </Link>
            <Link to="/app/notifications" className="btn btn-ghost btn-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
            </Link>
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
