import { NextRequest, NextResponse } from 'next/server';
import { generateFortune } from '@/lib/fortune/engine';
import type { FortuneInput } from '@/types/fortune';

export async function POST(request: NextRequest) {
  try {
    const body: FortuneInput = await request.json();

    if (!body.name || !body.birthdate || !body.gender) {
      return NextResponse.json({ error: '필수 정보가 누락되었습니다.' }, { status: 400 });
    }

    const fortune = generateFortune(body);
    return NextResponse.json(fortune);
  } catch {
    return NextResponse.json({ error: '운세 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
