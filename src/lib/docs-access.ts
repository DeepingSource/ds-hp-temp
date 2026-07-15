import gated from '@/data/generated/gated-docs.json';

/**
 * Gated-docs access mechanism (DOCS_WIKI_PLAN Phase 4).
 *
 * A doc with frontmatter `access: gated` is listed (by logical slug) in
 * gated-docs.json. The proxy redirects such paths to /resources/docs/access unless
 * the request carries a valid signed cookie; POST /api/docs-access issues that cookie
 * after checking a shared access code. Everything here is runtime-portable (Web Crypto
 * only) so the proxy can import it regardless of edge/nodejs runtime.
 *
 * Env (set on Vercel; all optional — with none set, nothing is gated in practice and
 * an unset secret makes verification always fail closed):
 *   DOCS_ACCESS_SECRET  — HMAC signing secret (any long random string).
 *   DOCS_ACCESS_CODES   — comma-separated `label:code` (or bare `code`) pairs.
 */

export const COOKIE_NAME = 'docs_access';
const MAX_AGE_DAYS = 30;
export const COOKIE_MAX_AGE = MAX_AGE_DAYS * 24 * 60 * 60; // seconds

const gatedSlugs = new Set((gated as { gatedSlugs: string[] }).gatedSlugs);

/** Is this logical (locale-agnostic) doc slug gated? */
export function isGatedSlug(logicalSlug: string): boolean {
  return gatedSlugs.has(logicalSlug);
}

/** True when at least one doc is gated (lets callers skip work when the feature is idle). */
export function hasAnyGatedDocs(): boolean {
  return gatedSlugs.size > 0;
}

function getSecret(): string | null {
  return process.env.DOCS_ACCESS_SECRET || null;
}

/** Constant-time string compare (length is not secret here). */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function hmacHex(secret: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  return toHex(sig);
}

/**
 * Validate a submitted access code against DOCS_ACCESS_CODES.
 * Returns a NON-SECRET label (safe to log) on match, or null.
 * Entries are `label:code` (colon-separated → returns the label) or a bare `code`
 * (returns the generic 'access', never the code itself, so nothing secret is logged;
 * use the `label:code` form for per-customer audit logs).
 */
export function labelForCode(code: string): string | null {
  const raw = process.env.DOCS_ACCESS_CODES || '';
  if (!code) return null;
  for (const entry of raw.split(',').map((s) => s.trim()).filter(Boolean)) {
    const idx = entry.indexOf(':');
    const label = idx >= 0 ? entry.slice(0, idx) : '';
    const value = idx >= 0 ? entry.slice(idx + 1) : entry;
    if (value && safeEqual(value, code)) return label || 'access';
  }
  return null;
}

/** Issue a signed access token ("<expiryMs>.<hmac>"), or null if no secret is set. */
export async function signAccessToken(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const payload = String(Date.now() + MAX_AGE_DAYS * 24 * 60 * 60 * 1000);
  const sig = await hmacHex(secret, payload);
  return `${payload}.${sig}`;
}

/** Verify a signed access token (signature + not expired). Fails closed. */
export async function verifyAccessToken(token: string | undefined | null): Promise<boolean> {
  const secret = getSecret();
  if (!secret || !token) return false;
  const dot = token.lastIndexOf('.');
  if (dot < 0) return false;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  const expected = await hmacHex(secret, payload);
  if (!safeEqual(sig, expected)) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && Date.now() < exp;
}
