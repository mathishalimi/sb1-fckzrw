import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumModal({ isOpen, onClose }: PremiumModalProps) {
  const { setPremium } = useGameStore();

  const handlePurchase = () => {
    // Simuler un achat réussi
    setPremium(true);
    onClose();
    alert("Félicitations ! Vous avez débloqué le contenu premium !");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🌟 Passez à la version Premium !
            </h2>

            <div className="space-y-4 mb-6">
              <h3 className="text-xl font-semibold text-primary">
                Contenu exclusif débloqué :
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-2">✨</span>
                  Mode Coquin avec +100 défis sensuels
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🎲</span>
                  +400 défis supplémentaires tous modes confondus
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🎮</span>
                  Mini-jeux exclusifs
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🎨</span>
                  Thèmes et personnalisation avancée
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🔄</span>
                  Mises à jour régulières avec nouveau contenu
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <button
                onClick={handlePurchase}
                className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition transform hover:scale-105"
              >
                Débloquer maintenant pour 4.99€
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 text-gray-600 hover:text-gray-800 transition"
              >
                Plus tard
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}