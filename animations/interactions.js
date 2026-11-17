// ============================================================
// INTERACTIONS — Fisika sederhana untuk elemen ber-atribut data-interactive
// (bintang chrome & huruf "Portfolio"). Semua angka dari animationConfig.js.
//  1) Kursor mendekat  -> elemen menghindar, lalu kembali saat kursor menjauh.
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
    const items = [...document.querySelectorAll("[data-interactive]")].map((el) => ({ el, kind: el.dataset.interactive, x: 0, y: 0, vx: 0, vy: 0, k: 0.6 + Math.random() * 0.8 }));
    if (!items.length) return;
    let cursor = null, drag = null, raf = 0, last = 0;

    const wake = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); } };
    const elastic = (v) => Math.sign(v) * C.maxDisplacement * (1 - Math.exp(-Math.abs(v) / C.maxDisplacement)); // makin jauh makin berat

    function step(now) {
      const dt = Math.min((now - last) / 1000 || 0.016, 1 / 30); last = now;
      let active = !!cursor || !!drag;
      for (const s of items) {
        if (drag && drag.s === s) continue;
        let ax = -C.springStiffness * s.x - C.springDamping * s.vx;
        let ay = -C.springStiffness * s.y - C.springDamping * s.vy;
        if (cursor && C.repelRadius > 0) {
          const r = s.el.getBoundingClientRect();
          const dx = r.left + r.width / 2 - s.x - cursor.x, dy = r.top + r.height / 2 - s.y - cursor.y, d = Math.hypot(dx, dy);
          if (d < C.repelRadius && d > 0.01) { const f = Math.pow(1 - d / C.repelRadius, 2) * C.repelStrength; ax += (dx / d) * f; ay += (dy / d) * f; }
        }
        s.vx += ax * dt; s.vy += ay * dt;
        s.x = clamp(s.x + s.vx * dt, C.maxDisplacement * 1.4); s.y = clamp(s.y + s.vy * dt, C.maxDisplacement * 1.4);
        s.el.style.translate = `${s.x.toFixed(2)}px ${s.y.toFixed(2)}px`;
        if (Math.abs(s.x) > 0.05 || Math.abs(s.y) > 0.05 || Math.abs(s.vx) > 0.5 || Math.abs(s.vy) > 0.5) active = true;
        else { s.x = s.y = s.vx = s.vy = 0; s.el.style.translate = ""; }
      }
      raf = active ? requestAnimationFrame(step) : 0;
    }

    // ---- 1) Kursor ----
    window.addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      cursor = { x: e.clientX, y: e.clientY }; wake();
    }, { passive: true });
    document.documentElement.addEventListener("mouseleave", () => { cursor = null; wake(); });

    // ---- 2) Tarik & lepas ----
    items.forEach((s) => {
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
              s.vx += clamp(-dx * C.shakeStrength * s.k, C.shakeMaxImpulse) + (Math.random() - 0.5) * mag * C.shakeStrength * 0.4;
              s.vy += clamp(dy * C.shakeStrength * s.k, C.shakeMaxImpulse) + (Math.random() - 0.5) * mag * C.shakeStrength * 0.4;
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
