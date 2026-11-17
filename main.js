// MAIN — Merakit semua section sesuai urutan desain, lalu menyalakan link & animasi.
// Untuk menambah/menghapus section: edit daftar ORDER di bawah.
(function () {
  const ORDER = ["hero", "about", "creative", "contact"]; // urutan dari atas ke bawah
  const PAGE_PAIRS = [["home", "about"], ["creative", "design-graphic"], ["illustration", "motion-graphic"], ["contact", "thanks"]];
  const c = window.SITE_CONTENT;
  document.getElementById("app").innerHTML = ORDER.map((k) => Sections[k](c)).join("");
  // Layar welcome: huruf muncul satu-satu, tulisan kecil, hitungan 0-100% (animasi CSS; angka dihitung di sini)
  const nm = document.querySelector(".intro__name");
  if (nm) nm.innerHTML = [...c.intro.text].map((ch, i) => `<span class="ic" style="--i:${i}">${ch === " " ? "&nbsp;" : ch}</span>`).join("");
  document.querySelector(".intro__sub")?.replaceChildren(c.intro.sub || "");
  const introEl = document.querySelector(".intro"), count = document.querySelector(".intro__count"), dur = (window.ANIMATION_CONFIG.introDuration || 2.3) * 1000;
  if (introEl && count) {
    introEl.style.setProperty("--intro-dur", dur + "ms");
    const t0 = performance.now(), ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const tick = (now) => { const t = Math.min((now - t0) / dur, 1); count.textContent = Math.round(100 * ease(t)) + "%"; if (t < 1 && document.body.contains(introEl)) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }
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
  window.initInteractions(); // kursor menghindar, tarik-lepas, goyang sensor perangkat
})();
