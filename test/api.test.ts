import { getAllUrlSlugs, getPostBySlug, getTalkDescription } from './../src/lib/api';

describe('getAllUrlSlugs', () => {
  it('returns an array of strings', () => {
    const result = getAllUrlSlugs();
    expect(Array.isArray(result)).toBe(true);
    expect(result.every((slug) => typeof slug === 'string')).toBe(true);
  });
});

describe('getPostBySlug', () => {
  it('returns a Post object', () => {
    const result = getPostBySlug('first-post');
    expect(typeof result).toBe('object');
    expect(result.title).toBeDefined();
    expect(result.date).toBeDefined();
    expect(result.content).toBeDefined();
  });

  it('throws an error if the file is not found', () => {
    expect(() => getPostBySlug('non-existent-post')).toThrow();
  });
});

describe('getTalkDescription', () => {
  it('returns a string', () => {
    const result = getTalkDescription('02-kafka-101.md');
    expect(typeof result).toBe('string');
  });
});