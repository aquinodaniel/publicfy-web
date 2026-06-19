"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Anima de 0 até o número detectado dentro de `value`, preservando prefixo/sufixo
 * (ex: "1.000+", "R$ 1.997", "4.9"). Dispara 1x ao entrar na viewport.
 */
export function CountUp({
  value,
  duration = 1.4,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);

  const match = value.match(/[\d.,]+/);
  const numberStr = match ? match[0] : null;

  useEffect(() => {
    if (!inView || !numberStr) {
      if (!numberStr) setDisplay(value);
      return;
    }
    const decimals = numberStr.includes(",") ? 1 : 0;
    const target = parseFloat(numberStr.replace(/\./g, "").replace(",", "."));
    const prefix = value.slice(0, value.indexOf(numberStr));
    const suffix = value.slice(value.indexOf(numberStr) + numberStr.length);

    let raf = 0;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      const formatted =
        decimals > 0
          ? current.toFixed(1).replace(".", ",")
          : Math.round(current).toLocaleString("pt-BR");
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, numberStr, value, duration]);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {display}
    </span>
  );
}
