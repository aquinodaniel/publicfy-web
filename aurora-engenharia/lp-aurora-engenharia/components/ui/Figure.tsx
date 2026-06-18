"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Imagem com fallback elegante: se o arquivo (slot TODO) ainda não existe,
 * mostra um placeholder com o caminho esperado em vez de imagem quebrada.
 */
export function Figure({
  src,
  alt,
  className,
  imgClassName,
  label,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  label?: string;
}) {
  const [error, setError] = useState(!src);

  if (error) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary/40 p-6 text-center",
          className
        )}
      >
        <ImageIcon className="h-6 w-6 text-muted-foreground/60" />
        <span className="text-xs font-medium text-muted-foreground">{label ?? alt}</span>
        {src && <code className="text-[10px] text-muted-foreground/50">{src}</code>}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={cn("h-full w-full object-cover", imgClassName)}
      loading="lazy"
    />
  );
}
