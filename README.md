# Portfolio syadad 2026 — Single-Page Website

Website satu halaman (scroll ke bawah) berdasarkan desain `CV_portfolio_versi_after_effect.pdf`.
HTML/CSS/JavaScript biasa + GSAP (CDN). Tanpa build tool.

## Struktur folder
| Path | Fungsi |
|---|---|
| `index.html` | Titik masuk; memuat semua file |
| `main.js` | Merakit section. **Urutan/tambah/hapus section ada di array `ORDER`** |
| `config/links.js` | **Semua URL** tombol, navigasi, sosial media |
| `config/content.js` | **Semua teks** dan daftar gambar |
| `animations/animationConfig.js` | **Semua pengaturan animasi** (durasi, delay, jarak, easing, stagger, hover) |
| `animations/animations.js` | Logika animasi (jangan perlu diubah) |
| `sections/` | `hero.js`, `about.js`, `creative.js` (Design Graphic, Ilustration, Motion Graphic), `contact.js` (Scan, Thank you, footer) |
| `components/ui.js` | Komponen berulang (judul, bintang, tombol) + pengisi link |
| `styles/base.css` | Warna, font, reset, tombol, intro |
| `styles/sections.css` | Layout tiap section + responsif |
| `assets/img`, `assets/icons` | Gambar karya, foto profil, ikon, QR |

## Menjalankan
Buka `index.html` di browser (klik dua kali). Butuh internet untuk GSAP dan font Google.
Opsional server lokal: `python3 -m http.server` lalu buka `http://localhost:8000`.

## Mengubah teks dan gambar
- Teks: `config/content.js`.
- Ganti gambar: taruh file baru di `assets/img/`, lalu ubah path di `config/content.js`.

## Mengganti link
Buka `config/links.js` dan ubah `url`. Link yang sudah terpasang: `linkedin`, `whatsapp`, `instagram` (juga dipakai QR dan footer),
`motionReel` (tombol "Open", folder Google Drive), `email`, `phone`. Nilai berawalan `ISI_` (jika ada) berarti placeholder yang harus diisi.
Link internal memakai ID section (`#about`, dst.) dengan smooth scroll.

## Mengatur animasi
Buka `animations/animationConfig.js`. Setiap pengaturan berkomentar dan terhubung ke kode, contoh:
`buttonHoverScale`, `buttonAnimationDuration`, `textRevealDuration`, `textRevealDelay`,
`scrollAnimationDistance`, `imageFadeDuration`, `sectionStaggerDelay`.
Atribut HTML: `data-reveal`, `data-split="words"`, `data-image`, `data-parallax`, `data-stagger`, `data-magnetic`.
Pengguna dengan *reduced motion* otomatis melihat halaman tanpa animasi.

## Interaksi (kursor, tarik, goyang)
Diatur di `animations/animationConfig.js` (bagian "Interaksi") dan dijalankan oleh `animations/interactions.js`.
Elemen yang interaktif adalah yang punya atribut `data-interactive` (bintang chrome dan huruf "Portfolio").
Tambahkan atribut itu ke elemen lain untuk ikut interaktif. Wiggle bintang: `starWiggle*`. Huruf naik: `letterReveal*`, `letterStagger`.
Sensor goyang perangkat hanya jalan lewat HTTPS atau localhost; di iPhone, izin muncul saat pengunjung pertama kali mengetuk layar.

## Menambah / menghapus section
1. Buat file di `sections/` (salin pola `Sections.namaBaru = (c) => \`...\``).
2. Tambahkan `<script src="sections/namaBaru.js">` di `index.html`.
3. Tambahkan nama itu ke `ORDER` di `main.js`. Untuk menghapus: hapus dari `ORDER`.
