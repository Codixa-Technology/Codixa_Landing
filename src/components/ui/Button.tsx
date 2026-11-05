import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";
import styles from "./Button.module.css";

type Variant = "primary" | "dark" | "secondary" | "ghost";

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: "md" | "lg";
  icon?: IconName | null;
  className?: string;
  children: ReactNode;
}

const cx = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(" ");

export const buttonClass = (variant: Variant = "primary", size: "md" | "lg" = "md", className?: string) =>
  cx(styles.button, styles[variant], size === "lg" && styles.lg, className);

/** Internal navigation styled as a button. The primary variant is reserved for the main action on screen. */
export function ButtonLink({ variant = "primary", size = "md", icon = "arrowRight", className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...rest}>
      <span>{children}</span>
      {icon && <Icon name={icon} size={18} strokeWidth={2.1} className={styles.icon} />}
    </Link>
  );
}
