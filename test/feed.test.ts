import { makeItem, formatStringToDate } from './../src/lib/feed';
import { Post } from './../src/lib/api';

describe('makeItem', () => {
  const postData: Post = {
      slug: 'example-post',
      title: 'Example Post',
      date: '01-Aug-2022',
      description: 'This is an example post',
      content: 'This is the content of the example post',
      minutesToRead: ''
  };

  it('returns an object with the correct properties', () => {
    const result = makeItem(postData);
    expect(result.title).toBe(postData.title);
    expect(result.link).toContain(postData.slug);
    expect(result.id).toContain(postData.slug);
    expect(result.date).toEqual(new Date('2022-07-31T18:30:00.000Z'));
    expect(result.description).toBe(postData.description);
    expect(result.content).toContain(postData.content);
  });
});

describe('formatStringToDate', () => {
  it('returns a Date object', () => {
    const result = formatStringToDate('01-Aug-2022');
    expect(result instanceof Date).toBe(true);
  });

  it('returns the correct date', () => {
    const result = formatStringToDate('01-Aug-2022');
    expect(result.getFullYear()).toBe(2022);
    // Months are zero-indexed 🤦‍♂️
    expect(result.getMonth()).toBe(7);
    expect(result.getDate()).toBe(1);
  });

  it('uses the default format if no format is provided', () => {
    const result = formatStringToDate('01-January-2022');
    expect(result.getFullYear()).toBe(2022);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  });

  it('uses the provided format if one is provided', () => {
    const result = formatStringToDate('01/01/2022', 'dd/MM/yyyy');
    expect(result.getFullYear()).toBe(2022);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  });
});