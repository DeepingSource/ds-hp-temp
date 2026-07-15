import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getClientIp, isRateLimited, rateLimitResponse, errorResponse } from '@/lib/api-utils';
import { COOKIE_NAME, COOKIE_MAX_AGE, labelForCode, signAccessToken } from '@/lib/docs-access';

/**
 * POST /api/docs-access — exchange a shared access code for a signed cookie that
 * unlocks `access: gated` docs (DOCS_WIKI_PLAN Phase 4). Codes live in the
 * DOCS_ACCESS_CODES env; the cookie is HMAC-signed with DOCS_ACCESS_SECRET and read
 * by the proxy. Excluded from the GH-Pages static export (see build-ghpages.sh).
 */
const schema = z.object({ code: z.string().min(1).max(200) });

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip, 'docs-access')) return rateLimitResponse();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return errorResponse('잘못된 요청 형식입니다', 400);
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) return errorResponse('접근 코드를 입력해주세요', 400);

  const label = labelForCode(parsed.data.code.trim());
  if (!label) return errorResponse('유효하지 않은 접근 코드입니다', 401);

  const token = await signAccessToken();
  if (!token) {
    console.error('[docs-access] DOCS_ACCESS_SECRET 미설정 — 쿠키를 발급할 수 없습니다');
    return errorResponse('서버 설정 오류입니다', 500);
  }

  console.log(`[docs-access] 접근 허용: ${label} (${koreaShort()})`);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
  });
  return res;
}

function koreaShort(): string {
  return new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
}
