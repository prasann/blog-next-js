// Pure, isomorphic timeline aggregation helpers shared by build-time (getStaticProps)
// and client-side (TimelineShell) code. No fs/path/gray-matter imports here so this
// module is safe to bundle into client components.

export type YearGroup<T> = { year: number; items: T[] };

// Global tag -> count map. A single item can carry multiple tags, so counts can exceed item total.
export function getTagCounts<T extends { tags: string[] }>(items: T[]): Record<string, number> {
  const counts: Record<string, number> = {};
  items.forEach((item) => {
    item.tags.forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return counts;
}

// Buckets items by year (newest first), preserving each year's incoming order.
export function groupByYear<T extends { date: string }>(items: T[]): YearGroup<T>[] {
  const groups = new Map<number, T[]>();
  items.forEach((item) => {
    const year = extractYear(item.date);
    if (!groups.has(year)) {
      groups.set(year, []);
    }
    groups.get(year)!.push(item);
  });
  return Array.from(groups.entries())
    .map(([year, yearItems]) => ({ year, items: yearItems }))
    .sort((a, b) => b.year - a.year);
}

export function getYearCounts<T extends { date: string }>(items: T[]): Record<number, number> {
  const counts: Record<number, number> = {};
  items.forEach((item) => {
    const year = extractYear(item.date);
    counts[year] = (counts[year] || 0) + 1;
  });
  return counts;
}

// Dates aren't all machine-parseable (e.g. a talk dated "Jun 27th & 28th, 2018"), so pull
// the year out with a regex instead of relying on a fixed date format.
function extractYear(date: string): number {
  const match = date.match(/(\d{4})/);
  if (!match) {
    throw new Error(`Cannot extract year from date: ${date}`);
  }
  return parseInt(match[1], 10);
}
