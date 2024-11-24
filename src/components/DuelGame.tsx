import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { ArmWrestling, DiceChallenge, RockPaperScissors, TicTacToe } from './MiniGames';
import PenaltyChoice from './PenaltyChoice';

const DUELS = [
  { 
    id: 'arm-wrestling', 
    name: 'Bras de Fer', 
    description: 'Tapez le plus vite possible pour gagner !',
    component: ArmWrestling,
    icon: '💪'
  },
  { 
    id: 'dice-challenge', 
    name: 'Dé Challenge', 
    description: 'Que le meilleur lanceur gagne !',
    component: DiceChallenge,
    icon: '🎲'
  },
  {
    id: 'rock-paper-scissors',
    name: 'Pierre Feuille Ciseaux',
    description: 'Le meilleur des 3 ! Le perdant boit.',
    component: RockPaperScissors,
    icon: '✌️'
  },
  {
    id: 'tic-tac-toe',
    name: 'Morpion',
    description: 'Alignez 3 symboles pour gagner !',
    component: TicTacToe,
    icon: '⭕'
  }
];

export default function DuelGame() {
  const { 
    gameState, 
    players, 
    addPoints, 
    setPenaltyPhase, 
    setLosingPlayer,
    isPenaltyPhase,
    losingPlayer,
    nextChallenge
  } = useGameStore();
  
  const [selectedDuel, setSelectedDuel] = useState<string | null>(null);
  const [showScores, setShowScores] = useState(true);

  const handleDuelComplete = (winnerId: string) => {
    if (winnerId) {
      addPoints(winnerId, 15);
      const loserId = players.find(playerId => playerId !== winnerId);
      if (loserId) {
        addPoints(loserId, -5);
        setLosingPlayer(loserId);
        setPenaltyPhase(true);
      }
    }
    setSelectedDuel(null);
  };

  const handlePenaltyComplete = () => {
    setPenaltyPhase(false);
    setLosingPlayer(null);
    nextChallenge();
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4">
      {/* Scores Flottants */}
      <AnimatePresence>
        {showScores && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 left-4 glass-card rounded-lg p-4 shadow-lg z-10"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Classement</h3>
              <button 
                onClick={() => setShowScores(false)}
                className="text-white/60 hover:text-white/90"
              >
                ✕
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {players
                .sort((playerA, playerB) => 
                  (gameState.scores[playerB] || 0) - (gameState.scores[playerA] || 0)
                )
                .map((player, index) => (
                  <div
                    key={player}
                    className="flex justify-between items-center text-white"
                  >
                    <span>{index + 1}. {player}</span>
                    <span className="font-medium">{gameState.scores[player] || 0} pts</span>
                  </div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showScores && (
        <button
          onClick={() => setShowScores(true)}
          className="fixed top-4 right-4 glass-card p-2 rounded-lg shadow-lg z-10"
        >
          📊
        </button>
      )}

      {/* Mini-jeux */}
      <div className="mt-20 grid grid-cols-1 gap-3">
        {DUELS.map((duel) => (
          <motion.button
            key={duel.id}
            onClick={() => setSelectedDuel(duel.id)}
            className="mode-card relative glass-card rounded-xl p-6 text-left hover:scale-105 transition"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute top-4 right-4 text-4xl">
              {duel.icon}
            </span>
            <h4 className="text-xl font-bold text-white mb-2">
              {duel.name}
            </h4>
            <p className="text-white/80">
              {duel.description}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Modal du Mini-jeu */}
      <AnimatePresence>
        {selectedDuel && (() => {
          const DuelComponent = DUELS.find(d => d.id === selectedDuel)?.component;
          return DuelComponent ? (
            <DuelComponent 
              onClose={() => setSelectedDuel(null)}
              onComplete={handleDuelComplete}
            />
          ) : null;
        })()}
      </AnimatePresence>

      {/* Pénalité pour le perdant */}
      {isPenaltyPhase && losingPlayer && (
        <PenaltyChoice 
          onComplete={handlePenaltyComplete}
          losingPlayer={losingPlayer}
        />
      )}
    </div>
  );
}