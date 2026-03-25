import type { ZodiacKey, ZodiacSign } from '@/types/fortune';

interface ZodiacBoundary {
  key: ZodiacKey;
  startMonth: number;
  startDay: number;
}

const ZODIAC_BOUNDARIES: ZodiacBoundary[] = [
  { key: 'capricorn',   startMonth: 12, startDay: 22 },
  { key: 'aquarius',    startMonth: 1,  startDay: 20 },
  { key: 'pisces',      startMonth: 2,  startDay: 19 },
  { key: 'aries',       startMonth: 3,  startDay: 21 },
  { key: 'taurus',      startMonth: 4,  startDay: 20 },
  { key: 'gemini',      startMonth: 5,  startDay: 21 },
  { key: 'cancer',      startMonth: 6,  startDay: 22 },
  { key: 'leo',         startMonth: 7,  startDay: 23 },
  { key: 'virgo',       startMonth: 8,  startDay: 23 },
  { key: 'libra',       startMonth: 9,  startDay: 23 },
  { key: 'scorpio',     startMonth: 10, startDay: 24 },
  { key: 'sagittarius', startMonth: 11, startDay: 23 },
];

export const ZODIAC_DATA: Record<ZodiacKey, Omit<ZodiacSign, 'key'>> = {
  aries:       { name: '양자리',    symbol: '♈', element: '불',  description: '용감하고 활기찬 개척자',      themeColor: '#ff6b6b' },
  taurus:      { name: '황소자리',  symbol: '♉', element: '흙',  description: '안정과 풍요를 추구하는 현실주의자', themeColor: '#a8e063' },
  gemini:      { name: '쌍둥이자리',symbol: '♊', element: '바람', description: '지적이고 호기심 넘치는 소통가',   themeColor: '#f7971e' },
  cancer:      { name: '게자리',    symbol: '♋', element: '물',  description: '감성적이고 직관력이 뛰어난 수호자', themeColor: '#56ccf2' },
  leo:         { name: '사자자리',  symbol: '♌', element: '불',  description: '당당하고 카리스마 넘치는 리더',   themeColor: '#f9ca24' },
  virgo:       { name: '처녀자리',  symbol: '♍', element: '흙',  description: '분석적이고 완벽을 추구하는 지성인', themeColor: '#6ab04c' },
  libra:       { name: '천칭자리',  symbol: '♎', element: '바람', description: '균형과 조화를 사랑하는 외교관',   themeColor: '#e056fd' },
  scorpio:     { name: '전갈자리',  symbol: '♏', element: '물',  description: '강렬하고 신비로운 변화의 주체',   themeColor: '#8854d0' },
  sagittarius: { name: '궁수자리',  symbol: '♐', element: '불',  description: '자유롭고 낙관적인 철학자',       themeColor: '#fd9644' },
  capricorn:   { name: '염소자리',  symbol: '♑', element: '흙',  description: '성실하고 야망 있는 실력자',      themeColor: '#20bf6b' },
  aquarius:    { name: '물병자리',  symbol: '♒', element: '바람', description: '독창적이고 인류애 넘치는 혁신가', themeColor: '#45aaf2' },
  pisces:      { name: '물고기자리',symbol: '♓', element: '물',  description: '감수성 풍부하고 예술적인 몽상가', themeColor: '#a29bfe' },
};

export function getZodiacSign(month: number, day: number): ZodiacSign {
  let key: ZodiacKey = 'capricorn';

  for (let i = 1; i < ZODIAC_BOUNDARIES.length; i++) {
    const b = ZODIAC_BOUNDARIES[i];
    if (month === b.startMonth && day >= b.startDay) {
      key = b.key;
      break;
    }
    if (month === b.startMonth - 1 || (b.startMonth === 1 && month === 12)) {
      // still previous sign
    }
  }

  // simpler approach: check month then day
  if (month === 1)  key = day >= 20 ? 'aquarius'    : 'capricorn';
  else if (month === 2)  key = day >= 19 ? 'pisces'      : 'aquarius';
  else if (month === 3)  key = day >= 21 ? 'aries'       : 'pisces';
  else if (month === 4)  key = day >= 20 ? 'taurus'      : 'aries';
  else if (month === 5)  key = day >= 21 ? 'gemini'      : 'taurus';
  else if (month === 6)  key = day >= 22 ? 'cancer'      : 'gemini';
  else if (month === 7)  key = day >= 23 ? 'leo'         : 'cancer';
  else if (month === 8)  key = day >= 23 ? 'virgo'       : 'leo';
  else if (month === 9)  key = day >= 23 ? 'libra'       : 'virgo';
  else if (month === 10) key = day >= 24 ? 'scorpio'     : 'libra';
  else if (month === 11) key = day >= 23 ? 'sagittarius' : 'scorpio';
  else if (month === 12) key = day >= 22 ? 'capricorn'   : 'sagittarius';

  return { key, ...ZODIAC_DATA[key] };
}
