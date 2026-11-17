// MAIN — Merakit semua section sesuai urutan desain, lalu menyalakan link & animasi.
// Untuk menambah/menghapus section: edit daftar ORDER di bawah.
(function () {
  const ORDER = ["hero", "about", "creative", "contact"]; // urutan dari atas ke bawah
  const PAGE_PAIRS = [["home", "about"], ["creative", "design-graphic"], ["illustration", "motion-graphic"], ["contact", "thanks"]];
  const c = window.SITE_CONTENT;
  document.getElementById("app").innerHTML = ORDER.map((k) => Sections[k](c)).join("");
  document.querySelector(".intro__name")?.replaceChildren(c.intro.text);
  // MOBILE: dua section digabung dalam satu layar (di desktop pembungkus ini tidak berefek).
  // Ubah pasangan di PAGE_PAIRS (isi = ID section). Section yang tidak tercantum berdiri sendiri.
  PAGE_PAIRS.forEach(([a, b]) => {
    const A = document.getElementById(a), B = document.getElementById(b);
    if (!A || !B) return;
    const page = document.createElement("div"); page.className = "page";
    A.before(page); page.append(A, B);
  });
  applyLinks();
  window.initAnimations();
})();
