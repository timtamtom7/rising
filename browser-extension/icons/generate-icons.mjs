// Generate extension icons using @napi-rs/canvas
import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sizes = [16, 48, 128];
const outputDir = path.join(__dirname);

// Ensure output dir
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

sizes.forEach((size) => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Green background with rounded corners
  ctx.beginPath();
  ctx.roundRect(0, 0, size, size, size * 0.2);
  ctx.fillStyle = '#22c55e';
  ctx.fill();

  const cx = size / 2;
  const cy = size / 2;
  const s = size * 0.55;

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = size * 0.08;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // House outline
  ctx.beginPath();
  ctx.moveTo(cx, cy - s * 0.4); // roof peak
  ctx.lineTo(cx - s * 0.4, cy - s * 0.05); // roof left
  ctx.lineTo(cx - s * 0.4, cy + s * 0.35); // wall left
  ctx.lineTo(cx + s * 0.4, cy + s * 0.35); // wall right
  ctx.lineTo(cx + s * 0.4, cy - s * 0.05); // roof right
  ctx.closePath();
  ctx.stroke();

  // Door
  const doorW = s * 0.22;
  const doorH = s * 0.28;
  ctx.beginPath();
  ctx.roundRect(cx - doorW / 2, cy + s * 0.35 - doorH, doorW, doorH, 2);
  ctx.stroke();

  // Arrow up inside
  ctx.beginPath();
  ctx.moveTo(cx, cy - s * 0.18);
  ctx.lineTo(cx - s * 0.12, cy);
  ctx.moveTo(cx, cy - s * 0.18);
  ctx.lineTo(cx + s * 0.12, cy);
  ctx.moveTo(cx, cy - s * 0.18);
  ctx.lineTo(cx, cy + s * 0.1);
  ctx.stroke();

  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(outputDir, `icon-${size}.png`), buffer);
  console.log(`Generated icon-${size}.png (${size}x${size})`);
});

console.log('\nAll icons generated!');
