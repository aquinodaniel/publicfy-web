"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionStyle } from "framer-motion";
import { Check, ShieldCheck, MessageCircle } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { offer, whatsappLink } from "@/content/site";

export function Offer() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 });
  const glareX = useTransform(mx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(my, [0, 1], ["0%", "100%"]);
  const glareBg = useTransform(
    [glareX, glareY] as const,
    ([x, y]: string[]) => `radial-gradient(400px circle at ${x} ${y}, hsl(var(--primary)/0.12), transparent 60%)`
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <Section id="oferta" surface="deep" glow="gold-l">
      <SectionHeader eyebrow={offer.eyebrow} title={offer.title} align="center" />

      <Reveal delay={0.1}>
        <div className="mx-auto mt-12 max-w-2xl" style={{ perspective: 1200 }}>
          <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" } as MotionStyle}
            className="relative"
          >
            {/* borda cônica girando (glow premium) */}
            <div className="pointer-events-none absolute -inset-px overflow-hidden rounded-3xl">
              <div className="absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow bg-[conic-gradient(from_0deg,transparent,#c9a961_15%,transparent_35%,transparent_65%,#67e8f9_80%,transparent)] opacity-40" />
            </div>

            <div className="relative overflow-hidden rounded-3xl border-2 border-primary/40 bg-card animate-pulse-glow">
              {/* glare seguindo o mouse */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-20 opacity-60"
                style={{ background: glareBg }}
              />

              <div className="relative z-10 bg-primary px-6 py-3 text-center">
                <span className="text-sm font-semibold text-primary-foreground">{offer.highlight}</span>
              </div>

              <div className="relative z-10 flex flex-col gap-6 p-8 md:p-10">
                <div className="text-center">
                  <p className="font-display text-5xl font-extrabold text-gold tabular md:text-6xl">
                    {offer.installments}
                  </p>
                  <p className="mt-1 text-muted-foreground">{offer.cash}</p>
                </div>

                <ul className="flex flex-col gap-3">
                  {offer.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-3 text-sm text-foreground/90">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-3 w-3" />
                      </span>
                      {inc}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3">
                  <Button href={whatsappLink} external size="lg" className="w-full">
                    {offer.cta}
                  </Button>
                  <Button href={whatsappLink} external variant="secondary" className="w-full">
                    <MessageCircle className="h-5 w-5" />
                    {offer.specialistCta}
                  </Button>
                </div>

                <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/40 p-4">
                  <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-success" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{offer.guarantee.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{offer.guarantee.text}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Reveal>
    </Section>
  );
}
