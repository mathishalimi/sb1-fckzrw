import { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';

export default function WordChain() {
  const { players, addPoints } = useGameStore();
  const [currentWord, setCurrentWord] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [timer, setTimer] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: number | null = null;
    if (isPlaying && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((t) => t - 1);
      }, 1000);
    } else if (timer === 0) {
      handleGameOver();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, timer]);

  const startGame = () => {
    setIsPlaying(true);
    setTimer(10);
    setCurrentWord('');
  };

  const handleWordSubmit = (word: string) => {
    if (!currentWord || word.charAt(0).toLowerCase() === currentWord.charAt(currentWord.length - 1).toLowerCase()) {
      setCurrentWord(word);
      setCurrentPlayer((current) => (current + 1) % players.length);
      setTimer(10);
      addPoints(players[currentPlayer], 5);
    } else {
      handleGameOver();
    }
  };

  const handleGameOver = () => {
    setIsPlaying(false);
    addPoints(players[currentPlayer], -10);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">Chaîne de Mots</h3>
      
      {!isPlaying ? (
        <button
          onClick={startGame}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
        >
          Commencer
        </button>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{timer}s</p>
            <p className="text-lg">Tour de {players[currentPlayer]}</p>
          </div>
          
          {currentWord && (
            <p className="text-center text-xl">
              Mot actuel: <strong>{currentWord}</strong>
            </p>
          )}
          
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.elements.namedItem('word') as HTMLInputElement;
              handleWordSubmit(input.value);
              input.value = '';
            }}
          >
            <input
              type="text"
              name="word"
              className="w-full p-2 border rounded-lg"
              placeholder={currentWord ? `Mot commençant par "${currentWord.charAt(currentWord.length - 1)}"` : "Entrez un mot"}
              autoFocus
            />
          </form>
        </div>
      )}
    </div>
  );
}