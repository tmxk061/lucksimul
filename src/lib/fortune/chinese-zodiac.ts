import type { ChineseZodiacInfo, ChineseZodiacKey } from '@/types/fortune';

const CHINESE_ZODIACS: Array<{ key: ChineseZodiacKey; name: string; emoji: string; description: string }> = [
  { key: 'rat',     name: '쥐',    emoji: '🐭', description: '영리하고 기민하며 재물운이 강한 띠' },
  { key: 'ox',      name: '소',    emoji: '🐮', description: '성실하고 근면하며 믿음직한 띠' },
  { key: 'tiger',   name: '호랑이', emoji: '🐯', description: '용감하고 카리스마 넘치는 지도자 띠' },
  { key: 'rabbit',  name: '토끼',  emoji: '🐰', description: '온화하고 예술적 감각이 뛰어난 띠' },
  { key: 'dragon',  name: '용',    emoji: '🐲', description: '강력한 에너지와 행운을 지닌 신성한 띠' },
  { key: 'snake',   name: '뱀',    emoji: '🐍', description: '직관력과 지혜가 뛰어난 신비로운 띠' },
  { key: 'horse',   name: '말',    emoji: '🐴', description: '자유롭고 열정적이며 모험을 사랑하는 띠' },
  { key: 'goat',    name: '양',    emoji: '🐑', description: '창의적이고 온순하며 예술적 재능이 있는 띠' },
  { key: 'monkey',  name: '원숭이', emoji: '🐵', description: '재치 있고 영리하며 적응력이 뛰어난 띠' },
  { key: 'rooster', name: '닭',    emoji: '🐓', description: '근면하고 관찰력이 뛰어나며 자신감 넘치는 띠' },
  { key: 'dog',     name: '개',    emoji: '🐕', description: '충직하고 정직하며 보호 본능이 강한 띠' },
  { key: 'pig',     name: '돼지',  emoji: '🐖', description: '관대하고 성실하며 행복을 추구하는 띠' },
];

export function getChineseZodiac(year: number): ChineseZodiacInfo {
  const index = ((year - 1900) % 12 + 12) % 12;
  return CHINESE_ZODIACS[index];
}
