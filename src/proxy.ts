import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAME, hasAnyGatedDocs, isGatedSlug, verifyAccessToken } from '@/lib/docs-access';

/** Hosts recognized as the minisite */
const MINISITE_HOSTS = new Set([
  'agent.saai.store',
  'agent.local',
]);

/** Prefix match for Vercel preview/production subdomains */
const MINISITE_HOST_PREFIX = 'agent.';

/** Rewrite map: minisite path → internal route */
const rewrites: Record<string, string> = {
  '/': '/ms-agent',
  '/blog': '/storeagent/blog',
  '/newsletter': '/storeagent/newsletter',
  '/sample': '/storeagent/sample',
  '/how-it-works': '/storeagent/how-it-works',
};

/** Redirects for main site (non-minisite) — moved from next.config.ts to avoid conflict.
 *  /blog · /blog/:slug 는 next.config.ts 의 신 IA redirects (→ /resources/blog) 가 담당. */
const mainSiteRedirects: Record<string, string> = {
  '/newsletter': '/storeagent/newsletter',
  '/sample': '/storeagent/sample',
  '/how-it-works': '/storeagent/how-it-works',
};

/** Base paths with fully-translated physical /ko·/jp routes (Tier-1). Not rewritten. */
const TRANSLATED_PATHS = new Set<string>([
  '/products',
  '/products/functions',
  '/products/saai-insight',
  '/products/saai-agent',
  '/products/saai-care',
  '/products/saai-ads-insight',
  '/products/saai-for-owners',
  '/products/store-count',
  '/products/store-queue',
  '/products/store-pop',
  '/products/store-fit',
  '/products/saai',
  '/technology',
  '/technology/agentic-ai',
  '/technology/anonymizer',
  '/technology/seal',
  '/technology/spatial-ai',
  '/technology/models',
  '/solutions',
  '/solutions/retail',
  '/solutions/food-beverage',
  '/solutions/drug-store',
  '/solutions/large-space',
  '/company/about',
  '/company/news',
  '/company/career',
  '/company/partnership',
  '/company/investors',
  '/enterprise',
  '/pricing',
  '/pricing/simulator',
  '/contact',
  '/resources',
  '/resources/case-studies',
  '/resources/docs',
  '/resources/glossary',
  '/resources/faq',
  '/resources/blog',
  '/events',
  // Legal: physical /ko·/jp mirrors carry the viewer locale so LegalDoc can show
  // the interim EN/JP "Korean is authoritative" notice (Korean body is unchanged).
  '/legal/privacy',
  '/legal/terms',
]);

/** When FORCE_MINISITE=true, treat every request as minisite (for standalone deployment) */
const FORCE_MINISITE = process.env.FORCE_MINISITE === 'true';

function isMinisite(host: string): boolean {
  if (FORCE_MINISITE) return true;
  const hostname = host.split(':')[0];
  return MINISITE_HOSTS.has(hostname) ||
    (hostname.startsWith(MINISITE_HOST_PREFIX) &&
      (hostname.endsWith('.saai.store') || hostname.endsWith('.vercel.app')));
}

// Next.js 16: the `middleware` convention was renamed to `proxy` (nodejs runtime).
// File must be `proxy.ts`; the exported function must be named `proxy`.
export async function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? '';
  const { pathname } = request.nextUrl;

  // Pass through API routes, static assets, Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/keystatic') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // ── Gated docs (Phase 4): send a gated /resources/docs/<slug> (any locale) to the
  //    access page unless a valid signed cookie is present. Runs BEFORE the host split
  //    so minisite hosts can't serve gated docs ungated. Entirely a no-op unless some
  //    doc is actually gated (gated-docs.json non-empty), so idle = zero change. ──
  if (hasAnyGatedDocs()) {
    const gatedMatch = pathname.match(/^\/(?:(ko|jp)\/)?resources\/docs\/([^/]+)\/?$/);
    if (gatedMatch && gatedMatch[2] !== 'access' && isGatedSlug(gatedMatch[2])) {
      const token = request.cookies.get(COOKIE_NAME)?.value;
      if (!(await verifyAccessToken(token))) {
        const url = request.nextUrl.clone();
        url.pathname = `${gatedMatch[1] ? '/' + gatedMatch[1] : ''}/resources/docs/access`;
        url.searchParams.set('from', pathname);
        return NextResponse.redirect(url);
      }
    }
  }

  // ── /demo 게이트 (내부 목업 리뷰, 1-6): 프로덕션에서 비노출. Turbopack 프로덕션
  //    빌드에서 페이지 notFound()가 상태코드 200을 반환하는 이슈가 있어(본문은 not-found
  //    UI라 목업은 노출 안 되지만) 미들웨어에서 존재하지 않는 경로로 rewrite → Next 404.
  //    dev(next dev)이거나 ENABLE_MOCKUP_DEMO=true일 때만 통과. host 분기 전에 둬
  //    미니사이트 호스트에서도 노출 안 됨. page.tsx 게이트는 이중 방어로 유지. ──
  const demoEnabled = process.env.NODE_ENV === 'development' || process.env.ENABLE_MOCKUP_DEMO === 'true';
  if (!demoEnabled && /^\/(?:(?:ko|jp)\/)?demo(?:\/|$)/.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/_blocked-internal';
    return NextResponse.rewrite(url);
  }

  // ── Main site: simple redirects (replaces next.config.ts redirects) ──
  if (!isMinisite(host)) {
    const mainRedirect = mainSiteRedirects[pathname];
    if (mainRedirect) {
      return NextResponse.redirect(new URL(mainRedirect, request.url), 308);
    }

    // QR short link (SITE_IMPROVEMENT P2-2): /e/<slug> → /events/<slug>.
    const qr = pathname.match(/^\/e\/([a-zA-Z0-9_-]+)\/?$/);
    if (qr) {
      return NextResponse.redirect(new URL(`/events/${qr[1]}`, request.url), 307);
    }

    // Locale for <html lang> — exposed to the root layout via request header
    // (read with headers() in app/layout.tsx). URL prefix decides: /ko→ko, /jp→jp, else en.
    const localeMatch = pathname.match(/^\/(ko|jp)(?:\/|$)/);
    const htmlLocale = localeMatch ? localeMatch[1] : 'en';
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', htmlLocale);

    // Locale path-prefix (D6): /ko/* · /jp/* sub-paths serve the base route.
    // EXCEPT paths that have fully-translated physical /ko·/jp routes — those
    // fall through so their own page renders (real per-locale body).
    const localeSub = pathname.match(/^\/(ko|jp)\/(.+)$/);
    if (localeSub) {
      const base = `/${localeSub[2]}`;
      // Translated = exact Tier set OR dynamic detail prefixes (glossary/solutions [slug])
      const isTranslated = TRANSLATED_PATHS.has(base)
        || base.startsWith('/glossary/')
        || base.startsWith('/solutions/')
        || base.startsWith('/resources/blog/')
        || base.startsWith('/resources/case-studies/')
        || base.startsWith('/resources/docs/')
        || base.startsWith('/events/');
      if (!isTranslated) {
        const url = request.nextUrl.clone();
        url.pathname = base;
        const res = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
        res.cookies.set('NEXT_LOCALE', localeSub[1], { path: '/', sameSite: 'lax' });
        return res;
      }
      // translated → fall through to physical /ko|/jp route
    }

    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // ── Minisite: rewrite to internal routes ──

  // Redirect /storeagent/* → clean minisite paths (safety net)
  // Skip in FORCE_MINISITE mode — rewrite targets use /storeagent/* internally
  const storeagentMatch = !FORCE_MINISITE &&
    pathname.match(/^\/storeagent(?:\/([a-zA-Z0-9._~:@!$&'()*+,;=-]+(?:\/[a-zA-Z0-9._~:@!$&'()*+,;=-]+)*))?$/);
  if (storeagentMatch) {
    const sub = storeagentMatch[1];
    const cleanPath = sub ? `/${sub}` : '/';
    return NextResponse.redirect(new URL(cleanPath, request.url));
  }

  // Blog article: /blog/[slug] → /storeagent/blog/[slug]
  const blogMatch = pathname.match(/^\/blog\/([a-zA-Z0-9_-]+)$/);
  const destination = blogMatch
    ? `/storeagent/blog/${blogMatch[1]}`
    : rewrites[pathname];

  const response = destination
    ? NextResponse.rewrite(new URL(destination, request.url))
    : NextResponse.next();

  // Set cookie so client components can detect minisite mode
  response.cookies.set('x-site-mode', 'minisite', { path: '/', sameSite: 'lax' });

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.svg|manifest.json|opengraph-image|twitter-image).*)'],
};
