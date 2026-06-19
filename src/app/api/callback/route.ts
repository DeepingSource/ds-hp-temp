/**
 * Decap CMS GitHub OAuth Proxy — Step 2: Token Exchange
 *
 * GitHub redirects to /api/callback?code=xxx after user authorizes.
 * We exchange the code for an access token server-side,
 * then send it back to the Decap CMS popup via postMessage.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return htmlResponse('error', { message: '인증 코드가 없습니다.' });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return htmlResponse('error', { message: 'OAuth 환경변수가 설정되지 않았습니다.' });
  }

  try {
    const tokenRes = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }),
      }
    );

    const data: { access_token?: string; error?: string; error_description?: string } =
      await tokenRes.json();

    if (data.error || !data.access_token) {
      return htmlResponse('error', {
        message: data.error_description ?? data.error ?? '토큰 발급 실패',
      });
    }

    return htmlResponse('success', {
      token: data.access_token,
      provider: 'github',
    });
  } catch {
    return htmlResponse('error', { message: '서버 오류가 발생했습니다.' });
  }
}

type Status = 'success' | 'error';

function htmlResponse(status: Status, payload: Record<string, string>) {
  const message =
    status === 'success'
      ? `authorization:github:success:${JSON.stringify(payload)}`
      : `authorization:github:error:${JSON.stringify(payload)}`;

  // Decap CMS 팝업 → opener(CMS 탭)에 토큰 전달
  // 허용된 origin만 토큰을 수신할 수 있도록 제한
  const safeMessage = JSON.stringify(message).replace(/</g, '\\u003c');
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'https://storeagent.kr';
  const safeOrigin = JSON.stringify(allowedOrigin).replace(/</g, '\\u003c');

  const html = `<!DOCTYPE html>
<html lang="ko">
<head><meta charset="utf-8" /><title>인증 중...</title></head>
<body>
<script>
(function () {
  var message = ${safeMessage};
  var allowedOrigin = ${safeOrigin};

  function send(e) {
    if (e.origin !== allowedOrigin) return;
    window.removeEventListener('message', send, false);
    window.opener.postMessage(message, allowedOrigin);
  }

  window.addEventListener('message', send, false);

  // Decap에 팝업이 준비됐음을 알림 → Decap이 메시지 전송 → send() 호출됨
  window.opener.postMessage('authorizing:github', allowedOrigin);
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
