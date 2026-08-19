import { useEffect, useMemo, useRef, useState } from "react";
import { groupByYear } from "../../lib/timeline";
import TopicFilter from "./TopicFilter";
import CadenceStrip from "./CadenceStrip";
import YearSection from "./YearSection";
import Reveal from "./Reveal";

type TimelineItem = { date: string; tags: string[] };

type TimelineShellProps<T extends TimelineItem> = {
  title: string;
  subtitle: string;
  items: T[];
  tagCounts: Record<string, number>;
  yearCounts: Record<number, number>;
  itemLabel: string; // e.g. "posts" or "talks"
  itemKey: (item: T) => string;
  renderCard: (item: T) => React.ReactNode;
};

function TimelineShell<T extends TimelineItem>({
  title,
  subtitle,
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
    () => Object.keys(yearCounts).map(Number).sort((a, b) => b - a),
    [yearCounts]
  );

  const filteredItems = useMemo(
    () => (activeTag ? items.filter((item) => item.tags.includes(activeTag)) : items),
    [items, activeTag]
  );

  const yearGroups = useMemo(() => groupByYear(filteredItems), [filteredItems]);
  const visibleYears = useMemo(() => new Set(yearGroups.map((group) => group.year)), [yearGroups]);

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
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (topMostVisible) {
          const year = Number((topMostVisible.target as HTMLElement).dataset.year);
          setActiveYear(year);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    sectionRefs.current.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [yearGroups]);

  const handleSelectYear = (year: number) => {
    sectionRefs.current.get(year)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="gradient-heading text-3xl font-bold md:text-4xl">{title}</h1>
          <p className="mt-1 text-sm text-theme-text-muted">{subtitle}</p>
        </div>
        <TopicFilter tagCounts={tagCounts} activeTag={activeTag} onSelectTag={setActiveTag} />
      </div>
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
              <Reveal key={itemKey(item)} delayMs={(index % 4) * 80} className="h-full">
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
