import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useGameStore } from '../../store/gameStore';

interface Props {
  onClose: () => void;
  onComplete: (winnerId: string) => void;
}

export default function DrinkingContest({ onClose, onComplete }: Props) {
  const { players } = useGameStore();
  const player1 = 0;
  const player2 = 1;
  const [countdown, setCountdown] = useState(3);
  const [round, setRound] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [roundCountdown, setRoundCountdown] = useState(5);
  const [readyPlayers, setReadyPlayers] = useState<Set<string>>(new Set());

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && !isPlaying) {
      setIsPlaying(true);
      startRound();
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && roundCountdown > 0) {
      timer = setTimeout(() => setRoundCountdown(roundCountdown - 1), 1000);
    } else if (roundCountdown === 0) {
      checkRoundResult();
    }
    return () => clearTimeout(timer);
  }, [roundCountdown, isPlaying]);

  const startRound = () => {
    setRoundCountdown(5);
    setReadyPlayers(new Set());
  };

  const handlePlayerReady = (playerId: string) => {
    if (roundCountdown > 0) {
      setReadyPlayers(prev => new Set(prev).add(playerId));
    }
  };

  const checkRoundResult = () => {
    const loser = players.find(player => !readyPlayers.has(player));
    if (loser) {
      onComplete(players.find(p => p !== loser)!);
    } else {
      setRound(r => r + 1);
      setTimeout(() => {
        setCountdown(3);
        setIsPlaying(false);
      }, 1000);
    }
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
          Concours de Shots 🍻
        </h2>

        <div className="space-y-6">
          {countdown > 0 ? (
            <motion.div
              key={countdown}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="text-6xl font-bold text-[var(--primary)]"
            >
              {countdown}
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-2xl font-bold text-white">Round {round}</p>
                <motion.div
                  key={roundCountdown}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-4xl font-bold text-[var(--primary)]"
                >
                  {roundCountdown}s
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {[player1, player2].map((playerIndex) => (
                  <div key={playerIndex} className="space-y-4">
                    <p className="text-lg font-bold text-white mb-2">
                      {players[playerIndex]}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePlayerReady(players[playerIndex])}
                      disabled={readyPlayers.has(players[playerIndex])}
                      className={`w-full h-32 rounded-lg transition ${
                        readyPlayers.has(players[playerIndex])
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      <div className="text-4xl mb-2">🍻</div>
                      {readyPlayers.has(players[playerIndex])
                        ? "C'est fait !"
                        : "J'ai fini !"}
                    </motion.button>
                  </div>
                ))}
              </div>

              <p className="text-white/80 text-sm mt-4">
                Buvez votre verre et appuyez sur le bouton quand vous avez fini !
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}