import type { ReactNode } from "react";

/** Re-mounts on every navigation, giving page content a short entrance. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
