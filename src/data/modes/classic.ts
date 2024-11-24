import { Challenge, GameMode } from '../../types/game';

export const classicChallenges: Challenge[] = [
  // Premier défi: tout le monde boit
  {
    id: 'classic_start',
    text: "Pour commencer la soirée, tout le monde boit 2 gorgées ! 🍻",
    type: 'drink',
    mode: GameMode.Classic,
    intensity: 'medium',
    isStartingChallenge: true
  },
  // Défis de boisson
  {
    id: 'classic_1',
    text: "Bois une gorgée pour chaque année d'études que tu as fait",
    type: 'drink',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_2',
    text: "Donne 2 gorgées à la personne de ton choix",
    type: 'drink',
    mode: GameMode.Classic,
    intensity: 'soft'
  },
  {
    id: 'classic_3',
    text: "Distribue autant de gorgées que tu as de frères et sœurs",
    type: 'drink',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_4',
    text: "Bois une gorgée pour chaque personne qui porte du noir",
    type: 'drink',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_5',
    text: "Les personnes plus grandes que toi boivent 2 gorgées",
    type: 'drink',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  // Défis d'imitation
  {
    id: 'classic_6',
    text: "Imite un animal pendant 30 secondes, les autres doivent deviner",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_7',
    text: "Imite une célébrité, les autres doivent deviner",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_8',
    text: "Parle comme un robot pendant 2 minutes",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_9',
    text: "Imite la démarche de chaque joueur",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_10',
    text: "Mime un film, les autres doivent deviner",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  // Défis de danse
  {
    id: 'classic_11',
    text: "Danse la macarena",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_12',
    text: "Fais une chorégraphie improvisée de 30 secondes",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_13',
    text: "Danse le moonwalk",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_14',
    text: "Fais danser la personne à ta droite",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_15',
    text: "Invente une danse et donne-lui un nom",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  // Défis de chant
  {
    id: 'classic_16',
    text: "Chante l'alphabet en rappant",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_17',
    text: "Chante une chanson en yaourt",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_18',
    text: "Fais deviner une chanson en la sifflant",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_19',
    text: "Chante une chanson Disney",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_20',
    text: "Invente une chanson sur le joueur de ton choix",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  // Défis physiques
  {
    id: 'classic_21',
    text: "Fais 10 pompes ou bois 3 gorgées",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_22',
    text: "Tiens en position de planche pendant 30 secondes ou bois 4 gorgées",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'extreme'
  },
  {
    id: 'classic_23',
    text: "Fais 20 squats ou distribue 5 gorgées",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_24',
    text: "Fais le tour de la pièce en marchant comme un crabe",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  },
  {
    id: 'classic_25',
    text: "Fais 10 sauts de grenouille ou bois 3 gorgées",
    type: 'dare',
    mode: GameMode.Classic,
    intensity: 'medium'
  }
];