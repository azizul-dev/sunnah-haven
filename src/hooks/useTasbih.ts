"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "sunnah-haven-tasbih";

type Saved = { count: number; target: number; rounds: number };

function vibrate(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(pattern);
  } catch {
    return;
  }
}

export function useTasbih() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [rounds, setRounds] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Saved;
        setCount(saved.count);
        setTarget(saved.target);
        setRounds(saved.rounds);
      }
    } catch {
      setCount(0);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ count, target, rounds }));
    } catch {
      return;
    }
  }, [count, target, rounds, loaded]);

  useEffect(() => {
    if (!completed) return;
    const timer = setTimeout(() => setCompleted(false), 1800);
    return () => clearTimeout(timer);
  }, [completed]);

  const tap = useCallback(() => {
    if (count + 1 >= target) {
      setCount(0);
      setRounds((r) => r + 1);
      setCompleted(true);
      vibrate([200, 80, 200]);
      return;
    }
    setCount(count + 1);
    vibrate(15);
  }, [count, target]);

  const changeTarget = useCallback((value: number) => {
    setTarget(value);
    setCount(0);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
    setRounds(0);
    setCompleted(false);
  }, []);

  return { count, target, rounds, completed, tap, changeTarget, reset };
}
