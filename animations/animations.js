// ============================================================
// ANIMATION ENGINE — Logika animasi (GSAP + ScrollTrigger).
// Jangan isi angka di sini; atur di animationConfig.js.
// Atribut HTML yang dikenali:
//   data-reveal            fade + naik saat masuk layar
//   data-split="words"     judul muncul kata demi kata
//   data-image             fade + zoom-out halus
//   data-parallax          gerak halus saat scroll
//   data-stagger / data-stagger-item   grup yang muncul berurutan
//   data-magnetic          tombol dengan efek magnetic
//   .btn                   hover membesar + pop saat diklik
// ============================================================
(function () {
  const C = window.ANIMATION_CONFIG;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  // ---------- Smooth scroll untuk link internal ----------
  function initSmoothScroll() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      const target = id.length > 1 ? document.querySelector(id) : null;
      if (!target) { if (id === "#") e.preventDefault(); return; }
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  }

  // ---------- Tombol: hover, klik, magnetic ----------
  function initButtons() {
    document.querySelectorAll(".btn").forEach((btn) => {
      btn.addEventListener("pointerenter", () => gsap.to(btn, { scale: C.buttonHoverScale, duration: C.buttonAnimationDuration, ease: C.buttonEase, overwrite: "auto" }));
      btn.addEventListener("pointerleave", () => gsap.to(btn, { scale: 1, x: 0, y: 0, duration: C.buttonAnimationDuration, ease: C.buttonEase, overwrite: "auto" }));
      btn.addEventListener("pointerdown", () => gsap.to(btn, { scale: C.buttonClickScale, duration: 0.1, overwrite: "auto" }));
      btn.addEventListener("pointerup", () => gsap.to(btn, { scale: C.buttonHoverScale, duration: C.buttonClickBounceDuration, ease: C.buttonBounceEase, overwrite: "auto" }));
    });
    if (!C.magneticStrength || !window.matchMedia("(hover: hover)").matches) return;
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      window.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const near = Math.abs(dx) < r.width / 2 + C.magneticRadius && Math.abs(dy) < r.height / 2 + C.magneticRadius;
        gsap.to(el, { x: near ? dx * C.magneticStrength : 0, y: near ? dy * C.magneticStrength : 0, duration: 0.4, ease: C.buttonEase, overwrite: "auto" });
      }, { passive: true });
    });
  }

  // ---------- Pecah judul menjadi kata ----------
  function splitWords(el) {
    const nodes = [...el.childNodes], frag = document.createDocumentFragment();
    nodes.forEach((n) => {
      if (n.nodeType === 3) {
        n.textContent.split(/(\s+)/).forEach((w) => {
          if (!w.trim()) { frag.append(w); return; }
          const s = document.createElement("span"); s.className = "word"; s.textContent = w; frag.append(s);
        });
      } else { n.classList && n.classList.add("word"); frag.append(n); }
    });
    el.replaceChildren(frag);
    return el.querySelectorAll(".word");
  }

  // ---------- Animasi saat elemen masuk layar ----------
  function initScrollAnimations() {
    const trig = (el) => ({ trigger: el, start: C.scrollTriggerStart, once: C.animateOnce, toggleActions: C.animateOnce ? "play none none none" : "play reverse play reverse" });
    const up = { y: C.scrollAnimationDistance, autoAlpha: 0 };
    const upTo = { y: 0, autoAlpha: 1, duration: C.textRevealDuration, delay: C.textRevealDelay, ease: C.textRevealEase };

    document.querySelectorAll("[data-split='words']").forEach((el) => {
      const words = splitWords(el);
      gsap.fromTo(words, up, { ...upTo, stagger: C.wordStaggerDelay, scrollTrigger: trig(el) });
      gsap.set(el, { autoAlpha: 1 });
    });
    // Mobile: isi kartu profil tidak perlu reveal sendiri, karena kartunya sudah naik dari bawah.
    const inSlideCard = (el) => isMobile && el.closest(".about");
    document.querySelectorAll("[data-reveal]").forEach((el) => { if (inSlideCard(el)) gsap.set(el, { autoAlpha: 1 }); else gsap.fromTo(el, up, { ...upTo, scrollTrigger: trig(el) }); });
    document.querySelectorAll("[data-stagger]").forEach((g) => {
      if (inSlideCard(g)) { gsap.set(g, { autoAlpha: 1 }); return; }
      const items = g.querySelectorAll("[data-stagger-item]");
      gsap.fromTo(items, up, { ...upTo, stagger: C.sectionStaggerDelay, scrollTrigger: trig(g) });
      gsap.set(g, { autoAlpha: 1 });
    });
    document.querySelectorAll("[data-image]").forEach((el) => inSlideCard(el) ? gsap.set(el, { autoAlpha: 1 }) :
      gsap.fromTo(el, { autoAlpha: 0, scale: C.imageStartScale }, { autoAlpha: 1, scale: 1, duration: C.imageFadeDuration, ease: C.imageEase, scrollTrigger: trig(el) }));
    if (C.parallaxDistance) {
      document.querySelectorAll("[data-parallax]").forEach((el) =>
        gsap.fromTo(el, { y: -C.parallaxDistance }, { y: C.parallaxDistance, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } }));
    }
  }

  // ---------- Lingkaran skill: terisi + angka menghitung dari 0 ----------
  const rings = () => [...document.querySelectorAll(".ring[data-level]")];
  const isMobile = window.matchMedia("(max-width: 820px)").matches;
  function setRingsFinal() { rings().forEach((r) => { r.style.setProperty("--v", r.dataset.level); r.querySelector("b").textContent = r.dataset.level + "%"; }); }
  function playRings() {
    rings().forEach((r, i) => {
      const o = { v: 0 }, label = r.querySelector("b"), target = +r.dataset.level;
      gsap.to(o, { v: target, duration: C.skillRingDuration, delay: i * C.skillRingStagger, ease: C.skillRingEase,
        onUpdate() { r.style.setProperty("--v", o.v); label.textContent = Math.round(o.v) + "%"; } });
    });
  }
  // Desktop: jalan saat area skill masuk layar. Mobile: langsung setelah layar "welcome" selesai.
  function initSkillRings() {
    if (isMobile) return;
    ScrollTrigger.create({ trigger: ".hard", start: C.scrollTriggerStart, once: true, onEnter: playRings });
  }

  // ---------- Wiggle bintang chrome ----------
  function initStarWiggle() {
    document.querySelectorAll(".hero .star").forEach((star, i) => {
      const a = C.starWiggleAngle * (i % 2 ? -1 : 1), d = C.starWiggleDuration * (1 + i * 0.22);
      gsap.to(star, { keyframes: [
        { rotation: a, scale: C.starWiggleScale }, { rotation: -a * 0.7, scale: 1 },
        { rotation: a * 0.45, scale: C.starWiggleScale * 0.98 }, { rotation: 0, scale: 1 } ],
        duration: d, ease: "sine.inOut", repeat: -1 });
    });
  }

  // ---------- Animasi pembuka ----------
  function runIntro() {
    const intro = document.querySelector(".intro");
    const heroItems = document.querySelectorAll("[data-hero]");
    const tl = gsap.timeline();
    tl.fromTo(".intro__name", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: C.textRevealDuration, ease: C.textRevealEase })
      .to(intro, { autoAlpha: 0, duration: C.introFadeDuration, delay: C.introHoldTime, onComplete: () => intro.remove() })
      .addLabel("heroIn", "-=0.4")
      .fromTo(heroItems, { y: C.scrollAnimationDistance, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: C.textRevealDuration, ease: C.textRevealEase, stagger: C.introHeroStagger }, "heroIn")
      .fromTo(isMobile ? ".about" : {}, { yPercent: 100 }, { yPercent: 0, duration: C.mobileSlideUpDuration, ease: C.mobileSlideUpEase }, "heroIn+=0.15")
      .fromTo(".hero .char", { yPercent: 120 }, { yPercent: 0, duration: C.letterRevealDuration, ease: C.letterRevealEase, stagger: C.letterStagger,
        onComplete: () => document.querySelectorAll(".char-wrap").forEach((w) => w.classList.add("is-revealed")) }, "-=0.5")
      .add(() => { if (isMobile) playRings(); }, "-=0.2");
  }

  window.initAnimations = function () {
    initSmoothScroll();
    if (reduce || !window.gsap) { // reduced motion / GSAP gagal dimuat → tampilkan semua tanpa animasi
      root.classList.add("no-anim"); setRingsFinal(); document.querySelectorAll(".char-wrap").forEach((w) => w.classList.add("is-revealed")); document.querySelector(".intro")?.remove(); return;
    }
    gsap.registerPlugin(ScrollTrigger);
    initButtons(); initScrollAnimations(); initSkillRings(); initStarWiggle(); runIntro();
  };
})();
