import { DrinkRoulette, NeverHaveIEver, TruthOrShot, WordChain } from '../components/MiniGames';

export default function MiniGames() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-white mb-6">
          Mini Jeux
        </h1>
        
        <div className="space-y-6">
          <DrinkRoulette />
          <NeverHaveIEver />
          <TruthOrShot />
          <WordChain />
        </div>
      </div>
    </div>
  );
}