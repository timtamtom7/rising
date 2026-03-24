// Custom SVG Graphics for Rising
import './Graphics.css';

export function HouseIllustration({ className = '' }) {
  return (
    <svg className={`house-illustration ${className}`} viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe"/>
          <stop offset="100%" stopColor="#f0f9ff"/>
        </linearGradient>
        <linearGradient id="hg-house" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#f4f4f5"/>
        </linearGradient>
        <linearGradient id="hg-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22c55e"/>
          <stop offset="100%" stopColor="#16a34a"/>
        </linearGradient>
      </defs>
      <circle cx="160" cy="30" r="18" fill="#fef08a" opacity="0.8"/>
      <circle cx="160" cy="30" r="11" fill="#fde047"/>
      <rect x="45" y="95" width="110" height="72" rx="4" fill="url(#hg-house)" stroke="#e4e4e7" strokeWidth="1"/>
      <path d="M35 98 L100 38 L165 98" fill="url(#hg-roof)" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
      <rect x="130" y="52" width="16" height="30" rx="2" fill="#a1a1aa"/>
      <rect x="128" y="49" width="20" height="5" rx="2" fill="#71717a"/>
      <rect x="90" y="120" width="20" height="47" rx="3" fill="#16a34a"/>
      <circle cx="105" cy="147" r="2" fill="#fef9c3"/>
      <rect x="52" y="108" width="26" height="22" rx="3" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="1"/>
      <line x1="65" y1="108" x2="65" y2="130" stroke="#7dd3fc" strokeWidth="1"/>
      <line x1="52" y1="119" x2="78" y2="119" stroke="#7dd3fc" strokeWidth="1"/>
      <rect x="122" y="108" width="26" height="22" rx="3" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="1"/>
      <line x1="135" y1="108" x2="135" y2="130" stroke="#7dd3fc" strokeWidth="1"/>
      <line x1="122" y1="119" x2="148" y2="119" stroke="#7dd3fc" strokeWidth="1"/>
      <path d="M100 167 Q100 158 100 152 Q80 150 55 157 Q45 160 40 167" fill="#d4d4d8"/>
      <path d="M0 167 Q50 162 100 164 Q150 162 200 167 L200 180 L0 180 Z" fill="#bbf7d0" opacity="0.6"/>
    </svg>
  );
}

export function MapIllustration({ className = '' }) {
  return (
    <svg className={`map-illustration ${className}`} viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="map-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0fdf4"/>
          <stop offset="100%" stopColor="#dcfce7"/>
        </linearGradient>
      </defs>
      {/* Map background */}
      <rect width="200" height="140" rx="12" fill="url(#map-grad)"/>
      {/* Grid lines */}
      {[40, 80, 120, 160].map(x => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="140" stroke="#bbf7d0" strokeWidth="1"/>
      ))}
      {[35, 70, 105].map(y => (
        <line key={`h${y}`} x1="0" y1={y} x2="200" y2={y} stroke="#bbf7d0" strokeWidth="1"/>
      ))}
      {/* Roads */}
      <line x1="0" y1="70" x2="200" y2="60" stroke="#d4d4d8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="100" y1="0" x2="90" y2="140" stroke="#d4d4d8" strokeWidth="4" strokeLinecap="round"/>
      <line x1="40" y1="20" x2="50" y2="130" stroke="#e4e4e7" strokeWidth="2" strokeLinecap="round"/>
      <line x1="150" y1="10" x2="140" y2="120" stroke="#e4e4e7" strokeWidth="2" strokeLinecap="round"/>
      {/* Neighborhood blocks */}
      <rect x="20" y="15" width="18" height="14" rx="2" fill="#bbf7d0" opacity="0.8"/>
      <rect x="120" y="75" width="20" height="16" rx="2" fill="#bbf7d0" opacity="0.8"/>
      <rect x="145" y="20" width="15" height="12" rx="2" fill="#bbf7d0" opacity="0.8"/>
      <rect x="30" y="85" width="22" height="18" rx="2" fill="#bbf7d0" opacity="0.6"/>
      {/* Location pin 1 - active */}
      <g transform="translate(85, 55)">
        <circle cx="0" cy="0" r="10" fill="#22c55e" opacity="0.2">
          <animate attributeName="r" values="10;16;10" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.2;0;0.2" dur="2s" repeatCount="indefinite"/>
        </circle>
        <path d="M0 -8 C-6 -8 -10 -3 -10 2 C-10 7 -5 10 0 10 C5 10 10 7 10 2 C10 -3 6 -8 0 -8 Z" fill="#22c55e"/>
        <circle cx="0" cy="2" r="3" fill="white"/>
      </g>
      {/* Location pin 2 - secondary */}
      <g transform="translate(155, 40)">
        <path d="M0 -6 C-4 -6 -7 -2 -7 2 C-7 5 -4 8 0 8 C4 8 7 5 7 2 C7 -2 4 -6 0 -6 Z" fill="#f59e0b"/>
        <circle cx="0" cy="2" r="2" fill="white"/>
      </g>
      {/* Location pin 3 */}
      <g transform="translate(45, 100)">
        <path d="M0 -6 C-4 -6 -7 -2 -7 2 C-7 5 -4 8 0 8 C4 8 7 5 7 2 C7 -2 4 -6 0 -6 Z" fill="#a1a1aa"/>
        <circle cx="0" cy="2" r="2" fill="white"/>
      </g>
    </svg>
  );
}

export function DepositProgress({ percent = 0, size = 120, className = '' }) {
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = circumference * (percent / 100);
  const clampedPercent = Math.min(100, Math.max(0, percent));

  return (
    <div className={`deposit-progress ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--surface-3)"
          strokeWidth="8"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - filled}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 600ms var(--ease-out)' }}
        />
      </svg>
      <div className="deposit-progress-label">
        <span className="deposit-progress-pct">{Math.round(clampedPercent)}%</span>
        <span className="deposit-progress-text">saved</span>
      </div>
    </div>
  );
}

export function EmptyStateHouse({ className = '' }) {
  return (
    <div className={`empty-state-house ${className}`}>
      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    </div>
  );
}
