import { createContext, useContext, useState, ReactNode } from 'react';

interface Challenge {
  type: string;
  description: string;
  points: number;
}

interface GameContextType {
  challenges: Challenge[];
  score: number;
  handleSwipe: (accepted: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const CHALLENGES: Challenge[] = [
  { type: "Action", description: "Fais 10 pompes ou bois 2 gorgées", points: 5 },
  { type: "Vérité", description: "Raconte ta pire soirée ou bois 3 gorgées", points: 3 },
  { type: "Défi", description: "Imite un animal pendant 30 secondes", points: 4 },
  { type: "Social", description: "Échange de verre avec la personne à ta droite", points: 2 },
  { type: "Action", description: "Danse sur la prochaine chanson", points: 5 },
  // Add more challenges here...
];

export function GameProvider({ children }: { children: ReactNode }) {
  const [score, setScore] = useState(0);
  const [challenges] = useState(CHALLENGES);

  const handleSwipe = (accepted: boolean) => {
    if (accepted) {
      setScore(prev => prev + 5);
    }
  };

  return (
    <GameContext.Provider value={{ challenges, score, handleSwipe }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}