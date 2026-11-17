// ============================================================
// COMPONENTS — Potongan UI yang dipakai berulang.
// ============================================================
window.UI = {
  // Judul dua gaya (tebal-miring + tipis), contoh: "Port" + "folio"
  title(bold, light, tag = "h2", cls = "") {
    return `<${tag} class="duo-title ${cls}" data-split="words"><b>${bold}</b> <span>${light}</span></${tag}>`;
  },
  // Bintang chrome dekoratif dari desain
  star(cls = "") {
    return `<svg class="star ${cls}" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="chr${cls.length}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#9aa0a6"/><stop offset=".7" stop-color="#f4f4f4"/><stop offset="1" stop-color="#6d7378"/></linearGradient></defs><path d="M50 2 58 38 98 50 58 62 50 98 42 62 2 50 42 38Z" fill="url(#chr${cls.length})" stroke="#2b2f33" stroke-width="2.5" stroke-linejoin="round"/></svg>`;
  },
  // Tombol kaca. `link` = nama di config/links.js
  button(text, link, cls = "") {
    return `<a class="btn glass-btn ${cls}" data-link="${link}"><span>${text}</span></a>`;
  },
  // Pecah teks menjadi huruf (untuk animasi per-huruf & interaksi kursor)
  letters(text) {
    return [...text].map((ch) => `<span class="char-wrap"><span class="char" data-interactive="char">${ch}</span></span>`).join("");
  },
  img(src, alt, cls = "") {
    return `<img class="${cls}" src="${src}" alt="${alt}" loading="lazy" decoding="async">`;
  },
};

// Mengisi href semua elemen [data-link] dari config/links.js.
window.applyLinks = function () {
  const L = window.SITE_LINKS;
  document.querySelectorAll("[data-link]").forEach((el) => {
    const cfg = L[el.dataset.link];
    if (!cfg) { console.warn("Link tidak ditemukan di links.js:", el.dataset.link); return; }
    if (/^ISI_/.test(cfg.url)) { // placeholder belum diisi
      el.setAttribute("href", "#"); el.dataset.placeholder = "true";
      el.addEventListener("click", (e) => { e.preventDefault(); console.warn(`[links.js] "${el.dataset.link}" belum diisi.`); });
      return;
    }
    el.setAttribute("href", cfg.url);
    if (cfg.external) { el.target = "_blank"; el.rel = "noopener noreferrer"; }
  });
};
