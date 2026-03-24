import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isOnboardingComplete } from './Onboarding';
import './Landing.css';

const DEMO_PHOTOS = [
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
];

const DEMO_GOALS = [
  { name: 'Portland Craftsman · Alberta Arts', target: 85000, current: 51000, photo: DEMO_PHOTOS[0] },
  { name: 'Seattle Victorian · Queen Anne', target: 145000, current: 87000, photo: DEMO_PHOTOS[1] },
  { name: 'Austin Ranch · Barton Hills', target: 39500, current: 19750, photo: DEMO_PHOTOS[2] },
];

function DemoCard({ goal, delay }) {
  const [progress, setProgress] = useState(0);
  const [showDeposit, setShowDeposit] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((goal.current / goal.target) * 100);
      setAnimProgress((goal.current / goal.target) * 100);
      setTimeout(() => setShowDeposit(true), 1200);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, goal]);

  const clipPercent = 100 - progress;

  return (
    <div className="demo-card">
      <div className="demo-card-photo">
        {goal.photo && (
          <img src={goal.photo} alt={goal.name} />
        )}
        <div className="demo-card-overlay" style={{ clipPath: `inset(${clipPercent}% 0 0 0)` }} />
        <div className="demo-card-badge">
          ${Math.round((goal.current / goal.target) * 100).toLocaleString()} saved
        </div>
      </div>
      <div className="demo-card-body">
        <div className="demo-card-name">{goal.name}</div>
        <div className="demo-card-bar">
          <div className="demo-card-fill" style={{ width: `${animProgress}%` }} />
        </div>
        <div className="demo-card-footer">
          <span className="demo-card-pct">{Math.round(progress)}%</span>
          <span className="demo-card-amount">
            ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
          </span>
        </div>
      </div>
      {showDeposit && (
        <div className="demo-card-deposit">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Just added $2,500 for August
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon">{icon}</div>
      <div className="stat-card-value">{value}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  );
}

export function Landing() {
  const [started, setStarted] = useState(false);

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Rising</span>
        </div>
        <nav className="landing-nav">
          <Link to="/pricing" className="landing-nav-link">Pricing</Link>
          <Link to="/app" className="btn btn-secondary btn-sm">Open App</Link>
        </nav>
      </header>

      <main className="landing-main">
        {/* Hero */}
        <section className="landing-hero">
          <p className="landing-eyebrow">Savings for home buyers</p>
          <h1 className="landing-headline">
            Your down payment.<br />Your future home.
          </h1>
          <p className="landing-subhead">
            Rising helps you save for a home with purpose. Set your deposit goal,
            track every dollar, and watch your future home gradually come into view.
          </p>
          <div className="landing-cta-group">
            <Link
              to={isOnboardingComplete() ? '/app/goals/new' : '/onboarding'}
              className="btn btn-primary btn-lg landing-cta"
            >
              Start saving today
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link to="/pricing" className="btn btn-ghost btn-lg landing-cta-secondary">
              View pricing
            </Link>
          </div>

          <div className="landing-stats">
            <StatCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              }
              value="5%"
              label="Start with just 5% down"
            />
            <StatCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              }
              value="$2,410/mo"
              label="Median 30yr fixed on $425K"
            />
            <StatCard
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                  <polyline points="16 7 22 7 22 13"/>
                </svg>
              }
              value="20%"
              label="The gold standard down payment"
            />
          </div>
        </section>

        {/* Demo */}
        <section className="landing-demo">
          <h2 className="demo-title">See your progress come alive</h2>
          <p className="demo-sub">
            Every deposit reveals more of your goal photo. The closer you get, the more real it feels.
          </p>
          <div className="demo-grid stagger-in">
            {DEMO_GOALS.map((goal, i) => (
              <DemoCard key={goal.name} goal={goal} delay={300 + i * 400} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="landing-features">
          <div className="feature-grid">
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <h3>Track your deposit goal</h3>
              <p>Set your target — whether it's $40K or $200K — and watch every dollar bring you closer to the keys.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
              <h3>Attach your future home</h3>
              <p>Pick a photo of the home you're saving for. It gradually reveals as you save — like watching it emerge from a scratch card.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3>Deposit calculator</h3>
              <p>See how much home you can afford at 5%, 10%, and 20% down. Understand your monthly payment before you shop.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4M12 16h.01"/>
                </svg>
              </div>
              <h3>Market alerts</h3>
              <p>Set price thresholds for neighborhoods you're watching. Know when the market shifts in your favor.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3>Agent contacts</h3>
              <p>Keep your agent's info at your fingertips. Your buying team, all in one place.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                  <polyline points="16 7 22 7 22 13"/>
                </svg>
              </div>
              <h3>Portfolio &amp; ROI tracking</h3>
              <p>For investors: track multiple properties, calculate cap rates, and monitor market trends across your portfolio.</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="landing-cta-section">
          <h2>Ready to start rising?</h2>
          <p>Set your deposit goal in under two minutes.</p>
          <Link
            to={isOnboardingComplete() ? '/app/goals/new' : '/onboarding'}
            className="btn btn-primary btn-lg"
          >
            Create your first goal
          </Link>
          <p className="landing-cta-note">Free to start. No credit card required.</p>
        </section>
      </main>

      <footer className="landing-footer">
        <span>Rising</span>
        <span>·</span>
        <span>Built for people saving for their first home — or their next one.</span>
        <span>·</span>
        <Link to="/pricing">Pricing</Link>
      </footer>
    </div>
  );
}
