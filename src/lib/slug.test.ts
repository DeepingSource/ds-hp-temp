import { describe, it, expect } from 'vitest';
import { toSlug } from './slug';

describe('toSlug', () => {
  it('영문을 lowercase + hyphen으로 변환', () => {
    expect(toSlug('Hello World')).toBe('hello-world');
  });

  it('한국어를 유지', () => {
    expect(toSlug('주간 브리핑')).toBe('주간-브리핑');
  });

  it('특수문자를 제거', () => {
    expect(toSlug('price: $100!')).toBe('price-100');
  });

  it('다중 공백을 단일 하이픈으로 축소', () => {
    expect(toSlug('a  b   c')).toBe('a-b-c');
  });

  it('빈 문자열 처리', () => {
    expect(toSlug('')).toBe('');
  });
});
