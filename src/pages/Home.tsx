import { useState } from 'react';
import { motion } from 'framer-motion';
import GameModeSelector from '../components/GameModeSelector';
import PlayerSetup from '../components/PlayerSetup';

export default function Home() {
  const [showModeSelector, setShowModeSelector] = useState(false);
  const [showPlayerSetup, setShowPlayerSetup] = useState(false);

  const handleModeSelect = () => {
    setShowModeSelector(false);
    setShowPlayerSetup(true);
  };

  return (
    <div className="fixed inset-0 bg-[var(--background)] flex items-center justify-center">
      <div className="w-full h-full max-w-md p-4 flex flex-col">
        {showPlayerSetup ? (
          <PlayerSetup onBack={() => {
            setShowPlayerSetup(false);
            setShowModeSelector(true);
          }} />
        ) : showModeSelector ? (
          <GameModeSelector onBack={() => setShowModeSelector(false)} onSelect={handleModeSelect} />
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 flex flex-col justify-center space-y-8"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-center space-y-4"
            >
              <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-transparent bg-clip-text logo-animate">
                Hedonia
              </h1>
              <p className="text-xl text-white/80">Le jeu à boire ultime</p>
            </motion.div>

            <div className="glass-card rounded-xl p-8 space-y-8">
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowModeSelector(true)}
                  className="w-full p-6 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl text-left hover:opacity-90 transition"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">🎮</span>
                    <div>
                      <span className="text-xl font-bold text-white block">Partie locale</span>
                      <span className="text-sm text-white/80">Jouez ensemble sur le même appareil</span>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  className="w-full p-6 glass-card text-left rounded-xl opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">🌐</span>
                    <div>
                      <span className="text-xl font-bold text-white block">Partie en ligne</span>
                      <span className="text-sm text-white/80">Bientôt disponible</span>
                    </div>
                  </div>
                </motion.button>
              </div>

              <div className="text-center">
                <p className="text-sm text-white/60">
                  Version 1.0.0 • Fait avec ❤️ par Mathis
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}