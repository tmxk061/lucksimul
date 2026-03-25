export type ZodiacKey =
  | 'aries' | 'taurus' | 'gemini' | 'cancer' | 'leo' | 'virgo'
  | 'libra' | 'scorpio' | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces';

export type ChineseZodiacKey =
  | 'rat' | 'ox' | 'tiger' | 'rabbit' | 'dragon' | 'snake'
  | 'horse' | 'goat' | 'monkey' | 'rooster' | 'dog' | 'pig';

export interface ZodiacSign {
  key: ZodiacKey;
  name: string;
  symbol: string;
  element: string;
  description: string;
  themeColor: string;
}

export interface ChineseZodiacInfo {
  key: ChineseZodiacKey;
  name: string;
  emoji: string;
  description: string;
}

export interface FortuneCategory {
  score: number;
  stars: number;
  text: string;
}

export interface LuckyItems {
  color: string;
  colorHex: string;
  number: number;
  direction: string;
  food: string;
  time: string;
}

export interface DeathRate {
  percentage: number;
  comment: string;
}

export interface FortuneResult {
  date: string;
  name: string;
  zodiac: ZodiacSign;
  chineseZodiac: ChineseZodiacInfo;
  overall: FortuneCategory & { oneLineAdvice: string };
  love: FortuneCategory;
  money: FortuneCategory;
  health: FortuneCategory;
  luckyItems: LuckyItems;
  deathRate: DeathRate;
}

export interface FortuneInput {
  name: string;
  birthdate: string;
  gender: 'male' | 'female';
}
