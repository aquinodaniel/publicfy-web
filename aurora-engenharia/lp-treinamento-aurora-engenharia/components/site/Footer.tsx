import { MessageCircle } from "lucide-react";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:text-left md:px-8">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-aurora-white.png" alt={site.brand} className="h-9 w-auto" />
          <span className="text-xs text-muted-foreground">· {site.product}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {site.brand}. Todos os direitos reservados.
        </p>
        <a
          href={`https://wa.me/${site.whatsapp.phone}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fale conosco no WhatsApp"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}
