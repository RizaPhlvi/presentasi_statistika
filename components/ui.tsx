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
    <div className="mx-auto flex min-h-full w-full max-w-6xl flex-col justify-center gap-5 px-6 py-8 md:px-12">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-300 md:text-sm">{kicker}</p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
        <div className="mt-4 h-1 w-20 rounded bg-cyan-400" />
      </header>
      {children}
    </div>
  );
}

export function Card({ title, children, accent = false }: { title?: string; children: ReactNode; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "border-cyan-400/60 bg-cyan-400/10" : "border-white/10 bg-white/5"}`}>
      {title && <h3 className="mb-2 text-lg font-semibold text-cyan-200 md:text-xl">{title}</h3>}
      <div className="text-base leading-relaxed text-slate-100 md:text-xl">{children}</div>
    </div>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2 text-base leading-relaxed text-slate-100 md:text-xl">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2.5 h-2 w-2 flex-none rounded-full bg-cyan-400" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function DataTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm md:text-lg">
        <thead className="bg-navy-700 text-cyan-200">
          <tr>{head.map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-white/10 odd:bg-white/[0.03]">
              {r.map((c, j) => <td key={j} className="px-4 py-2.5 align-top">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-slate-300 md:text-base">{children}</p>;
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
