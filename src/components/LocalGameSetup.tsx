import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

interface Props {
  onBack: () => void;
}

export default function LocalGameSetup({ onBack }: Props) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="min-h-screen bg-[var(--background)] p-4"
    >
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white/90 p-2"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold text-white ml-2">Configuration</h1>
      </div>

      <div className="flex flex-col space-y-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/modes')}
          className="w-full p-6 glass-card rounded-xl text-left"
        >
          <div className="flex items-center space-x-4">
            <span className="text-3xl">🎮</span>
            <div>
              <span className="font-bold text-white text-xl block mb-1">Partie locale</span>
              <p className="text-sm text-white/80">Jouez ensemble sur le même appareil</p>
            </div>
          </div>
        </motion.button>

        <motion.button
          className="w-full p-6 glass-card rounded-xl text-left opacity-50 cursor-not-allowed"
        >
          <div className="flex items-center space-x-4">
            <span className="text-3xl">🌐</span>
            <div>
              <span className="font-bold text-white text-xl block mb-1">Partie en ligne</span>
              <p className="text-sm text-white/80">Bientôt disponible</p>
            </div>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
}