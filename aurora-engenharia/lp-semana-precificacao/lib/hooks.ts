'use client';

import { useCallback, useEffect, useState } from 'react';
import { config } from '@/content/site';

// ============================================================
// handleCTA — único ponto de conversão chamado pelos 6 CTAs.
// Se houver checkoutUrl em produção, redireciona; senão rola até a oferta.
// ============================================================
export function useCheckout() {
  return useCallback(() => {
    if (config.checkoutUrl) {
      window.location.href = config.checkoutUrl;
      return;
    }
    const pricing = document.getElementById('pricing');
    if (pricing) pricing.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);
}

// ============================================================
// useExitIntent — dispara um callback quando o visitante dá sinal de saída.
// Portado da LP da Imersão (lp.auroraengenharia.com/imersao):
//  · Desktop → mouse sai pelo topo da viewport (clientY <= 0).
//  · Mobile  → scroll rápido pra cima perto do topo (proxy de "voltar"/sair).
// Só arma após `initialDelayMs` e respeita `cooldownMs` entre disparos.
// O teto de aberturas por sessão é controlado por quem consome (ver page.tsx).
// ============================================================
export function useExitIntent(
  onTrigger: () => void,
  {
    enabled = true,
    initialDelayMs = 10000,
    cooldownMs = 30000,
    mobileScrollThreshold = 60
  }: {
    enabled?: boolean;
    initialDelayMs?: number;
    cooldownMs?: number;
    mobileScrollThreshold?: number;
  } = {}
) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    let armed = false;
    let lastTrigger = 0;
    let lastScrollY = window.scrollY;

    const armTimer = setTimeout(() => {
      armed = true;
    }, initialDelayMs);

    function fire() {
      if (!armed) return;
      const now = Date.now();
      if (now - lastTrigger < cooldownMs) return;
      lastTrigger = now;
      onTrigger();
    }

    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) fire();
    }

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastScrollY;
      lastScrollY = y;
      if (y < 200 && delta < -mobileScrollThreshold) fire();
    }

    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(armTimer);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, [onTrigger, enabled, initialDelayMs, cooldownMs, mobileScrollThreshold]);
}

// ============================================================
// useIsMobile — desktop scrollytelling vira lista linear abaixo do breakpoint.
// ============================================================
export function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

// ============================================================
// usePrefersReducedMotion — desliga count-ups / mostra valores finais.
// ============================================================
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// ============================================================
// useCountdown — contagem regressiva até o fim do Lote 1.
// ============================================================
export function useCountdown(targetISO?: string) {
  const target = targetISO
    ? new Date(targetISO).getTime()
    : Date.now() + (23 * 3600 + 46 * 60 + 22) * 1000;

  const [now, setNow] = useState(target - (23 * 3600 + 46 * 60 + 22) * 1000);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    daysStr: String(days).padStart(2, '0'),
    hoursStr: String(hours).padStart(2, '0'),
    minutesStr: String(minutes).padStart(2, '0'),
    secondsStr: String(seconds).padStart(2, '0'),
    ended: diff === 0
  };
}

// ============================================================
// useSeats — % de vagas preenchidas (simulação de escassez).
// TOTAL vem de config.vagasTotal (FONTE ÚNICA — bate com a copy).
// TODO produção: conectar a um endpoint real de contagem de vagas.
// ============================================================
const TOTAL = config.vagasTotal;
// vagas "restantes" exibidas: arranca em ~8% do total e vai caindo.
const FLOOR = Math.max(2, Math.round(TOTAL * 0.02));
// arranca em ~20% restante → ~80% preenchido (escassez).
const INITIAL_LEFT = Math.max(FLOOR + 1, Math.round(TOTAL * 0.2));

const listeners = new Set<(n: number) => void>();
let current = INITIAL_LEFT;
let scheduled = false;

function emit() {
  listeners.forEach((fn) => fn(current));
}

function scheduleNext() {
  if (scheduled) return;
  scheduled = true;
  const min = 28000;
  const max = 95000;
  const wait = Math.floor(min + Math.random() * (max - min));
  setTimeout(() => {
    scheduled = false;
    if (current > FLOOR && Math.random() < 0.55) {
      current = current - 1;
      emit();
    }
    scheduleNext();
  }, wait);
}

export function useSeats() {
  const [left, setLeft] = useState(current);

  useEffect(() => {
    const fn = (n: number) => setLeft(n);
    listeners.add(fn);
    scheduleNext();
    return () => {
      listeners.delete(fn);
    };
  }, []);

  const percent = ((TOTAL - left) / TOTAL) * 100;
  return {
    left,
    total: TOTAL,
    sold: TOTAL - left,
    percent,
    remainingPercent: 100 - percent
  };
}
