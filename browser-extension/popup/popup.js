// Rising Extension Popup Script

document.addEventListener('DOMContentLoaded', () => {
  // Read from localStorage (shared with main app)
  const data = JSON.parse(localStorage.getItem('rising_data') || '{}');
  const settings = data.settings || {};
  const goals = data.goals || [];
  const subscription = settings.subscription || { plan: 'free' };

  const totalSaved = goals.reduce((sum, g) => sum + (g.currentAmount || 0), 0);
  const activeGoal = goals.find((g) => !g.archived);

  // Update stats
  document.getElementById('total-saved').textContent =
    '$' + totalSaved.toLocaleString();

  if (activeGoal) {
    document.getElementById('savings-goal').textContent =
      '$' + (activeGoal.targetAmount || 0).toLocaleString() + ' for ' + activeGoal.name;

    if (activeGoal.targetAmount > 0) {
      const pct = Math.min(100, Math.round((totalSaved / activeGoal.targetAmount) * 100));
      const remaining = Math.max(0, activeGoal.targetAmount - totalSaved);

      const section = document.getElementById('progress-section');
      section.style.display = 'block';
      document.getElementById('progress-pct').textContent = pct + '%';
      document.getElementById('progress-fill').style.width = pct + '%';
      document.getElementById('progress-remaining').textContent =
        remaining > 0
          ? '$' + remaining.toLocaleString() + ' remaining'
          : 'Goal reached!';
    }
  }
});
