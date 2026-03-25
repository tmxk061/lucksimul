'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { FortuneInput } from '@/types/fortune';
import { getDaysInMonth } from '@/lib/utils/date';
import { generateFortune } from '@/lib/fortune/engine';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);

export default function FortuneForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const days = year && month
    ? Array.from({ length: getDaysInMonth(Number(year), Number(month)) }, (_, i) => i + 1)
    : Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !year || !month || !day || !gender) {
      setError('모든 항목을 입력해주세요.');
      return;
    }
    setError('');
    setLoading(true);

    const input: FortuneInput = {
      name: name.trim(),
      birthdate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      gender,
    };

    try {
      const data = generateFortune(input);
      sessionStorage.setItem('fortune-result', JSON.stringify(data));
      sessionStorage.setItem('fortune-input', JSON.stringify(input));
      router.push('/result');
    } catch {
      setError('운세를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.');
      setLoading(false);
    }
  };

  const selectClass = 'bg-transparent border-b border-white/20 text-white/80 py-2 px-1 focus:outline-none focus:border-purple-400/60 transition-colors appearance-none cursor-pointer text-center';

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto flex flex-col gap-8">
      {/* Name */}
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="이름을 입력하세요"
          value={name}
          onChange={e => setName(e.target.value)}
          className="bg-transparent border-b border-white/20 text-white text-center text-lg py-3 focus:outline-none focus:border-purple-400/60 transition-colors placeholder:text-white/30 w-full"
          maxLength={20}
        />
      </div>

      {/* Birthdate */}
      <div className="flex gap-2 justify-center">
        <select
          value={year}
          onChange={e => { setYear(e.target.value); setDay(''); }}
          className={selectClass}
          style={{ width: '90px' }}
        >
          <option value="" className="bg-[#0a0014]">년도</option>
          {years.map(y => (
            <option key={y} value={y} className="bg-[#0a0014]">{y}년</option>
          ))}
        </select>
        <select
          value={month}
          onChange={e => { setMonth(e.target.value); setDay(''); }}
          className={selectClass}
          style={{ width: '64px' }}
        >
          <option value="" className="bg-[#0a0014]">월</option>
          {months.map(m => (
            <option key={m} value={m} className="bg-[#0a0014]">{m}월</option>
          ))}
        </select>
        <select
          value={day}
          onChange={e => setDay(e.target.value)}
          className={selectClass}
          style={{ width: '64px' }}
        >
          <option value="" className="bg-[#0a0014]">일</option>
          {days.map(d => (
            <option key={d} value={d} className="bg-[#0a0014]">{d}일</option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div className="flex gap-6 justify-center">
        {(['male', 'female'] as const).map(g => (
          <button
            key={g}
            type="button"
            onClick={() => setGender(g)}
            className={`px-8 py-2 border transition-all duration-300 text-sm tracking-widest ${
              gender === g
                ? 'border-purple-400/60 text-purple-300 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'border-white/15 text-white/40 hover:border-white/30 hover:text-white/60'
            }`}
          >
            {g === 'male' ? '남성' : '여성'}
          </button>
        ))}
      </div>

      {error && (
        <p className="text-red-400/80 text-sm text-center">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className={`mt-4 py-4 text-sm tracking-[0.3em] transition-all duration-500 ${
          loading
            ? 'text-white/30 cursor-not-allowed'
            : 'text-purple-300 hover:text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]'
        }`}
      >
        {loading ? (
          <span className="inline-flex items-center gap-3">
            <span className="star-spin inline-block">✦</span>
            별자리를 읽는 중...
          </span>
        ) : (
          '✦  오늘의 운세 보기  ✦'
        )}
      </button>
    </form>
  );
}
