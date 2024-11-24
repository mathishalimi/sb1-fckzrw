import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useGameStore } from '../../store/gameStore';

interface Props {
  onClose: () => void;
  onComplete: (winnerId: string) => void;
}

const CHOICES = [
  { symbol: '✊', label: 'Pierre' },
  { symbol: '✋', label: 'Feuille' },
  { symbol: '✌️', label: 'Ciseaux' }
];

const WINNING_SCORE = 2;

export default function RockPaperScissors({ onClose, onComplete }: Props) {
  const { players } = useGameStore();
  const playerIndices = { player1: 0, player2: 1 };
  const [scores, setScores] = useState<Record<string, number>>({ [players[0]]: 0, [players[1]]: 0 });
  const [countdown, setCountdown] = useState(3);
  const [currentRound, setCurrentRound] = useState(1);
  const [choices, setChoices] = useState<Record<string, number | null>>({
    [players[0]]: null,
    [players[1]]: null
  });
  const [showResult, setShowResult] = useState(false);
  const [showTieMessage, setShowTieMessage] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const determineWinner = (choice1: number, choice2: number) => {
    if (choice1 === choice2) return null;
    if (
      (choice1 === 0 && choice2 === 2) || // Pierre bat Ciseaux
      (choice1 === 1 && choice2 === 0) || // Feuille bat Pierre
      (choice1 === 2 && choice2 === 1)    // Ciseaux bat Feuille
    ) {
      return players[playerIndices.player1];
    }
    return players[playerIndices.player2];
  };

  const handleChoice = (playerIndex: number, choice: number) => {
    const playerId = players[playerIndex];
    setChoices(prev => ({ ...prev, [playerId]: choice }));

    const otherPlayerId = players[playerIndex === 0 ? 1 : 0];
    if (choices[otherPlayerId] !== null) {
      const winner = determineWinner(choice, choices[otherPlayerId]!);
      
      if (winner === null) {
        // Égalité
        setShowTieMessage(true);
        setTimeout(() => {
          setShowTieMessage(false);
          setChoices({ [players[0]]: null, [players[1]]: null });
          setShowResult(false);
          setCountdown(3);
        }, 2000);
      } else {
        setScores(prev => ({
          ...prev,
          [winner]: prev[winner] + 1
        }));
      }

      setTimeout(() => {
        setShowResult(true);
        if (scores[players[0]] === WINNING_SCORE - 1 || scores[players[1]] === WINNING_SCORE - 1) {
          const finalWinner = scores[players[0]] === WINNING_SCORE - 1 ? players[0] : players[1];
          onComplete(finalWinner);
        } else {
          setTimeout(() => {
            setCurrentRound(r => r + 1);
            setChoices({ [players[0]]: null, [players[1]]: null });
            setShowResult(false);
            setCountdown(3);
          }, 2000);
        }
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
          Pierre Feuille Ciseaux ✌️
        </h2>

        <div className="space-y-6">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center">
              <p className="text-lg font-bold text-white">{players[playerIndices.player1]}</p>
              <p className="text-3xl">{scores[players[playerIndices.player1]]}</p>
            </div>
            <div className="text-2xl font-bold">VS</div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">{players[playerIndices.player2]}</p>
              <p className="text-3xl">{scores[players[playerIndices.player2]]}</p>
            </div>
          </div>

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
            <div className="grid grid-cols-2 gap-8">
              {[playerIndices.player1, playerIndices.player2].map((playerIndex) => (
                <div key={playerIndex} className="space-y-4">
                  <p className="text-lg font-bold text-white">
                    {players[playerIndex]}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {CHOICES.map((choice, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleChoice(playerIndex, index)}
                        disabled={choices[players[playerIndex]] !== null}
                        className={`h-16 flex items-center justify-center text-2xl ${
                          choices[players[playerIndex]] === index
                            ? 'bg-[var(--primary)] text-white'
                            : 'bg-white/10 hover:bg-white/20'
                        } rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed`}
                        title={choice.label}
                      >
                        {choice.symbol}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              {showTieMessage ? (
                <p className="text-xl font-bold text-white">
                  Égalité ! Tout le monde boit une gorgée ! 🍻
                </p>
              ) : (
                <p className="text-xl font-bold text-white">
                  {determineWinner(choices[players[playerIndices.player1]]!, choices[players[playerIndices.player2]]!)
                    ? `${determineWinner(choices[players[playerIndices.player1]]!, choices[players[playerIndices.player2]]!)} gagne la manche !`
                    : "Égalité !"}
                </p>
              )}
              <p className="text-lg text-white/80 mt-2">
                Round {currentRound}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}