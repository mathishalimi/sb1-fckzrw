import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { GameMode } from '../types/game';
import PremiumModal from './PremiumModal';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface Props {
  onBack: () => void;
  onSelect: () => void;
}

const MODES = [
  { 
    mode: GameMode.Classic, 
    label: 'Classique',
    icon: '🎲',
    description: 'Défis fun et gages délirants'
  },
  { 
    mode: GameMode.Naughty, 
    label: 'Coquin',
    icon: '🌶️',
    description: 'Mode premium - Vérités et gages sensuels'
  },
  { 
    mode: GameMode.Riddles, 
    label: 'Énigmes',
    icon: '🧩',
    description: 'Résous ou bois !'
  },
  { 
    mode: GameMode.Trivia, 
    label: 'Culture G',
    icon: '🎓',
    description: 'Quiz ou shot'
  },
  { 
    mode: GameMode.Duel, 
    label: 'Duel',
    icon: '⚔️',
    description: 'Mini-jeux en face à face'
  }
];

export default function GameModeSelector({ onBack, onSelect }: Props) {
  const { setGameMode, isPremium } = useGameStore();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleModeSelect = (mode: GameMode) => {
    if (mode === GameMode.Naughty && !isPremium) {
      setShowPremiumModal(true);
      return;
    }
    setGameMode(mode);
    onSelect();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white/90 p-2"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-white ml-2">Mode de jeu</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pb-4">
        {MODES.map(({ mode, label, icon, description }) => (
          <motion.button
            key={mode}
            onClick={() => handleModeSelect(mode)}
            className={`w-full p-4 rounded-xl text-left flex items-center space-x-4 glass-card ${
              mode === GameMode.Naughty && !isPremium ? 'opacity-50' : ''
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-3xl">{icon}</span>
            <div>
              <span className="font-bold text-white text-xl block mb-1">{label}</span>
              <p className="text-sm text-white/80">{description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <PremiumModal 
        isOpen={showPremiumModal} 
        onClose={() => setShowPremiumModal(false)} 
      />
    </div>
  );
}