import { ImageResponse } from 'next/og';
import { BRAND } from '@/lib/tokens';

export const alt = 'STOREAGENT - 편의점 사장님을 위한 AI 브리핑';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: BRAND.primary,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: 40,
            letterSpacing: '0.05em',
          }}
        >
          STOREAGENT
        </div>

        {/* Main Headline */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: 24,
          }}
        >
          발주 전 3분,
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: 40,
          }}
        >
          확인하고 가세요
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.85)',
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          날씨, 이벤트, 오늘 체크할 것들을 매일 아침 정리해 드립니다
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
