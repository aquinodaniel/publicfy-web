import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { proofBar } from "@/content/site";

export function ProofBar() {
  // duplica a lista para loop contínuo do marquee
  const items = [...proofBar.logos, ...proofBar.logos];

  return (
    <div className="relative border-y border-border bg-secondary/20">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-8 md:px-8">
        <Reveal>
          <p className="kicker mb-6 text-center text-[11px] text-muted-foreground">{proofBar.text}</p>
        </Reveal>
      </div>

      {/* marquee com fade nas bordas */}
      <Reveal
        delay={0.1}
        className="group relative overflow-hidden pb-8 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
      >
        <div
          className="flex w-max animate-marquee-x items-center gap-16 group-hover:[animation-play-state:paused]"
          style={{ "--marquee-duration": "34s" } as CSSProperties}
        >
          {items.map((logo, i) => (
            <span
              key={i}
              className="font-display text-lg font-semibold whitespace-nowrap text-muted-foreground/70 transition-colors hover:text-primary"
            >
              {logo}
            </span>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
