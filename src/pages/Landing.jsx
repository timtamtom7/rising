import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const DEMO_PHOTOS = [
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
];

const DEMO_GOALS = [
  { name: 'Trip to Japan', target: 8500, current: 5100, photo: DEMO_PHOTOS[0] },
  { name: 'New MacBook Pro', target: 3500, current: 2450, photo: DEMO_PHOTOS[1] },
  { name: 'Emergency Fund', target: 10000, current: 3750, photo: DEMO_PHOTOS[2] },
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
      </div>
      <div className="demo-card-body">
        <div className="demo-card-name">{goal.name}</div>
        <div className="demo-card-bar">
          <div className="demo-card-fill" style={{ width: `${animProgress}%` }} />
        </div>
        <div className="demo-card-pct">{Math.round(progress)}%</div>
      </div>
      {showDeposit && (
        <div className="demo-card-deposit">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Just added $500
        </div>
      )}
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
        <Link to="/app" className="btn btn-secondary btn-sm">Open App</Link>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <p className="landing-eyebrow">Savings, reimagined</p>
          <h1 className="landing-headline">
            Watch your goal<br />come into view.
          </h1>
          <p className="landing-subhead">
            Set a goal, add a photo, and watch it reveal itself as you save.
            Rising makes progress feel real — and beautiful.
          </p>
          <Link to="/app/goals/new" className="btn btn-primary btn-lg landing-cta">
            Start saving today
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </section>

        <section className="landing-demo">
          <h2 className="demo-title">See it in action</h2>
          <p className="demo-sub">Every deposit brings your goal closer — and the photo into view.</p>
          <div className="demo-grid stagger-in">
            {DEMO_GOALS.map((goal, i) => (
              <DemoCard key={goal.name} goal={goal} delay={300 + i * 400} />
            ))}
          </div>
        </section>

        <section className="landing-features">
          <div className="feature-grid">
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
              <h3>Attach a photo</h3>
              <p>Your goal's photo gradually reveals as you save — like a reward that builds anticipation.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3>Log every deposit</h3>
              <p>Record what you're saving and why. A running history keeps you motivated and accountable.</p>
            </div>
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                  <polyline points="16 7 22 7 22 13"/>
                </svg>
              </div>
              <h3>Track your growth</h3>
              <p>Watch your progress bar fill and celebrate when you reach 100%. You've earned it.</p>
            </div>
          </div>
        </section>

        <section className="landing-cta-section">
          <h2>Ready to start rising?</h2>
          <p>Set your first goal in under two minutes.</p>
          <Link to="/app/goals/new" className="btn btn-primary btn-lg">
            Create your first goal
          </Link>
        </section>
      </main>

      <footer className="landing-footer">
        <span>Rising</span>
        <span>·</span>
        <span>Built for people with things to save for</span>
      </footer>
    </div>
  );
}
