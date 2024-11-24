import { GameMode } from '../../types/game';

const classicDares = [
  "Fais 10 pompes",
  "Imite un animal pendant 30 secondes",
  "Raconte une blague nulle",
  "Fais le tour de la pièce en dansant",
  "Chante une chanson",
  "Fais un compliment à chaque joueur",
  "Fais une grimace et garde-la pendant 30 secondes",
  "Raconte ton pire souvenir d'enfance"
];

const naughtyDares = [
  "Fais un slow avec le joueur de ton choix",
  "Donne un massage de 30 secondes",
  "Fais un compliment séduisant",
  "Susurre quelque chose à l'oreille d'un autre joueur",
  "Imite une pub de parfum de manière sensuelle",
  "Raconte ton rêve le plus romantique",
  "Fais deviner un film romantique en mime",
  "Cite trois qualités séduisantes chez un autre joueur"
];

const riddleDares = [
  "Résous cette énigme ou bois : Je suis grand quand je suis jeune et petit quand je suis vieux. Que suis-je ?",
  "Résous ou bois : Plus j'ai de gardiens, moins je suis en sécurité. Qui suis-je ?",
  "Devine ou bois : Je cours mais je n'ai pas de jambes. Qui suis-je ?",
  "Résous cette énigme : Je parle toutes les langues mais n'en connais aucune. Qui suis-je ?",
  "Trouve la réponse : Plus je sèche, plus je suis mouillée. Que suis-je ?",
  "Résous ou bois : Je grandis en descendant. Qui suis-je ?",
  "Devine ou shot : On me prend pour un repas, je ne mange jamais. Qui suis-je ?",
  "Résous cette énigme : J'ai des villes, mais pas de maisons. J'ai des montagnes, mais pas d'arbres. J'ai de l'eau, mais pas de poissons. J'ai des routes, mais pas de voitures. Que suis-je ?"
];

const triviaDares = [
  "Cite 3 capitales européennes en 10 secondes ou bois",
  "Nomme 5 éléments du tableau périodique ou fais un gage",
  "Cite 3 œuvres de Victor Hugo ou bois",
  "Nomme les planètes du système solaire ou fais un gage",
  "Cite 4 fleuves français ou bois",
  "Nomme 3 présidents américains ou fais un gage",
  "Cite 5 pays d'Afrique ou bois",
  "Nomme 3 prix Nobel de la paix ou fais un gage"
];

export const getDaresByMode = (mode: GameMode): string[] => {
  switch (mode) {
    case GameMode.Classic:
      return classicDares;
    case GameMode.Naughty:
      return naughtyDares;
    case GameMode.Riddles:
      return riddleDares;
    case GameMode.Trivia:
      return triviaDares;
    default:
      return classicDares;
  }
};