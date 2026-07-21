import crypto from 'node:crypto';
import { koreaTime } from '@/lib/api-utils';

/**
 * Lead store — durable persistence for contact/enterprise leads (enterprise_재설계_v1 §5-3).
 *
 * Appends each submitted lead as a row to a Google Sheet, so leads survive beyond the
 * fire-and-forget Slack notification. Auth is a Google **service account** (JWT → OAuth
 * token → Sheets API v4 `values:append`), implemented with `node:crypto` only — no new
 * dependency. Server-only.
 *
 * ENV-GATED: with none of the keys set (dev/preview), every call is a silent no-op, so the
 * pipeline is fully wired and ships now; drop the keys in later to switch it on:
 *   • GOOGLE_SHEETS_ID                 — the spreadsheet id (from its URL)
 *   • GOOGLE_SERVICE_ACCOUNT_EMAIL     — the service account's email
 *   • GOOGLE_PRIVATE_KEY               — its private key (literal "\n" newlines are handled)
 *   • GOOGLE_SHEETS_RANGE  (optional)  — default "Leads!A:K"
 * Grant the service account edit access to the sheet. Column order = the row built below.
 */

export type Lead = {
  name: string;
  contact: string;
  storeCount: string;
  affiliationType?: string;
  brandName?: string;
  product?: string | null;
  plan?: string | null;
  inquiryType?: string;
  message?: string;
  source?: string;
};

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;
const SA_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const SA_KEY = process.env.GOOGLE_PRIVATE_KEY;
const SHEET_RANGE = process.env.GOOGLE_SHEETS_RANGE || 'Leads!A:K';

/** True only when all service-account keys are present. Guards every network call. */
export function isLeadStoreEnabled(): boolean {
  return Boolean(SHEET_ID && SA_EMAIL && SA_KEY);
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/** Mint a short-lived Google OAuth access token from the service-account JWT (RS256). */
async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(
    JSON.stringify({
      iss: SA_EMAIL,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  );
  const signingInput = `${header}.${claim}`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(signingInput);
  signer.end();
  const signature = base64url(signer.sign((SA_KEY as string).replace(/\\n/g, '\n')));
  const assertion = `${signingInput}.${signature}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  if (!res.ok) throw new Error(`google token exchange failed: ${res.status}`);
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error('google token exchange returned no access_token');
  return json.access_token;
}

/**
 * Append one lead as a Sheet row. No-op (resolves) when the store is not configured.
 * Throws on API failure — callers should `Promise.allSettled` so a storage failure never
 * blocks the user response or the Slack path (see api/contact/route.ts).
 */
export async function saveLead(lead: Lead): Promise<void> {
  if (!isLeadStoreEnabled()) return;

  const token = await getAccessToken();
  const row = [
    koreaTime(),
    lead.source ?? 'general',
    lead.name,
    lead.contact,
    lead.storeCount,
    lead.affiliationType ?? '',
    lead.brandName ?? '',
    lead.product ?? '',
    lead.plan ?? '',
    lead.inquiryType ?? '',
    lead.message ?? '',
  ];

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/` +
    `${encodeURIComponent(SHEET_RANGE)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) throw new Error(`sheets append failed: ${res.status}`);
}
