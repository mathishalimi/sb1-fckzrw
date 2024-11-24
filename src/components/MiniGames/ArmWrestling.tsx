import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useGameStore } from '../../store/gameStore';

interface Props {
  onClose: () => void;
  onComplete: (winnerId: string) => void;
}

export default function ArmWrestling({ onClose, onComplete }: Props) {
  const { players } = useGameStore();
  const [player1, setPlayer1] = useState(0);
  const [player2, setPlayer2] = useState(1);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [winner, setWinner] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: number;
    if (countdown > 0 && isPlaying) {
      timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, isPlaying]);

  const handleTap = (playerIndex: number) => {
    if (!isPlaying || countdown > 0 || winner) return;

    const playerId = players[playerIndex];
    setScores(prev => {
      const newScore = (prev[playerId] || 0) + 1;
      if (newScore >= 20) {
        setWinner(playerId);
        onComplete(playerId);
        setIsPlaying(false);
      }
      return { ...prev, [playerId]: newScore };
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="glass-card rounded-xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white/90"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-4">
          Bras de Fer 💪
        </h2>

        {!isPlaying ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <select
                value={player1}
                onChange={(e) => setPlayer1(Number(e.target.value))}
                className="p-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                {players.map((player, i) => (
                  <option key={player} value={i} disabled={i === player2}>
                    {player}
                  </option>
                ))}
              </select>
              <select
                value={player2}
                onChange={(e) => setPlayer2(Number(e.target.value))}
                className="p-2 bg-white/10 border border-white/20 rounded-lg text-white"
              >
                {players.map((player, i) => (
                  <option key={player} value={i} disabled={i === player1}>
                    {player}
                  </option>
                ))}
              </select>
            </div>

            {winner && (
              <div className="text-center py-4">
                <p className="text-xl font-bold text-[var(--primary)]">
                  🏆 {winner} gagne !
                </p>
              </div>
            )}

            <button
              onClick={() => {
                setIsPlaying(true);
                setCountdown(3);
                setScores({});
                setWinner(null);
              }}
              className="w-full bg-[var(--primary)] text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              {winner ? 'Rejouer' : 'Commencer'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {countdown > 0 ? (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={countdown}
                  className="text-6xl font-bold text-[var(--primary)]"
                >
                  {countdown}
                </motion.div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <button
                    onClick={() => handleTap(player1)}
                    className="w-full bg-[var(--primary)] text-white py-8 rounded-lg hover:opacity-90 transition text-xl font-bold"
                  >
                    {players[player1]}
                  </button>
                  <motion.div
                    className="bg-white/10 h-4 rounded-full overflow-hidden"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((scores[players[player1]] || 0) / 20) * 100}%` }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-[var(--primary)] h-full" />
                  </motion.div>
                  <p className="text-center text-sm text-white/80">
                    {scores[players[player1]] || 0} / 20
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => handleTap(player2)}
                    className="w-full bg-[var(--secondary)] text-white py-8 rounded-lg hover:opacity-90 transition text-xl font-bold"
                  >
                    {players[player2]}
                  </button>
                  <motion.div
                    className="bg-white/10 h-4 rounded-full overflow-hidden"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((scores[players[player2]] || 0) / 20) * 100}%` }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="bg-[var(--secondary)] h-full" />
                  </motion.div>
                  <p className="text-center text-sm text-white/80">
                    {scores[players[player2]] || 0} / 20
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}