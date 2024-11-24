import { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useGameStore } from '../../store/gameStore';

interface Props {
  onClose: () => void;
  onComplete: (winnerId: string) => void;
}

export default function DiceChallenge({ onClose, onComplete }: Props) {
  const { players } = useGameStore();
  const [rolls, setRolls] = useState<Record<string, number>>({});
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    const result = Math.floor(Math.random() * 6) + 1;
    
    setTimeout(() => {
      setRolls(prev => ({
        ...prev,
        [players[currentPlayer]]: result
      }));
      
      if (currentPlayer < players.length - 1) {
        setCurrentPlayer(prev => prev + 1);
      } else {
        // Tous les joueurs ont lancé
        setShowResult(true);
        const scores = { ...rolls, [players[currentPlayer]]: result };
        const maxScore = Math.max(...Object.values(scores));
        const winners = Object.entries(scores).filter(([_, score]) => score === maxScore);
        
        if (winners.length === 1) {
          // Un seul gagnant
          onComplete(winners[0][0]);
        } else {
          // En cas d'égalité, le premier joueur gagne
          onComplete(winners[0][0]);
        }
      }
      setIsRolling(false);
    }, 1000);
  };

  const getDiceEmoji = (value?: number) => {
    if (!value) return '🎲';
    return ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'][value - 1];
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-card rounded-xl p-8 max-w-md w-full text-center relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white/90"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">
          Dé Challenge 🎲
        </h2>

        {!showResult ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <p className="text-lg text-white/80">
                Tour de {players[currentPlayer]}
              </p>
            </div>

            <motion.div
              animate={isRolling ? {
                rotate: [0, 360, 720, 1080],
                scale: [1, 1.2, 1]
              } : {}}
              transition={{ duration: 1 }}
              className="text-8xl mb-8"
            >
              {getDiceEmoji(rolls[players[currentPlayer]])}
            </motion.div>

            <button
              onClick={rollDice}
              disabled={isRolling}
              className="w-full bg-[var(--primary)] text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
            >
              {isRolling ? 'Lancement...' : 'Lancer le dé !'}
            </button>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {Object.entries(rolls).map(([player, value]) => (
                <div key={player} className="glass-card p-4 rounded-lg">
                  <p className="text-white font-medium">{player}</p>
                  <p className="text-2xl mt-2">{getDiceEmoji(value)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-4"
          >
            <div className="text-center">
              <p className="text-xl font-bold text-white mb-2">
                Résultats finaux
              </p>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(rolls).map(([player, value]) => (
                  <div key={player} className="glass-card p-4 rounded-lg">
                    <p className="text-white font-medium">{player}</p>
                    <p className="text-2xl mt-2">{getDiceEmoji(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}