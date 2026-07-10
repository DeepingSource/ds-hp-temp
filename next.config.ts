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
      // ── 제품 라우트 정돈 (301) ──
      { source: '/store-insight', destination: '/products/store-insight', permanent: true },
      { source: '/storeinsight', destination: '/products/store-insight', permanent: true },
      { source: '/storecare', destination: '/products/store-care', permanent: true },
      { source: '/storeagent', destination: '/products/store-agent', permanent: true },
      { source: '/storeagent/how-it-works', destination: '/products/store-agent#how-it-works', permanent: true },
      { source: '/storeagent/pricing', destination: '/pricing', permanent: true },

      // ── 기술 라우트 정돈 (301) ──
      { source: '/seal', destination: '/technology/seal', permanent: true },
      { source: '/tech-anonymizer', destination: '/technology/anonymizer', permanent: true },
      { source: '/tech-spatial-ai', destination: '/technology/spatial-ai', permanent: true },
      { source: '/tech-store-care-ai', destination: '/products/store-care', permanent: true },

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
      { source: '/pi-manual/:slug', destination: '/resources/docs/:slug', permanent: true },

      // ── 법무 정돈 (301) ──
      { source: '/privacy', destination: '/legal/privacy', permanent: true },
      { source: '/terms', destination: '/legal/terms', permanent: true },

      // ── 인증 → app.deepingsource.io 신설 서브도메인 (302, D5) ──
      { source: '/log-in', destination: 'https://app.deepingsource.io/log-in', permanent: false, basePath: false },
      { source: '/sign-up', destination: 'https://app.deepingsource.io/sign-up', permanent: false, basePath: false },
      { source: '/user-account', destination: 'https://app.deepingsource.io/user-account', permanent: false, basePath: false },
      { source: '/reset-password', destination: 'https://app.deepingsource.io/reset-password', permanent: false, basePath: false },
      { source: '/update-password', destination: 'https://app.deepingsource.io/update-password', permanent: false, basePath: false },

      { source: '/admin', destination: '/admin/', permanent: true },
    ];
  };
  nextConfig.headers = async () => {
    return [
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' https://unpkg.com https://api.github.com https://github.com; font-src 'self' https://unpkg.com data:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com; style-src 'self' 'unsafe-inline' https://unpkg.com; img-src 'self' data: blob: https:; connect-src 'self' https://api.github.com https://github.com; object-src 'none';",
          },
        ],
      },
      {
        source: "/((?!admin).*)",
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
