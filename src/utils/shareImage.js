/**
 * Canvas-based shareable image generator.
 * Draws a "progress card" that users can download or share.
 */

export async function generateShareCard({ percent, goalName, currentAmount, targetAmount, currency = 'USD', accentColor = '#22c55e' }) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');

  // ── Background ──────────────────────────────────────────────
  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, '#f0fdf4');
  bg.addColorStop(1, '#dcfce7');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ── Top accent bar ──────────────────────────────────────────
  ctx.fillStyle = accentColor;
  ctx.fillRect(0, 0, canvas.width, 12);

  // ── App branding ────────────────────────────────────────────
  ctx.fillStyle = '#18181b';
  ctx.font = 'bold 32px Inter, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🏠 Rising', canvas.width / 2, 80);

  ctx.fillStyle = '#71717a';
  ctx.font = '24px Inter, -apple-system, sans-serif';
  ctx.fillText("I'm saving for a home!", canvas.width / 2, 125);

  // ── House illustration ──────────────────────────────────────
  drawHouse(ctx, canvas.width / 2, 260, 200);

  // ── Progress ring ───────────────────────────────────────────
  const ringX = canvas.width / 2;
  const ringY = 620;
  const ringR = 160;
  const clampedPercent = Math.min(100, Math.max(0, percent));

  // Track
  ctx.beginPath();
  ctx.arc(ringX, ringY, ringR, 0, Math.PI * 2);
  ctx.strokeStyle = '#dcfce7';
  ctx.lineWidth = 24;
  ctx.stroke();

  // Filled arc
  const endAngle = (clampedPercent / 100) * Math.PI * 2 - Math.PI / 2;
  ctx.beginPath();
  ctx.arc(ringX, ringY, ringR, -Math.PI / 2, endAngle);
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 24;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Percent text
  ctx.fillStyle = '#18181b';
  ctx.font = 'bold 80px Inter, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${Math.round(clampedPercent)}%`, ringX, ringY + 25);

  ctx.fillStyle = '#71717a';
  ctx.font = '28px Inter, -apple-system, sans-serif';
  ctx.fillText('of your down payment goal', ringX, ringY + 65);

  // ── Goal name ───────────────────────────────────────────────
  if (goalName) {
    ctx.fillStyle = '#18181b';
    ctx.font = 'bold 44px Inter, -apple-system, sans-serif';
    ctx.fillText(goalName, canvas.width / 2, 920);
  }

  // ── Amounts ─────────────────────────────────────────────────
  const formatted = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(n);

  // Current amount box
  roundRect(ctx, canvas.width / 2 - 220, 970, 440, 160, 24, '#ffffff', '#e4e4e7');
  ctx.fillStyle = '#71717a';
  ctx.font = '24px Inter, -apple-system, sans-serif';
  ctx.fillText('Saved so far', canvas.width / 2, 1015);
  ctx.fillStyle = accentColor;
  ctx.font = 'bold 56px Inter, -apple-system, sans-serif';
  ctx.fillText(formatted(currentAmount), canvas.width / 2, 1100);

  // Target amount box
  roundRect(ctx, canvas.width / 2 - 220, 1155, 440, 160, 24, '#ffffff', '#e4e4e7');
  ctx.fillStyle = '#71717a';
  ctx.font = '24px Inter, -apple-system, sans-serif';
  ctx.fillText('Down payment goal', canvas.width / 2, 1200);
  ctx.fillStyle = '#18181b';
  ctx.font = 'bold 56px Inter, -apple-system, sans-serif';
  ctx.fillText(formatted(targetAmount), canvas.width / 2, 1285);

  // ── Motivational message ────────────────────────────────────
  const msg =
    clampedPercent >= 100
      ? '🎉 Goal reached! Congratulations!'
      : clampedPercent >= 75
      ? '🔥 Almost there! Keep going!'
      : clampedPercent >= 50
      ? '💪 Halfway there! Great progress!'
      : clampedPercent >= 25
      ? '📈 Nice start! Building momentum!'
      : '🚀 You\'ve got this! Let\'s go!';

  ctx.fillStyle = '#18181b';
  ctx.font = 'bold 36px Inter, -apple-system, sans-serif';
  ctx.fillText(msg, canvas.width / 2, 1430);

  // ── Footer ──────────────────────────────────────────────────
  ctx.fillStyle = '#a1a1aa';
  ctx.font = '22px Inter, -apple-system, sans-serif';
  ctx.fillText('Track your home buying journey with Rising', canvas.width / 2, 1750);
  ctx.fillText('rising.app', canvas.width / 2, 1790);

  // ── Bottom accent bar ────────────────────────────────────────
  ctx.fillStyle = accentColor;
  ctx.fillRect(0, canvas.height - 12, canvas.width, 12);

  return canvas;
}

function drawHouse(ctx, cx, cy, size) {
  const s = size / 200;
  const ox = cx - 100 * s;
  const oy = cy - 100 * s;

  // House body
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#e4e4e7';
  ctx.lineWidth = 2 * s;
  roundRect(ctx, ox + 30 * s, oy + 80 * s, 140 * s, 110 * s, 8 * s, '#ffffff', '#e4e4e7', true);

  // Roof
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.moveTo(ox + 10 * s, oy + 82 * s);
  ctx.lineTo(ox + 100 * s, oy + 20 * s);
  ctx.lineTo(ox + 190 * s, oy + 82 * s);
  ctx.closePath();
  ctx.fill();

  // Door
  ctx.fillStyle = '#22c55e';
  roundRect(ctx, ox + 80 * s, oy + 130 * s, 40 * s, 60 * s, 4 * s, '#22c55e', null, true);

  // Windows
  ctx.fillStyle = '#bae6fd';
  ctx.strokeStyle = '#7dd3fc';
  ctx.lineWidth = 1.5 * s;
  roundRect(ctx, ox + 42 * s, oy + 105 * s, 28 * s, 28 * s, 4 * s, '#bae6fd', '#7dd3fc', true);
  roundRect(ctx, ox + 130 * s, oy + 105 * s, 28 * s, 28 * s, 4 * s, '#bae6fd', '#7dd3fc', true);
}

function roundRect(ctx, x, y, w, h, r, fill, stroke, doFill = true) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (doFill && fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
}

export async function canvasToDataURL(canvas) {
  return canvas.toDataURL('image/png');
}

export async function downloadImage(canvas, filename = 'rising-progress.png') {
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}
