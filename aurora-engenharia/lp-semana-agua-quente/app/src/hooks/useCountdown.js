import { useEffect, useState } from 'react';

// Conta regressiva. Default: 23h 46m a partir do mount.
export function useCountdown(targetISO) {
  const target = targetISO
    ? new Date(targetISO).getTime()
    : Date.now() + (23 * 3600 + 46 * 60 + 22) * 1000;

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
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

// Data fixa do início do evento — Aula 01 em 05/06/2026 às 19h30 BRT
export const EVENT_START_ISO = '2026-06-05T19:30:00-03:00';
