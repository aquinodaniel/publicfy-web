import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50";

const variants = {
  primary:
    "bg-gold bg-left text-[#0a1f26] font-bold shadow-gold hover:bg-right hover:-translate-y-0.5 hover:shadow-gold-hover active:translate-y-0 [transition:background-position_.5s_ease,transform_.2s_ease,box-shadow_.2s_ease]",
  secondary:
    "bg-secondary/60 text-foreground border border-border hover:border-primary/50 hover:-translate-y-0.5 backdrop-blur",
  ghost: "text-foreground/80 hover:text-foreground hover:bg-secondary/60",
};

const sizes = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
  sm: "h-9 px-4 text-sm",
};

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  href?: string;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href">;

export function Button({
  variant = "primary",
  size = "md",
  href = "#",
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}
