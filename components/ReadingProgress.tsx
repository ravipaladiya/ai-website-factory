"use client";

import { useEffect, useRef, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    function update() {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const max = doc.scrollHeight - doc.clientHeight;
      const next = max > 0 ? Math.min(100, Math.max(0, (scrolled / max) * 100)) : 0;
      setProgress(next);
      raf.current = null;
    }

    function onScroll() {
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-0.5 bg-transparent"
    >
      <div
        style={{ width: `${progress}%` }}
        className="h-full bg-gradient-to-r from-brand-400 to-brand-700 transition-[width] duration-75 ease-linear"
      />
    </div>
  );
}
