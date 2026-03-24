import { useEffect, useState } from 'react';

const COLORS = ['#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#3b82f6', '#f5f5f7'];

export function Confetti({ active }) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!active) return;

    const newPieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1000,
      duration: 2000 + Math.random() * 1500,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 6 + Math.random() * 6,
      rotate: Math.random() > 0.5 ? 'rotate' : 'square',
    }));

    setPieces(newPieces);

    const timer = setTimeout(() => setPieces([]), 4000);
    return () => clearTimeout(timer);
  }, [active]);

  if (!pieces.length) return null;

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}ms`,
            animationDuration: `${p.duration}ms`,
            background: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: p.rotate === 'square' ? '2px' : '50%',
          }}
        />
      ))}
    </>
  );
}
