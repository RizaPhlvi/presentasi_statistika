"use client";

import katex from "katex";
import { useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";

export function Tex({ tex, block = false }: { tex: string; block?: boolean }) {
  const html = katex.renderToString(tex, { displayMode: block, throwOnError: false });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

export function Frame({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center gap-6 px-8 py-10 md:px-14">
      <header>
        <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300 md:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]" aria-hidden />
          {kicker}
        </p>
        <h2 className="mt-2.5 text-3xl font-bold leading-tight tracking-tightest text-white md:text-5xl">{title}</h2>
        <div className="title-rule mt-4" />
      </header>
      {children}
    </div>
  );
}

export function Card({ title, children, accent = false }: { title?: string; children: ReactNode; accent?: boolean }) {
  return (
    <div className={`card ${accent ? "card-accent" : ""}`}>
      {title && (
        <h3 className={`mb-2.5 text-lg font-semibold tracking-tight md:text-xl ${accent ? "text-cyan-200" : "text-cyan-200/90"}`}>
          {title}
        </h3>
      )}
      <div className="text-base leading-relaxed text-slate-100 md:text-lg">{children}</div>
    </div>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5 text-base leading-relaxed text-slate-100 md:text-lg">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <svg width="16" height="16" viewBox="0 0 16 16" className="mt-1.5 flex-none text-cyan-400 md:mt-2" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function DataTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="table-shell overflow-x-auto">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm md:text-lg">
        <thead className="bg-navy-700/80 text-cyan-200 shadow-[inset_0_-1px_0_rgba(34,211,238,0.25)]">
          <tr>{head.map((h) => <th key={h} className="px-5 py-3.5 font-semibold tracking-wide">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-white/[0.07] odd:bg-white/[0.03]">
              {r.map((c, j) => (
                <td key={j} className={`px-5 py-3 align-top ${j === 0 ? "font-medium text-cyan-100/90" : "text-slate-100"}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="border-l-2 border-cyan-400/40 pl-3 text-sm italic leading-relaxed text-slate-300 md:text-base">
      {children}
    </p>
  );
}

/** Gambar yang dapat diklik untuk diperbesar (layar penuh). */
export function ZoomImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.dataset.modal = "1";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      delete document.body.dataset.modal;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Perbesar gambar" className="cursor-zoom-in">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={className} />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Gambar diperbesar"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="max-h-full max-w-full rounded-lg bg-white object-contain" />
          <button
            type="button"
            aria-label="Tutup gambar"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          >
            <X size={22} />
          </button>
        </div>
      )}
    </>
  );
}
