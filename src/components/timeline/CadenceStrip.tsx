type CadenceStripProps = {
  years: number[]; // descending, full/unfiltered dataset
  yearCounts: Record<number, number>; // global counts, build-time
  visibleYears: Set<number>; // years with a match under the active filter
  activeYear: number | null;
  onSelectYear: (year: number) => void;
};

// Sticky per-year map: intensity reflects overall volume, click/scroll-spy
// tie it to the timeline below. Dimmed cells stay in place (rather than being
// removed) so the shape of the timeline reads as continuous even while filtered.
const CadenceStrip = ({
  years,
  yearCounts,
  visibleYears,
  activeYear,
  onSelectYear,
}: CadenceStripProps) => {
  const maxCount = Math.max(...years.map((year) => yearCounts[year] || 0), 1);

  return (
    <div className="sticky top-0 z-20 -mx-4 px-4 py-3 mb-8 bg-base-100/85 backdrop-blur-md border-b border-theme-border-light">
      <div className="max-w-6xl mx-auto flex items-end gap-1 md:gap-1.5 overflow-x-auto">
        {years.map((year) => {
          const count = yearCounts[year] || 0;
          const intensity = 0.25 + 0.75 * (count / maxCount);
          const isDimmed = !visibleYears.has(year);
          const isActive = activeYear === year;

          return (
            <button
              key={year}
              onClick={() => onSelectYear(year)}
              disabled={isDimmed}
              title={`${year} \u00b7 ${count} ${count === 1 ? "entry" : "entries"}`}
              className={`group flex flex-shrink-0 flex-col items-center gap-1 rounded-md px-1.5 py-1 transition-all duration-200 ${
                isDimmed
                  ? "cursor-not-allowed opacity-30"
                  : "cursor-pointer hover:bg-theme-glass-medium"
              }`}
            >
              <span
                className={`text-[10px] leading-none ${
                  isActive
                    ? "font-semibold text-theme-cyan-light"
                    : "text-theme-text-secondary"
                }`}
              >
                {count}
              </span>
              <span
                className={`block w-2 rounded-full transition-all duration-200 md:w-2.5 ${
                  isActive
                    ? "bg-theme-cyan ring-2 ring-theme-cyan/40"
                    : "bg-theme-accent"
                }`}
                style={{
                  height: `${8 + intensity * 20}px`,
                  opacity: isDimmed ? 0.4 : intensity,
                }}
              />
              <span
                className={`text-[10px] md:text-xs ${
                  isActive
                    ? "font-semibold text-theme-cyan-light"
                    : "text-theme-text-muted"
                }`}
              >
                {year}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CadenceStrip;
