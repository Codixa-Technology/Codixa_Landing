import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "./Scrollbar.module.css";

/** Shortest the thumb may get on very long pages, in pixels. */
const MIN_THUMB = 64;
/** Stillness before the rail dims back down, in milliseconds. */
const IDLE_DELAY = 1000;
/** Per-frame easing applied to the thumb while free-scrolling. */
const EASING = 0.22;
/** Sub-pixel gap at which the thumb counts as settled and the loop stops. */
const EPSILON = 0.2;

/**
 * Overlay scrollbar replacing the native one: a hairline rail that fills with
 * the accent as the page advances, and a pill thumb that eases toward the real
 * scroll position, can be dragged, and dims after the page goes still.
 * Pointer-coarse devices keep their own transient bars instead.
 */
export function Scrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  /** Track height, thumb height and max scroll — refreshed on resize. */
  const metrics = useRef({ track: 0, thumb: 0, max: 0 });
  /** Thumb offset the page is asking for, and the one currently painted. */
  const target = useRef(0);
  const painted = useRef(0);
  const frame = useRef(0);
  const idle = useRef<number | undefined>(undefined);
  const drag = useRef<{ pointer: number; startY: number; startScroll: number } | null>(null);
  const reduced = useRef(false);

  const [enabled, setEnabled] = useState(false);
  const [awake, setAwake] = useState(false);
  const [dragging, setDragging] = useState(false);

  const render = useCallback(() => {
    frame.current = 0;
    const { track, thumb } = metrics.current;
    const distance = target.current - painted.current;
    const settled = drag.current !== null || reduced.current || Math.abs(distance) < EPSILON;
    painted.current = settled ? target.current : painted.current + distance * EASING;

    const offset = painted.current;
    if (thumbRef.current) {
      thumbRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    }
    if (fillRef.current) {
      fillRef.current.style.transform = `scaleY(${track ? (offset + thumb) / track : 0})`;
    }
    if (!settled) frame.current = requestAnimationFrame(render);
  }, []);

  const sync = useCallback(() => {
    const { track, thumb, max } = metrics.current;
    if (max <= 0) return;
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    target.current = progress * (track - thumb);
    if (!frame.current) frame.current = requestAnimationFrame(render);
  }, [render]);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const viewport = window.innerHeight;
    const total = document.documentElement.scrollHeight;
    const max = total - viewport;
    if (max <= 1) {
      metrics.current = { track: 0, thumb: 0, max: 0 };
      setEnabled(false);
      return;
    }
    const height = track.clientHeight;
    metrics.current = {
      track: height,
      thumb: Math.max(MIN_THUMB, Math.round((viewport / total) * height)),
      max,
    };
    track.style.setProperty("--thumb-height", `${metrics.current.thumb}px`);
    setEnabled(true);
    sync();
  }, [sync]);

  const wake = useCallback(() => {
    setAwake(true);
    window.clearTimeout(idle.current);
    idle.current = window.setTimeout(() => setAwake(false), IDLE_DELAY);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reduced.current = query.matches;
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      sync();
      wake();
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);
      observer.observe(document.documentElement);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      observer?.disconnect();
      window.clearTimeout(idle.current);
      if (frame.current) cancelAnimationFrame(frame.current);
      // Must clear the id too, or the scheduling guard in sync() stays latched
      // shut when the effect re-runs (StrictMode mounts twice).
      frame.current = 0;
    };
  }, [measure, sync, wake]);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    drag.current = {
      pointer: event.pointerId,
      startY: event.clientY,
      startScroll: window.scrollY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    document.body.style.userSelect = "none";
    setDragging(true);
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state || state.pointer !== event.pointerId) return;
    const { track, thumb, max } = metrics.current;
    const span = track - thumb;
    if (span <= 0) return;
    const delta = ((event.clientY - state.startY) / span) * max;
    window.scrollTo({ top: state.startScroll + delta, behavior: "instant" });
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    drag.current = null;
    document.body.style.userSelect = "";
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  /** Clicking the bare track jumps the page, centring the thumb on the click. */
  const jump = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const { track, thumb, max } = metrics.current;
    const span = track - thumb;
    if (span <= 0) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const offset = event.clientY - bounds.top - thumb / 2;
    const progress = Math.min(1, Math.max(0, offset / span));
    window.scrollTo({ top: progress * max });
  };

  return (
    <div
      ref={trackRef}
      className={styles.root}
      data-enabled={enabled || undefined}
      data-awake={awake || undefined}
      data-dragging={dragging || undefined}
      onPointerDown={jump}
      aria-hidden="true"
    >
      <span className={styles.rail} />
      <span ref={fillRef} className={styles.fill} />
      <div
        ref={thumbRef}
        className={styles.thumb}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      />
    </div>
  );
}
