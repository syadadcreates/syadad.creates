// ============================================================
// ANIMATION SETTINGS — Tempat mengatur durasi, delay, jarak,
// easing, stagger, dan intensitas hover. Semua nilai di sini
// DIPAKAI langsung oleh animations/animations.js.
// Satuan waktu: detik. Satuan jarak: piksel.
// ============================================================
window.ANIMATION_CONFIG = {
  // ---- Tombol ----
  buttonHoverScale: 1.06,          // seberapa besar tombol membesar saat hover (1 = tidak berubah)
  buttonAnimationDuration: 0.25,   // durasi transisi hover tombol
  buttonClickScale: 0.92,          // ukuran tombol saat ditekan (efek pop)
  buttonClickBounceDuration: 0.6,  // durasi pantulan setelah klik
  buttonEase: "power2.out",        // karakter gerak hover
  buttonBounceEase: "elastic.out(1, 0.45)", // karakter pantulan klik
  magneticStrength: 0.3,           // 0 = mati; makin besar tombol makin "tertarik" kursor
  magneticRadius: 90,              // jarak (px) dari tombol agar efek magnetic aktif

  // ---- Teks ----
  textRevealDuration: 0.9,         // durasi kemunculan teks
  textRevealDelay: 0,              // jeda sebelum teks mulai muncul
  textRevealEase: "power3.out",
  wordStaggerDelay: 0.08,          // jeda antar-kata pada judul (data-split="words")
  scrollAnimationDistance: 40,     // jarak gerak dari bawah ke atas saat muncul (px)

  // ---- Gambar ----
  imageFadeDuration: 1.1,          // durasi fade-in gambar
  imageStartScale: 1.04,           // gambar mengecil dari skala ini saat muncul
  imageEase: "power2.out",
  parallaxDistance: 28,            // gerak vertikal halus gambar saat scroll (px); 0 = mati

  // ---- Scroll ----
  scrollTriggerStart: "top 85%",   // elemen muncul saat bagian atasnya mencapai 85% tinggi layar
  sectionStaggerDelay: 0.12,       // jeda muncul antar-elemen dalam satu grup (data-stagger)
  animateOnce: true,               // true = animasi tidak diulang saat scroll naik-turun
  smoothScrollDuration: 0.9,       // (detik) lama scroll saat klik menu internal

  // ---- Lingkaran skill (persen) ----
  skillRingDuration: 1.6,          // durasi lingkaran terisi & angka menghitung dari 0 ke target
  skillRingEase: "power2.out",     // karakter gerak pengisian
  skillRingStagger: 0.15,          // jeda antar-lingkaran (Photoshop, Figma, dst.)

  // ---- Animasi pembuka (intro) ----
  introHoldTime: 0.5,              // lama nama tampil di layar pembuka
  introFadeDuration: 0.8,          // durasi layar pembuka menghilang
  introHeroStagger: 0.15,          // jeda antar-elemen hero setelah intro
};
