import { describe, it, expect, afterEach, vi } from 'vitest';
import {
  signAccessToken,
  verifyAccessToken,
  labelForCode,
  isGatedSlug,
  hasAnyGatedDocs,
} from './docs-access';

const SECRET = 'test-secret-please-change-1234567890';

describe('isGatedSlug (empty gated-docs.json by default)', () => {
  it('nothing is gated when no doc is marked access:gated', () => {
    expect(hasAnyGatedDocs()).toBe(false);
    expect(isGatedSlug('anonymized-cctv')).toBe(false);
  });
});

describe('labelForCode', () => {
  afterEach(() => {
    delete process.env.DOCS_ACCESS_CODES;
  });

  it('matches a `label:code` pair and returns the label', () => {
    process.env.DOCS_ACCESS_CODES = 'acme:AB12, globex:EF34';
    expect(labelForCode('AB12')).toBe('acme');
    expect(labelForCode('EF34')).toBe('globex');
  });

  it('supports a bare code (label = code)', () => {
    process.env.DOCS_ACCESS_CODES = 'PLAINCODE';
    expect(labelForCode('PLAINCODE')).toBe('PLAINCODE');
  });

  it('returns null for an unknown or empty code', () => {
    process.env.DOCS_ACCESS_CODES = 'acme:AB12';
    expect(labelForCode('WRONG')).toBeNull();
    expect(labelForCode('')).toBeNull();
  });

  it('returns null when no codes are configured', () => {
    expect(labelForCode('AB12')).toBeNull();
  });
});

describe('signAccessToken / verifyAccessToken', () => {
  afterEach(() => {
    delete process.env.DOCS_ACCESS_SECRET;
    vi.useRealTimers();
  });

  it('a freshly signed token verifies', async () => {
    process.env.DOCS_ACCESS_SECRET = SECRET;
    const token = await signAccessToken();
    expect(token).toBeTruthy();
    expect(await verifyAccessToken(token)).toBe(true);
  });

  it('fails closed when no secret is set', async () => {
    expect(await signAccessToken()).toBeNull();
    expect(await verifyAccessToken('123.deadbeef')).toBe(false);
  });

  it('rejects a tampered signature', async () => {
    process.env.DOCS_ACCESS_SECRET = SECRET;
    const token = await signAccessToken();
    const payload = token!.slice(0, token!.lastIndexOf('.'));
    expect(await verifyAccessToken(`${payload}.0000`)).toBe(false);
  });

  it('rejects a tampered payload (forged longer expiry)', async () => {
    process.env.DOCS_ACCESS_SECRET = SECRET;
    const token = await signAccessToken();
    const sig = token!.slice(token!.lastIndexOf('.') + 1);
    expect(await verifyAccessToken(`${Date.now() + 999_999_999}.${sig}`)).toBe(false);
  });

  it('rejects a token signed with a different secret', async () => {
    process.env.DOCS_ACCESS_SECRET = SECRET;
    const token = await signAccessToken();
    process.env.DOCS_ACCESS_SECRET = 'a-completely-different-secret-0000';
    expect(await verifyAccessToken(token)).toBe(false);
  });

  it('rejects an expired token', async () => {
    process.env.DOCS_ACCESS_SECRET = SECRET;
    const token = await signAccessToken();
    vi.useFakeTimers();
    vi.setSystemTime(Date.now() + 31 * 24 * 60 * 60 * 1000); // past the 30-day expiry
    expect(await verifyAccessToken(token)).toBe(false);
  });

  it('rejects malformed tokens', async () => {
    process.env.DOCS_ACCESS_SECRET = SECRET;
    expect(await verifyAccessToken('')).toBe(false);
    expect(await verifyAccessToken('no-dot')).toBe(false);
    expect(await verifyAccessToken(undefined)).toBe(false);
  });
});
