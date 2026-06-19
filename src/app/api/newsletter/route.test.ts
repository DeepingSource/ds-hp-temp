import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from './route';

vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('ok')));

function makeRequest(body: unknown, ip?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (ip) headers['x-forwarded-for'] = ip;

  return new NextRequest('http://localhost/api/newsletter', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
}

function uniqueIp() {
  return `newsletter-test-${Date.now()}-${Math.random()}`;
}

describe('POST /api/newsletter', () => {
  beforeEach(() => {
    vi.mocked(fetch).mockClear();
  });

  it('정상 이메일 → 200', async () => {
    const res = await POST(
      makeRequest({ email: 'test@example.com' }, uniqueIp()),
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe('구독이 완료되었습니다');
  });

  it('잘못된 이메일 → 400 + 한국어 에러', async () => {
    const res = await POST(
      makeRequest({ email: 'not-an-email' }, uniqueIp()),
    );
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain('이메일');
  });

  it('빈 body → 400', async () => {
    const res = await POST(makeRequest({}, uniqueIp()));
    expect(res.status).toBe(400);
  });

  it('누락된 email 필드 → 400', async () => {
    const res = await POST(makeRequest({ name: 'test' }, uniqueIp()));
    expect(res.status).toBe(400);
  });
});
