"use client";

import { useMemo, type ReactNode } from "react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { meta } from "@/data/meta";
import { Bullets, Card, DataTable, Frame, Note, Tex, ZoomImage } from "@/components/ui";

const tex = String.raw;
const CYAN = "#22d3ee";
const SLATE = "#94a3b8";

/* 1 — Cover */
export function Cover() {
  return (
    <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center gap-6 px-6 py-10 md:px-12">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Presentasi Makalah</p>
      <h1 className="text-4xl font-bold leading-tight text-white md:text-7xl">{meta.title}</h1>
      <p className="text-2xl text-cyan-300 md:text-4xl">{meta.subtitle}</p>
      <div className="h-1 w-28 rounded bg-cyan-400" />
      <p className="max-w-3xl text-base text-slate-300 md:text-xl">
        Pengertian GLM beserta model Gaussian dan Poisson.
      </p>
      <div className="space-y-1 text-base text-slate-200 md:text-lg">
        <p className="font-semibold">Mata Kuliah {meta.course} · {meta.className}</p>
        <p>Dosen Pengampu: {meta.lecturer}</p>
        <p className="text-slate-400">{meta.affiliation}</p>
        <p className="text-slate-400">{meta.year}</p>
      </div>
    </div>
  );
}

/* Anggota Kelompok */
const members: { name: string; nim: string }[] = [
  { name: "Achamad Ridwan", nim: "60125008" },
  { name: "Zaskiyah Sofarina", nim: "60125013" },
  { name: "Elgin Pandya Adinata", nim: "60125015" },
  { name: "Ahmad Rizza Pahlevi", nim: "60125032" },
  { name: "Bintan Kamila", nim: "60125050" },
  { name: "Achmad Pauzan", nim: "60125058" },
];

export function Members() {
  return (
    <Frame kicker="Kelompok" title="Perkenalan Anggota Kelompok">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {members.map((m) => (
          <Card key={m.nim}>
            <div className="flex flex-col items-center gap-2 py-3 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/20 text-xl font-bold text-cyan-300">
                {m.name.charAt(0)}
              </div>
              <p className="text-sm font-semibold leading-snug text-white md:text-base">{m.name}</p>
              <p className="text-xs text-cyan-300 md:text-sm">NIM {m.nim}</p>
            </div>
          </Card>
        ))}
      </div>
    </Frame>
  );
}

/* 2 — Latar belakang */
export function Background() {
  return (
    <Frame kicker="Pendahuluan" title="Latar Belakang">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Regresi linear klasik">
          <Bullets items={["Respons kontinu, berdistribusi normal", "Varians konstan", "Banyak data praktis tidak memenuhi asumsi ini"]} />
        </Card>
        <Card title="Contoh masalah: jumlah absensi" accent>
          <Bullets items={["Data cacah, tidak negatif", "Varians cenderung naik bersama rata-rata", "GLM: respons dari keluarga eksponensial + fungsi link"]} />
        </Card>
      </div>
      <Note>
        Makalah membahas dua kasus yang paling sering ditemui: Gaussian untuk respons kontinu dan Poisson untuk data cacah, dengan prediktor yang sama agar perbedaan cara membaca hasil terlihat langsung.
      </Note>
    </Frame>
  );
}

/* 5 — Gaussian vs Poisson secara visual */
export function Shapes() {
  const normal = useMemo(() => {
    const m = 6.95, s = 1.54;
    return Array.from({ length: 41 }, (_, i) => {
      const x = 2 + i * 0.25;
      return { x: x.toFixed(1), y: Math.exp(-0.5 * ((x - m) / s) ** 2) / (s * Math.sqrt(2 * Math.PI)) };
    });
  }, []);
  const poisson = useMemo(() => {
    const l = 3.47;
    let fact = 1;
    return Array.from({ length: 12 }, (_, k) => {
      if (k > 0) fact *= k;
      return { k: String(k), p: (Math.exp(-l) * l ** k) / fact };
    });
  }, []);
  return (
    <Frame kicker="Landasan Teori" title="Gaussian vs Poisson: Bentuk Distribusi">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Gaussian — respons kontinu">
          <div className="h-40 md:h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={normal}>
                <CartesianGrid stroke="#ffffff15" />
                <XAxis dataKey="x" interval={7} stroke={SLATE} />
                <YAxis hide />
                <Tooltip formatter={(v: number) => v.toFixed(3)} contentStyle={{ background: "#10284d", border: "none" }} />
                <Area type="monotone" dataKey="y" stroke={CYAN} fill={CYAN} fillOpacity={0.25} name="Kepadatan" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <Note>Kurva mulus, varians konstan σ², link identitas.</Note>
        </Card>
        <Card title="Poisson — respons cacah">
          <div className="h-40 md:h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={poisson}>
                <CartesianGrid stroke="#ffffff15" />
                <XAxis dataKey="k" stroke={SLATE} />
                <YAxis hide />
                <Tooltip formatter={(v: number) => v.toFixed(3)} contentStyle={{ background: "#10284d", border: "none" }} />
                <Bar dataKey="p" fill="#60a5fa" name="Peluang" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <Note>Batang diskret ≥ 0, rata-rata = varians, link log.</Note>
        </Card>
      </div>
      <Note>
        Ilustrasi bentuk saja, bukan hasil estimasi model: kurva Normal memakai rata-rata ± SD skor kepuasan sampel (6,95 ± 1,54) dan Poisson memakai rata-rata absensi sampel (3,47), keduanya dari statistik deskriptif makalah.
      </Note>
    </Frame>
  );
}

/* 6 — Estimasi, inferensi, kelayakan */
export function Inference() {
  return (
    <Frame kicker="Landasan Teori" title="Estimasi, Inferensi, dan Kelayakan Model">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Estimasi dan uji">
          <Bullets items={["Maximum likelihood (numerik lewat IRLS)", "Uji Wald per koefisien; CI 95%: B ± 1,96 × SE"]} />
          <Tex block tex={tex`W=\left(\frac{\hat\beta_j}{SE(\hat\beta_j)}\right)^2\sim\chi^2_{(1)}`} />
        </Card>
        <Card title="Kelayakan model">
          <Bullets items={["Deviance/df dan Pearson χ²/df", "Poisson: jauh di atas 1 berarti overdispersion (alternatif: quasi-Poisson atau binomial negatif)", "AIC dan BIC: lebih kecil lebih baik"]} />
        </Card>
        <Card title="Variabel kategorik" accent>
          SPSS memakai pengodean dummy dengan kategori terakhir sebagai referensi. Jenis_Kelamin = 2 (perempuan) bernilai 0 dan diberi tanda "redundan", sedangkan koefisien Jenis_Kelamin = 1 (laki-laki) dibaca terhadap perempuan.
        </Card>
        <Card title="Parameter Scale">
          Gaussian: diestimasi (varians galat). Poisson: dikunci pada 1.
        </Card>
      </div>
    </Frame>
  );
}

/* Penutup */
export function Closing() {
  return (
    <div className="mx-auto flex min-h-full max-w-6xl flex-col justify-center gap-6 px-6 py-10 md:px-12">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Penutup</p>
      <h2 className="text-4xl font-bold text-white md:text-7xl">Terima Kasih</h2>
      <p className="text-2xl text-cyan-300 md:text-4xl">Sesi Tanya Jawab</p>
      <div className="h-1 w-28 rounded bg-cyan-400" />
      <Bullets
        items={[
          "GLM = komponen acak + prediktor linear + fungsi link",
          "Gaussian: respons kontinu, link identitas, koefisien = selisih rata-rata",
          "Poisson: respons cacah, link log, koefisien dibaca lewat Exp(B)",
        ]}
      />
    </div>
  );
}

/* Rumusan masalah dan tujuan (sesuai makalah) */
export function Aims() {
  return (
    <Frame kicker="Pendahuluan" title="Rumusan Masalah dan Tujuan">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Rumusan masalah">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Bagaimana pengaruh jenis kelamin dan lama pengalaman kerja terhadap skor kepuasan kerja menurut model GLM Gaussian?</li>
            <li>Bagaimana pengaruh kedua prediktor terhadap jumlah absensi menurut model GLM Poisson?</li>
            <li>Bagaimana perbedaan interpretasi koefisien pada kedua model?</li>
          </ol>
        </Card>
        <Card title="Tujuan">
          <ol className="list-decimal space-y-2 pl-5">
            <li>Mengestimasi dan menafsirkan model GLM Gaussian untuk skor kepuasan kerja.</li>
            <li>Mengestimasi dan menafsirkan model GLM Poisson untuk jumlah absensi.</li>
            <li>Membandingkan kedua model dari segi distribusi, fungsi link, dan makna koefisien.</li>
          </ol>
        </Card>
      </div>
    </Frame>
  );
}

/* Pengertian GLM */
export function Components() {
  return (
    <Frame kicker="Pengertian" title="Tiga Komponen GLM">
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="1. Komponen acak">Distribusi respons dari keluarga eksponensial (mis. Normal, Poisson).</Card>
        <Card title="2. Prediktor linear">
          Kombinasi linear prediktor:
          <Tex block tex={tex`\eta=\beta_0+\beta_1X_1+\beta_2X_2`} />
        </Card>
        <Card title="3. Fungsi link">
          Menghubungkan rata-rata respons μ dengan η:
          <Tex block tex={tex`g(\mu)=\eta`} />
        </Card>
      </div>
    </Frame>
  );
}

/* GLM Gaussian */
export function Gaussian() {
  return (
    <Frame kicker="Pengertian · Model GLM" title="GLM Gaussian">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Pengertian">
          <Bullets
            items={[
              "Untuk respons kontinu yang diasumsikan normal dengan varians konstan σ²",
              "Link identitas: koefisien langsung berarti selisih rata-rata respons",
              "Dengan link ini, estimasi koefisien sama dengan OLS",
              "Parameter Scale = estimasi varians galat",
            ]}
          />
        </Card>
        <div className="space-y-4">
          <Card accent title="Model">
            <Tex block tex={tex`\mu=\beta_0+\beta_1X_1+\beta_2X_2`} />
          </Card>
          <Card title="Contoh respons">Skor kepuasan kerja.</Card>
        </div>
      </div>
    </Frame>
  );
}

/* GLM Poisson */
export function Poisson() {
  return (
    <Frame kicker="Pengertian · Model GLM" title="GLM Poisson">
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Pengertian">
          <Bullets
            items={[
              "Untuk respons berupa data cacah, dengan rata-rata sama dengan varians (equidispersion)",
              "Link log: rata-rata yang diprediksi selalu positif",
              "Koefisien dibaca lewat Exp(B) = rasio rata-rata (rate ratio) per kenaikan satu satuan prediktor",
              "Parameter Scale dikunci pada 1",
              "Varians jauh di atas rata-rata (overdispersion): quasi-Poisson atau binomial negatif",
            ]}
          />
        </Card>
        <div className="space-y-4">
          <Card accent title="Model">
            <Tex block tex={tex`\ln(\mu)=\beta_0+\beta_1X_1+\beta_2X_2`} />
            <Tex block tex={tex`\mu=e^{\beta_0+\beta_1X_1+\beta_2X_2}`} />
          </Card>
          <Card title="Contoh respons">Jumlah absensi.</Card>
        </div>
      </div>
    </Frame>
  );
}

/* Perbandingan konseptual */
export function Comparison() {
  return (
    <Frame kicker="Perbandingan" title="Gaussian vs Poisson">
      <DataTable
        head={["Aspek", "Gaussian", "Poisson"]}
        rows={[
          ["Tipe respons", "Kontinu", "Cacah (tidak negatif)"],
          ["Distribusi dan link", "Normal, identitas", "Poisson, log"],
          ["Asumsi varians", "Konstan (σ²)", "Sama dengan rata-rata"],
          ["Rata-rata model", <Tex key="a" tex={tex`\mu=\beta_0+\beta_1X_1+\beta_2X_2`} />, <Tex key="b" tex={tex`\mu=e^{\beta_0+\beta_1X_1+\beta_2X_2}`} />],
          ["Makna B", "Selisih rata-rata", "Selisih log rata-rata; Exp(B) = rasio"],
          ["Scale", "Diestimasi", "Tetap 1"],
          ["Bila asumsi dilanggar", "Periksa Q-Q plot dan plot residual", "Overdispersion: quasi-Poisson atau binomial negatif"],
        ]}
      />
      <Note>AIC dan BIC hanya bermakna untuk membandingkan model pada respons yang sama.</Note>
    </Frame>
  );
}

/* Flowchart */
export function Flow() {
  return (
    <Frame kicker="Metodologi" title="Alur Analisis GLM">
      <div className="flex justify-center">
        <ZoomImage
          src="/images/flowchart-glm.png"
          alt="Diagram alur analisis GLM: data, pemilihan variabel respons dan prediktor, statistika deskriptif, pemeriksaan linieritas, pemilihan fungsi link, identifikasi distribusi respons, pemodelan distribusi respons, pemodelan GLM, pemilihan model terbaik, model terbaik"
          className="max-h-[52vh] w-auto rounded-xl bg-white p-2"
        />
      </div>
      <Note>Klik gambar untuk memperbesar.</Note>
    </Frame>
  );
}

/* Data dan variabel */
export function Variables() {
  return (
    <Frame kicker="Data" title="Data dan Variabel yang Digunakan">
      <DataTable
        head={["Variabel", "Peran", "Skala"]}
        rows={[
          ["Skor_Kepuasan_Kerja", "Respons Gaussian", "Skor 1–10, dianggap numerik"],
          ["Jumlah_Absensi_1_Tahun_Simulasi", "Respons Poisson", "Cacah, data simulasi"],
          ["Jenis_Kelamin", "Faktor", "1 = laki-laki, 2 = perempuan"],
          ["Lama_Pengalaman_Kerja_Tahun", "Kovariat", "Numerik (tahun)"],
        ]}
      />
      <Note>Dataset memuat 20 karyawan (10 laki-laki, 10 perempuan). Skor kepuasan sebenarnya ordinal; memperlakukannya sebagai numerik adalah asumsi yang diakui makalah.</Note>
    </Frame>
  );
}

/* Statistik deskriptif (grafik) */
function MiniBar({ title, data, color }: { title: string; data: { g: string; v: number }[]; color: string }) {
  return (
    <div>
      <p className="mb-1 text-center text-base text-slate-200 md:text-lg">{title}</p>
      <div className="h-44 md:h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20 }}>
            <XAxis dataKey="g" stroke={SLATE} />
            <YAxis hide domain={[0, "dataMax + 2"]} />
            <Bar dataKey="v" fill={color} radius={[6, 6, 0, 0]}>
              <LabelList dataKey="v" position="top" fill="#e8f1ff" formatter={(v: number) => String(v).replace(".", ",")} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function Descriptive() {
  return (
    <Frame kicker="Data" title="Statistika Deskriptif">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <MiniBar title="Rata-rata skor kepuasan (n = 20)" color={CYAN} data={[{ g: "Laki-laki", v: 6.2 }, { g: "Perempuan", v: 7.7 }]} />
        </Card>
        <Card>
          <MiniBar title="Rata-rata jumlah absensi (n = 19)" color="#60a5fa" data={[{ g: "Laki-laki", v: 4.2 }, { g: "Perempuan", v: 2.67 }]} />
        </Card>
      </div>
      <Card accent title="Pola deskriptif">
        Laki-laki memiliki skor kepuasan lebih rendah dan absensi lebih tinggi daripada perempuan, sedangkan rata-rata pengalaman kerja kedua kelompok hampir sama.
      </Card>
    </Frame>
  );
}

/* Kesimpulan */
export function Conclusion() {
  return (
    <Frame kicker="Penutup" title="Kesimpulan">
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="GLM">
          Perluasan regresi linear dengan komponen acak, prediktor linear η, dan fungsi link g(μ) = η.
        </Card>
        <Card title="Gaussian">
          Respons kontinu, normal, link identitas. Koefisien = selisih rata-rata dalam satuan respons.
        </Card>
        <Card title="Poisson" accent>
          Respons cacah, link log. Koefisien dibaca lewat Exp(B) sebagai rasio multiplikatif.
        </Card>
      </div>
    </Frame>
  );
}

/* Definisi dan tujuan GLM (sesuai makalah) */
export function Definition() {
  return (
    <Frame kicker="Pengertian" title="Definisi dan Tujuan GLM">
      <Card accent title="Definisi (Nelder)">
        Generalized linear model (GLM) adalah perluasan regresi linear: prediktor berefek linear, tetapi tidak mengasumsikan distribusi tertentu untuk variabel respons. GLM dipakai bila respons merupakan anggota keluarga eksponensial.
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <Card title="Tujuan">Mengetahui hubungan sebab-akibat, yaitu pengaruh variabel independen terhadap variabel dependen.</Card>
        <Card title="Keunggulan">Dibanding regresi linear biasa, keunggulan GLM terletak pada distribusi (bentuk kurva) variabel dependen.</Card>
      </div>
    </Frame>
  );
}

/* Konteks data */
export function Context() {
  return (
    <Frame kicker="Data" title="Konteks Data: PT Sejahtera Mandiri">
      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Perusahaan">
          Perusahaan manufaktur dan agribisnis. Manajemen SDM dan Manajemen Kinerja ingin mengevaluasi dua aspek internal karyawan: kepuasan kerja dan kedisiplinan (absensi).
        </Card>
        <Card title="Dugaan manajemen">
          Skor kepuasan kerja (skala 1–10) dan jumlah absensi dalam satu tahun dipengaruhi faktor demografi (jenis kelamin: 1 = laki-laki, 2 = perempuan) dan faktor profesional (lama pengalaman kerja).
        </Card>
        <Card title="Pengujian" accent>
          Data sampel 20 karyawan diuji dengan GLM di SPSS, dibagi menjadi dua model sesuai karakteristik data: Gaussian untuk kepuasan kerja dan Poisson untuk absensi.
        </Card>
      </div>
    </Frame>
  );
}

/* Bagian-bagian GLM di SPSS */
const spssMenus: { name: string; desc: string }[] = [
  { name: "Type of Models", desc: "Memilih tipe respons: skala, ordinal, hitungan, biner, atau campuran." },
  { name: "Respons", desc: "Menentukan variabel dependen dan scale weight (bila perlu); pada respons biner dapat menentukan kategori referensi." },
  { name: "Predictor", desc: "Menentukan factor, kovariat, dan variabel offset sebagai variabel independen." },
  { name: "Model", desc: "Menentukan model. Default-nya intercept-only, bukan full factorial." },
  { name: "Estimation", desc: "Menentukan cara parameter diestimasi dan matriks kovariansi yang dipakai." },
  { name: "Statistics", desc: "Memilih statistik yang dilaporkan di output. Default-nya Type III." },
  { name: "EM Means", desc: "Menampilkan mean marginal untuk level faktor." },
  { name: "Save", desc: "Menyimpan statistik untuk analisis lanjutan dan diagnosis model." },
  { name: "Export", desc: "Mengekspor model final sebagai data atau XML." },
];

export function SpssMenus() {
  return (
    <Frame kicker="Praktik SPSS" title="Bagian-Bagian Generalized Linear Models">
      <div className="grid gap-3 md:grid-cols-3">
        {spssMenus.map((m, i) => (
          <div key={m.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="flex items-center gap-2 text-base font-semibold text-cyan-200 md:text-lg">
              <span className="font-mono text-sm text-slate-400">{String(i + 1).padStart(2, "0")}</span>
              {m.name}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-100 md:text-base">{m.desc}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* Langkah praktik di SPSS */
export function SpssSteps() {
  const steps: { title: string; body: ReactNode }[] = [
    { title: "Tetapkan variabel", body: "Tentukan respons, faktor, dan kovariat." },
    { title: "Pilih distribusi dan link", body: "Normal–identitas untuk kepuasan; Poisson–log untuk absensi." },
    { title: "Jalankan di SPSS", body: "Masukkan Factor dan Covariate, lalu minta Parameter Estimates dan Goodness of Fit." },
    { title: "Rumuskan hipotesis", body: <Tex tex={tex`H_0:\beta_j=0\ \text{melawan}\ H_1:\beta_j\neq 0`} /> },
    { title: "Ambil keputusan", body: "Pada α = 0,05, tolak H₀ bila Sig. < 0,05 atau CI Wald tidak memuat 0 (Exp(B): tidak memuat 1)." },
    { title: "Tafsirkan", body: "Tulis persamaan, baca tanda dan besar koefisien, simpulkan dalam konteks." },
  ];
  return (
    <Frame kicker="Praktik SPSS" title="Langkah Praktik di SPSS">
      <Card accent title="Menu SPSS">
        Analyze → Generalized Linear Models → Generalized Linear Models
        <p className="mt-2 text-sm text-slate-200 md:text-base">
          Jenis_Kelamin sebagai Factor, Lama_Pengalaman_Kerja_Tahun sebagai Covariate.
        </p>
      </Card>
      <div className="grid gap-3 md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-cyan-400 font-bold text-navy-900">{i + 1}</span>
              <p className="text-base font-semibold text-white md:text-lg">{s.title}</p>
            </div>
            <div className="mt-2 text-sm leading-relaxed text-slate-100 md:text-base">{s.body}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}
