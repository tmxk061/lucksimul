'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  layer: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  active: boolean;
}

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let meteorTimeout: ReturnType<typeof setTimeout>;

    const stars: Star[] = [];
    const meteor: Meteor = { x: 0, y: 0, length: 120, speed: 8, opacity: 0, active: false };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initStars = () => {
      stars.length = 0;
      const count = Math.min(320, Math.floor((canvas.width * canvas.height) / 4000));
      for (let i = 0; i < count; i++) {
        const layer = Math.random() < 0.6 ? 1 : Math.random() < 0.7 ? 2 : 3;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: layer === 1 ? Math.random() * 0.6 + 0.2 : layer === 2 ? Math.random() * 0.9 + 0.5 : Math.random() * 1.2 + 0.8,
          opacity: layer === 1 ? Math.random() * 0.4 + 0.1 : layer === 2 ? Math.random() * 0.5 + 0.3 : Math.random() * 0.4 + 0.6,
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          layer,
        });
      }
    };

    const spawnMeteor = () => {
      meteor.x = Math.random() * canvas.width * 0.6;
      meteor.y = Math.random() * canvas.height * 0.3;
      meteor.opacity = 1;
      meteor.active = true;
      meteorTimeout = setTimeout(spawnMeteor, 6000 + Math.random() * 8000);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // stars
      for (const star of stars) {
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const alpha = Math.max(0.05, star.opacity + twinkle * 0.25);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        const isGolden = star.layer === 3 && star.radius > 1.5;
        ctx.fillStyle = isGolden
          ? `rgba(255, 233, 160, ${alpha})`
          : star.layer === 3
          ? `rgba(200, 160, 255, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      // meteor
      if (meteor.active) {
        const mx2 = meteor.x + meteor.length;
        const my2 = meteor.y + meteor.length * 0.4;
        const grad = ctx.createLinearGradient(meteor.x, meteor.y, mx2, my2);
        grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
        grad.addColorStop(1, `rgba(200, 160, 255, ${meteor.opacity})`);
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        ctx.lineTo(mx2, my2);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        meteor.x += meteor.speed;
        meteor.y += meteor.speed * 0.4;
        meteor.opacity -= 0.012;
        if (meteor.opacity <= 0) meteor.active = false;
      }

      animFrameId = requestAnimationFrame(draw);
    };

    resize();
    initStars();
    window.addEventListener('resize', () => { resize(); initStars(); });
    meteorTimeout = setTimeout(spawnMeteor, 3000);
    animFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(meteorTimeout);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
