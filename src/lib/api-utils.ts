import { NextRequest, NextResponse } from 'next/server';

// --- Rate Limiter ---
// NOTE: In-memory Map — best-effort only on Vercel serverless (state resets per cold start).
// For production-grade protection, replace with Upstash Redis or similar distributed store.
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

export function isRateLimited(ip: string, route: string = 'default'): boolean {
  const key = `${ip}:${route}`;
  const now = Date.now();
  const entry = rateLimit.get(key);

  // 만료 엔트리 정리 (100개 초과 시)
  if (rateLimit.size > 100) {
    for (const [k, val] of rateLimit) {
      if (now > val.resetTime) rateLimit.delete(k);
    }
  }

  if (!entry || now > entry.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export function rateLimitResponse() {
  return new NextResponse(
    JSON.stringify({ error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' }),
    {
      status: 429,
      headers: { 'Retry-After': '60', 'Content-Type': 'application/json' },
    },
  );
}

// --- Slack ---
function escapeSlackText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export async function sendSlackNotification(message: string): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message }),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.warn('[Slack] webhook responded with status', res.status);
    }
  } catch {
    // Slack 알림 실패는 무시 (timeout 포함)
  } finally {
    clearTimeout(timeoutId);
  }
}

export function slackEscape(text: string): string {
  return escapeSlackText(text);
}

export function koreaTime(): string {
  return new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
}

// --- Response Helpers ---
export function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function successResponse(message: string) {
  return NextResponse.json({ message }, { status: 200 });
}
