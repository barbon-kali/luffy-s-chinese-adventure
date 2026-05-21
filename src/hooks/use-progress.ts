import { useCallback, useEffect, useState } from "react";

export type Progress = {
  xp: number;
  bestStreak: number;
  learned: string[]; // hanzi strings completed
  dark: boolean;
  sound: boolean;
};

const KEY = "luffy-academy:progress:v1";

const DEFAULT: Progress = {
  xp: 0,
  bestStreak: 0,
  learned: [],
  dark: false,
  sound: true,
};

function read(): Progress {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(read());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(progress));
    } catch {
      /* ignore */
    }
    document.documentElement.classList.toggle("dark", progress.dark);
  }, [progress, hydrated]);

  const addXp = useCallback((delta: number) => {
    setProgress((p) => ({ ...p, xp: Math.max(0, p.xp + delta) }));
  }, []);

  const markLearned = useCallback((hanzi: string) => {
    setProgress((p) =>
      p.learned.includes(hanzi) ? p : { ...p, learned: [...p.learned, hanzi] },
    );
  }, []);

  const setBestStreak = useCallback((s: number) => {
    setProgress((p) => (s > p.bestStreak ? { ...p, bestStreak: s } : p));
  }, []);

  const toggleDark = useCallback(() => setProgress((p) => ({ ...p, dark: !p.dark })), []);
  const toggleSound = useCallback(() => setProgress((p) => ({ ...p, sound: !p.sound })), []);

  const reset = useCallback(() => setProgress(DEFAULT), []);

  return { progress, hydrated, addXp, markLearned, setBestStreak, toggleDark, toggleSound, reset };
}
