// CONTACT SECTION — Scan QR, Thank you, dan footer.
Sections.contact = ({ scan: s, thanks: t, footer: f }) => `
<section id="contact" class="scan">
  <h2 class="scan__title" data-split="words"><b>${s.titleBold}</b> <span>${s.titleLight}</span><br><b>${s.titleLine2}</b></h2>
  <a class="qr" data-link="instagram" data-reveal><img src="${s.qr}" alt="${s.qrAlt}" width="140" height="140" loading="lazy"><span>${s.caption}</span></a>
</section>
<section id="thanks" class="thanks">
  ${UI.title(t.titleBold, t.titleLight, "h2", "duo-title--green duo-title--xl")}
  <p data-reveal>${t.tagline}</p>
  <footer class="footer"><a data-link="instagram">${f.handle}</a><a data-link="email">${f.email}</a><a data-link="phone">${f.phone}</a></footer>
</section>`;
