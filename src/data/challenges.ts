import { Challenge } from '../types/game';
import { classicChallenges } from './modes/classic';
import { naughtyChallenges } from './modes/naughty';
import { riddleChallenges } from './modes/riddles';
import { triviaChallenges } from './modes/trivia';
import { duelChallenges } from './modes/duel';

export const challenges: Challenge[] = [
  ...classicChallenges,
  ...naughtyChallenges,
  ...riddleChallenges,
  ...triviaChallenges,
  ...duelChallenges
];