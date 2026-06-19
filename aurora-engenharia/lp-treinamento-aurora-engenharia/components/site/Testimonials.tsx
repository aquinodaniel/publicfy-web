"use client";

import { useState, useRef, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Figure } from "@/components/ui/Figure";
import { testimonials, type Testimonial } from "@/content/site";

type Print = Extract<Testimonial, { type: "whatsapp" }>;
type Video = Extract<Testimonial, { type: "video" }>;

function PrintCard({ p }: { p: Print }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/50 bg-[#e9e3da] p-1.5 shadow-lg">
      <Figure src={p.image} alt={p.alt} label="Depoimento" imgClassName="block h-auto w-full rounded-lg object-contain" />
    </div>
  );
}

function SlotCard() {
  return <div className="h-[clamp(120px,15vw,170px)] rounded-xl border border-border/40 bg-white/[0.015]" />;
}

function VideoCard({ v, onClick }: { v: Video; onClick: () => void }) {
  // captura o toque/clique diretamente (resolve o clique enquanto o card está em movimento)
  const down = useRef<{ x: number; y: number } | null>(null);
  return (
    <button
      onPointerDown={(e) => {
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
        down.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const d = down.current;
        down.current = null;
        if (d && Math.abs(e.clientX - d.x) < 10 && Math.abs(e.clientY - d.y) < 10) onClick();
      }}
      className="group relative block h-[clamp(190px,24vw,260px)] w-full overflow-hidden rounded-xl border border-border bg-card shadow-xl ring-1 ring-inset ring-white/[0.06] transition-colors hover:border-primary/50"
    >
      <Figure src={v.thumb} alt={v.name} label={`Vídeo: ${v.name}`} imgClassName="h-full w-full object-cover" />
      <span className="absolute inset-0 flex items-center justify-center bg-background/25 transition-colors group-hover:bg-background/45">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
          <Play className="h-5 w-5 translate-x-0.5 fill-current" />
        </span>
      </span>
      <span className="absolute bottom-2 left-2 rounded-full bg-background/80 px-2.5 py-0.5 text-[11px] font-medium text-foreground backdrop-blur">
        {v.name}
      </span>
    </button>
  );
}

export function Testimonials() {
  const [active, setActive] = useState<Video | null>(null);

  const prints = testimonials.items.filter((i): i is Print => i.type === "whatsapp");
  const videos = testimonials.items.filter((i): i is Video => i.type === "video");

  // item da grade: "p<n>" print | "v<n>" vídeo | "s" slot vazio
  type Item = { kind: "print"; data: Print } | { kind: "video"; data: Video } | { kind: "slot" };
  const P = (n: number): Item => ({ kind: "print", data: prints[n % prints.length] });
  const V = (n: number): Item => ({ kind: "video", data: videos[n % Math.max(1, videos.length)] });
  const S: Item = { kind: "slot" };

  // 4 colunas com mistura de prints, slots e os 2 vídeos — sequência rola em loop
  const columns: { items: Item[]; dur: number; down: boolean; vis: string }[] = [
    { items: [P(0), S, P(1), V(0), P(2)], dur: 70, down: false, vis: "" },
    { items: [S, P(3), P(4), S, P(5)], dur: 86, down: true, vis: "hidden sm:block" },
    { items: [P(6), V(1), S, P(7), S], dur: 64, down: false, vis: "hidden md:block" },
    { items: [P(2), S, P(0), P(5), S], dur: 78, down: true, vis: "hidden lg:block" },
  ];

  const renderItem = (it: Item, key: number) => {
    const inner =
      it.kind === "print" ? (
        <PrintCard p={it.data} />
      ) : it.kind === "video" ? (
        <VideoCard v={it.data} onClick={() => setActive(it.data)} />
      ) : (
        <SlotCard />
      );
    // margin-bottom (não gap) p/ o loop do marquee fechar sem salto
    return (
      <div key={key} className="mb-3">
        {inner}
      </div>
    );
  };

  return (
    <Section id="depoimentos" surface="raised" glow="cyan-l">
      <SectionHeader
        eyebrow={testimonials.eyebrow}
        title={testimonials.title}
        subtitle={testimonials.subtitle}
        align="center"
      />

      {/* mural 3D: grade de prints inclinada em perspectiva, rolando na vertical */}
      <div
        className="relative mt-10 h-[clamp(420px,52vw,560px)] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]"
        style={{ perspective: "900px" }}
      >
        <div
          className="grid h-full grid-cols-1 gap-3 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          style={
            {
              transform: "rotateX(6deg) rotateY(-8deg) scale(1.06)",
              transformOrigin: "center center",
            } as CSSProperties
          }
        >
          {columns.map((col, ci) => (
            <div
              key={ci}
              className={"flex flex-col " + col.vis}
              style={{ animation: `${col.down ? "marquee-down" : "marquee-up"} ${col.dur}s linear infinite` }}
            >
              {[...col.items, ...col.items].map((it, k) => renderItem(it, k))}
            </div>
          ))}
        </div>
      </div>

      {/* lightbox de vídeo */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/90 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground"
              onClick={() => setActive(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className={
                active.orientation === "vertical"
                  ? "aspect-[9/16] h-[80vh] max-w-full overflow-hidden rounded-2xl border border-border bg-black"
                  : "aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-black"
              }
            >
              {active.videoSrc ? (
                <video src={active.videoSrc} className="h-full w-full bg-black" controls autoPlay playsInline preload="metadata" />
              ) : active.videoUrl ? (
                <iframe
                  src={active.videoUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
                  Adicione o vídeo em <code className="mx-1">content/site.ts</code> (videoSrc ou videoUrl)
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
