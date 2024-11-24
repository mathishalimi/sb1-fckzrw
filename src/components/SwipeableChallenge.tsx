import { useGameStore } from '../store/gameStore';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SwipeableChallenge() {
  const navigate = useNavigate();
  const { 
    currentChallenge, 
    nextChallenge, 
    addPoints, 
    players, 
    currentPlayer,
    gameState,
    settings,
    isGameOver
  } = useGameStore();

  useEffect(() => {
    if (isGameOver) {
      navigate('/game-over');
    }
  }, [isGameOver, navigate]);

  const handleSwipe = (dir: 'left' | 'right') => {
    if (dir === 'right') {
      addPoints(players[currentPlayer], 10);
    } else {
      addPoints(players[currentPlayer], -5);
    }
    
    setTimeout(() => {
      nextChallenge();
    }, 200);
  };

  if (!currentChallenge) return null;

  return (
    <motion.div 
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative glass-card rounded-2xl shadow-xl h-[60vh] w-full p-6 flex flex-col"
    >
      <div className="absolute top-4 right-4">
        <span className="bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-0.5 rounded-full border border-white/10">
          {currentChallenge.type}
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <motion.h2 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-2xl font-bold text-white mb-4"
        >
          {players[currentPlayer]}
        </motion.h2>
        <p className="text-xl text-white/80">
          {currentChallenge.text}
        </p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <p className="text-sm text-white/60">
          ✅ Accepter : +10 points | ❌ Refuser : -5 points + shot
        </p>
        
        <div className="flex justify-center gap-20 mt-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('left')}
            className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition"
          >
            <XMarkIcon className="h-8 w-8 text-[var(--primary)]" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('right')}
            className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition"
          >
            <CheckIcon className="h-8 w-8 text-[var(--secondary)]" />
          </motion.button>
        </div>
      </div>

      <div className="absolute top-4 left-4 glass-card rounded-full px-3 py-1 text-sm font-medium text-white">
        {gameState.scores[players[currentPlayer]] || 0} / {settings.pointsToWin} pts
      </div>
    </motion.div>
  );
}