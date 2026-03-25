'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StarCanvas from '@/components/StarCanvas';
import FortuneResultCard from '@/components/result/FortuneResultCard';
import SaveImageButton from '@/components/result/SaveImageButton';
import type { FortuneResult } from '@/types/fortune';

export default function ResultPage() {
  const router = useRouter();
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('fortune-result');
    if (!stored) {
      router.replace('/');
      return;
    }
    try {
      setFortune(JSON.parse(stored));
    } catch {
      router.replace('/');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading || !fortune) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <StarCanvas />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <span className="star-spin text-4xl text-purple-400/60">✦</span>
          <p className="text-white/30 text-sm tracking-widest">별자리를 읽는 중...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen py-12 px-4 overflow-x-hidden">
      <StarCanvas />

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-sm mx-auto">
        {/* Top nav */}
        <div className="w-full flex justify-between items-center">
          <button
            onClick={() => router.push('/')}
            className="text-white/25 text-xs tracking-widest hover:text-white/60 transition-colors"
          >
            ← 다시 보기
          </button>
          <span className="text-white/20 text-xs tracking-widest">오늘의 운세</span>
        </div>

        {/* Fortune Card */}
        <FortuneResultCard fortune={fortune} />

        {/* Action Buttons */}
        <div className="flex gap-4 pb-8">
          <SaveImageButton name={fortune.name} />
          <button
            onClick={() => router.push('/')}
            className="text-sm tracking-[0.2em] transition-all duration-300 py-3 px-8 border border-white/10 text-white/35 hover:border-white/25 hover:text-white/55"
          >
            처음으로
          </button>
        </div>
      </div>
    </main>
  );
}
