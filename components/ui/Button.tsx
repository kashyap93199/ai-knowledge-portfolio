import Link from "next/link";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-cyan text-ink hover:bg-cyan-soft focus-visible:outline-cyan shadow-glow font-semibold",
  secondary:
    "bg-violet text-white hover:bg-violet-soft hover:text-ink focus-visible:outline-violet shadow-glow-violet font-semibold",
  ghost:
    "text-slate-300 hover:bg-slate-800/60 hover:text-white dark:text-slate-200",
  outline:
    "border border-ink-line text-slate-200 hover:border-cyan/60 hover:text-cyan-soft bg-transparent",
  danger: "bg-danger/10 text-danger hover:bg-danger hover:text-white",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-base gap-2.5",
};

interface BaseButtonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: never };
type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseClasses =
  "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className, children, ...props }, ref) {
    const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

    if ("href" in props && props.href) {
      const { href, ...anchorProps } = props as ButtonAsLink;
      return (
        <Link href={href} ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(props as ButtonAsButton)}
      >
        {children}
      </button>
    );
  }
);