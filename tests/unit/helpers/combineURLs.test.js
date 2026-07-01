import { describe, it, expect } from 'vitest';
import combineURLs from '../../../lib/helpers/combineURLs.js';

describe('helpers::combineURLs', () => {
  it('should combine URLs', () => {
    expect(combineURLs('https://api.github.com', '/users')).toBe('https://api.github.com/users');
  });

  it('should remove duplicate slashes', () => {
    expect(combineURLs('https://api.github.com/', '/users')).toBe('https://api.github.com/users');
  });

  it('should insert missing slash', () => {
    expect(combineURLs('https://api.github.com', 'users')).toBe('https://api.github.com/users');
  });

  it('should not insert slash when relative url missing/empty', () => {
    expect(combineURLs('https://api.github.com/users', '')).toBe('https://api.github.com/users');
  });

  it('should allow a single slash for relative url', () => {
    expect(combineURLs('https://api.github.com/users', '/')).toBe('https://api.github.com/users/');
  });

  it('should strip 3 trailing slashes from baseURL when relativeURL starts with /', () => {
    expect(combineURLs('https://api.example.com///', '/users')).toBe('https://api.example.com/users');
  });

  it('should strip 4 trailing slashes from baseURL when relativeURL is relative', () => {
    expect(combineURLs('https://api.example.com////', 'users')).toBe('https://api.example.com/users');
  });

  it('regression: should strip 2 trailing slashes from baseURL', () => {
    expect(combineURLs('https://api.example.com//', 'users')).toBe('https://api.example.com/users');
  });

  it('regression: should handle baseURL without trailing slash', () => {
    expect(combineURLs('https://api.example.com', '/users')).toBe('https://api.example.com/users');
  });

  it('regression: should handle baseURL with single trailing slash', () => {
    expect(combineURLs('https://api.example.com/', '/users')).toBe('https://api.example.com/users');
  });

  it('regression: should not insert slash when relativeURL is empty (3 trailing slashes)', () => {
    expect(combineURLs('https://api.example.com///', '')).toBe('https://api.example.com///');
  });
});
