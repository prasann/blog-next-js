import { getAllUrlSlugs, getPostBySlug, getTalkDescription } from './../src/lib/api';
import parseFrontmatter from '../src/lib/frontmatter';

describe('parseFrontmatter', () => {
  it.each([
    '---\ntitle: Example\nminutesToRead: 2\n---\nBody',
    '---json\n{"title":"Example","minutesToRead":2}\n---\nBody',
  ])('preserves data and content for supported frontmatter', (input) => {
    const result = parseFrontmatter(input);
    expect(result.data).toEqual({ title: 'Example', minutesToRead: 2 });
    expect(result.content).toBe('Body');
  });

  it.each(['javascript', 'js', 'JavaScript', 'JS'])(
    'rejects the %s engine without executing it, including with a BOM',
    (language) => {
      for (const prefix of ['', '\uFEFF']) {
        const input = `${prefix}---${language}\n(() => { throw new Error("executed"); })()\n---\nBody`;
        expect(() => parseFrontmatter(input)).toThrow('JavaScript frontmatter is not supported');
      }
    },
  );

  it('rejects executable YAML tags', () => {
    expect(() => parseFrontmatter('---\nvalue: !!js/function "function() {}"\n---\nBody'))
      .toThrow();
  });
});

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