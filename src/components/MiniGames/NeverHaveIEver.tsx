import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';

export default function NeverHaveIEver() {
  const { players, addPoints } = useGameStore();
  const [statement, setStatement] = useState('');
  const [playersWhoHave, setPlayersWhoHave] = useState<string[]>([]);

  const statements = [
    "Je n'ai jamais triché à un examen",
    "Je n'ai jamais menti à mes parents",
    "Je n'ai jamais fait semblant d'être malade pour rater l'école/le travail",
    "Je n'ai jamais voyagé seul(e)",
    "Je n'ai jamais mangé un repas entier au restaurant tout(e) seul(e)",
    "Je n'ai jamais fait de saut en parachute",
    "Je n'ai jamais participé à un karaoké",
    "Je n'ai jamais dormi plus de 14 heures d'affilée",
  ];

  const newStatement = () => {
    setStatement(statements[Math.floor(Math.random() * statements.length)]);
    setPlayersWhoHave([]);
  };

  const togglePlayer = (player: string) => {
    setPlayersWhoHave(prev => {
      if (prev.includes(player)) {
        addPoints(player, -5);
        return prev.filter(p => p !== player);
      } else {
        addPoints(player, 5);
        return [...prev, player];
      }
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Je n'ai jamais...</h3>
      
      {statement ? (
        <>
          <p className="text-lg font-medium mb-4">{statement}</p>
          <div className="space-y-2 mb-4">
            {players.map(player => (
              <button
                key={player}
                onClick={() => togglePlayer(player)}
                className={`w-full p-2 rounded-lg transition ${
                  playersWhoHave.includes(player)
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {player}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-600 mb-4">Cliquez pour commencer</p>
      )}

      <button
        onClick={newStatement}
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
      >
        {statement ? 'Suivant' : 'Commencer'}
      </button>
    </div>
  );
}