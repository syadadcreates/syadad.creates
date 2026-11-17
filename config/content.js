// ============================================================
// CONTENT CONFIGURATION — Semua teks & daftar gambar website.
// Ubah tulisan di sini tanpa menyentuh kode section.
// Path gambar relatif terhadap index.html (folder assets/).
// ============================================================
window.SITE_CONTENT = {
  intro: { text: "welcome" }, // tulisan di layar pembuka sebelum masuk ke portfolio

  topbar: { name: "syadad", age: "18 y.o", school: "smkn 1 cibadak" },

  hero: { titleBold: "Port", titleLight: "folio", year: "2026" },

  about: {
    greeting: "Hi , I’m",
    name: "syadad",
    photo: "assets/img/profile.png",
    photoAlt: "Foto profil syadad",
    title: "About me",
    text: "While pursuing my formal education, I have dedicated myself to exploring the professional graphic design industry. My most significant achievement to date was being entrusted to design the portfolio carousel showcased at the FPU Leader Forum at the University of Indonesia. With experience handling diverse client projects ranging from posters to custom merchandise, I am now focused on integrating industry-standard creativity into every piece of work I produce.",
    socialButtonText: "Click here",
    socials: [ // key = nama di links.js
      { link: "linkedin",  icon: "assets/icons/linkedin.svg",  label: "LinkedIn" },
      { link: "whatsapp",  icon: "assets/icons/whatsapp.png",  label: "WhatsApp" },
      { link: "instagram", icon: "assets/icons/instagram.png", label: "Instagram" },
    ],
    hardSkillsTitle: "hard skills",
    hardSkills: [
      { name: "Photoshop",    icon: "assets/icons/photoshop.png",    level: 90 },
      { name: "Figma",        icon: "assets/icons/figma.png",        level: 85 },
      { name: "After Effects",icon: "assets/icons/aftereffects.png", level: 80 },
      { name: "CapCut",       icon: "assets/icons/capcut.png",       level: 70 },
    ],
    softSkillsTitle: "soft skills",
    softSkills: ["Critical thinking", "Problem solving", "Adaptif & solutif", "Kolaboratif", "Time Management"],
    educationTitle: "Education",
    education: ["2024 - present", "SMKN 1 CIBADAK"],
  },

  creative: { titleBold: "Creative", titleLight: "output" },

  designGraphic: {
    title: "Design Graphic",
    description: "Visualizing client briefs into consistent brand designs to strengthen messaging and effectively reach the target audience.",
    carousel: { src: "assets/img/carousel-maria.webp", alt: "Carousel portofolio Impact Starts With Me" },
    posters: [
      { src: "assets/img/poster-maros.webp",      alt: "Infografis Pendidikan di Kabupaten Maros" },
      { src: "assets/img/poster-ramadhan.webp",   alt: "Poster Marhaban Ya Ramadhan" },
      { src: "assets/img/poster-f40.webp",        alt: "Poster Born to Race" },
      { src: "assets/img/poster-porsche.webp",    alt: "Poster Cruise Into Paradise" },
      { src: "assets/img/poster-najriel.webp",    alt: "Poster XI E2" },
      { src: "assets/img/poster-idul-fitri.webp", alt: "Poster Selamat Hari Raya Idul Fitri 1447 H" },
    ],
    banner: { src: "assets/img/menu-carousel.webp", alt: "Carousel menu makanan Titik Temu" },
  },

  illustration: {
    title: "Ilustration",
    description: "Bringing spontaneous ideas to life through playful illustrations, creatively repurposing existing visual elements while exploring different styles, compositions, and artistic possibilities.",
    works: [
      { src: "assets/img/porsche-illustration.webp", alt: "Ilustrasi Porsche 911 Targa" },
      { src: "assets/img/f40-illustration.webp",     alt: "Ilustrasi Ferrari F40" },
      { src: "assets/img/mercedes-190e.webp",        alt: "Ilustrasi Mercedes 190E" },
    ],
  },

  motionGraphic: {
    title: "Motion Graphic",
    description: "A collection of motion graphics and animations focused on exploring new techniques, experimenting with movement, and refining my animation style.",
    buttonText: "Open",
  },

  scan: {
    titleBold: "Scan",
    titleLight: "to explore",
    titleLine2: "my work",
    qr: "assets/icons/qr-instagram.png",
    qrAlt: "QR code Instagram @syadad.creates",
    caption: "Instagram",
  },

  thanks: { titleBold: "Thank", titleLight: "you", tagline: "Let’s <b>create</b> something <b>impactful</b> together" },

  footer: {
    handle: "@syadad.craetes",   // tulisan persis seperti di desain
    email: "syadad.creates@gmail.com",
    phone: "0831-8366-5519",
  },
};
