import type { CSSProperties } from "react";
import { Icon } from "../ui/Icon";
import styles from "./CodePanel.module.css";

interface CodePanelProps {
  noteTitle: string;
  noteText: string;
}

type Token = [kind: "k" | "p" | "s" | "f" | "t", text: string];

/* Brand book p.14 — "Visual: dark panel with code and The Cut, not stock imagery." */
const lines: Token[][] = [
  [["k", "const "], ["t", "project"], ["p", " = {"]],
  [["t", "  scope"], ["p", ": "], ["s", "'web + crm'"], ["p", ","]],
  [["t", "  stack"], ["p", ": ["], ["s", "'design'"], ["p", ", "], ["s", "'code'"], ["p", "],"]],
  [["t", "  focus"], ["p", ": "], ["s", "'reliability'"], ["p", ","]],
  [["p", "};"]],
  [],
  [["k", "await "], ["t", "codixa"], ["p", "."], ["f", "build"], ["p", "(project);"]],
];

export function CodePanel({ noteTitle, noteText }: CodePanelProps) {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.panel}>
        <div className={styles.chrome}>
          <span />
          <span />
          <span />
          <p className={styles.file}>project.ts</p>
        </div>
        <pre className={styles.code}>
          {lines.map((tokens, i) => (
            <span key={i} className={styles.line} style={{ "--l": i } as CSSProperties}>
              <span className={styles.no}>{String(i + 1).padStart(2, "0")}</span>
              <code>
                {tokens.map(([kind, text], j) => (
                  <span key={j} className={styles[kind]}>
                    {text}
                  </span>
                ))}
                {i === lines.length - 1 && <span className={styles.caret} />}
              </code>
            </span>
          ))}
        </pre>
        <div className={styles.cutSecondary} />
        <div className={styles.cut} />
      </div>
      <div className={styles.note}>
        <span className={styles.noteIcon}>
          <Icon name="security" size={20} />
        </span>
        <span>
          <strong>{noteTitle}</strong>
          <small>{noteText}</small>
        </span>
      </div>
    </div>
  );
}
