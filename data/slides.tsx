import type { ComponentType } from "react";
import * as S from "@/components/slides/Slides";

export type SlideDef = { id: string; title: string; Component: ComponentType };

export const slides: SlideDef[] = [
  { id: "cover", title: "Cover", Component: S.Cover },
  { id: "anggota", title: "Anggota Kelompok", Component: S.Members },
  { id: "latar-belakang", title: "Latar Belakang", Component: S.Background },
  { id: "rumusan-tujuan", title: "Rumusan Masalah dan Tujuan", Component: S.Aims },
  { id: "definisi", title: "Definisi dan Tujuan GLM", Component: S.Definition },
  { id: "komponen", title: "Tiga Komponen GLM", Component: S.Components },
  { id: "gaussian", title: "GLM Gaussian", Component: S.Gaussian },
  { id: "poisson", title: "GLM Poisson", Component: S.Poisson },
  { id: "distribusi", title: "Gaussian vs Poisson: Bentuk Distribusi", Component: S.Shapes },
  { id: "perbandingan", title: "Perbandingan Gaussian dan Poisson", Component: S.Comparison },
  { id: "inferensi", title: "Estimasi, Inferensi, Kelayakan", Component: S.Inference },
  { id: "alur", title: "Alur Analisis GLM (Flowchart)", Component: S.Flow },
  { id: "konteks", title: "Konteks Data", Component: S.Context },
  { id: "data", title: "Data dan Variabel", Component: S.Variables },
  { id: "deskriptif", title: "Statistika Deskriptif", Component: S.Descriptive },
  { id: "menu-spss", title: "Bagian-Bagian GLM di SPSS", Component: S.SpssMenus },
  { id: "langkah-spss", title: "Langkah Praktik di SPSS", Component: S.SpssSteps },
  { id: "kesimpulan", title: "Kesimpulan", Component: S.Conclusion },
  { id: "penutup", title: "Terima Kasih dan Tanya Jawab", Component: S.Closing },
];
