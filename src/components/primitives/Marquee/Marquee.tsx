import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import styles from "./Marquee.module.css";

export interface MarqueeProps {
  children: ReactNode;
  /** Pixels travelled per second. Framer's tickers all run at 50. */
  speed?: number;
  /** Gap between items, in pixels. */
  gap?: number;
  direction?: "left" | "right";
  /** Width of the edge fade as a percentage of the track. */
  fadeWidth?: number;
  className?: string;
  style?: CSSProperties;
  /** Height of each row item, forwarded to the list items. */
  itemHeight?: number | string;
}

const MIN_GROUPS = 2;

/**
 * Seamless infinite ticker matching Framer's Ticker component: a single group
 * of children is measured, duplicated enough times to overflow the viewport,
 * then translated by exactly one group width on a linear loop.
 */
export function Marquee({
  children,
  speed = 50,
  gap = 32,
  direction = "left",
  fadeWidth = 25,
  className,
  style,
  itemHeight,
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);
  const [groupWidth, setGroupWidth] = useState(0);
  const [groups, setGroups] = useState(MIN_GROUPS);

  const measure = useCallback(() => {
    const group = groupRef.current;
    const root = rootRef.current;
    if (!group || !root) return;
    const width = group.getBoundingClientRect().width;
    if (width <= 0) return;
    setGroupWidth(width);
    const rootWidth = root.getBoundingClientRect().width;
    setGroups(Math.max(MIN_GROUPS, Math.ceil(rootWidth / (width + gap)) + 1));
  }, [gap]);

  useLayoutEffect(measure, [measure, children]);

  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    if (rootRef.current) observer.observe(rootRef.current);
    if (groupRef.current) observer.observe(groupRef.current);
    return () => observer.disconnect();
  }, [measure]);

  const items = Children.toArray(children);
  const distance = groupWidth + gap;
  const duration = distance > 0 ? distance / speed : 0;

  const renderGroup = (groupIndex: number) => (
    <ul
      key={groupIndex}
      className={styles.group}
      ref={groupIndex === 0 ? groupRef : undefined}
      style={{ gap: `${gap}px`, marginRight: `${gap}px` }}
      aria-hidden={groupIndex > 0 || undefined}
    >
      {items.map((item, itemIndex) => (
        <li key={itemIndex} className={styles.item} style={{ height: itemHeight }}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div
      ref={rootRef}
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={
        {
          ...style,
          "--marquee-fade": `${fadeWidth / 2}%`,
          "--marquee-fade-end": `${100 - fadeWidth / 2}%`,
        } as CSSProperties
      }
    >
      <div
        className={styles.track}
        style={{
          animationDuration: duration ? `${duration}s` : undefined,
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationPlayState: duration ? "running" : "paused",
          "--marquee-distance": `${distance}px`,
        } as CSSProperties}
      >
        {Array.from({ length: groups }, (_, index) => renderGroup(index))}
      </div>
    </div>
  );
}
