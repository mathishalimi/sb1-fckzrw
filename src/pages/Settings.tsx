import { useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { GameMode } from '../types/game';

export default function Settings() {
  const navigate = useNavigate();
  const { settings, updateSettings, setGameMode } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Paramètres</h1>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Mode de Jeu</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(GameMode).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setGameMode(mode)}
                  className="bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary/20 transition"
                >
                  {mode === GameMode.Classic ? 'Classique' :
                   mode === GameMode.Naughty ? 'Coquin' :
                   mode === GameMode.Riddles ? 'Énigmes' :
                   mode === GameMode.Trivia ? 'Culture G' : 'Duel'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Intensité</h3>
            <select
              onChange={(e) => updateSettings({ intensity: e.target.value as any })}
              value={settings.intensity}
              className="w-full p-2 rounded-lg border border-gray-300"
            >
              <option value="soft">Tranquille</option>
              <option value="medium">Modéré</option>
              <option value="spicy">Épicé</option>
              <option value="extreme">Extrême</option>
            </select>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Points pour gagner</h3>
            <input
              type="number"
              min="10"
              max="100"
              value={settings.pointsToWin}
              onChange={(e) => updateSettings({ pointsToWin: parseInt(e.target.value) })}
              className="w-full p-2 rounded-lg border border-gray-300"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={settings.includeMiniGames}
              onChange={(e) => updateSettings({ includeMiniGames: e.target.checked })}
              className="mr-2"
            />
            <label>Inclure les mini-jeux</label>
          </div>

          <button
            onClick={() => navigate('/game')}
            className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition"
          >
            Sauvegarder et Jouer
          </button>
        </div>
      </div>
    </div>
  );
}