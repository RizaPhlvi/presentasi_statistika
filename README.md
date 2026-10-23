# Presentasi GLM: Model Gaussian dan Poisson

Website presentasi slide (Next.js 14, App Router, TypeScript, Tailwind CSS) berdasarkan makalah
"GLM Gaussian dan Poisson".

## Menjalankan

```bash
npm install
npm run dev      # buka http://localhost:3000
# atau versi produksi:
npm run build && npm start
```

## Kontrol

- `←` / `→` (atau PageUp / PageDown): slide sebelumnya / berikutnya
- `F`: layar penuh · `M`: daftar slide · `Esc`: tutup menu
- Tautan langsung ke slide: `http://localhost:3000/#9`

## Mengubah isi

- Identitas cover: `data/meta.ts`
- Isi slide: `components/slides/Slides.tsx`; urutan dan judul menu: `data/slides.tsx`
- Gambar flowchart: `public/images/flowchart-glm.png`
