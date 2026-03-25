'use client';

import type { FortuneResult } from '@/types/fortune';
import CircleScore from './CircleScore';
import { formatDisplayDate } from '@/lib/utils/date';

interface Props {
  fortune: FortuneResult;
}

function StarRating({ stars }: { stars: number }) {
  return (
    <span className="text-yellow-300/80 text-xs tracking-wider">
      {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
    </span>
  );
}

function GlassCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div
      className={`glass-card fade-in ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function FortuneResultCard({ fortune }: Props) {
  return (
    <div
      id="fortune-card"
      className="w-full max-w-sm mx-auto flex flex-col gap-5 p-6"
      style={{ background: 'linear-gradient(160deg, #0d0820 0%, #0a0235 50%, #080c2e 100%)' }}
    >
      {/* Header */}
      <GlassCard className="text-center py-5" delay={0}>
        <div className="text-4xl mb-2" style={{ textShadow: `0 0 30px ${fortune.zodiac.themeColor}, 0 0 60px ${fortune.zodiac.themeColor}60` }}>
          {fortune.zodiac.symbol}
        </div>
        <div className="text-white/90 text-sm tracking-widest mb-1">
          {fortune.zodiac.name} · {fortune.chineseZodiac.name}띠 {fortune.chineseZodiac.emoji}
        </div>
        <div className="text-white/35 text-xs tracking-widest">
          {formatDisplayDate(fortune.date)} · {fortune.name}님
        </div>
      </GlassCard>

      {/* Overall Score */}
      <GlassCard className="flex flex-col items-center gap-4 py-6" delay={100}>
        <CircleScore
          score={fortune.overall.score}
          size={120}
          strokeWidth={5}
          color={fortune.zodiac.themeColor}
          large
        />
        <div className="text-center">
          <div className="text-white/40 text-xs tracking-[0.3em] mb-2">종합운</div>
          <StarRating stars={fortune.overall.stars} />
        </div>
        <p className="text-white/65 text-sm text-center leading-relaxed px-2">
          {fortune.overall.text}
        </p>
        <div className="w-full border-t border-white/5 pt-3">
          <p className="text-purple-300/60 text-xs text-center italic">
            ✦ {fortune.overall.oneLineAdvice}
          </p>
        </div>
      </GlassCard>

      {/* Love / Money / Health */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: '애정운', icon: '💕', cat: fortune.love,   color: '#ff9ecd' },
          { label: '금전운', icon: '💰', cat: fortune.money,  color: '#ffe9a0' },
          { label: '건강운', icon: '🌿', cat: fortune.health, color: '#98d8c8' },
        ].map(({ label, icon, cat, color }, i) => (
          <GlassCard key={label} className="flex flex-col items-center gap-2 py-4" delay={200 + i * 80}>
            <span className="text-xl">{icon}</span>
            <CircleScore score={cat.score} size={56} strokeWidth={3} color={color} />
            <div className="text-white/30 text-[10px] tracking-widest">{label}</div>
            <StarRating stars={cat.stars} />
          </GlassCard>
        ))}
      </div>

      {/* Category Texts */}
      <div className="flex flex-col gap-3">
        {[
          { label: '💕 애정운', text: fortune.love.text,   delay: 450 },
          { label: '💰 금전운', text: fortune.money.text,  delay: 520 },
          { label: '🌿 건강운', text: fortune.health.text, delay: 590 },
        ].map(({ label, text, delay }) => (
          <GlassCard key={label} className="px-4 py-3" delay={delay}>
            <div className="text-white/40 text-xs tracking-widest mb-1">{label}</div>
            <p className="text-white/60 text-xs leading-relaxed">{text}</p>
          </GlassCard>
        ))}
      </div>

      {/* Lucky Items */}
      <GlassCard className="py-5 px-4" delay={680}>
        <div className="text-white/35 text-xs tracking-[0.3em] text-center mb-4">오늘의 기운</div>
        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
          {[
            { icon: '🎨', label: '행운색', value: fortune.luckyItems.color, hex: fortune.luckyItems.colorHex },
            { icon: '🔢', label: '행운숫자', value: String(fortune.luckyItems.number) },
            { icon: '🧭', label: '행운방향', value: fortune.luckyItems.direction },
            { icon: '🍽', label: '행운음식', value: fortune.luckyItems.food },
            { icon: '⏰', label: '행운시간', value: fortune.luckyItems.time },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-base">{item.icon}</span>
              <div>
                <div className="text-white/30 text-[10px]">{item.label}</div>
                <div className="flex items-center gap-1">
                  {'hex' in item && item.hex && (
                    <span
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.hex, boxShadow: `0 0 6px ${item.hex}` }}
                    />
                  )}
                  <span className="text-white/75 text-xs">{item.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Death Rate */}
      <GlassCard className="py-4 px-4 border border-red-500/10" delay={780}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">💀</span>
          <div>
            <div className="text-white/30 text-[10px] tracking-widest mb-0.5">오늘 사망 확률</div>
            <div className="flex items-baseline gap-2">
              <span className="text-red-300/70 text-lg font-light">
                {fortune.deathRate.percentage.toFixed(3)}%
              </span>
            </div>
            <p className="text-white/35 text-[11px] italic mt-1">{fortune.deathRate.comment}</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
