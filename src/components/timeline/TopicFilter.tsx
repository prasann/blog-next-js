import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

// Broad topics in a fixed, deliberate order (roughly most- to least-covered).
// Keep in sync with TAG_MAP in src/lib/api.ts.
const TAG_ORDER = [
  "AI/LLM",
  "JavaScript",
  "Java",
  "Architecture",
  "DevOps",
  "Testing",
  "Web",
  "Android",
  "Ruby",
  "Clojure",
  "Go",
  "Tips & Tricks",
];

type TopicFilterProps = {
  tagCounts: Record<string, number>;
  activeTag: string | null;
  onSelectTag: (tag: string | null) => void;
};

const TopicFilter = ({ tagCounts, activeTag, onSelectTag }: TopicFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tags = TAG_ORDER.filter((tag) => tagCounts[tag]);

  // Closes the panel on outside click (mobile: inline panel; desktop: floating popover).
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const pillClasses = (isActive: boolean) =>
    `flex-shrink-0 px-4 py-2.5 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer ${
      isActive
        ? "bg-theme-accent-medium text-theme-text-primary border-theme-accent-medium"
        : "bg-theme-glass-light border-theme-border-medium text-theme-text-secondary hover:border-theme-border-accent-medium hover:text-theme-text-primary"
    }`;

  return (
    <div className="relative w-full flex-shrink-0 md:w-auto" ref={containerRef}>
      <button
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-theme-glass-light border border-theme-border-medium rounded-xl hover:bg-theme-glass-medium transition-colors duration-200 cursor-pointer"
      >
        <FontAwesomeIcon icon={faFilter} className="text-theme-accent" />
        <span>{activeTag ? `Topic: ${activeTag}` : "Filter by topic"}</span>
        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className="text-xs text-theme-text-muted"
        />
      </button>

      {isOpen && (
        // Mobile: renders in normal flow (pushes content down), pills scroll horizontally.
        // Desktop (md+): floats as a popover instead, so it doesn't shift the cadence strip/cards.
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:absolute md:right-0 md:z-30 md:mt-2 md:w-[24rem] md:flex-wrap md:overflow-visible md:rounded-xl md:border md:border-theme-border-medium md:bg-base-200 md:p-3 md:shadow-xl md:pb-3">
          <button onClick={() => onSelectTag(null)} className={pillClasses(activeTag === null)}>
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                onSelectTag(activeTag === tag ? null : tag);
                setIsOpen(false);
              }}
              className={pillClasses(activeTag === tag)}
            >
              {tag} <span className="opacity-70">({tagCounts[tag]})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopicFilter;
