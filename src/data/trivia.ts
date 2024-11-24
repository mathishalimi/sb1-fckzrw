import { Challenge, GameMode } from '../types/game';

export const triviaQuestions: Challenge[] = [
  // Existing questions...
  {
    id: 'trivia_51',
    text: "Quelle est la plus grande île du monde ?",
    answer: "Groenland",
    choices: ["Madagascar", "Groenland", "Nouvelle-Guinée", "Bornéo"],
    type: 'trivia',
    mode: GameMode.Trivia,
    intensity: 'medium'
  },
  {
    id: 'trivia_52',
    text: "Quel est l'élément chimique le plus abondant dans l'univers ?",
    answer: "Hydrogène",
    choices: ["Hélium", "Hydrogène", "Oxygène", "Carbone"],
    type: 'trivia',
    mode: GameMode.Trivia,
    intensity: 'medium'
  },
  // Add more trivia questions...
  {
    id: 'trivia_150',
    text: "Quelle est la capitale de l'Argentine ?",
    answer: "Buenos Aires",
    choices: ["Santiago", "Lima", "Buenos Aires", "Montevideo"],
    type: 'trivia',
    mode: GameMode.Trivia,
    intensity: 'medium'
  }
];