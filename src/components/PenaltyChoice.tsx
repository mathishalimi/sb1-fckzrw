import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

const DARES = [
  "Imite un animal pendant 30 secondes",
  "Chante une chanson en yaourt",
  "Fais 5 pompes",
  "Raconte une blague nulle",
  "Danse la macarena",
  "Fais le tour de la pièce en marchant comme un crabe",
  "Parle avec un accent pendant 2 minutes",
  "Fais une grimace et garde-la pendant 30 secondes",
  "Fais semblant d'être une poule",
  "Récite l'alphabet à l'envers"
];

interface Props {
  onComplete: () => void;
  losingPlayer: string;
}

export default function PenaltyChoice({ onComplete, losingPlayer }: Props) {
  const [selectedDare, setSelectedDare] = useState<string | null>(null);
  const { isPenaltyPhase } = useGameStore();

  if (!isPenaltyPhase) return null;

  const handleDrink = () => {
    onComplete();
  };

  const handleDare = () => {
    const randomDare = DARES[Math.floor(Math.random() * DARES.length)];
    setSelectedDare(randomDare);
  };

  const handleDareComplete = () => {
    setSelectedDare(null);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div className="glass-card rounded-xl p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-bold text-white mb-4">
          {losingPlayer}, tu as perdu ! Choisis ta punition :
        </h2>

        {selectedDare ? (
          <div className="space-y-4">
            <div className="p-4 glass-card rounded-lg">
              <p className="text-lg font-medium text-white">
                Ton gage : {selectedDare}
              </p>
            </div>
            <button
              onClick={handleDareComplete}
              className="w-full bg-[var(--primary)] text-white py-3 rounded-lg hover:opacity-90 transition"
            >
              C'est fait !
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleDrink}
              className="p-4 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition"
            >
              <div className="text-2xl mb-2">🍺</div>
              Boire 2 gorgées
            </button>
            <button
              onClick={handleDare}
              className="p-4 bg-[var(--secondary)] text-white rounded-lg hover:opacity-90 transition"
            >
              <div className="text-2xl mb-2">🎲</div>
              Faire un gage
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}