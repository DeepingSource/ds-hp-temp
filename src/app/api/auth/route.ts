import { NextResponse } from 'next/server';

/**
 * Decap CMS GitHub OAuth Proxy — Step 1: Redirect to GitHub
 *
 * Decap opens a popup to /api/auth?provider=github
 * We redirect to GitHub's OAuth authorization page.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get('provider');

  if (provider !== 'github') {
    return new Response('지원하지 않는 OAuth 제공자입니다.', { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!clientId || !siteUrl) {
    return new Response(
      'OAuth 환경변수가 설정되지 않았습니다. GITHUB_CLIENT_ID와 NEXT_PUBLIC_SITE_URL을 확인하세요.',
      { status: 500 }
    );
  }

  const redirectUri = `${siteUrl}/api/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'public_repo,user',
  });

  return NextResponse.redirect(
    `https://github.com/login/oauth/authorize?${params}`
  );
}
