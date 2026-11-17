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

  // ---- Wiggle bintang chrome (hero) ----
  starWiggleAngle: 12,             // sudut goyang (derajat) kiri-kanan
  starWiggleScale: 1.06,           // ukuran maksimum saat berdenyut (1 = tidak berubah)
  starWiggleDuration: 2.6,         // durasi satu siklus goyang (detik); bintang ke-2 sedikit berbeda

  // ---- Judul "Portfolio" muncul per huruf dari bawah ----
  letterRevealDuration: 0.95,      // durasi tiap huruf naik
  letterStagger: 0.07,             // jeda antar-huruf
  letterRevealEase: "power4.out",

  // ---- Interaksi (kursor, tarik, sensor perangkat) -> animations/interactions.js ----
  repelRadius: 150,                // jarak (px) kursor mulai mendorong elemen; 0 = mati
  repelStrength: 2600,             // kekuatan dorongan; makin besar elemen menghindar makin jauh
  springStiffness: 55,             // kekencangan pegas saat elemen kembali ke tempat asal
  springDamping: 7,                // peredam; kecil = memantul lebih lama, besar = cepat diam
  dragFollow: 0.9,                 // seberapa ikut elemen saat ditarik (1 = persis kursor)
  maxDisplacement: 220,            // batas tarikan (px); makin jauh makin berat (elastis)
  flingBoost: 0.8,                 // dorongan dari kecepatan tarikan saat dilepas
  releaseSnap: 7,                  // sentakan balik saat dilepas ("mental"); 0 = tanpa sentakan
  shakeThreshold: 2.2,             // ambang guncangan (m/s²); di bawah ini perangkat dianggap diam
  shakeStrength: 70,               // seberapa kuat elemen bergoyang saat perangkat diguncang
  shakeMaxImpulse: 900,            // batas dorongan per guncangan

  // ---- Menghindar kursor: HANYA konten 1 (hero) ----
  // Bintang chrome & huruf "Portfolio" sudah otomatis (data-interactive). Di sini: teks yang dipecah per-HURUF lalu menghindar.
  repelBigTextSelector: ".hero__year",   // "2026" -> tiap angka menghindar sendiri-sendiri
  repelSelector: "",                     // elemen utuh tambahan yang menghindar (kosong = tidak ada)
  repelMinMass: 0.12,              // elemen besar bergerak lebih sedikit; 0.12 = paling berat

  // ---- Efek "pop up" saat kursor mendekat/melewati ----
  // Yang dilewati kursor membesar penuh (scale); yang di dekatnya ikut membesar lebih kecil (neighbor), makin jauh makin kecil.
  // Tiap grup: selector = elemen target | split = "letters" (per huruf) / "words" (per kata) / kosong (elemen utuh)
  //            scale = tambahan ukuran penuh (0.3 = +30%) | neighbor = tambahan ukuran tetangga terdekat
  //            radius = jarak (px) pengaruh | power = ketajaman jatuhnya efek (besar = tetangga cepat mengecil)
  //            sizeAdjust = true: elemen lebar otomatis pop lebih kecil | origin = titik tumpu skala (default: tengah elemen, supaya pop selalu center)
  popGroups: [
    { selector: ".work figure",                     scale: 0.16, neighbor: 0.085, radius: 260, power: 1.4, sizeAdjust: true },        // foto desain grafis & ilustrasi
    { selector: ".about__text, .work__desc",        split: "letters", scale: 0.85, neighbor: 0.42, radius: 48, power: 2.2 },         // isi about me + penjelasan 3 karya: per huruf
    { selector: ".thanks p",                        split: "letters", scale: 0.7,  neighbor: 0.35, radius: 55, power: 2.2 },         // teks di bawah "thank you": per huruf
    { selector: ".topbar",                          scale: 0.08, neighbor: 0.03, radius: 30, power: 1 },                             // bar kaca: pop selama kursor ada di areanya
    { selector: ".topbar > *",                      scale: 0.28, neighbor: 0.12, radius: 70, power: 1.6 },                          // syadad / 18 y.o / smkn 1 cibadak
    { selector: ".about__intro p, .about__name, .h-sm, .skills p, .work__title, .duo-title--xl, .scan__title", scale: 0.14, neighbor: 0.06, radius: 120, power: 1.6 }, // judul & education: utuh
    { selector: ".soft li",                         scale: 0.2,  neighbor: 0.09, radius: 90, power: 1.6 },    // tiap soft skill
    { selector: ".socials img, .hard img, .ring",   scale: 0.32, neighbor: 0.14, radius: 110, power: 1.6 },                         // logo sosmed, logo aplikasi, lingkaran persen + angkanya
  ],
  popStiffness: 260,               // kekencangan pegas pop; besar = cepat
  popDamping: 20,                  // peredam; kecil = memantul lebih lama

  // ---- Mobile: konten kedua naik dari bawah setelah welcome ----
  mobileSlideUpDuration: 1.1,      // durasi kartu profil naik dari bawah (khusus mobile)
  mobileSlideUpEase: "power3.out",

  // ---- Animasi pembuka (intro) ----
  introDuration: 2.3,              // lama layar welcome tampil (detik) sebelum naik ke atas; hitungan 0-100% & progress bar mengikuti ini
  introExitDuration: 0.95,         // durasi layar welcome terangkat ke atas
  introExitEase: "power3.inOut",
  introHeroStagger: 0.15,          // jeda antar-elemen hero setelah intro
};
