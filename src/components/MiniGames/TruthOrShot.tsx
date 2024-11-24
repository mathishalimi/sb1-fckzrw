import { useState } from 'react';
import { useGameStore } from '../../store/gameStore';

export default function TruthOrShot() {
  const { players, addPoints } = useGameStore();
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [question, setQuestion] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);

  const questions = [
    "Quel est ton plus grand regret ?",
    "Quelle est la chose la plus folle que tu aies faite ?",
    "Quel est ton plus grand secret ?",
    "Quelle est ta plus grande peur ?",
    "Quel est ton plus grand rêve ?",
  ];

  const handleChoice = (choice: 'truth' | 'shot') => {
    if (choice === 'truth') {
      setQuestion(questions[Math.floor(Math.random() * questions.length)]);
      setIsAnswering(true);
    } else {
      addPoints(players[currentPlayer], -5);
      nextPlayer();
    }
  };

  const handleAnswer = () => {
    addPoints(players[currentPlayer], 10);
    nextPlayer();
  };

  const nextPlayer = () => {
    setCurrentPlayer((current) => (current + 1) % players.length);
    setIsAnswering(false);
    setQuestion('');
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Vérité ou Shot</h3>
      
      <div className="text-center mb-4">
        <p className="text-lg">Tour de {players[currentPlayer]}</p>
      </div>

      {!isAnswering ? (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleChoice('truth')}
            className="bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Vérité (+10 pts)
          </button>
          <button
            onClick={() => handleChoice('shot')}
            className="bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 transition"
          >
            Shot (-5 pts)
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg font-medium">{question}</p>
          <button
            onClick={handleAnswer}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
          >
            J'ai répondu
          </button>
        </div>
      )}
    </div>
  );
}