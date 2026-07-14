import { makeRouteHandler } from '@keystatic/next/route-handler';
import keystaticConfig from '../../../../../keystatic.config';

// GitHub mode: makeRouteHandler가 KEYSTATIC_* env를 읽어 OAuth를 처리한다 (docs/PHASE_C_github-mode-setup.md §2).
// env 미설정 시 module-scope throw로 next build 전체가 죽으므로("Collecting page data" 단계),
// 어드민 env 누락이 사이트 배포까지 막지 않도록 가드 — 이 경우 /api/keystatic만 503.
type Handlers = ReturnType<typeof makeRouteHandler>;

let handlers: Handlers;
try {
  handlers = makeRouteHandler({ config: keystaticConfig });
} catch (err) {
  console.error('[keystatic] admin API disabled — missing KEYSTATIC_* env vars:', err);
  const unavailable = async () =>
    new Response('Keystatic admin is not configured (missing KEYSTATIC_* env vars).', {
      status: 503,
    });
  handlers = { GET: unavailable, POST: unavailable } as unknown as Handlers;
}

export const { GET, POST } = handlers;
