import type { Metadata } from 'next';
import { Noto_Sans_KR, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const notoSansKR = Noto_Sans_KR({
  variable: '--font-noto',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: '오늘의 운세 — 별이 전하는 당신의 이야기',
  description: '생년월일을 기반으로 오늘의 별자리 운세, 띠 운세, 행운 아이템을 확인하세요.',
  openGraph: {
    title: '오늘의 운세',
    description: '별이 전하는 당신만의 오늘 이야기',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} ${cormorant.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
