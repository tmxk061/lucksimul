'use client';

import { useEffect, useRef } from 'react';

interface Props {
  score: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  large?: boolean;
}

export default function CircleScore({
  score,
  size = 80,
  strokeWidth = 4,
  color = '#c8a0ff',
  label,
  large = false,
}: Props) {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!circleRef.current) return;
    const targetOffset = circumference - (score / 100) * circumference;
    circleRef.current.style.strokeDashoffset = String(circumference);

    const startTime = performance.now();
    const duration = 1500;

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const offset = circumference - eased * (score / 100) * circumference;
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = String(offset);
      }
      if (progress < 1) requestAnimationFrame(animate);
    };

    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [score, circumference]);

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={strokeWidth}
          />
          <circle
            ref={circleRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: 'none' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={large ? 'text-3xl font-light text-white' : 'text-lg font-light text-white/90'}>
            {score}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-xs text-white/40 tracking-widest">{label}</span>
      )}
    </div>
  );
}
