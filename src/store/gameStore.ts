import { create } from 'zustand';
import { Challenge, GameMode, GameSettings, GameState } from '../types/game';
import { challenges } from '../data/challenges';
import { triviaChallenges } from '../data/modes/trivia';
import { riddles } from '../data/riddles';

interface StoreState {
  players: string[];
  currentMode: GameMode;
  isPremium: boolean;
  currentPlayer: number;
  currentChallenge: Challenge | null;
  settings: GameSettings;
  gameStarted: boolean;
  isGameOver: boolean;
  isPenaltyPhase: boolean;
  losingPlayer: string | null;
  gameState: GameState;
  roundTimer: number | null;
  roomCode: string | null;
  showMiniGame: boolean;
  currentMiniGame: string | null;
  miniGameIndex: number;
  usedChallenges: Set<string>;
  
  // Actions
  addPlayer: (name: string) => void;
  removePlayer: (name: string) => void;
  setGameMode: (mode: GameMode) => void;
  setPremium: (status: boolean) => void;
  startGame: () => void;
  nextChallenge: () => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  addPoints: (playerId: string, points: number) => void;
  resetGame: () => void;
  endGame: () => void;
  setRoomCode: (code: string | null) => void;
  setShowMiniGame: (show: boolean) => void;
  setCurrentMiniGame: (game: string | null) => void;
  setPenaltyPhase: (phase: boolean) => void;
  setLosingPlayer: (player: string | null) => void;
}

const defaultSettings: GameSettings = {
  intensity: 'medium',
  duration: 30,
  includeMiniGames: true,
  teamMode: false,
  categories: ['social', 'funny', 'skills'],
  turnDuration: 60,
  pointsToWin: 150,
  enableTimer: true,
  allowVeto: true,
  specialRules: []
};

export const useGameStore = create<StoreState>((set, get) => ({
  players: [],
  currentMode: GameMode.Classic,
  isPremium: false,
  currentPlayer: 0,
  currentChallenge: null,
  settings: defaultSettings,
  gameStarted: false,
  isGameOver: false,
  isPenaltyPhase: false,
  losingPlayer: null,
  gameState: {
    activeRules: [],
    roundNumber: 0,
    scores: {},
    history: []
  },
  roundTimer: null,
  roomCode: null,
  showMiniGame: false,
  currentMiniGame: null,
  miniGameIndex: 0,
  usedChallenges: new Set<string>(),

  addPlayer: (name) => {
    set((state) => ({
      players: [...state.players, name],
      gameState: {
        ...state.gameState,
        scores: { ...state.gameState.scores, [name]: 0 }
      }
    }));
  },

  removePlayer: (name) => {
    set((state) => ({
      players: state.players.filter(p => p !== name),
      gameState: {
        ...state.gameState,
        scores: Object.fromEntries(
          Object.entries(state.gameState.scores).filter(([player]) => player !== name)
        )
      }
    }));
  },

  setGameMode: (mode) => set({ currentMode: mode }),
  setPremium: (status) => set({ isPremium: status }),
  setPenaltyPhase: (phase) => set({ isPenaltyPhase: phase }),
  setLosingPlayer: (player) => set({ losingPlayer: player }),

  startGame: () => {
    const state = get();
    let availableChallenges;

    if (state.currentMode === GameMode.Classic) {
      availableChallenges = challenges.filter(c => 
        c.mode === state.currentMode && 
        c.isStartingChallenge === true
      );
    } else if (state.currentMode === GameMode.Trivia) {
      availableChallenges = triviaChallenges.filter(c => 
        (!c.isPremium || state.isPremium) && 
        !state.usedChallenges.has(c.id)
      );
    } else if (state.currentMode === GameMode.Riddles) {
      availableChallenges = riddles.filter(c => 
        (!c.isPremium || state.isPremium) && 
        !state.usedChallenges.has(c.id)
      );
    } else {
      availableChallenges = challenges.filter(c => 
        c.mode === state.currentMode && 
        (!c.isPremium || state.isPremium) && 
        !state.usedChallenges.has(c.id)
      );
    }
    
    if (availableChallenges.length === 0) {
      // Reset used challenges if all have been used
      state.usedChallenges.clear();
      availableChallenges = challenges.filter(c => 
        c.mode === state.currentMode && 
        (!c.isPremium || state.isPremium)
      );
    }

    const randomChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
    state.usedChallenges.add(randomChallenge.id);
    
    set({
      gameStarted: true,
      isGameOver: false,
      currentChallenge: randomChallenge,
      gameState: {
        activeRules: [],
        roundNumber: 1,
        scores: Object.fromEntries(state.players.map(p => [p, 0])),
        history: []
      }
    });
  },

  nextChallenge: () => {
    const state = get();
    const nextPlayer = (state.currentPlayer + 1) % state.players.length;
    let availableChallenges;

    if (state.currentMode === GameMode.Trivia) {
      availableChallenges = triviaChallenges.filter(c => 
        (!c.isPremium || state.isPremium) && 
        !state.usedChallenges.has(c.id)
      );
    } else if (state.currentMode === GameMode.Riddles) {
      availableChallenges = riddles.filter(c => 
        (!c.isPremium || state.isPremium) && 
        !state.usedChallenges.has(c.id)
      );
    } else {
      availableChallenges = challenges.filter(c => 
        c.mode === state.currentMode && 
        (!c.isPremium || state.isPremium) && 
        !state.usedChallenges.has(c.id)
      );
    }
    
    if (availableChallenges.length === 0) {
      // Reset used challenges if all have been used
      state.usedChallenges.clear();
      if (state.currentMode === GameMode.Trivia) {
        availableChallenges = triviaChallenges.filter(c => !c.isPremium || state.isPremium);
      } else if (state.currentMode === GameMode.Riddles) {
        availableChallenges = riddles.filter(c => !c.isPremium || state.isPremium);
      } else {
        availableChallenges = challenges.filter(c => 
          c.mode === state.currentMode && 
          (!c.isPremium || state.isPremium)
        );
      }
    }

    const nextRound = state.gameState.roundNumber + 1;

    // Every 5 rounds, show a mini-game if not in Duel mode
    if (nextRound % 5 === 0 && state.currentMode !== GameMode.Duel) {
      const currentMiniGameIndex = state.miniGameIndex;
      const nextMiniGame = MINIGAME_ROTATION[currentMiniGameIndex];
      
      set({
        showMiniGame: true,
        currentMiniGame: nextMiniGame,
        currentPlayer: nextPlayer,
        miniGameIndex: (currentMiniGameIndex + 1) % MINIGAME_ROTATION.length,
        gameState: {
          ...state.gameState,
          roundNumber: nextRound,
          history: [...state.gameState.history, state.currentChallenge!]
        }
      });
    } else {
      const randomChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)];
      state.usedChallenges.add(randomChallenge.id);
      
      set({
        showMiniGame: false,
        currentMiniGame: null,
        isPenaltyPhase: false,
        losingPlayer: null,
        currentPlayer: nextPlayer,
        currentChallenge: randomChallenge,
        gameState: {
          ...state.gameState,
          roundNumber: nextRound,
          history: [...state.gameState.history, state.currentChallenge!]
        }
      });
    }
  },

  updateSettings: (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }));
  },

  addPoints: (playerId, points) => {
    set((state) => {
      const newScores = {
        ...state.gameState.scores,
        [playerId]: (state.gameState.scores[playerId] || 0) + points
      };
      
      // Check if the player has won
      if (newScores[playerId] >= state.settings.pointsToWin) {
        return {
          gameState: {
            ...state.gameState,
            scores: newScores
          },
          isGameOver: true
        };
      }

      return {
        gameState: {
          ...state.gameState,
          scores: newScores
        }
      };
    });
  },

  resetGame: () => {
    set({
      gameStarted: false,
      isGameOver: false,
      currentPlayer: 0,
      currentChallenge: null,
      isPenaltyPhase: false,
      losingPlayer: null,
      gameState: {
        activeRules: [],
        roundNumber: 0,
        scores: {},
        history: []
      },
      roomCode: null,
      showMiniGame: false,
      currentMiniGame: null,
      miniGameIndex: 0,
      usedChallenges: new Set<string>()
    });
  },

  endGame: () => {
    set({ isGameOver: true });
  },

  setRoomCode: (code) => set({ roomCode: code }),
  setShowMiniGame: (show) => set({ showMiniGame: show }),
  setCurrentMiniGame: (game) => set({ currentMiniGame: game })
}));

const MINIGAME_ROTATION = [
  'roulette',
  'tic-tac-toe',
  'fingerGame',
  'armWrestling',
  'speedDrinking'
] as const;