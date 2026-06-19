"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { nav, whatsappLink } from "@/content/site";

/**
 * Barra de CTA fixa no rodapé, só em mobile (<md). Surge depois que o usuário
 * passa o Hero e se esconde ao chegar perto do fim da página (onde já há o
 * CTA final). O slide é desligado automaticamente por prefers-reduced-motion
 * via a regra global de transition-duration.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom =
        window.innerHeight + y >= document.documentElement.scrollHeight - 280;
      setVisible(y > window.innerHeight * 0.9 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      role="region"
      aria-label="Ação rápida"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 px-4 py-3 backdrop-blur-xl transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <Button href={whatsappLink} external className="w-full">
        <MessageCircle className="h-5 w-5" />
        {nav.cta}
      </Button>
    </div>
  );
}
