import type { MetadataRoute } from 'next';

// Only the production deploy (deepingsource.io) sets NEXT_PUBLIC_ALLOW_INDEXING=true.
// Preview/staging deploys (e.g. ds-hp-temp.vercel.app) fall through to a full
// Disallow so they never compete with production for search rankings.
const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';

export default function robots(): MetadataRoute.Robots {
  const sitemap = `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://deepingsource.io'}/sitemap.xml`;

  if (!allowIndexing) {
    return {
      rules: [{ userAgent: '*', disallow: '/' }],
      sitemap,
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap,
  };
}
