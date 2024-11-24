import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

export default function TriviaGame() {
  const { currentChallenge, addPoints, players, currentPlayer, nextChallenge, gameState } = useGameStore();
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
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
    setSelectedAnswer('');
    setShowPenaltyChoice(false);
    setSelectedPenalty(null);
    setDare('');
  }, [currentChallenge]);

  if (!currentChallenge || !currentChallenge.choices) return null;

  const handleAnswerSelect = (answer: string) => {
    if (showAnswer) return;
    setSelectedAnswer(answer);
    
    const isCorrect = answer === currentChallenge.answer;
    
    if (isCorrect) {
      addPoints(players[currentPlayer], 15);
    } else {
      setShowPenaltyChoice(true);
      addPoints(players[currentPlayer], -5);
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
      const dares = [
        "Imite un animal pendant 30 secondes",
        "Chante une chanson en yaourt",
        "Fais 5 pompes",
        "Raconte une blague nulle",
        "Danse la macarena"
      ];
      setDare(dares[Math.floor(Math.random() * dares.length)]);
    }
  };

  const handleNext = () => {
    nextChallenge();
  };

  return (
    <div className="space-y-6 p-4">
      {/* Score et Joueur */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card rounded-xl p-6 backdrop-blur-[10px] border border-white/20"
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">
              Tour de {players[currentPlayer]}
            </h3>
            <p className="text-white/80">
              Score: {gameState.scores[players[currentPlayer]] || 0} points
            </p>
          </div>
          <div className="text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-transparent bg-clip-text">
            {timeLeft}s
          </div>
        </div>
      </motion.div>

      {/* Question */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="glass-card rounded-xl p-6 backdrop-blur-[10px] border border-white/20"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Culture Générale</h3>
        
        <div className="space-y-6">
          <p className="text-xl text-white/90 mb-8">{currentChallenge.text}</p>
          
          <div className="grid grid-cols-1 gap-4">
            {currentChallenge.choices.map((choice, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswerSelect(choice)}
                disabled={showAnswer}
                className={`p-4 rounded-xl backdrop-blur-sm transition-all duration-300 ${
                  showAnswer
                    ? choice === currentChallenge.answer
                      ? 'bg-[var(--secondary)]/20 border-[var(--secondary)] border text-white'
                      : selectedAnswer === choice
                      ? 'bg-[var(--primary)]/20 border-red-500 border-2 text-white'
                      : 'bg-white/5 border border-white/10 text-white/60'
                    : 'bg-white/10 hover:bg-white/20 border border-white/10 text-white'
                } ${
                  selectedAnswer === choice && !showAnswer ? 'ring-2 ring-[var(--primary)]' : ''
                }`}
              >
                {choice}
              </motion.button>
            ))}
          </div>

          {showAnswer && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="space-y-4"
            >
              <div className="glass-card rounded-xl p-6 backdrop-blur-[10px] border border-white/20">
                <p className="text-lg text-white/90">
                  {selectedAnswer === currentChallenge.answer
                    ? '✨ Bravo ! +15 points'
                    : timeLeft === 0
                    ? '⏰ Temps écoulé ! -10 points'
                    : '❌ Raté ! -5 points'}
                </p>

                {showPenaltyChoice && !selectedPenalty && (
                  <div className="mt-6">
                    <p className="text-white font-medium mb-4">Choisis ta pénalité :</p>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePenaltyChoice('drink')}
                        className="p-4 bg-[var(--primary)]/20 border border-[var(--primary)] rounded-xl text-white hover:bg-[var(--primary)]/30 transition-all duration-300"
                      >
                        Boire 2 gorgées
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePenaltyChoice('dare')}
                        className="p-4 bg-[var(--secondary)]/20 border border-[var(--secondary)] rounded-xl text-white hover:bg-[var(--secondary)]/30 transition-all duration-300"
                      >
                        Faire un gage
                      </motion.button>
                    </div>
                  </div>
                )}

                {selectedPenalty && (
                  <div className="mt-6 p-4 glass-card rounded-xl backdrop-blur-[10px] border border-[var(--primary)]/50">
                    <p className="text-[var(--primary)] font-medium mb-2">Ta pénalité :</p>
                    <p className="text-white text-lg">
                      {selectedPenalty === 'drink' ? "Bois 2 gorgées" : dare}
                    </p>
                  </div>
                )}
              </div>

              {(!showPenaltyChoice || selectedPenalty) && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  className="w-full p-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-xl hover:opacity-90 transition-all duration-300 font-medium"
                >
                  Question suivante
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}