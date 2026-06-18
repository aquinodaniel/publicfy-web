import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:text-left md:px-8">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-base font-bold text-foreground">{site.brand}</span>
          <span className="text-xs text-muted-foreground">· {site.product}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {site.brand}. Todos os direitos reservados.
        </p>
        <a href={`https://wa.me/${site.whatsapp.phone}`} className="text-xs text-muted-foreground transition-colors hover:text-primary">
          {site.whatsapp.label}
        </a>
      </div>
    </footer>
  );
}
