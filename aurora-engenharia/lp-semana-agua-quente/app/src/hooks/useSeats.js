import { useEffect, useState } from 'react';

const TOTAL = 50;
const FLOOR = 2;
const INITIAL_LEFT = 6;

const listeners = new Set();
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
    const fn = (n) => setLeft(n);
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
