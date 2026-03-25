'use client';

export async function saveFortuneAsImage(elementId: string, name: string): Promise<void> {
  const { default: html2canvas } = await import('html2canvas');
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#0a0014',
    logging: false,
    onclone: (doc) => {
      const el = doc.getElementById(elementId);
      if (el) {
        el.style.borderRadius = '0';
      }
    },
  });

  const today = new Date().toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' }).replace(/\. /g, '').replace('.', '');
  const link = document.createElement('a');
  link.download = `${name}_오늘의운세_${today}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
