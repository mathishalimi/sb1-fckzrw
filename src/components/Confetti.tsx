import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  size: number;
  color: string;
  delay: number;
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const colors = [
    'var(--primary)',
    'var(--secondary)',
    '#FFD700', // Or
    '#FF69B4', // Rose
    '#00CED1', // Turquoise
  ];

  useEffect(() => {
    const newPieces = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20,
      rotation: Math.random() * 360,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pieces.map(piece => (
        <motion.div
          key={piece.id}
          initial={{ 
            x: piece.x,
            y: piece.y,
            rotate: 0,
            scale: 0
          }}
          animate={{ 
            y: window.innerHeight + 20,
            rotate: piece.rotation,
            scale: [0, 1, 1, 0.5, 0],
          }}
          transition={{
            duration: 5,
            delay: piece.delay,
            repeat: Infinity,
            ease: [0.36, 0, 0.66, -0.56],
          }}
          style={{
            position: 'absolute',
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: '50%',
            zIndex: 50,
          }}
        />
      ))}
    </div>
  );
}