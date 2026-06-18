import { MessageCircle } from "lucide-react";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { finalCta, whatsappLink } from "@/content/site";

export function FinalCta() {
  return (
    <Section id="contato" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.045] blur-[150px]" />

      <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <Eyebrow>{finalCta.eyebrow}</Eyebrow>
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          {finalCta.title}
        </h2>
        <p className="max-w-xl text-base text-muted-foreground md:text-lg">{finalCta.subtitle}</p>
        <Button href={whatsappLink} external size="lg" className="mt-2">
          <MessageCircle className="h-5 w-5" />
          {finalCta.cta}
        </Button>
      </Reveal>
    </Section>
  );
}
