import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

// Slack webhook mock
vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('ok')));

function makeRequest(body: unknown, ip?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (ip) headers['x-forwarded-for'] = ip;

  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
}

function uniqueIp() {
  return `contact-test-${Date.now()}-${Math.random()}`;
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockClear();
  });

  it('정상 요청 → 200', async () => {
    const res = await POST(
      makeRequest(
        { name: '홍길동', contact: '010-1234-5678', storeCount: '1' },
        uniqueIp(),
      ),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe('상담 신청이 완료되었습니다');
  });

  it('plan/product가 null이어도 → 200 (실제 폼 페이로드: 쿼리 파라미터 부재 시)', async () => {
    const res = await POST(
      makeRequest(
        { name: '홍길동', contact: '010-1234-5678', storeCount: '1', plan: null, product: null },
        uniqueIp(),
      ),
    );
    expect(res.status).toBe(200);
  });

  it('inquiryType, message 포함 요청 → 200', async () => {
    const res = await POST(
      makeRequest(
        {
          name: '홍길동',
          contact: '010-1234-5678',
          storeCount: '1',
          inquiryType: 'pricing',
          message: '가격 문의드립니다',
        },
        uniqueIp(),
      ),
    );
    expect(res.status).toBe(200);
  });

  it('필수 필드 누락 → 400', async () => {
    const res = await POST(
      makeRequest({ name: '홍길동' }, uniqueIp()),
    );
    expect(res.status).toBe(400);
  });

  it('빈 name → 400', async () => {
    const res = await POST(
      makeRequest(
        { name: '', contact: '010-1234-5678', storeCount: '1' },
        uniqueIp(),
      ),
    );
    expect(res.status).toBe(400);
  });

  it('잘못된 JSON → 400', async () => {
    const req = new NextRequest('http://localhost/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': uniqueIp(),
      },
      body: 'not json',
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it('rate limit 초과 → 429', async () => {
    const ip = uniqueIp();
    // 5회 소비
    for (let i = 0; i < 5; i++) {
      await POST(
        makeRequest(
          { name: '홍길동', contact: '010-1234-5678', storeCount: '1' },
          ip,
        ),
      );
    }
    // 6회째
    const res = await POST(
      makeRequest(
        { name: '홍길동', contact: '010-1234-5678', storeCount: '1' },
        ip,
      ),
    );
    expect(res.status).toBe(429);
  });
});
