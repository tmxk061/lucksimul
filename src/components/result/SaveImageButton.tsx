'use client';

import { useState } from 'react';
import { saveFortuneAsImage } from '@/lib/utils/image-save';

interface Props {
  name: string;
}

export default function SaveImageButton({ name }: Props) {
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await saveFortuneAsImage('fortune-card', name);
    setSaving(false);
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      className={`text-sm tracking-[0.2em] transition-all duration-300 py-3 px-8 border ${
        done
          ? 'border-green-400/40 text-green-400/80'
          : saving
          ? 'border-white/10 text-white/30 cursor-not-allowed'
          : 'border-purple-400/30 text-purple-300/80 hover:border-purple-400/60 hover:text-purple-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]'
      }`}
    >
      {done ? '✓ 저장 완료' : saving ? '저장 중...' : '이미지 저장'}
    </button>
  );
}
