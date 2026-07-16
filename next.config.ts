import type { NextConfig } from "next";

const isDev = process.argv.indexOf('dev') !== -1;
const isBuild = process.argv.indexOf('build') !== -1;
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = '1';
  import('velite').then(m => m.build({ watch: isDev, clean: !isDev }));
}

/**
 * GH_PAGES=1 → static export for GitHub Pages (project page at /ds-hp-temp).
 * In this mode Next ignores redirects()/headers()/middleware and there is no
 * server, so those (and /api routes) are excluded by the export build script.
 * Normal `next build`/`next start` keep the full server config below.
 */
const isGhPages = process.env.GH_PAGES === '1';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  experimental: {
    optimizePackageImports: ['zod', 'react-hook-form', 'lucide-react', 'framer-motion'],
  },
};

if (isGhPages) {
  nextConfig.output = 'export';
  nextConfig.basePath = basePath || undefined;
  nextConfig.trailingSlash = true;
  nextConfig.images = { ...nextConfig.images, unoptimized: true };
} else {
  nextConfig.redirects = async () => {
    // /blog, /blog/:slug, /sample, /how-it-works → 미들웨어에서 처리 (미니사이트 충돌 방지)
    // 신 IA 전환 redirects (PLAN_v1.1 §2.3). exact source 매칭으로 하위경로·미니사이트 보호.
    return [
      // ── 제품 라우트: store-* → saai-* URL 전환 (P1-3, 301) ──
      { source: '/products/store-insight', destination: '/products/saai-insight', permanent: true },
      { source: '/products/store-care', destination: '/products/saai-care', permanent: true },
      { source: '/products/store-agent', destination: '/products/saai-agent', permanent: true },
      { source: '/products/store-count', destination: '/products/saai-count', permanent: true },
      { source: '/:locale(ko|jp)/products/store-insight', destination: '/:locale/products/saai-insight', permanent: true },
      { source: '/:locale(ko|jp)/products/store-care', destination: '/:locale/products/saai-care', permanent: true },
      { source: '/:locale(ko|jp)/products/store-agent', destination: '/:locale/products/saai-agent', permanent: true },
      { source: '/:locale(ko|jp)/products/store-count', destination: '/:locale/products/saai-count', permanent: true },
      // 레거시 짧은 경로 → 최종 목적지로 직접(체인 1회 초과 금지)
      { source: '/store-insight', destination: '/products/saai-insight', permanent: true },
      { source: '/storeinsight', destination: '/products/saai-insight', permanent: true },
      { source: '/storecare', destination: '/products/saai-care', permanent: true },
      { source: '/storeagent', destination: '/products/saai-agent', permanent: true },
      { source: '/storeagent/how-it-works', destination: '/products/saai-agent#how-it-works', permanent: true },
      { source: '/storeagent/pricing', destination: '/pricing', permanent: true },

      // ── 기술 라우트 정돈 (301) ──
      { source: '/seal', destination: '/technology/seal', permanent: true },
      { source: '/tech-anonymizer', destination: '/technology/anonymizer', permanent: true },
      { source: '/tech-spatial-ai', destination: '/technology/spatial-ai', permanent: true },
      { source: '/tech-store-care-ai', destination: '/products/saai-care', permanent: true },

      // ── 솔루션/업종 정돈 (301) ──
      { source: '/industries', destination: '/solutions', permanent: true },
      { source: '/industries/:slug', destination: '/solutions', permanent: true },

      // ── 회사 라우트 정돈 (301) ──
      { source: '/about', destination: '/company/about', permanent: true },
      { source: '/about-us', destination: '/company/about', permanent: true },
      { source: '/company', destination: '/company/about', permanent: true },
      { source: '/ms-agent', destination: '/company/partnership', permanent: true },
      { source: '/news', destination: '/company/news', permanent: true },
      { source: '/career', destination: '/company/career', permanent: true },

      // ── 리소스 라우트 정돈 (301) ──
      { source: '/blog', destination: '/resources/blog', permanent: true },
      { source: '/blog/:slug', destination: '/resources/blog/:slug', permanent: true },
      { source: '/post/:slug', destination: '/resources/blog/:slug', permanent: true },
      { source: '/glossary', destination: '/resources/glossary', permanent: true },
      { source: '/faq', destination: '/resources/faq', permanent: true },
      { source: '/storeagent/faq', destination: '/resources/faq', permanent: true },
      { source: '/pi-docs', destination: '/resources/docs', permanent: true },
      // 구 pi-manual = store insight 대시보드 매뉴얼(heatmap·zone·visitor 분석 등).
      // 구 slug는 신 docs 컬렉션과 불일치 → 404 방지 위해 saai insight 제품 페이지로 보냄
      // (기능 17종 섹션이 구 매뉴얼 내용을 대체). 1-1 크롤 대조로 확인.
      { source: '/pi-manual/:slug*', destination: '/products/saai-insight', permanent: true },

      // ── 법무 정돈 (301) ──
      { source: '/privacy', destination: '/legal/privacy', permanent: true },
      { source: '/terms', destination: '/legal/terms', permanent: true },

      // ── 인증 → app.deepingsource.io 신설 서브도메인 (302, D5) ──
      { source: '/log-in', destination: 'https://app.deepingsource.io/log-in', permanent: false, basePath: false },
      { source: '/sign-up', destination: 'https://app.deepingsource.io/sign-up', permanent: false, basePath: false },
      { source: '/user-account', destination: 'https://app.deepingsource.io/user-account', permanent: false, basePath: false },
      { source: '/reset-password', destination: 'https://app.deepingsource.io/reset-password', permanent: false, basePath: false },
      { source: '/update-password', destination: 'https://app.deepingsource.io/update-password', permanent: false, basePath: false },

      // ── 구 Webflow 로케일 프리픽스 미러 (1-1) ──
      // 구 사이트는 /ko/·/jp/ 프리픽스를 썼으나 위 규칙은 대부분 non-prefixed source만
      // 커버 → 크롤 대조로 발견된 로케일 버전을 목적지에 같은 프리픽스로 미러(체인 1홉).
      { source: '/:locale(ko|jp)/store-insight', destination: '/:locale/products/saai-insight', permanent: true },
      { source: '/:locale(ko|jp)/storeinsight', destination: '/:locale/products/saai-insight', permanent: true },
      { source: '/:locale(ko|jp)/storecare', destination: '/:locale/products/saai-care', permanent: true },
      { source: '/:locale(ko|jp)/storeagent', destination: '/:locale/products/saai-agent', permanent: true },
      { source: '/:locale(ko|jp)/tech-store-care-ai', destination: '/:locale/products/saai-care', permanent: true },
      { source: '/:locale(ko|jp)/seal', destination: '/:locale/technology/seal', permanent: true },
      { source: '/:locale(ko|jp)/tech-anonymizer', destination: '/:locale/technology/anonymizer', permanent: true },
      { source: '/:locale(ko|jp)/tech-spatial-ai', destination: '/:locale/technology/spatial-ai', permanent: true },
      { source: '/:locale(ko|jp)/about', destination: '/:locale/company/about', permanent: true },
      { source: '/:locale(ko|jp)/about-us', destination: '/:locale/company/about', permanent: true },
      { source: '/:locale(ko|jp)/news', destination: '/:locale/company/news', permanent: true },
      { source: '/:locale(ko|jp)/career', destination: '/:locale/company/career', permanent: true },
      { source: '/:locale(ko|jp)/ms-agent', destination: '/:locale/company/partnership', permanent: true },
      { source: '/:locale(ko|jp)/blog', destination: '/:locale/resources/blog', permanent: true },
      { source: '/:locale(ko|jp)/blog/:slug', destination: '/:locale/resources/blog/:slug', permanent: true },
      { source: '/:locale(ko|jp)/post/:slug', destination: '/:locale/resources/blog/:slug', permanent: true },
      { source: '/:locale(ko|jp)/pi-docs', destination: '/:locale/resources/docs', permanent: true },
      { source: '/:locale(ko|jp)/pi-manual/:slug*', destination: '/:locale/products/saai-insight', permanent: true },
      { source: '/:locale(ko|jp)/glossary', destination: '/:locale/resources/glossary', permanent: true },
      { source: '/:locale(ko|jp)/faq', destination: '/:locale/resources/faq', permanent: true },
      { source: '/:locale(ko|jp)/privacy', destination: '/:locale/legal/privacy', permanent: true },
      { source: '/:locale(ko|jp)/terms', destination: '/:locale/legal/terms', permanent: true },
      { source: '/:locale(ko|jp)/log-in', destination: 'https://app.deepingsource.io/log-in', permanent: false, basePath: false },
      { source: '/:locale(ko|jp)/sign-up', destination: 'https://app.deepingsource.io/sign-up', permanent: false, basePath: false },
      { source: '/:locale(ko|jp)/user-account', destination: 'https://app.deepingsource.io/user-account', permanent: false, basePath: false },
      { source: '/:locale(ko|jp)/reset-password', destination: 'https://app.deepingsource.io/reset-password', permanent: false, basePath: false },
      { source: '/:locale(ko|jp)/update-password', destination: 'https://app.deepingsource.io/update-password', permanent: false, basePath: false },

      // ── 구 Webflow 시스템/미완성 페이지 → 홈 (1-1) ──
      { source: '/access-denied', destination: '/', permanent: true },
      { source: '/search', destination: '/', permanent: true },
      { source: '/untitled/:path*', destination: '/', permanent: true },
      { source: '/:locale(ko|jp)/access-denied', destination: '/:locale', permanent: true },
      { source: '/:locale(ko|jp)/search', destination: '/:locale', permanent: true },
      { source: '/:locale(ko|jp)/untitled/:path*', destination: '/:locale', permanent: true },
    ];
  };
  nextConfig.headers = async () => {
    return [
      {
        // Keystatic CMS admin (/keystatic) — needs 'unsafe-eval' (editor + dev HMR),
        // unpkg (fonts/assets) and GitHub (github storage mode). The strict site CSP
        // below would blank the admin app, so keystatic is carved out here.
        source: "/keystatic/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' https://unpkg.com https://api.github.com https://github.com; font-src 'self' https://unpkg.com https://fonts.gstatic.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com; style-src 'self' 'unsafe-inline' https://unpkg.com https://fonts.googleapis.com; img-src 'self' data: blob: https:; connect-src 'self' https://api.github.com https://github.com https://*.githubusercontent.com; object-src 'none';",
          },
        ],
      },
      {
        source: "/((?!keystatic).*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            // Analytics 허용: GA4(googletagmanager/google-analytics) + Umami Cloud.
            // Umami는 스크립트=cloud.umami.is, 비콘=gateway.umami.is 로 도메인이 다르므로
            // *.umami.is 와일드카드로 둘 다 허용. ⚠ 자가호스팅 시 해당 도메인을 추가할 것.
            value: "default-src 'self'; font-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.umami.is; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://*.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.umami.is; object-src 'none';",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  };
}

export default nextConfig;
