// ============================================================
// LINK CONFIGURATION — Tempat mengubah SELURUH URL website.
// Ubah URL di file ini saja; semua tombol/ikon membaca dari sini.
// Jika ada nilai yang diawali "ISI_" itu PLACEHOLDER yang wajib kamu ganti.
// Selama masih placeholder, tombol tidak akan membuka halaman apa pun.
// ============================================================
window.SITE_LINKS = {
  // ---- Navigasi internal (ID section + smooth scroll) ----
  home:          { url: "#home" },
  about:         { url: "#about" },
  creative:      { url: "#creative" },
  designGraphic: { url: "#design-graphic" },
  illustration:  { url: "#illustration" },
  motionGraphic: { url: "#motion-graphic" },
  contact:       { url: "#contact" },

  // ---- Link eksternal (buka di tab baru) ----
  linkedin:      { url: "https://www.linkedin.com/in/syadad-creates-40a851393?utm_source=share_via&utm_content=profile&utm_medium=member_android", external: true },
  whatsapp:      { url: "https://wa.me/6283183665519", external: true },
  instagram:     { url: "https://www.instagram.com/syadad.creates?igsh=ZXczMHNoZnRxZnc1", external: true },
  motionReel:    { url: "https://drive.google.com/drive/folders/1kXT3vbusTpyz2Odq0Vipqvh75q6Q9mF4", external: true }, // tombol "Open" (Google Drive)
  email:         { url: "mailto:syadad.creates@gmail.com", external: false }, // dari desain
  phone:         { url: "tel:+6283183665519", external: false },        // nomor sama dengan link WhatsApp
};
