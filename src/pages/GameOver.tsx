import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import Confetti from '../components/Confetti';

export default function GameOver() {
  const navigate = useNavigate();
  const { gameState, players, resetGame, isGameOver } = useGameStore();

  useEffect(() => {
    if (!isGameOver) {
      navigate('/');
    }
  }, [isGameOver, navigate]);

  // Trier les joueurs par score
  const sortedPlayers = [...players].sort(
    (a, b) => (gameState.scores[b] || 0) - (gameState.scores[a] || 0)
  );

  const winner = sortedPlayers[0];
  const winnerScore = gameState.scores[winner] || 0;

  const handleNewGame = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      <Confetti />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="bg-white rounded-xl shadow-xl p-6 space-y-8 text-center"
        >
          <div>
            <motion.h1
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-primary mb-2"
            >
              🎉 Victoire ! 🎉
            </motion.h1>
            <p className="text-gray-600">La partie est terminée</p>
          </div>

          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="bg-gradient-to-br from-primary to-secondary p-6 rounded-lg text-white"
          >
            <h2 className="text-3xl font-bold mb-2">
              👑 {winner}
            </h2>
            <p className="text-2xl font-semibold mb-2">
              {winnerScore} points
            </p>
            <p className="text-lg opacity-90 italic">
              En tant que gagnant, tu dois donner un gage aux perdants !
            </p>
          </motion.div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Perdants qui doivent faire le gage</h3>
            {sortedPlayers.slice(1).map((player, index) => (
              <motion.div
                key={player}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-4 rounded-lg flex justify-between items-center"
              >
                <span className="text-gray-700">
                  {index + 2}. {player}
                </span>
                <span className="font-medium text-gray-600">
                  {gameState.scores[player] || 0} pts
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <button
              onClick={handleNewGame}
              className="w-full bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 transition transform hover:scale-105"
            >
              Nouvelle Partie
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}