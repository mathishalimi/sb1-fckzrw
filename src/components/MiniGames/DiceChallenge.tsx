import { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useGameStore } from '../../store/gameStore';
import PenaltyChoice from '../PenaltyChoice';

const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

const DICE_ROTATIONS = [
  { x: 0, y: 0, z: 0 },        // ⚀
  { x: -90, y: 0, z: 0 },      // ⚁
  { x: 0, y: -90, z: 0 },      // ⚂
  { x: 0, y: 90, z: 0 },       // ⚃
  { x: 90, y: 0, z: 0 },       // ⚄
  { x: 180, y: 0, z: 0 }       // ⚅
];

interface Props {
  onClose: () => void;
  onComplete: (winnerId: string) => void;
}

export default function DiceChallenge({ onClose, onComplete }: Props) {
  const { players, setPenaltyPhase, setLosingPlayer, isPenaltyPhase, losingPlayer } = useGameStore();
  const [rolls, setRolls] = useState<Record<string, number>>({});
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showTieMessage, setShowTieMessage] = useState(false);
  const [diceRotation, setDiceRotation] = useState({ x: 0, y: 0, z: 0 });
  const [showFinalResult, setShowFinalResult] = useState(false);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    
    const rollInterval = setInterval(() => {
      setDiceRotation({
        x: Math.random() * 360,
        y: Math.random() * 360,
        z: Math.random() * 360
      });
    }, 50);

    setTimeout(() => {
      clearInterval(rollInterval);
      const result = Math.floor(Math.random() * 6);
      
      setDiceRotation(DICE_ROTATIONS[result]);
      
      setRolls(prev => ({
        ...prev,
        [players[currentPlayer]]: result
      }));
      
      setTimeout(() => {
        if (currentPlayer < players.length - 1) {
          setCurrentPlayer(prev => prev + 1);
        } else {
          setShowResult(true);
          // Attendre 2 secondes avant d'afficher le résultat final
          setTimeout(() => {
            setShowFinalResult(true);
            const scores = { ...rolls, [players[currentPlayer]]: result };
            const maxScore = Math.max(...Object.values(scores));
            const winners = Object.entries(scores).filter(([_, score]) => score === maxScore);
            
            if (winners.length > 1) {
              // En cas d'égalité
              setShowTieMessage(true);
              setTimeout(() => {
                onClose();
              }, 3000);
            } else {
              const losingPlayer = players.find(p => p !== winners[0][0])!;
              setLosingPlayer(losingPlayer);
              setPenaltyPhase(true);
              onComplete(winners[0][0]);
            }
          }, 2000);
        }
        setIsRolling(false);
      }, 500);
    }, 1000);
  };

  const handlePenaltyComplete = () => {
    setPenaltyPhase(false);
    setLosingPlayer(null);
    onClose();
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

            <div className="relative h-32 w-32 mx-auto perspective-1000">
              <motion.div
                animate={{
                  rotateX: diceRotation.x,
                  rotateY: diceRotation.y,
                  rotateZ: diceRotation.z,
                }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 20
                }}
                className="relative w-full h-full preserve-3d"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-8xl">
                  {rolls[players[currentPlayer]] !== undefined 
                    ? DICE_FACES[rolls[players[currentPlayer]]] 
                    : '🎲'}
                </div>
              </motion.div>
            </div>

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
                  <p className="text-2xl mt-2">{DICE_FACES[value]}</p>
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
              {showFinalResult ? (
                <p className="text-xl font-bold text-white mb-2">
                  {showTieMessage ? "Égalité ! Tout le monde boit une gorgée ! 🍻" : "Résultats finaux"}
                </p>
              ) : (
                <p className="text-xl font-bold text-white mb-2">
                  Voyons voir qui a gagné...
                </p>
              )}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(rolls).map(([player, value]) => (
                  <div key={player} className="glass-card p-4 rounded-lg">
                    <p className="text-white font-medium">{player}</p>
                    <p className="text-2xl mt-2">{DICE_FACES[value]}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {isPenaltyPhase && losingPlayer && (
        <PenaltyChoice 
          onComplete={handlePenaltyComplete}
          losingPlayer={losingPlayer}
        />
      )}
    </div>
  );
}