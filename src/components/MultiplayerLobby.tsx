import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';
import socketService from '../services/socket';
import { useGameStore } from '../store/gameStore';

interface Props {
  onBack: () => void;
}

export default function MultiplayerLobby({ onBack }: Props) {
  const navigate = useNavigate();
  const { addPlayer, players, startGame, setRoomCode, removePlayer } = useGameStore();
  const [roomInput, setRoomInput] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [error, setError] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);

  useEffect(() => {
    socketService.connect();

    socketService.onError((errorMessage) => {
      setError(errorMessage);
    });

    socketService.onRoomCreated((roomCode) => {
      setCurrentRoom(roomCode);
      setRoomInput(roomCode);
      setRoomCode(roomCode); // Set room code in global state
    });

    socketService.onPlayerJoined((updatedPlayers) => {
      players.forEach(player => removePlayer(player));
      updatedPlayers.forEach(player => {
        addPlayer(player.name);
      });
    });

    socketService.onGameStarted(() => {
      startGame();
      navigate('/game');
    });

    socketService.onPlayerLeft((updatedPlayers) => {
      players.forEach(player => removePlayer(player));
      updatedPlayers.forEach(player => {
        addPlayer(player.name);
      });
    });

    return () => {
      socketService.disconnect();
      setRoomCode(null); // Clear room code on unmount
    };
  }, []);

  const createRoom = () => {
    if (!playerName.trim()) {
      setError('Veuillez entrer votre nom');
      return;
    }
    setError('');
    setIsHost(true);
    socketService.createRoom(playerName);
  };

  const joinRoom = () => {
    if (!playerName.trim() || !roomInput.trim()) {
      setError('Veuillez entrer votre nom et le code de la salle');
      return;
    }
    setError('');
    socketService.joinRoom(roomInput.trim(), playerName.trim());
    setCurrentRoom(roomInput);
    setRoomCode(roomInput); // Set room code when joining
  };

  const handleStartGame = () => {
    if (players.length < 2) {
      setError('Il faut au moins 2 joueurs pour commencer');
      return;
    }
    if (currentRoom) {
      socketService.startGame(currentRoom);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full max-w-md"
    >
      <div className="glass-card rounded-xl p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Partie en ligne</h2>
          <button
            onClick={onBack}
            className="text-white/60 hover:text-white/90 transition"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/10 text-red-500 p-4 rounded-lg text-sm font-medium"
          >
            {error}
          </motion.div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-white mb-2">
              Votre nom
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] text-white placeholder-white/50"
              placeholder="Entrez votre nom"
              disabled={currentRoom !== null}
            />
          </div>

          {!currentRoom ? (
            !isJoining ? (
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={createRoom}
                  className="p-4 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition font-medium"
                >
                  Créer une salle
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsJoining(true)}
                  className="p-4 bg-[var(--secondary)] text-white rounded-lg hover:opacity-90 transition font-medium"
                >
                  Rejoindre
                </motion.button>
              </div>
            ) : (
              <div className="space-y-4">
                <input
                  type="text"
                  value={roomInput}
                  onChange={(e) => setRoomInput(e.target.value.toUpperCase())}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:ring-[var(--primary)] focus:border-[var(--primary)] text-white placeholder-white/50"
                  placeholder="Code de la salle"
                />
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={joinRoom}
                    className="p-4 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition font-medium"
                  >
                    Rejoindre
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsJoining(false)}
                    className="p-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition font-medium"
                  >
                    Retour
                  </motion.button>
                </div>
              </div>
            )
          ) : (
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-lg text-center">
                <p className="text-sm text-white/60 mb-2">Code de la salle :</p>
                <p className="text-3xl font-bold text-white tracking-wider">{currentRoom}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Joueurs :</h3>
                {players.map((player) => (
                  <motion.div
                    key={player}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="p-4 glass-card rounded-lg text-white font-medium"
                  >
                    {player} {player === playerName && '(Vous)'}
                  </motion.div>
                ))}
              </div>

              {isHost && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartGame}
                  disabled={players.length < 2}
                  className="w-full p-4 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white rounded-lg hover:opacity-90 transition disabled:opacity-50 font-medium text-lg"
                >
                  {players.length < 2 ? 'En attente de joueurs...' : 'Commencer la partie'}
                </motion.button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}