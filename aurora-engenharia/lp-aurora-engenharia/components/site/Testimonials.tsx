"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Figure } from "@/components/ui/Figure";
import { testimonials, type Testimonial } from "@/content/site";

export function Testimonials() {
  const [active, setActive] = useState<Testimonial | null>(null);

  return (
    <Section id="depoimentos" surface="raised" glow="cyan-l" texture>
      <SectionHeader
        eyebrow={testimonials.eyebrow}
        title={testimonials.title}
        subtitle={testimonials.subtitle}
        align="center"
      />

      {/* mural masonry de prints (wpp) e vídeos */}
      <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {testimonials.items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="break-inside-avoid"
          >
            {item.type === "whatsapp" ? (
              <div className="overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/30">
                <Figure src={item.image} alt={item.alt} label="Print de WhatsApp" className="min-h-[200px]" imgClassName="object-contain" />
              </div>
            ) : (
              <button
                onClick={() => setActive(item)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary/40"
              >
                <div className={item.orientation === "vertical" ? "aspect-[9/16]" : "aspect-video"}>
                  <Figure src={item.thumb} alt={item.name} label={`Vídeo: ${item.name}`} className="h-full" />
                </div>
                <span className="absolute inset-0 flex items-center justify-center bg-background/30 transition-colors group-hover:bg-background/50">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                    <Play className="h-6 w-6 translate-x-0.5 fill-current" />
                  </span>
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                  {item.name}
                </span>
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* lightbox de vídeo */}
      <AnimatePresence>
        {active && active.type === "video" && (
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
              {active.videoUrl ? (
                <iframe
                  src={active.videoUrl}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full items-center justify-center p-6 text-center text-sm text-muted-foreground">
                  Adicione a URL do vídeo em <code className="mx-1">content/site.ts</code> (videoUrl)
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
