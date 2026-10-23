"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, List, Maximize, Minimize, X } from "lucide-react";
import { slides } from "@/data/slides";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Presentation() {
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [menu, setMenu] = useState(false);
  const [full, setFull] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback(
    (to: number) => {
      const next = Math.min(Math.max(to, 0), total - 1);
      if (next === index) return;
      setDir(next > index ? 1 : -1);
      setIndex(next);
    },
    [index, total],
  );

  const toggleFull = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  // Slide awal dari hash URL (#3 = slide ke-3)
  useEffect(() => {
    const n = parseInt(window.location.hash.slice(1), 10);
    if (n >= 1 && n <= total) setIndex(n - 1);
  }, [total]);

  useEffect(() => {
    window.history.replaceState(null, "", `#${index + 1}`);
  }, [index]);

  useEffect(() => {
    const onChange = () => setFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (document.body.dataset.modal) return;
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
          e.preventDefault();
          go(index + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          go(index - 1);
          break;
        case "f":
        case "F":
          toggleFull();
          break;
        case "m":
        case "M":
          setMenu((v) => !v);
          break;
        case "Escape":
          setMenu(false);
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, toggleFull]);

  const Current = slides[index].Component;
  const pct = ((index + 1) / total) * 100;
  const btn = "rounded-lg p-2 text-slate-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <div className="flex h-dvh flex-col bg-navy-900 text-slate-100">
      <div
        className="h-1 w-full bg-white/10"
        role="progressbar"
        aria-label="Kemajuan presentasi"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={index + 1}
      >
        <div className="h-full bg-cyan-400 transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>

      <main className="relative min-h-0 flex-1 overflow-hidden bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.section
            key={index}
            custom={dir}
            aria-label={slides[index].title}
            className="absolute inset-0 overflow-y-auto"
            variants={{
              enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * 40 }),
              center: { opacity: 1, x: 0 },
              exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: -d * 40 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0 : 0.22, ease: "easeOut" }}
          >
            <Current />
          </motion.section>
        </AnimatePresence>
      </main>

      <footer className="flex items-center justify-between gap-2 border-t border-white/10 bg-navy-900 px-3 py-2">
        <button type="button" className={btn} onClick={() => setMenu(true)} aria-label="Buka daftar slide (M)">
          <List size={22} />
        </button>
        <div className="flex items-center gap-2">
          <button type="button" className={btn} onClick={() => go(index - 1)} disabled={index === 0} aria-label="Slide sebelumnya (←)">
            <ChevronLeft size={24} />
          </button>
          <span className="min-w-[5.5rem] text-center font-mono text-base tabular-nums text-cyan-200" aria-live="polite">
            {pad(index + 1)} / {pad(total)}
          </span>
          <button type="button" className={btn} onClick={() => go(index + 1)} disabled={index === total - 1} aria-label="Slide berikutnya (→)">
            <ChevronRight size={24} />
          </button>
        </div>
        <button type="button" className={btn} onClick={toggleFull} aria-label={full ? "Keluar layar penuh (F)" : "Layar penuh (F)"}>
          {full ? <Minimize size={22} /> : <Maximize size={22} />}
        </button>
      </footer>

      {menu && (
        <div className="fixed inset-0 z-40 flex justify-end bg-black/60" onClick={() => setMenu(false)}>
          <nav
            role="dialog"
            aria-modal="true"
            aria-label="Daftar slide"
            className="h-full w-full max-w-sm overflow-y-auto border-l border-white/10 bg-navy-800 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-cyan-200">Daftar Slide</h2>
              <button type="button" className={btn} onClick={() => setMenu(false)} aria-label="Tutup daftar slide">
                <X size={22} />
              </button>
            </div>
            <ol className="space-y-1">
              {slides.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => {
                      go(i);
                      setMenu(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-base hover:bg-white/10 ${
                      i === index ? "bg-cyan-400/15 text-cyan-200" : "text-slate-200"
                    }`}
                  >
                    <span className="font-mono text-sm text-slate-400">{pad(i + 1)}</span>
                    {s.title}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      )}
    </div>
  );
}
