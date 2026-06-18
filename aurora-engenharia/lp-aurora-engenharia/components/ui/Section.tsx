import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "kicker inline-flex items-center gap-2 text-[11px] font-medium text-primary",
        className
      )}
    >
      <span className="h-px w-6 bg-primary/50" />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className={cn("max-w-2xl text-base text-muted-foreground md:text-lg", align === "center" && "mx-auto")}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

type Surface = "base" | "raised" | "deep" | "paper";
type Glow = "none" | "gold-l" | "gold-r" | "cyan-l" | "cyan-r";

function SectionBackground({
  surface,
  glow,
  texture,
}: {
  surface: Surface;
  glow: Glow;
  texture?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {surface === "raised" && (
        <>
          <div className="absolute inset-0 bg-secondary/25" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </>
      )}
      {surface === "deep" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_100%_at_50%_-10%,transparent_55%,#040c10_100%)]" />
      )}
      {surface === "paper" && (
        <>
          <div className="absolute inset-0 bg-[#f4efe6]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,#ffffff,transparent_70%)] opacity-70" />
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "linear-gradient(to right,#3065791f 1px,transparent 1px),linear-gradient(to bottom,#3065791f 1px,transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,#000 30%,transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%,#000 30%,transparent 100%)",
            }}
          />
        </>
      )}

      {texture && surface !== "paper" && (
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
      )}

      {glow === "gold-l" && (
        <div className="absolute -left-56 top-1/4 h-[460px] w-[580px] rounded-full bg-primary/[0.05] blur-[150px]" />
      )}
      {glow === "gold-r" && (
        <div className="absolute -right-56 top-1/3 h-[460px] w-[580px] rounded-full bg-primary/[0.05] blur-[150px]" />
      )}
      {glow === "cyan-l" && (
        <div className="absolute -left-56 top-1/3 h-[440px] w-[540px] rounded-full bg-accent/[0.045] blur-[150px]" />
      )}
      {glow === "cyan-r" && (
        <div className="absolute -right-56 top-1/4 h-[440px] w-[540px] rounded-full bg-accent/[0.045] blur-[150px]" />
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  containerClassName,
  surface = "base",
  glow = "none",
  texture = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  surface?: Surface;
  glow?: Glow;
  texture?: boolean;
}) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28 lg:py-32", className)}>
      <SectionBackground surface={surface} glow={glow} texture={texture} />
      <div className={cn("relative z-10 mx-auto w-full max-w-[1200px] px-6 md:px-8", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
