// Generate extension icons using @napi-rs/canvas
const { createCanvas } = require('@napi-rs/canvas');
const fs = require('fs');
const path = require('path');

const sizes = [16, 48, 128];
const outputDir = path.join(__dirname, 'icons');

// Ensure output dir
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

sizes.forEach((size) => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Green background with rounded corners
  const radius = size * 0.2;
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, radius);
  ctx.fillStyle = '#22c55e';
  ctx.fill();

  // Draw house/up arrow icon
  const cx = size / 2;
  const cy = size / 2;
  const s = size * 0.6; // icon scale

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = size * 0.09;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Up arrow / house shape
  ctx.beginPath();
  ctx.moveTo(cx, cy - s * 0.4); // top point
  ctx.lineTo(cx - s * 0.35, cy - s * 0.05); // left wing
  ctx.lineTo(cx - s * 0.35, cy + s * 0.35); // left leg
  ctx.lineTo(cx - s * 0.12, cy + s * 0.35); // left foot
  ctx.lineTo(cx - s * 0.12, cy + s * 0.05); // left inner up
  ctx.lineTo(cx + s * 0.12, cy + s * 0.05); // right inner up
  ctx.lineTo(cx + s * 0.12, cy + s * 0.35); // right inner leg
  ctx.lineTo(cx + s * 0.35, cy + s * 0.35); // right foot
  ctx.lineTo(cx + s * 0.35, cy + s * 0.05); // right leg
  ctx.lineTo(cx + s * 0.35, cy - s * 0.05); // right wing
  ctx.closePath();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = size * 0.07;
  ctx.stroke();

  // Arrow up inside house
  ctx.beginPath();
  ctx.moveTo(cx, cy - s * 0.2);
  ctx.lineTo(cx - s * 0.15, cy);
  ctx.moveTo(cx, cy - s * 0.2);
  ctx.lineTo(cx + s * 0.15, cy);
  ctx.moveTo(cx, cy - s * 0.2);
  ctx.lineTo(cx, cy + s * 0.2);
  ctx.stroke();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, `icon-${size}.png`), buffer);
  console.log(`Generated icon-${size}.png`);
});

console.log('Done!');
