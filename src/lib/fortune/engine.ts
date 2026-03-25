import type { FortuneInput, FortuneResult } from '@/types/fortune';
import { generateSeed, createRng, pickFromArray, generateScore, scoreToStars } from './seed';
import { getZodiacSign } from './zodiac';
import { getChineseZodiac } from './chinese-zodiac';
import { getTodayKST, parseBirthdate } from '@/lib/utils/date';
import {
  GENERAL_TEXTS, LOVE_TEXTS, MONEY_TEXTS, HEALTH_TEXTS,
  LUCKY_COLORS, LUCKY_DIRECTIONS, LUCKY_FOODS, LUCKY_TIMES,
  DAILY_ADVICE,
} from './templates';

const DEATH_COMMENTS: Record<string, string> = {
  veryLow: '오늘은 불사신 모드. 교통법규는 그래도 지키세요.',
  low:     '무사히 집에 돌아올 확률 99.99%. 퇴근길만 조심하세요.',
  medium:  '약간의 주의가 필요합니다. 계단 조심, 미끄럼 조심.',
  high:    '오늘은 집에만 계세요. 특히 사다리 금지.',
  veryHigh:'오늘따라 운이 좀 박합니다. 유언장을 미리... 농담입니다.',
};

function calcDeathRate(overallScore: number, healthScore: number): { percentage: number; comment: string } {
  const base = 0.002;
  const percentage = parseFloat(
    (base + (100 - overallScore) * 0.0003 + (100 - healthScore) * 0.0002).toFixed(4)
  );

  let comment: string;
  if (percentage < 0.005)      comment = DEATH_COMMENTS.veryLow;
  else if (percentage < 0.010) comment = DEATH_COMMENTS.low;
  else if (percentage < 0.020) comment = DEATH_COMMENTS.medium;
  else if (percentage < 0.035) comment = DEATH_COMMENTS.high;
  else                         comment = DEATH_COMMENTS.veryHigh;

  return { percentage, comment };
}

export function generateFortune(input: FortuneInput): FortuneResult {
  const today = getTodayKST();
  const seed = generateSeed(input.name, input.birthdate, today);
  const rng = createRng(seed);

  const { year, month, day } = parseBirthdate(input.birthdate);
  const zodiac = getZodiacSign(month, day);
  const chineseZodiac = getChineseZodiac(year);

  const overallScore = generateScore(rng);
  const loveScore    = generateScore(rng);
  const moneyScore   = generateScore(rng);
  const healthScore  = generateScore(rng);

  const zodiacTexts = GENERAL_TEXTS[zodiac.key];
  const genderTexts = input.gender === 'male' ? LOVE_TEXTS.male : LOVE_TEXTS.female;

  const luckyColor = pickFromArray(LUCKY_COLORS, rng);

  return {
    date: today,
    name: input.name,
    zodiac,
    chineseZodiac,
    overall: {
      score: overallScore,
      stars: scoreToStars(overallScore),
      text: pickFromArray(zodiacTexts, rng),
      oneLineAdvice: pickFromArray(DAILY_ADVICE, rng),
    },
    love: {
      score: loveScore,
      stars: scoreToStars(loveScore),
      text: pickFromArray(genderTexts, rng),
    },
    money: {
      score: moneyScore,
      stars: scoreToStars(moneyScore),
      text: pickFromArray(MONEY_TEXTS, rng),
    },
    health: {
      score: healthScore,
      stars: scoreToStars(healthScore),
      text: pickFromArray(HEALTH_TEXTS, rng),
    },
    luckyItems: {
      color: luckyColor.name,
      colorHex: luckyColor.hex,
      number: Math.floor(rng() * 99) + 1,
      direction: pickFromArray(LUCKY_DIRECTIONS, rng),
      food: pickFromArray(LUCKY_FOODS, rng),
      time: pickFromArray(LUCKY_TIMES, rng),
    },
    deathRate: calcDeathRate(overallScore, healthScore),
  };
}
