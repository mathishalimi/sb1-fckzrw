import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';

export default function DrinkRoulette() {
  const { players } = useGameStore();
  const [spinning, setSpinning] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);

  const spin = () => {
    setSpinning(true);
    setTimeout(() => {
      const randomPlayer = players[Math.floor(Math.random() * players.length)];
      setSelectedPlayer(randomPlayer);
      setSpinning(false);
    }, 2000);
  };

  return (
    <div className="text-center">
      <h3 className="text-xl font-bold mb-4">Roulette du Shot</h3>
      <div className={`mb-4 ${spinning ? 'animate-spin' : ''}`}>
        🎲
      </div>
      {selectedPlayer && !spinning && (
        <p className="text-lg font-medium">
          {selectedPlayer} doit boire !
        </p>
      )}
      <button
        onClick={spin}
        disabled={spinning}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {spinning ? 'Ça tourne...' : 'Tourner'}
      </button>
    </div>
  );
}