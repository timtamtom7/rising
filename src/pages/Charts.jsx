import { useMemo } from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import './Charts.css';

// ── SVG Bar Chart: Monthly deposit history ──────────────────────
function MonthlyDepositChart({ deposits, currency }) {
  const grouped = useMemo(() => {
    const map = {};
    deposits.forEach((d) => {
      const date = new Date(d.createdAt);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      if (!map[key]) map[key] = { label, total: 0, count: 0 };
      map[key].total += d.amount;
      map[key].count += 1;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12); // last 12 months
  }, [deposits]);

  if (grouped.length === 0) {
    return (
      <div className="chart-empty">
        <p>No deposit data yet. Add deposits to see your history chart.</p>
      </div>
    );
  }

  const maxVal = Math.max(...grouped.map(([, g]) => g.total));
  const CHART_H = 200;
  const BAR_W = 40;
  const GAP = 12;
  const totalW = grouped.length * (BAR_W + GAP) - GAP;
  const svgW = Math.max(totalW + 40, 400);

  return (
    <div className="chart-container">
      <h3 className="chart-title">Monthly Deposit History</h3>
      <div className="chart-scroll-wrap">
        <svg
          className="bar-chart"
          width={svgW}
          height={CHART_H + 56}
          viewBox={`0 0 ${svgW} ${CHART_H + 56}`}
          aria-label="Monthly deposit history bar chart"
        >
          {/* Y-axis grid lines */}
          {[0.25, 0.5, 0.75, 1].map((frac) => {
            const y = CHART_H - CHART_H * frac;
            const val = maxVal * frac;
            return (
              <g key={frac}>
                <line
                  x1="32"
                  y1={y}
                  x2={svgW - 8}
                  y2={y}
                  stroke="var(--surface-4)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x="28"
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="var(--text-tertiary)"
                >
                  {formatCurrency(val, currency, true)}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {grouped.map(([key, group], i) => {
            const barH = (group.total / maxVal) * CHART_H;
            const x = 36 + i * (BAR_W + GAP);
            const y = CHART_H - barH;
            return (
              <g key={key}>
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width={BAR_W}
                  height={barH}
                  rx="6"
                  fill="var(--color-accent)"
                  opacity="0.85"
                />
                {/* Amount label on top */}
                {barH > 24 && (
                  <text
                    x={x + BAR_W / 2}
                    y={y + 14}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fill="white"
                  >
                    {formatCurrency(group.total, currency, true)}
                  </text>
                )}
                {/* X-axis label */}
                <text
                  x={x + BAR_W / 2}
                  y={CHART_H + 20}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--text-secondary)"
                >
                  {group.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="chart-subtitle">
        {grouped.length} month{grouped.length !== 1 ? 's' : ''} of deposit activity
      </p>
    </div>
  );
}

// ── SVG Line Chart: Goal projection ──────────────────────────────
function GoalProjectionChart({ goals, currency }) {
  const activeGoals = goals.filter((g) => !g.archived && !g.completedAt && g.deadline);
  const now = new Date();

  const projectionData = useMemo(() => {
    return activeGoals.slice(0, 3).map((goal) => {
      const deadline = new Date(goal.deadline);
      const daysTotal = Math.max(1, Math.ceil((deadline - new Date(goal.createdAt)) / (1000 * 60 * 60 * 24)));
      const daysLeft = Math.max(0, Math.ceil((deadline - now) / (1000 * 60 * 60 * 24)));
      const daysPassed = daysTotal - daysLeft;
      const ratePerDay = daysPassed > 0 ? goal.currentAmount / daysPassed : 0;
      const projectedFinal = goal.currentAmount + ratePerDay * daysLeft;

      // Build monthly points for the line
      const start = new Date(goal.createdAt);
      const points = [];
      for (let m = 0; m <= Math.ceil(daysTotal / 30); m++) {
        const d = new Date(start);
        d.setMonth(d.getMonth() + m);
        const dayOffset = Math.max(0, Math.ceil((d - start) / (1000 * 60 * 60 * 24)));
        const amt = Math.min(goal.targetAmount, Math.max(0, ratePerDay * dayOffset));
        points.push({ date: d, amount: amt });
      }

      // Ideal pace line
      const idealPoints = [];
      for (let m = 0; m <= Math.ceil(daysTotal / 30); m++) {
        const d = new Date(start);
        d.setMonth(d.getMonth() + m);
        idealPoints.push({ date: d, amount: (goal.targetAmount / daysTotal) * m * 30 });
      }

      return { goal, daysLeft, ratePerDay, projectedFinal, points, idealPoints };
    });
  }, [activeGoals, now]);

  if (projectionData.length === 0) {
    return (
      <div className="chart-empty">
        <p>Add a goal with a deadline to see your projection chart.</p>
      </div>
    );
  }

  const W = 600;
  const H = 220;
  const PAD = { top: 16, right: 16, bottom: 40, left: 56 };
  const maxAmt = Math.max(...projectionData.map((d) => d.goal.targetAmount));

  return (
    <div className="chart-container">
      <h3 className="chart-title">Goal Completion Projection</h3>
      <svg className="line-chart" viewBox={`0 0 ${W} ${H}`} aria-label="Goal projection chart">
        <defs>
          <linearGradient id="projectedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0"/>
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0.25, 0.5, 0.75, 1].map((frac) => {
          const y = PAD.top + (H - PAD.top - PAD.bottom) * (1 - frac);
          return (
            <g key={frac}>
              <line
                x1={PAD.left}
                y1={y}
                x2={W - PAD.right}
                y2={y}
                stroke="var(--surface-4)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={PAD.left - 6}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="var(--text-tertiary)"
              >
                {formatCurrency(maxAmt * frac, currency, true)}
              </text>
            </g>
          );
        })}

        {projectionData.map(({ goal, projectedFinal, points, idealPoints }, gi) => {
          const colors = ['#22c55e', '#f59e0b', '#3b82f6'];
          const color = colors[gi % colors.length];
          const chartW = W - PAD.left - PAD.right;
          const chartH = H - PAD.top - PAD.bottom;

          const toX = (i, total) => PAD.left + (total <= 1 ? chartW / 2 : (i / (total - 1)) * chartW);
          const toY = (amt) => PAD.top + chartH * (1 - amt / maxAmt);

          // Ideal pace line
          const idealD = `M ${idealPoints.map((p, i) => `${toX(i, idealPoints.length)},${toY(p.amount)}`).join(' L ')}`;
          const projD = `M ${points.map((p, i) => `${toX(i, points.length)},${toY(p.amount)}`).join(' L ')}`;

          return (
            <g key={goal.id}>
              {/* Ideal pace */}
              <path d={idealD} fill="none" stroke="var(--surface-4)" strokeWidth="2" strokeDasharray="6 4"/>
              {/* Projected */}
              <path d={projD} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Target line */}
              <line
                x1={PAD.left}
                y1={toY(goal.targetAmount)}
                x2={W - PAD.right}
                y2={toY(goal.targetAmount)}
                stroke={color}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.5"
              />
              <text
                x={W - PAD.right + 4}
                y={toY(goal.targetAmount) + 4}
                fontSize="9"
                fill={color}
              >
                {goal.name.slice(0, 14)}
              </text>
            </g>
          );
        })}

        {/* X axis labels */}
        <line x1={PAD.left} y1={H - PAD.bottom} x2={W - PAD.right} y2={H - PAD.bottom} stroke="var(--surface-4)" strokeWidth="1"/>
        <text x={PAD.left} y={H - 8} fontSize="10" fill="var(--text-secondary)">Start</text>
        <text x={W - PAD.right} y={H - 8} fontSize="10" fill="var(--text-secondary)" textAnchor="end">Goal date</text>
      </svg>

      <div className="projection-legend">
        {projectionData.map(({ goal }, i) => {
          const colors = ['#22c55e', '#f59e0b', '#3b82f6'];
          const color = colors[i % colors.length];
          return (
            <div key={goal.id} className="projection-item">
              <span className="projection-dot" style={{ background: color }}/>
              <span className="projection-name">{goal.name}</span>
            </div>
          );
        })}
        <div className="projection-item">
          <span className="projection-line-sample"/>
          <span className="projection-name">Ideal pace</span>
        </div>
      </div>
    </div>
  );
}

// ── SVG Area Chart: Savings vs required down payment curve ──────
function SavingsCurveChart({ goals, currency }) {
  const activeGoals = goals.filter((g) => !g.archived);

  const curveData = useMemo(() => {
    // Aggregate deposits by month across all goals
    const byMonth = {};
    activeGoals.forEach((goal) => {
      goal.deposits.forEach((d) => {
        const date = new Date(d.createdAt);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const label = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        if (!byMonth[key]) byMonth[key] = { label, cumulative: 0 };
        byMonth[key].cumulative += d.amount;
      });
    });

    // Build cumulative
    let running = 0;
    const months = Object.entries(byMonth)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, { label }]) => {
        running += byMonth[key].cumulative;
        return { key, label, cumulative: running };
      });

    // Down payment required curve (assume 20% of a $600k home = $120k, grow proportionally to time)
    const totalTarget = activeGoals.reduce((s, g) => s + g.targetAmount, 0);
    const targetCurve = totalTarget > 0
      ? months.map((_, i) => ({
          cumulative: (totalTarget / Math.max(1, months.length - 1)) * i,
        }))
      : [];

    return { months, targetCurve };
  }, [activeGoals]);

  if (curveData.months.length < 2) {
    return (
      <div className="chart-empty">
        <p>Need at least 2 months of deposit data to show the savings curve.</p>
      </div>
    );
  }

  const W = 600;
  const H = 240;
  const PAD = { top: 16, right: 16, bottom: 44, left: 60 };
  const { months, targetCurve } = curveData;
  const maxAmt = Math.max(
    months[months.length - 1].cumulative,
    targetCurve.length ? targetCurve[targetCurve.length - 1].cumulative : 0
  );
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const toX = (i, total) => PAD.left + (total <= 1 ? chartW / 2 : (i / (total - 1)) * chartW);
  const toY = (amt) => PAD.top + chartH * (1 - amt / maxAmt);

  const areaD = `M ${months.map((m, i) => `${toX(i, months.length)},${toY(m.cumulative)}`).join(' L ')} L ${toX(months.length - 1, months.length)},${PAD.top + chartH} L ${PAD.left},${PAD.top + chartH} Z`;
  const lineD = `M ${months.map((m, i) => `${toX(i, months.length)},${toY(m.cumulative)}`).join(' L ')}`;

  const targetD = targetCurve.length > 1
    ? `M ${targetCurve.map((t, i) => `${toX(i, targetCurve.length)},${toY(t.cumulative)}`).join(' L ')}`
    : null;

  return (
    <div className="chart-container">
      <h3 className="chart-title">Your Savings vs Required Down Payment</h3>
      <svg className="area-chart" viewBox={`0 0 ${W} ${H}`} aria-label="Savings vs required curve">
        <defs>
          <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.05"/>
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0.25, 0.5, 0.75, 1].map((frac) => {
          const y = PAD.top + chartH * (1 - frac);
          return (
            <g key={frac}>
              <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="var(--surface-4)" strokeWidth="1" strokeDasharray="4 4"/>
              <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="var(--text-tertiary)">
                {formatCurrency(maxAmt * frac, currency, true)}
              </text>
            </g>
          );
        })}

        {/* Target curve */}
        {targetD && (
          <path d={targetD} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="8 4" strokeLinecap="round"/>
        )}

        {/* Area */}
        <path d={areaD} fill="url(#savingsGrad)"/>
        {/* Line */}
        <path d={lineD} fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

        {/* X axis labels */}
        <line x1={PAD.left} y1={PAD.top + chartH} x2={W - PAD.right} y2={PAD.top + chartH} stroke="var(--surface-4)" strokeWidth="1"/>
        {[0, Math.floor(months.length / 2), months.length - 1].map((i) => (
          <text
            key={i}
            x={toX(i, months.length)}
            y={H - 8}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-secondary)"
          >
            {months[i]?.label}
          </text>
        ))}

        {/* Legend */}
        <circle cx={PAD.left + 8} cy={PAD.top - 2} r="5" fill="#22c55e"/>
        <text x={PAD.left + 18} y={PAD.top + 2} fontSize="10" fill="var(--text-secondary)">Your savings</text>
        {targetD && (
          <>
            <line x1={PAD.left + 100} y1={PAD.top} x2={PAD.left + 118} y2={PAD.top} stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6 3"/>
            <text x={PAD.left + 124} y={PAD.top + 2} fontSize="10" fill="var(--text-secondary)">Required pace</text>
          </>
        )}
      </svg>
    </div>
  );
}

// ── Property Value Trend Chart ────────────────────────────────────
function PropertyTrendChart({ properties, currency }) {
  const trendData = useMemo(() => {
    // Mock trend: each property has a simulated price history
    return properties.slice(0, 4).map((prop) => {
      const base = prop.price || 500000;
      const listed = new Date(prop.listedAt || prop.createdAt);
      const months = [];
      let price = base * 1.05; // start 5% higher (listed high)
      for (let i = 5; i >= 0; i--) {
        const d = new Date(listed);
        d.setMonth(d.getMonth() - i);
        const variance = (Math.sin(i * 1.7 + prop.id.charCodeAt(0)) * 0.02 + 1);
        months.push({ date: d, price: Math.round(price * variance) });
        price = base;
      }
      // Current
      months.push({ date: new Date(), price: prop.priceDroppedAt ? base * 0.97 : base });
      return { property: prop, months };
    });
  }, [properties]);

  if (trendData.length === 0) {
    return (
      <div className="chart-empty">
        <p>Add properties to see their value trends.</p>
      </div>
    );
  }

  const W = 600;
  const H = 240;
  const PAD = { top: 20, right: 16, bottom: 44, left: 64 };
  const allPrices = trendData.flatMap((d) => d.months.map((m) => m.price));
  const maxP = Math.max(...allPrices);
  const minP = Math.min(...allPrices) * 0.95;
  const range = maxP - minP || 1;
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const toX = (i, total) => PAD.left + (total <= 1 ? chartW / 2 : (i / (total - 1)) * chartW);
  const toY = (p) => PAD.top + chartH * (1 - (p - minP) / range);

  const labels = ['-5mo', '-4mo', '-3mo', '-2mo', '-1mo', 'List', 'Now'];

  return (
    <div className="chart-container">
      <h3 className="chart-title">Property Value Trends</h3>
      <svg className="line-chart" viewBox={`0 0 ${W} ${H}`} aria-label="Property value trends">
        {/* Grid */}
        {[0, 0.5, 1].map((frac) => {
          const y = PAD.top + chartH * frac;
          const val = maxP - range * frac;
          return (
            <g key={frac}>
              <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="var(--surface-4)" strokeWidth="1" strokeDasharray="4 4"/>
              <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="var(--text-tertiary)">
                {formatCurrency(val, currency, true)}
              </text>
            </g>
          );
        })}

        {trendData.map(({ property, months }, gi) => {
          const colors = ['#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];
          const color = colors[gi % colors.length];
          const d = `M ${months.map((m, i) => `${toX(i, months.length)},${toY(m.price)}`).join(' L ')}`;
          return (
            <g key={property.id}>
              <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              {months.map((m, i) => (
                <circle key={i} cx={toX(i, months.length)} cy={toY(m.price)} r="3" fill={color}/>
              ))}
              <text
                x={W - PAD.right}
                y={PAD.top + gi * 18 + 10}
                textAnchor="end"
                fontSize="9"
                fill={color}
                fontWeight="600"
              >
                {property.name.slice(0, 18)}
              </text>
            </g>
          );
        })}

        <line x1={PAD.left} y1={PAD.top + chartH} x2={W - PAD.right} y2={PAD.top + chartH} stroke="var(--surface-4)" strokeWidth="1"/>
        {labels.map((l, i) => (
          <text key={i} x={toX(i, labels.length)} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--text-secondary)">{l}</text>
        ))}
      </svg>
    </div>
  );
}

// ── Main Charts Page ─────────────────────────────────────────────
export function Charts({ goals, getAllDeposits, properties, currency }) {
  const allDeposits = getAllDeposits();

  return (
    <div className="charts-page page-enter">
      <div className="charts-header">
        <h1>Charts & Insights</h1>
        <p className="charts-subtitle">Visualize your progress and property trends</p>
      </div>

      <div className="charts-grid">
        <MonthlyDepositChart deposits={allDeposits} currency={currency}/>
        <GoalProjectionChart goals={goals} currency={currency}/>
        <SavingsCurveChart goals={goals} currency={currency}/>
        <PropertyTrendChart properties={properties} currency={currency}/>
      </div>
    </div>
  );
}
