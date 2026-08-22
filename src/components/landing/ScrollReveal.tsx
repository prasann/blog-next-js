import { useEffect, useRef, useState, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal transition starts, in milliseconds. */
  delay?: number;
  /** Direction the content travels from as it reveals. */
  direction?: Direction;
};

const hiddenOffset: Record<Direction, string> = {
  up: "translate-y-12",
  down: "-translate-y-12",
  left: "-translate-x-12",
  right: "translate-x-12",
};

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Users who prefer reduced motion see content immediately, no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible
          ? "opacity-100 translate-x-0 translate-y-0"
          : `opacity-0 ${hiddenOffset[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
