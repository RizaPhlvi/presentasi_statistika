import type { ComponentType } from "react";
import * as S from "@/components/slides/Slides";

export type SlideDef = { id: string; title: string; Component: ComponentType };

export const slides: SlideDef[] = [
  { id: "cover", title: "Cover", Component: S.Cover },
  { id: "latar-belakang", title: "Latar Belakang", Component: S.Background },
  { id: "tujuan", title: "Tujuan Pembahasan", Component: S.Aims },
  { id: "pengertian", title: "Pengertian dan Tiga Komponen GLM", Component: S.Components },
  { id: "gaussian", title: "GLM Gaussian", Component: S.Gaussian },
  { id: "poisson", title: "GLM Poisson", Component: S.Poisson },
  { id: "distribusi", title: "Gaussian vs Poisson: Bentuk Distribusi", Component: S.Shapes },
  { id: "perbandingan", title: "Perbandingan Gaussian dan Poisson", Component: S.Comparison },
  { id: "inferensi", title: "Estimasi, Inferensi, Kelayakan", Component: S.Inference },
  { id: "alur", title: "Alur Analisis GLM (Flowchart)", Component: S.Flow },
  { id: "data", title: "Data dan Variabel", Component: S.Variables },
  { id: "deskriptif", title: "Statistika Deskriptif", Component: S.Descriptive },
  { id: "kesimpulan", title: "Kesimpulan", Component: S.Conclusion },
  { id: "saran", title: "Saran", Component: S.Suggestions },
  { id: "referensi", title: "Referensi", Component: S.References },
  { id: "penutup", title: "Terima Kasih dan Tanya Jawab", Component: S.Closing },
];
