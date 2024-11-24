import { Challenge, GameMode } from '../../types/game';

export const riddleChallenges: Challenge[] = [
  // Énigmes existantes 1-30...
  {
    id: 'riddle_31',
    text: "Je suis ce que je suis, mais je ne suis pas ce que je suis. Si j'étais ce que je suis, je ne serais pas ce que je suis. Qui suis-je ? (une ombre)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  {
    id: 'riddle_32',
    text: "Je commence la nuit et je termine le matin. Qui suis-je ? (la lettre N)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  {
    id: 'riddle_33',
    text: "Je suis entre le soleil et la terre, mais je ne fais pas d'ombre. Qui suis-je ? (l'air)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  {
    id: 'riddle_34',
    text: "Plus je suis présent, moins je suis visible. Qui suis-je ? (l'obscurité)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  {
    id: 'riddle_35',
    text: "Je suis né grand et je meurs petit. Qui suis-je ? (un crayon)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  {
    id: 'riddle_36',
    text: "Je peux être lu mais je ne suis pas un livre, je peux parler mais je n'ai pas de bouche. Qui suis-je ? (une lettre)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  {
    id: 'riddle_37',
    text: "Je suis toujours en retard mais je ne bouge jamais. Qui suis-je ? (une montre arrêtée)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  {
    id: 'riddle_38',
    text: "Je suis fait de verre mais je ne suis pas fragile, je grossis tout mais je ne mange rien. Qui suis-je ? (une loupe)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  {
    id: 'riddle_39',
    text: "Je suis plein de dents mais je ne peux pas mordre. Qui suis-je ? (un peigne)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  {
    id: 'riddle_40',
    text: "Je suis noir quand tu m'achètes, rouge quand tu m'utilises, et gris quand tu me jettes. Qui suis-je ? (le charbon)",
    type: 'riddle',
    mode: GameMode.Riddles,
    intensity: 'medium'
  },
  // ... Continuer jusqu'à 100 énigmes
];