import StarCanvas from '@/components/StarCanvas';
import FortuneForm from '@/components/form/FortuneForm';

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      <StarCanvas />

      <div className="relative z-10 w-full flex flex-col items-center gap-12">
        {/* Title */}
        <div className="text-center flex flex-col items-center gap-4">
          <div className="float-anim">
            <span
              className="text-6xl sm:text-7xl select-none"
              style={{ filter: 'drop-shadow(0 0 20px rgba(200,160,255,0.6))' }}
            >
              ✦
            </span>
          </div>
          <h1
            className="text-4xl sm:text-5xl font-light tracking-[0.15em] glow-text"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            오늘의 운세
          </h1>
          <p className="text-white/35 text-xs sm:text-sm tracking-[0.3em] uppercase">
            별이 전하는 당신의 이야기
          </p>
        </div>

        {/* Decorative line */}
        <div className="flex items-center gap-4 w-full max-w-xs">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-500/30" />
          <span className="text-purple-400/40 text-xs">✦</span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-purple-500/30" />
        </div>

        {/* Form */}
        <FortuneForm />

        {/* Footer hint */}
        <p className="text-white/15 text-[11px] tracking-widest text-center">
          생년월일 기반 · 매일 새로운 운세
        </p>
      </div>
    </main>
  );
}
