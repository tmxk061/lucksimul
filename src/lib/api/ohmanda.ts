import type { ZodiacKey } from '@/types/fortune';

export async function fetchOhmandaHoroscope(zodiacKey: ZodiacKey): Promise<string | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(`https://ohmanda.com/api/horoscope/${zodiacKey}/`, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.horoscope ?? null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
