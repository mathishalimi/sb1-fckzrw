export interface Challenge {
  id: string;
  text: string;
  type: ChallengeType;
  mode: GameMode;
  intensity: Intensity;
  isPremium?: boolean;
  minPlayers?: number;
  targetPlayer?: string;
  secondaryPlayer?: string;
  points?: number;
  duration?: number;
  category?: ChallengeCategory;
  answer?: string;
  choices?: string[];
  isStartingChallenge?: boolean;
}

export type ChallengeType = 
  | 'action'
  | 'truth'
  | 'dare'
  | 'drink'
  | 'vote'
  | 'chain'
  | 'group'
  | 'versus'
  | 'story'
  | 'rule'
  | 'riddle'
  | 'trivia';

export type Intensity = 'soft' | 'medium' | 'spicy' | 'extreme';

export type ChallengeCategory =
  | 'social'
  | 'funny'
  | 'skills'
  | 'memory'
  | 'physical'
  | 'creative'
  | 'musical'
  | 'trivia'
  | 'romantic'
  | 'dare';

export enum GameMode {
  Classic = 'classic',
  Naughty = 'naughty',
  Riddles = 'riddles',
  Trivia = 'trivia',
  Duel = 'duel'
}

export interface GameSettings {
  intensity: Intensity;
  duration: number;
  includeMiniGames: boolean;
  teamMode: boolean;
  categories: ChallengeCategory[];
  turnDuration: number;
  pointsToWin: number;
  enableTimer: boolean;
  allowVeto: boolean;
  specialRules: string[];
}

export interface GameState {
  activeRules: string[];
  roundNumber: number;
  scores: Record<string, number>;
  history: Challenge[];
}