// ============================================================
// INTERACTIONS — Fisika sederhana untuk elemen ber-atribut data-interactive
// (hampir semua elemen; tombol & link dikecualikan agar tetap bisa diklik). Semua angka dari animationConfig.js.
//  1) Kursor mendekat  -> (HANYA konten 1) bintang, huruf "Portfolio", angka "2026" menghindar, lalu kembali saat kursor menjauh.
//     Elemen lain "pop up": yang dilewati kursor membesar penuh, tetangganya ikut membesar lebih kecil (lihat popGroups).
//  2) Elemen ditarik    -> ikut tertarik (elastis); saat dilepas mental & kembali ke asal.
//  3) Sensor perangkat  -> perangkat diam = elemen diam; diguncang = elemen ikut bergoyang.
// Pergeseran memakai properti CSS `translate` agar tidak bentrok dengan animasi GSAP (transform).
// ============================================================
(function () {
  const C = window.ANIMATION_CONFIG;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, m) => Math.max(-m, Math.min(m, v));

  window.initInteractions = function () {
    if (reduce) return;
    const qa = (sel) => (sel ? [...document.querySelectorAll(sel)] : []);
    const eligible = (el) => !el.closest("a, button, .btn");
    // Pecah teks jadi potongan kecil (kata / huruf). `repel` = potongan ikut menghindar kursor.
    const splitText = (el, chars, repel) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), nodes = [], units = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach((n) => {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((tok) => {
          if (!tok) return;
          if (/^\s+$/.test(tok)) { frag.append(tok); return; }
          const w = document.createElement("span");
          if (chars) { // kata dibungkus (tidak putus di tengah), isinya huruf-huruf
            w.className = "rw rw--word";
            [...tok].forEach((ch) => { const c = document.createElement("span"); c.className = "rc"; c.textContent = ch; if (repel) c.dataset.interactive = "auto"; w.append(c); units.push(c); });
          } else { w.className = "rw"; w.textContent = tok; if (repel) w.dataset.interactive = "auto"; units.push(w); }
          frag.append(w);
        });
        n.replaceWith(frag);
      });
      return units;
    };
    // Menghindar: hanya konten 1
    qa(C.repelBigTextSelector).forEach((el) => eligible(el) && splitText(el, true, true));
    qa(C.repelSelector).forEach((el) => { if (!el.dataset.interactive && eligible(el)) el.dataset.interactive = "auto"; });
    // Pop: siapkan target tiap grup (teks dipecah sesuai `split`)
    const pops = [];
    (C.popGroups || []).forEach((g) => {
      qa(g.selector).forEach((el) => {
        const targets = g.split ? (eligible(el) ? splitText(el, g.split === "letters", false) : []) : [el];
        targets.forEach((t) => {
          if (getComputedStyle(t).position === "static") t.style.position = "relative"; // agar z-index (yang paling besar di atas) berlaku
          if (g.origin) t.style.transformOrigin = g.origin;
          pops.push({ el: t, g, s: 0, v: 0, visible: true });
        });
      });
    });
    window.ScrollTrigger && ScrollTrigger.refresh(); // tata letak teks bisa bergeser sedikit setelah dipecah
    const items = qa("[data-interactive]").map((el) => ({ el, kind: el.dataset.interactive, x: 0, y: 0, vx: 0, vy: 0, k: 0.6 + Math.random() * 0.8, visible: true }));
    const massOf = (w, h, s) => (s.kind === "auto" ? Math.max(C.repelMinMass, Math.min(1, 160 / Math.max(w, h, 1))) : 1);
    const owner = new Map([...items, ...pops].map((o) => [o.el, o]));
    const io = new IntersectionObserver((es) => es.forEach((e) => { const o = owner.get(e.target); if (o) o.visible = e.isIntersecting; }), { rootMargin: "200px" });
    owner.forEach((o, el) => io.observe(el));
    if (!items.length && !pops.length) return;
    let cursor = null, drag = null, raf = 0, last = 0;

    const wake = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); } };
    const elastic = (v) => Math.sign(v) * C.maxDisplacement * (1 - Math.exp(-Math.abs(v) / C.maxDisplacement)); // makin jauh makin berat

    function step(now) {
      const dt = Math.min((now - last) / 1000 || 0.016, 1 / 30); last = now;
      let active = !!cursor || !!drag;
      // Pass 1: baca ukuran semua elemen (tanpa menulis) supaya browser cukup menghitung layout sekali per frame.
      const rects = items.map((s) => (cursor && C.repelRadius > 0 && s.visible && !(drag && drag.s === s)) ? s.el.getBoundingClientRect() : null);
      const popRects = pops.map((p) => (cursor && p.visible) ? p.el.getBoundingClientRect() : null);
      // Pass 2: hitung gaya & tulis posisi.
      items.forEach((s, i) => {
        if (drag && drag.s === s) return;
        let ax = -C.springStiffness * s.x - C.springDamping * s.vx;
        let ay = -C.springStiffness * s.y - C.springDamping * s.vy;
        const r = rects[i];
        if (r) {
          const l0 = r.left - s.x, t0 = r.top - s.y; // posisi asli tanpa pergeseran
          const nx = Math.max(l0, Math.min(cursor.x, l0 + r.width)), ny = Math.max(t0, Math.min(cursor.y, t0 + r.height));
          const d = Math.hypot(nx - cursor.x, ny - cursor.y); // jarak kursor ke tepi terdekat elemen
          if (d < C.repelRadius) {
            const ex = l0 + r.width / 2 - cursor.x, ey = t0 + r.height / 2 - cursor.y, el = Math.hypot(ex, ey) || 1;
            const f = Math.pow(1 - d / C.repelRadius, 2) * C.repelStrength * massOf(r.width, r.height, s);
            ax += (ex / el) * f; ay += (ey / el) * f;
          }
        }
        s.vx += ax * dt; s.vy += ay * dt;
        s.x = clamp(s.x + s.vx * dt, C.maxDisplacement * 1.4); s.y = clamp(s.y + s.vy * dt, C.maxDisplacement * 1.4);
        s.el.style.translate = `${s.x.toFixed(2)}px ${s.y.toFixed(2)}px`;
        if (Math.abs(s.x) > 0.05 || Math.abs(s.y) > 0.05 || Math.abs(s.vx) > 0.5 || Math.abs(s.vy) > 0.5) active = true;
        else { s.x = s.y = s.vx = s.vy = 0; s.el.style.translate = ""; }
      });
      // Pop up: yang dilewati kursor paling besar, tetangganya lebih kecil, makin jauh makin kecil
      pops.forEach((p, i) => {
        const g = p.g, r = popRects[i];
        let target = 0;
        if (r) {
          const k = 1 + p.s, w = r.width / k, h = r.height / k, cx = r.left + r.width / 2, cy = r.top + r.height / 2; // ukuran asli tanpa skala
          const d = Math.hypot(Math.max(Math.abs(cursor.x - cx) - w / 2, 0), Math.max(Math.abs(cursor.y - cy) - h / 2, 0));
          const size = g.sizeAdjust ? Math.max(0.2, Math.min(1, 260 / Math.max(w, h, 1))) : 1; // elemen lebar → pop lebih kecil
          if (d === 0) target = g.scale * size;
          else if (d < g.radius) target = g.neighbor * Math.pow(1 - d / g.radius, g.power || 1.4) * size;
        }
        if (!target && !p.s && !p.v) return; // diam: tidak perlu menulis apa pun
        p.v += (C.popStiffness * (target - p.s) - C.popDamping * p.v) * dt;
        p.s += p.v * dt;
        if (Math.abs(p.s) > 0.0004 || Math.abs(p.v) > 0.01 || target) {
          active = true;
          p.el.style.scale = (1 + p.s).toFixed(4);
          p.el.style.setProperty("--p", Math.max(0, Math.min(1, p.s / g.scale)).toFixed(3));
          p.el.style.zIndex = p.s > 0.004 ? 10 + Math.round(p.s * 100) : "";
        } else { p.s = p.v = 0; p.el.style.scale = ""; p.el.style.zIndex = ""; p.el.style.removeProperty("--p"); }
      });
      raf = active ? requestAnimationFrame(step) : 0;
    }

    // ---- 1) Kursor ----
    window.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      cursor = { x: e.clientX, y: e.clientY }; wake();
    }, { passive: true });
    document.documentElement.addEventListener("mouseleave", () => { cursor = null; wake(); });

    // ---- 2) Tarik & lepas ----
    items.filter((s) => s.kind !== "auto").forEach((s) => { // hanya bintang & huruf judul yang bisa ditarik
      s.el.addEventListener("dragstart", (e) => e.preventDefault());
      s.el.addEventListener("pointerdown", (e) => {
        if (e.pointerType === "touch" && s.kind !== "star") return; // huruf: biarkan scroll di layar sentuh
        e.preventDefault(); s.el.setPointerCapture(e.pointerId); s.el.classList.add("is-dragging");
        drag = { s, px: e.clientX, py: e.clientY, sx: s.x, sy: s.y, t: performance.now(), vx: 0, vy: 0 };
        s.vx = s.vy = 0; wake();
      });
      s.el.addEventListener("pointermove", (e) => {
        if (!drag || drag.s !== s) return;
        const nx = elastic(drag.sx + (e.clientX - drag.px) * C.dragFollow), ny = elastic(drag.sy + (e.clientY - drag.py) * C.dragFollow);
        const now = performance.now(), dt = Math.max((now - drag.t) / 1000, 0.001);
        drag.vx = 0.6 * drag.vx + 0.4 * ((nx - s.x) / dt); drag.vy = 0.6 * drag.vy + 0.4 * ((ny - s.y) / dt); drag.t = now;
        s.x = nx; s.y = ny; s.el.style.translate = `${nx.toFixed(2)}px ${ny.toFixed(2)}px`;
      });
      const release = () => {
        if (!drag || drag.s !== s) return;
        s.vx = drag.vx * C.flingBoost - s.x * C.releaseSnap; s.vy = drag.vy * C.flingBoost - s.y * C.releaseSnap; // mental balik
        drag = null; s.el.classList.remove("is-dragging"); wake();
      };
      s.el.addEventListener("pointerup", release); s.el.addEventListener("pointercancel", release);
    });

    // ---- 3) Sensor gerak perangkat (HP): diam = diam, diguncang = bergoyang ----
    function enableMotion() {
      let prev = null;
      window.addEventListener("devicemotion", (e) => {
        const a = e.accelerationIncludingGravity || e.acceleration;
        if (!a || a.x == null) return;
        if (prev) { // selisih percepatan: gravitasi konstan terhapus, sisa = guncangan
          const dx = a.x - prev.x, dy = a.y - prev.y, dz = (a.z || 0) - prev.z, mag = Math.hypot(dx, dy, dz);
          if (mag > C.shakeThreshold) {
            items.forEach((s) => {
              const m = massOf(s.el.offsetWidth, s.el.offsetHeight, s);
              s.vx += (clamp(-dx * C.shakeStrength * s.k, C.shakeMaxImpulse) + (Math.random() - 0.5) * mag * C.shakeStrength * 0.4) * m;
              s.vy += (clamp(dy * C.shakeStrength * s.k, C.shakeMaxImpulse) + (Math.random() - 0.5) * mag * C.shakeStrength * 0.4) * m;
            });
            wake();
          }
        }
        prev = { x: a.x, y: a.y, z: a.z || 0 };
      });
    }
    if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission === "function") {
      // iOS: izin sensor harus diminta lewat sentuhan pertama pengunjung
      window.addEventListener("click", () => DeviceMotionEvent.requestPermission().then((r) => r === "granted" && enableMotion()).catch(() => {}), { once: true });
    } else if ("DeviceMotionEvent" in window) enableMotion();
  };
})();
