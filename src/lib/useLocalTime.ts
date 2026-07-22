import { useEffect, useState } from "react";

const FORMAT: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

/**
 * Live wall-clock for a given IANA time zone, ticking once per second.
 * Starts empty so the first paint never mismatches the rendered markup.
 */
export function useLocalTime(timeZone: string) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", { ...FORMAT, timeZone });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
