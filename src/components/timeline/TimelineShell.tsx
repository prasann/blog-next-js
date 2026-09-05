import { useEffect, useMemo, useRef, useState } from "react";
import { groupByYear } from "../../lib/timeline";
import CadenceStrip from "./CadenceStrip";
import YearSection from "./YearSection";
import Reveal from "./Reveal";

type TimelineItem = { date: string; tags: string[] };

type TimelineShellProps<T extends TimelineItem> = {
  title: string;
  archiveLeadIn: string;
  items: T[];
  tagCounts: Record<string, number>;
  yearCounts: Record<number, number>;
  itemLabel: string; // e.g. "posts" or "talks"
  itemKey: (item: T) => string;
  renderCard: (item: T) => React.ReactNode;
};

function TimelineShell<T extends TimelineItem>({
  title,
  archiveLeadIn,
  items,
  tagCounts,
  yearCounts,
  itemLabel,
  itemKey,
  renderCard,
}: TimelineShellProps<T>) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<number | null>(null);
  const sectionRefs = useRef(new Map<number, HTMLElement>());

  const allYears = useMemo(
    () =>
      Object.keys(yearCounts)
        .map(Number)
        .sort((a, b) => b - a),
    [yearCounts],
  );
  const topics = useMemo(
    () =>
      Object.entries(tagCounts).sort(
        ([, firstCount], [, secondCount]) => secondCount - firstCount,
      ),
    [tagCounts],
  );
  const totalItems = items.length;
  const firstYear = allYears.at(-1);

  const filteredItems = useMemo(
    () =>
      activeTag ? items.filter((item) => item.tags.includes(activeTag)) : items,
    [items, activeTag],
  );

  const yearGroups = useMemo(() => groupByYear(filteredItems), [filteredItems]);
  const visibleYears = useMemo(
    () => new Set(yearGroups.map((group) => group.year)),
    [yearGroups],
  );

  // Jump the highlighted year back to the newest one whenever the topic filter changes.
  useEffect(() => {
    setActiveYear(yearGroups[0]?.year ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTag]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const topMostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (topMostVisible) {
          const year = Number(
            (topMostVisible.target as HTMLElement).dataset.year,
          );
          setActiveYear(year);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );
    sectionRefs.current.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [yearGroups]);

  const handleSelectYear = (year: number) => {
    sectionRefs.current
      .get(year)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div className="mb-5">
        <div className="max-w-2xl">
          <h1 className="sr-only">{title}</h1>
          <p className="text-3xl font-bold leading-tight text-theme-text-primary md:text-4xl">
            {archiveLeadIn}
            {firstYear && (
              <>
                {" since "}
                {firstYear}
              </>
            )}
            {" · "}
            <span className="gradient-heading">
              {totalItems} {itemLabel}
            </span>
          </p>
        </div>
      </div>
      {topics.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 border-t border-theme-border-light pt-3 text-xs">
          <span className="mr-1 font-semibold uppercase text-theme-text-muted">
            Explore topics
          </span>
          {topics.map(([tag, count]) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`rounded-md border px-2 py-1 transition-colors ${
                activeTag === tag
                  ? "border-theme-border-accent-dark bg-theme-bg-accent-medium text-theme-accent-light"
                  : "border-theme-border-light bg-theme-glass-light text-theme-text-secondary hover:border-theme-border-accent-medium hover:text-theme-accent-light"
              }`}
            >
              {tag} ({count})
            </button>
          ))}
          {activeTag && (
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className="px-1 text-theme-accent-light hover:text-theme-accent transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      )}
      <CadenceStrip
        years={allYears}
        yearCounts={yearCounts}
        visibleYears={visibleYears}
        activeYear={activeYear}
        onSelectYear={handleSelectYear}
      />
      <div>
        {yearGroups.map((group) => (
          <YearSection
            key={group.year}
            year={group.year}
            count={group.items.length}
            itemLabel={itemLabel}
            ref={(node) => {
              if (node) {
                sectionRefs.current.set(group.year, node);
              } else {
                sectionRefs.current.delete(group.year);
              }
            }}
          >
            {group.items.map((item, index) => (
              <Reveal
                key={itemKey(item)}
                delayMs={(index % 4) * 80}
                className="h-full"
              >
                {renderCard(item)}
              </Reveal>
            ))}
          </YearSection>
        ))}
      </div>
    </div>
  );
}

export default TimelineShell;
