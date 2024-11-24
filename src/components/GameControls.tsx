import { useGameStore } from '../store/gameStore';

export default function GameControls() {
  const { nextChallenge, currentChallenge, players, currentPlayer } = useGameStore();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-lg font-medium">
          Tour de : {players[currentPlayer]}
        </span>
        <button
          onClick={nextChallenge}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Prochain Défi
        </button>
      </div>
      
      {currentChallenge && (
        <div className="bg-indigo-50 p-4 rounded-lg">
          <p className="text-xl font-medium text-indigo-900">
            {currentChallenge.text}
          </p>
          {currentChallenge.targetPlayer && (
            <p className="text-sm text-indigo-600 mt-2">
              Pour : {currentChallenge.targetPlayer}
            </p>
          )}
        </div>
      )}
    </div>
  );
}