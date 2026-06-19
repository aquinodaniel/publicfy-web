"use client";

import dynamic from "next/dynamic";

const MaqueteBIM = dynamic(() => import("./MaqueteBIM"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        ▸ carregando maquete…
      </span>
    </div>
  ),
});

export function Maquete() {
  return <MaqueteBIM />;
}
