import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import { generateShareCard, canvasToDataURL, downloadImage } from '../utils/shareImage';
import './Share.css';

export function Share({ goals, getTotalSaved, currency }) {
  const totalSaved = getTotalSaved();
  const [selectedGoalId, setSelectedGoalId] = useState('all');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  const activeGoals = goals.filter((g) => !g.archived);
  const selectedGoal = selectedGoalId === 'all'
    ? null
    : activeGoals.find((g) => g.id === selectedGoalId);

  // Auto-generate preview when selection changes
  useEffect(() => {
    let cancelled = false;
    async function generate() {
      setPreviewUrl(null);
      setGenerating(true);
      try {
        const goal = selectedGoal;
        const percent = goal
          ? Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100))
          : totalSaved > 0
          ? Math.round((totalSaved / activeGoals.reduce((s, g) => s + g.targetAmount, 0)) * 100)
          : 0;
        const currentAmt = goal ? goal.currentAmount : totalSaved;
        const targetAmt = goal ? goal.targetAmount : activeGoals.reduce((s, g) => s + g.targetAmount, 0);

        const canvas = await generateShareCard({
          percent,
          goalName: goal ? goal.name : 'My Home Down Payment',
          currentAmount: currentAmt,
          targetAmount: targetAmt,
          currency,
        });
        if (cancelled) return;
        canvasRef.current = canvas;
        const url = canvasToDataURL(canvas);
        setPreviewUrl(url);
      } catch (err) {
        console.error('Failed to generate share card:', err);
      } finally {
        if (!cancelled) setGenerating(false);
      }
    }
    generate();
    return () => { cancelled = true; };
  }, [selectedGoalId, selectedGoal, totalSaved, activeGoals, currency]);

  async function handleDownload() {
    if (!canvasRef.current) return;
    const label = selectedGoal ? selectedGoal.name.replace(/\s+/g, '-').toLowerCase() : 'all-goals';
    await downloadImage(canvasRef.current, `rising-${label}-progress.png`);
  }

  async function handleCopyToClipboard() {
    if (!canvasRef.current) return;
    try {
      const blob = await new Promise((resolve) =>
        canvasRef.current.toBlob(resolve, 'image/png')
      );
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — fall back to download
      handleDownload();
    }
  }

  const percent = selectedGoal
    ? Math.min(100, Math.round((selectedGoal.currentAmount / selectedGoal.targetAmount) * 100))
    : totalSaved > 0
    ? Math.round((totalSaved / activeGoals.reduce((s, g) => s + g.targetAmount, 0)) * 100)
    : 0;

  return (
    <div className="share-page page-enter">
      <div className="share-header">
        <h1>Share Your Progress</h1>
        <p className="share-subtitle">Celebrate milestones and inspire others</p>
      </div>

      <div className="share-layout">
        {/* Left: controls */}
        <div className="share-controls">
          <div className="share-card">
            <h3 className="share-card-title">Choose a goal</h3>
            <div className="share-goal-select">
              <button
                className={`goal-chip ${selectedGoalId === 'all' ? 'goal-chip--active' : ''}`}
                onClick={() => setSelectedGoalId('all')}
              >
                All goals combined
              </button>
              {activeGoals.map((g) => (
                <button
                  key={g.id}
                  className={`goal-chip ${selectedGoalId === g.id ? 'goal-chip--active' : ''}`}
                  onClick={() => setSelectedGoalId(g.id)}
                >
                  {g.name}
                </button>
              ))}
            </div>

            <div className="share-preview-stats">
              <div className="share-stat">
                <span className="share-stat-label">Progress</span>
                <span className="share-stat-value accent">{percent}%</span>
              </div>
              <div className="share-stat">
                <span className="share-stat-label">Saved</span>
                <span className="share-stat-value">
                  {formatCurrency(selectedGoal ? selectedGoal.currentAmount : totalSaved, currency)}
                </span>
              </div>
              <div className="share-stat">
                <span className="share-stat-label">
                  {selectedGoal ? 'Goal' : 'Total goal'}
                </span>
                <span className="share-stat-value">
                  {formatCurrency(
                    selectedGoal
                      ? selectedGoal.targetAmount
                      : activeGoals.reduce((s, g) => s + g.targetAmount, 0),
                    currency
                  )}
                </span>
              </div>
            </div>

            <div className="share-actions">
              <button
                className="btn btn-primary btn-full"
                onClick={handleDownload}
                disabled={generating || !previewUrl}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Image
              </button>
              <button
                className="btn btn-secondary btn-full"
                onClick={handleCopyToClipboard}
                disabled={generating || !previewUrl}
              >
                {copied ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Copy to Clipboard
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="share-tip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p>
              Share your progress card on Instagram, Twitter, or anywhere you like.
              Your financial data stays private — only the card image is shared.
            </p>
          </div>
        </div>

        {/* Right: preview */}
        <div className="share-preview-wrap">
          <h3 className="share-preview-label">Preview</h3>
          {generating ? (
            <div className="share-preview-placeholder">
              <div className="share-loading-spinner"/>
              <p>Generating your card…</p>
            </div>
          ) : previewUrl ? (
            <img
              src={previewUrl}
              alt="Shareable progress card"
              className="share-preview-img"
            />
          ) : (
            <div className="share-preview-placeholder">
              <p>Add a goal and deposits to generate your card.</p>
              <Link to="/app/goals/new" className="btn btn-primary btn-sm">
                Create a goal
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Shareable milestones */}
      <div className="share-milestones">
        <h2>Milestone Achievements</h2>
        <p className="share-milestones-sub">Share when you hit key milestones</p>
        <div className="share-milestone-cards">
          {[
            { icon: '🎯', label: 'First 10%', desc: 'Started the journey', threshold: 10 },
            { icon: '🔥', label: 'Halfway there', desc: '50% of the way', threshold: 50 },
            { icon: '🏡', label: 'Goal reached!', desc: 'Down payment saved', threshold: 100 },
          ].map((m) => {
            const achieved = percent >= m.threshold;
            return (
              <div key={m.label} className={`share-milestone-card ${achieved ? 'share-milestone-card--achieved' : ''}`}>
                <div className="share-milestone-icon">{achieved ? m.icon : '🔒'}</div>
                <div className="share-milestone-info">
                  <div className="share-milestone-label">{m.label}</div>
                  <div className="share-milestone-desc">{m.desc}</div>
                </div>
                {achieved && (
                  <span className="share-milestone-badge">Share!</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
