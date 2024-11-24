import { Challenge, GameMode } from '../../types/game';

export const duelChallenges: Challenge[] = [
  // 100 défis en duel
  {
    id: 'duel_1',
    text: "Bras de fer avec le joueur de ton choix",
    type: 'versus',
    mode: GameMode.Duel,
    intensity: 'medium'
  },
  {
    id: 'duel_2',
    text: "Pierre-feuille-ciseaux en 3 manches",
    type: 'versus',
    mode: GameMode.Duel,
    intensity: 'medium'
  },
  // ... 98 autres défis en duel
];