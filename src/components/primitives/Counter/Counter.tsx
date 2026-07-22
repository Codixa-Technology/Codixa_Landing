import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import styles from "./Counter.module.css";

export interface CounterProps {
  from: number;
  to: number;
  suffix?: string;
  prefix?: string;
  /** Seconds the count takes to settle. */
  duration?: number;
  className?: string;
}

/**
 * Count-up statistic. Runs once when the layer enters the viewport, using the
 * same critically-damped spring Framer uses (`bounce: 0`, 2s).
 */
export function Counter({
  from,
  to,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: CounterProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(from, to, {
      type: "spring",
      bounce: 0,
      duration,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, from, to, duration]);

  return (
    <h3 ref={ref} className={[styles.root, className].filter(Boolean).join(" ")}>
      {prefix}
      {value}
      {suffix}
    </h3>
  );
}
