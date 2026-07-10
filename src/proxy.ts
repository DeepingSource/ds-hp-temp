import { NextRequest, NextResponse } from 'next/server';

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
  '/products/store-insight',
  '/products/store-agent',
  '/products/store-care',
  '/products/store-count',
  '/products/saai',
  '/technology',
  '/technology/anonymizer',
  '/technology/seal',
  '/technology/spatial-ai',
  '/technology/models',
  '/solutions',
  '/solutions/retail',
  '/solutions/food-beverage',
  '/solutions/drug',
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
export function proxy(request: NextRequest) {
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

  // ── Main site: simple redirects (replaces next.config.ts redirects) ──
  if (!isMinisite(host)) {
    const mainRedirect = mainSiteRedirects[pathname];
    if (mainRedirect) {
      return NextResponse.redirect(new URL(mainRedirect, request.url), 308);
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
        || base.startsWith('/resources/blog/');
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
