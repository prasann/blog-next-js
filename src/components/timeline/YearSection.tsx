import { forwardRef } from "react";
import Reveal from "./Reveal";

type YearSectionProps = {
  year: number;
  count: number;
  itemLabel: string;
  children: React.ReactNode;
};

const YearSection = forwardRef<HTMLDivElement, YearSectionProps>(
  ({ year, count, itemLabel, children }, ref) => {
    const label = count === 1 ? itemLabel.slice(0, -1) : itemLabel;
    return (
      <section ref={ref} data-year={year} className="scroll-mt-24 mb-12">
        <Reveal>
          <div className="flex items-baseline gap-3 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold gradient-heading">{year}</h2>
            <span className="text-sm text-theme-text-muted">
              {count} {label}
            </span>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
      </section>
    );
  }
);

YearSection.displayName = "YearSection";

export default YearSection;
