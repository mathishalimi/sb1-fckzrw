import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useGameStore } from './store/gameStore';
import Home from './pages/Home';
import Game from './pages/Game';
import GameOver from './pages/GameOver';
import Settings from './pages/Settings';

export default function App() {
  const { currentMode } = useGameStore();

  return (
    <Router>
      <div className="min-h-screen" data-theme={currentMode.toLowerCase()}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/game-over" element={<GameOver />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}