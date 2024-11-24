import { useState, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { motion } from 'framer-motion';

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

export default function RiddleGame() {
  const { currentChallenge, addPoints, players, currentPlayer, nextChallenge, gameState } = useGameStore();
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [showPenaltyChoice, setShowPenaltyChoice] = useState(false);
  const [selectedPenalty, setSelectedPenalty] = useState<'drink' | 'dare' | null>(null);
  const [dare, setDare] = useState<string>('');

  useEffect(() => {
    if (!showAnswer && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showAnswer) {
      handleTimeout();
    }
  }, [timeLeft, showAnswer]);

  useEffect(() => {
    setTimeLeft(30);
    setShowAnswer(false);
    setUserAnswer('');
    setShowPenaltyChoice(false);
    setSelectedPenalty(null);
    setDare('');
  }, [currentChallenge]);

  if (!currentChallenge) return null;

  const question = currentChallenge.text.split('(')[0].trim();
  const answer = currentChallenge.text.split('(')[1]?.replace(')', '').trim().toLowerCase() || '';

  const checkAnswer = (userAttempt: string): boolean => {
    const normalizedUserAnswer = userAttempt.toLowerCase().trim();
    const normalizedCorrectAnswer = answer.toLowerCase().trim();

    // Vérification exacte
    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      return true;
    }

    // Vérification des mots-clés
    const userWords = normalizedUserAnswer.split(/\s+/);
    const answerWords = normalizedCorrectAnswer.split(/\s+/);

    // Si la réponse contient au moins 50% des mots-clés
    const matchingWords = userWords.filter(word => 
      answerWords.some(answerWord => 
        // Vérifie si le mot est identique ou très proche
        answerWord === word || 
        (word.length > 3 && answerWord.includes(word)) ||
        (answerWord.length > 3 && word.includes(answerWord))
      )
    );

    return matchingWords.length >= Math.ceil(answerWords.length / 2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = checkAnswer(userAnswer);
    
    if (!isCorrect) {
      setShowPenaltyChoice(true);
      addPoints(players[currentPlayer], -5);
    } else {
      addPoints(players[currentPlayer], 15);
    }
    
    setShowAnswer(true);
  };

  const handleTimeout = () => {
    setShowPenaltyChoice(true);
    addPoints(players[currentPlayer], -10);
    setShowAnswer(true);
  };

  const handlePenaltyChoice = (choice: 'drink' | 'dare') => {
    setSelectedPenalty(choice);
    if (choice === 'dare') {
      setDare(DARES[Math.floor(Math.random() * DARES.length)]);
    }
  };

  const handleNext = () => {
    nextChallenge();
  };

  return (
    <div className="space-y-6">
      {/* Score et Joueur */}
      <div className="bg-white/90 rounded-lg p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-800">
              Tour de {players[currentPlayer]}
            </h3>
            <p className="text-gray-600">
              Score: {gameState.scores[players[currentPlayer]] || 0} points
            </p>
          </div>
          <div className="text-2xl font-bold text-primary">
            {timeLeft}s
          </div>
        </div>
      </div>

      {/* Énigme */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-6 shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Énigme</h3>
        
        <div className="space-y-4">
          <p className="text-lg text-gray-700">{question}</p>
          
          {!showAnswer ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Votre réponse..."
                className="w-full p-2 border rounded-lg focus:border-primary focus:ring-primary text-gray-800"
                autoFocus
              />
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
              >
                Valider
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <p className="text-lg font-medium text-gray-800">
                  Réponse : <span className="text-primary">{answer}</span>
                </p>
                <p className="text-gray-600 mt-2">
                  {checkAnswer(userAnswer)
                    ? '✅ Bravo ! +15 points'
                    : timeLeft === 0
                    ? '⏰ Temps écoulé ! -10 points'
                    : '❌ Raté ! -5 points'}
                </p>

                {showPenaltyChoice && !selectedPenalty && (
                  <div className="mt-4">
                    <p className="text-gray-800 font-medium mb-2">Choisis ta pénalité :</p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handlePenaltyChoice('drink')}
                        className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition"
                      >
                        Boire 2 gorgées
                      </button>
                      <button
                        onClick={() => handlePenaltyChoice('dare')}
                        className="bg-secondary text-white p-2 rounded-lg hover:bg-secondary/90 transition"
                      >
                        Faire un gage
                      </button>
                    </div>
                  </div>
                )}

                {selectedPenalty && (
                  <div className="mt-4 p-4 bg-red-100 rounded-lg">
                    <p className="text-red-600 font-medium">Ta pénalité :</p>
                    <p className="text-red-500">
                      {selectedPenalty === 'drink' ? "Bois 2 gorgées" : dare}
                    </p>
                  </div>
                )}
              </div>

              {(!showPenaltyChoice || selectedPenalty) && (
                <button
                  onClick={handleNext}
                  className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-secondary/90 transition"
                >
                  Énigme suivante
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}