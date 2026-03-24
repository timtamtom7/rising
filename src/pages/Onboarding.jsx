import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboarding.css';

const STORAGE_KEY = 'rising_onboarding';

export function saveOnboardingComplete() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: true, completedAt: new Date().toISOString() }));
}

export function isOnboardingComplete() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return JSON.parse(raw).completed === true;
  } catch {
    return false;
  }
}

// ─── Screen 1: Concept ─────────────────────────────────────────────────────
function Screen1({ onNext, onSkip }) {
  return (
    <div className="ob-screen ob-screen--concept">
      <div className="ob-house-wrap">
        <svg className="ob-house" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#dbeafe"/>
              <stop offset="100%" stopColor="#f0f9ff"/>
            </linearGradient>
            <linearGradient id="houseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff"/>
              <stop offset="100%" stopColor="#f4f4f5"/>
            </linearGradient>
            <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e"/>
              <stop offset="100%" stopColor="#16a34a"/>
            </linearGradient>
          </defs>
          {/* Sun */}
          <circle cx="178" cy="35" r="18" fill="#fef08a" opacity="0.8"/>
          <circle cx="178" cy="35" r="11" fill="#fde047"/>
          {/* Sun rays */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <line key={i}
              x1={178 + Math.cos(deg * Math.PI / 180) * 22}
              y1={35 + Math.sin(deg * Math.PI / 180) * 22}
              x2={178 + Math.cos(deg * Math.PI / 180) * 30}
              y2={35 + Math.sin(deg * Math.PI / 180) * 30}
              stroke="#fde047" strokeWidth="2" strokeLinecap="round" opacity="0.5"
            />
          ))}
          {/* House body */}
          <rect x="45" y="95" width="130" height="82" rx="4" fill="url(#houseGrad)" stroke="#e4e4e7" strokeWidth="1"/>
          {/* Roof */}
          <path d="M35 98 L110 38 L185 98" fill="url(#roofGrad)" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* Chimney */}
          <rect x="140" y="52" width="18" height="32" rx="2" fill="#a1a1aa"/>
          <rect x="138" y="49" width="22" height="6" rx="2" fill="#71717a"/>
          {/* Door */}
          <rect x="92" y="125" width="36" height="52" rx="3" fill="#16a34a"/>
          <circle cx="120" cy="155" r="3" fill="#fef9c3"/>
          {/* Left window */}
          <rect x="53" y="112" width="30" height="26" rx="3" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="1"/>
          <line x1="68" y1="112" x2="68" y2="138" stroke="#7dd3fc" strokeWidth="1"/>
          <line x1="53" y1="125" x2="83" y2="125" stroke="#7dd3fc" strokeWidth="1"/>
          {/* Right window */}
          <rect x="137" y="112" width="30" height="26" rx="3" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="1"/>
          <line x1="152" y1="112" x2="152" y2="138" stroke="#7dd3fc" strokeWidth="1"/>
          <line x1="137" y1="125" x2="167" y2="125" stroke="#7dd3fc" strokeWidth="1"/>
          {/* Pathway */}
          <path d="M110 177 Q110 168 110 162 Q88 160 62 167 Q50 170 44 177" fill="#d4d4d8"/>
          {/* Ground */}
          <path d="M0 177 Q55 172 110 174 Q165 172 220 177 L220 200 L0 200 Z" fill="#bbf7d0" opacity="0.6"/>
          {/* Grass texture lines */}
          {[20, 35, 50, 65, 155, 170, 185, 200].map((x, i) => (
            <line key={i} x1={x} y1="177" x2={x + 3} y2="183" stroke="#86efac" strokeWidth="1" opacity="0.5"/>
          ))}
        </svg>
      </div>

      <div className="ob-content">
        <p className="ob-eyebrow">Home buying, reimagined</p>
        <h1 className="ob-headline">Your home search<br />starts here.</h1>
        <p className="ob-subhead">
          Rising helps you save for a down payment with purpose.
          Set your goal, watch it grow, and see your future home come into view.
        </p>
      </div>

      <div className="ob-actions">
        <button className="btn btn-primary btn-lg ob-cta" onClick={onNext}>
          Get started
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        <button className="btn btn-ghost btn-sm ob-skip" onClick={onSkip}>
          Skip intro
        </button>
      </div>
    </div>
  );
}

// ─── Screen 2: Track Goal ────────────────────────────────────────────────────
function Screen2({ data, onChange, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    const target = parseFloat((data.targetAmount || '').replace(/[^0-9.]/g, '')) || 0;
    const deposit = parseFloat((data.depositGoal || '').replace(/[^0-9.]/g, '')) || 0;
    if (target <= 0) errs.targetAmount = 'Enter a home price you\'re aiming for.';
    if (deposit > 0 && deposit < 5000) errs.depositGoal = 'Most down payments are at least $5,000.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (validate()) onNext();
  }

  const suggestions = [
    { city: 'Seattle, WA', deposit: '85000', target: '425000', label: '20% on $425K home' },
    { city: 'Portland, OR', deposit: '48500', target: '485000', label: '10% on $485K home' },
    { city: 'Austin, TX', deposit: '39500', target: '395000', label: '10% on $395K home' },
    { city: 'Denver, CO', deposit: '72000', target: '360000', label: '20% on $360K condo' },
  ];

  return (
    <div className="ob-screen ob-screen--goal">
      <button onClick={onBack} className="btn btn-ghost btn-sm ob-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>

      <div className="ob-content">
        <p className="ob-eyebrow">Step 1 of 3</p>
        <h1 className="ob-headline ob-headline--sm">Track your goal.</h1>
        <p className="ob-subhead">
          Set your deposit target and timeline. Most first-time buyers aim for 5–20% of the home's purchase price.
        </p>
      </div>

      <div className="ob-form">
        <div className="ob-form-group">
          <label htmlFor="targetAmount">Home price you're aiming for</label>
          <div className="ob-input-prefix-wrap">
            <span className="ob-input-prefix">$</span>
            <input
              id="targetAmount"
              type="text"
              inputMode="decimal"
              placeholder="425,000"
              value={data.targetAmount || ''}
              onChange={(e) => onChange('targetAmount', e.target.value.replace(/[^0-9.]/g, ''))}
              autoFocus
            />
          </div>
          {errors.targetAmount && <span className="field-error">{errors.targetAmount}</span>}
        </div>

        <div className="ob-form-group">
          <label htmlFor="depositGoal">Your down payment goal</label>
          <div className="ob-input-prefix-wrap">
            <span className="ob-input-prefix">$</span>
            <input
              id="depositGoal"
              type="text"
              inputMode="decimal"
              placeholder="85,000 (20%)"
              value={data.depositGoal || ''}
              onChange={(e) => onChange('depositGoal', e.target.value.replace(/[^0-9.]/g, ''))}
            />
          </div>
          <p className="ob-field-hint">20% is the gold standard — avoids PMI and secures better rates.</p>
          {errors.depositGoal && <span className="field-error">{errors.depositGoal}</span>}
        </div>

        <div className="ob-form-group">
          <label htmlFor="timeline">When do you want to buy? <span className="label-hint">(optional)</span></label>
          <select
            id="timeline"
            value={data.timeline || ''}
            onChange={(e) => onChange('timeline', e.target.value)}
          >
            <option value="">Select a timeline</option>
            <option value="6months">Within 6 months</option>
            <option value="1year">Within 1 year</option>
            <option value="2years">Within 2 years</option>
            <option value="3years">Within 3 years</option>
            <option value="5years">3–5 years</option>
          </select>
        </div>

        <div className="ob-suggestions">
          <p className="ob-suggestions-label">Common goals in your area:</p>
          <div className="ob-suggestion-chips">
            {suggestions.map((s) => (
              <button
                key={s.city}
                type="button"
                className="ob-suggestion-chip"
                onClick={() => {
                  onChange('depositGoal', s.deposit);
                  onChange('targetAmount', s.target);
                }}
              >
                <span className="ob-chip-city">{s.city}</span>
                <span className="ob-chip-detail">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ob-actions">
        <button className="btn btn-primary btn-lg ob-cta" onClick={handleNext}>
          Continue
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Screen 3: Watch Progress ─────────────────────────────────────────────────
function Screen3({ onNext, onBack }) {
  return (
    <div className="ob-screen ob-screen--progress">
      <button onClick={onBack} className="btn btn-ghost btn-sm ob-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>

      <div className="ob-content">
        <p className="ob-eyebrow">Step 2 of 3</p>
        <h1 className="ob-headline ob-headline--sm">Watch your progress.</h1>
        <p className="ob-subhead">
          Every deposit brings you closer. Your goal photo gradually reveals as you save — like watching your future come into focus.
        </p>
      </div>

      <div className="ob-progress-demo">
        <div className="ob-progress-card">
          <div className="ob-progress-card-photo">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80"
              alt="Portland craftsman home"
            />
            <div className="ob-progress-overlay" style={{ clipPath: 'inset(60% 0 0 0)' }} />
            <div className="ob-progress-badge">50% saved</div>
          </div>
          <div className="ob-progress-card-body">
            <div className="ob-progress-card-name">Portland Craftsman · Alberta Arts</div>
            <div className="ob-progress-card-amounts">
              <span className="amount ob-progress-current">$42,500</span>
              <span className="ob-progress-sep">of</span>
              <span className="ob-progress-target">$85,000</span>
            </div>
            <div className="progress-bar ob-demo-bar">
              <div className="progress-bar-fill" style={{ width: '50%' }} />
            </div>
            <div className="ob-progress-pct">50% · $42,500 to go</div>
          </div>
        </div>

        <div className="ob-milestone-track">
          {[
            { label: 'Start', pct: 0, reached: true },
            { label: '25%', pct: 25, reached: true },
            { label: 'Halfway', pct: 50, reached: true },
            { label: '75%', pct: 75, reached: false },
            { label: 'Home!', pct: 100, reached: false },
          ].map((m) => (
            <div key={m.label} className="ob-milestone" style={{ left: `${m.pct}%` }}>
              <div className={`ob-milestone-dot ${m.reached ? 'ob-milestone-dot--reached' : ''} ${m.pct === 50 ? 'ob-milestone-dot--active' : ''}`} />
              <span className="ob-milestone-label">{m.label}</span>
            </div>
          ))}
          <div className="ob-milestone-track-fill" style={{ width: '50%' }} />
        </div>

        <div className="ob-tip">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
          <span>The more you save, the more of your home you see — before you even buy it.</span>
        </div>
      </div>

      <div className="ob-actions">
        <button className="btn btn-primary btn-lg ob-cta" onClick={onNext}>
          Next
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ─── Screen 4: Choose Plan & Start ───────────────────────────────────────────
function Screen4({ onComplete, onBack }) {
  const [selectedPlan, setSelectedPlan] = useState('free');

  return (
    <div className="ob-screen ob-screen--save">
      <button onClick={onBack} className="btn btn-ghost btn-sm ob-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back
      </button>

      <div className="ob-content">
        <p className="ob-eyebrow">Step 3 of 3</p>
        <h1 className="ob-headline ob-headline--sm">Start saving.</h1>
        <p className="ob-subhead">
          Choose the plan that fits where you are in your home buying journey.
        </p>
      </div>

      <div className="ob-plans-mini">
        {[
          { key: 'free', name: 'Free', price: 'Free', desc: 'Track 1 property with basic tools' },
          { key: 'homebuyer', name: 'Homebuyer', price: '$9.99/mo', desc: 'Calculator, market alerts, agent contacts', highlight: true },
          { key: 'investor', name: 'Investor', price: '$19.99/mo', desc: 'Portfolio, ROI, market trends, unlimited' },
        ].map((plan) => (
          <button
            key={plan.key}
            type="button"
            className={`ob-plan-card ${selectedPlan === plan.key ? 'ob-plan-card--selected' : ''} ${plan.highlight ? 'ob-plan-card--highlight' : ''}`}
            onClick={() => setSelectedPlan(plan.key)}
          >
            <div className={`ob-plan-radio-inner ${selectedPlan === plan.key ? 'ob-plan-radio-inner--selected' : ''}`} />
            <div className="ob-plan-info">
              <div className="ob-plan-name">{plan.name}</div>
              <div className="ob-plan-desc">{plan.desc}</div>
            </div>
            <div className="ob-plan-price">{plan.price}</div>
          </button>
        ))}
      </div>

      <div className="ob-actions">
        <button className="btn btn-primary btn-lg ob-cta" onClick={() => onComplete(selectedPlan)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          Start saving
        </button>
        <p className="ob-no-charge">No charge today. Free plan is free forever.</p>
      </div>
    </div>
  );
}

// ─── Main Onboarding Container ────────────────────────────────────────────────
export function Onboarding() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState(1);
  const [data, setData] = useState(() => {
    try {
      const raw = localStorage.getItem('rising_onboarding_data');
      return raw ? JSON.parse(raw) : { depositGoal: '', targetAmount: '', timeline: '' };
    } catch {
      return { depositGoal: '', targetAmount: '', timeline: '' };
    }
  });

  function updateData(field, value) {
    const next = { ...data, [field]: value };
    setData(next);
    localStorage.setItem('rising_onboarding_data', JSON.stringify(next));
  }

  function handleComplete(plan) {
    localStorage.setItem('rising_onboarding_plan', plan);
    saveOnboardingComplete();
    navigate('/app/goals/new');
  }

  return (
    <div className="onboarding">
      <div className="onboarding-brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Rising</span>
      </div>

      <div className="onboarding-dots">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`onboarding-dot ${screen === n ? 'onboarding-dot--active' : ''} ${screen > n ? 'onboarding-dot--done' : ''}`}
          />
        ))}
      </div>

      <div className="ob-screen-container">
        {screen === 1 && <Screen1 onNext={() => setScreen(2)} onSkip={() => navigate('/app')} />}
        {screen === 2 && <Screen2 data={data} onChange={updateData} onNext={() => setScreen(3)} onBack={() => setScreen(1)} />}
        {screen === 3 && <Screen3 onNext={() => setScreen(4)} onBack={() => setScreen(2)} />}
        {screen === 4 && <Screen4 onComplete={handleComplete} onBack={() => setScreen(3)} />}
      </div>
    </div>
  );
}
