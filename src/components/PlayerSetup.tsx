import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { ArrowLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';

interface Props {
  onBack: () => void;
}

export default function PlayerSetup({ onBack }: Props) {
  const navigate = useNavigate();
  const { addPlayer, players, startGame, removePlayer } = useGameStore();
  const [newPlayer, setNewPlayer] = useState('');
  const [error, setError] = useState('');

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayer.trim()) {
      setError('Veuillez entrer un nom');
      return;
    }
    if (players.includes(newPlayer.trim())) {
      setError('Ce joueur existe déjà');
      return;
    }
    addPlayer(newPlayer.trim());
    setNewPlayer('');
    setError('');
  };

  const handleStartGame = () => {
    if (players.length < 2) {
      setError('Il faut au moins 2 joueurs');
      return;
    }
    startGame();
    navigate('/game');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white/90 p-2"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-white ml-2">Joueurs</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pb-4">
        <p className="text-white/80 text-center">2 joueurs minimum requis</p>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleAddPlayer} className="flex gap-2">
          <input
            type="text"
            value={newPlayer}
            onChange={(e) => setNewPlayer(e.target.value)}
            className="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
            placeholder="Nom du joueur"
          />
          <button
            type="submit"
            className="px-4 bg-[var(--primary)] text-white rounded-lg hover:opacity-90"
          >
            +
          </button>
        </form>

        {players.length === 0 ? (
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-8xl mx-auto"
            >
              🎉
            </motion.div>
            <p className="text-white/60 text-sm">
              Ajoutez des joueurs pour commencer la partie !
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {players.map((player) => (
              <motion.div
                key={player}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 glass-card rounded-lg"
              >
                <span className="text-white">{player}</span>
                <button
                  onClick={() => removePlayer(player)}
                  className="text-white/60 hover:text-white/90"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleStartGame}
        disabled={players.length < 2}
        className="w-full p-3 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-lg hover:opacity-90 disabled:opacity-50 font-medium mt-4"
      >
        {players.length < 2 ? 'Ajoutez des joueurs' : 'Commencer'}
      </button>
    </div>
  );
}