import { describe, it, expect, vi } from 'vitest';
import { NextRequest } from 'next/server';
import {
  slackEscape,
  getClientIp,
  isRateLimited,
  errorResponse,
  successResponse,
  koreaTime,
} from './api-utils';

describe('slackEscape', () => {
  it('& < > 문자를 이스케이프', () => {
    expect(slackEscape('a & b < c > d')).toBe('a &amp; b &lt; c &gt; d');
  });

  it('이스케이프 대상 없으면 원본 반환', () => {
    expect(slackEscape('hello world')).toBe('hello world');
  });
});

describe('getClientIp', () => {
  it('x-forwarded-for 헤더에서 첫 번째 IP 추출', () => {
    const req = new NextRequest('http://localhost', {
      headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' },
    });
    expect(getClientIp(req)).toBe('1.2.3.4');
  });

  it('헤더 없으면 "unknown" 반환', () => {
    const req = new NextRequest('http://localhost');
    expect(getClientIp(req)).toBe('unknown');
  });
});

describe('isRateLimited', () => {
  it('5회까지 허용하고 6회째 차단', () => {
    const testIp = `rate-test-${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      expect(isRateLimited(testIp)).toBe(false);
    }
    expect(isRateLimited(testIp)).toBe(true);
  });

  it('윈도우 만료 후 리셋', () => {
    const testIp = `reset-test-${Date.now()}`;
    vi.useFakeTimers();

    for (let i = 0; i < 5; i++) {
      isRateLimited(testIp);
    }
    expect(isRateLimited(testIp)).toBe(true);

    // 윈도우 만료 (60초 + 1ms)
    vi.advanceTimersByTime(60_001);
    expect(isRateLimited(testIp)).toBe(false);

    vi.useRealTimers();
  });
});

describe('errorResponse', () => {
  it('올바른 status와 JSON body 반환', async () => {
    const res = errorResponse('에러 메시지', 400);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe('에러 메시지');
  });
});

describe('successResponse', () => {
  it('200 status와 JSON body 반환', async () => {
    const res = successResponse('성공');
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.message).toBe('성공');
  });
});

describe('koreaTime', () => {
  it('문자열 반환', () => {
    expect(typeof koreaTime()).toBe('string');
    expect(koreaTime().length).toBeGreaterThan(0);
  });
});
