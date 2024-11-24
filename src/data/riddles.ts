import { Challenge, GameMode } from '../types/game';

export const riddles: Challenge[] = [
  // Existing riddles...
  {
    id: 'riddle_21',
    text: "Je suis toujours devant vous mais vous ne pouvez jamais me voir. Qui suis-je ? (le futur)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  {
    id: 'riddle_22',
    text: "Je suis entre la terre et le ciel, et je commence par la lettre N. Qui suis-je ? (un nuage)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  // Adding more riddles...
  {
    id: 'riddle_23',
    text: "Plus on me prend, plus je deviens grand. Qui suis-je ? (un trou)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  {
    id: 'riddle_24',
    text: "Je n'ai pas de pieds, mais je cours toute la journée. Qui suis-je ? (une horloge)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  {
    id: 'riddle_25',
    text: "Je suis plein de trous mais je retiens l'eau. Qui suis-je ? (une éponge)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  // Continue with more riddles...
  {
    id: 'riddle_100',
    text: "Je suis fait pour marcher mais je ne bouge jamais. Qui suis-je ? (un trottoir)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  }
];