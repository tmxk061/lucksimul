// djb2 hash algorithm
function djb2Hash(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Linear Congruential Generator
function lcg(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0x100000000;
  };
}

export function generateSeed(name: string, birthdate: string, today: string): number {
  return djb2Hash(`${name}-${birthdate}-${today}`);
}

export function createRng(seed: number): () => number {
  return lcg(seed);
}

export function pickFromArray<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

// score between 40 and 95
export function generateScore(rng: () => number): number {
  return Math.floor(rng() * 56) + 40;
}

export function scoreToStars(score: number): number {
  return Math.round(score / 20);
}
