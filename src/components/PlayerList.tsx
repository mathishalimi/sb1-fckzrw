import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function PlayerList() {
  const { players, removePlayer } = useGameStore();

  if (players.length === 0) {
    return (
      <div className="text-center text-white/60 py-4">
        Ajoutez des joueurs pour commencer
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold text-white">Joueurs ({players.length})</h2>
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {players.map((player, index) => (
            <motion.div
              key={`player-${index}-${player}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10"
            >
              <span className="text-white">{player}</span>
              <button
                onClick={() => removePlayer(player)}
                className="text-white/60 hover:text-white/90 transition"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}