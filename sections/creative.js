// CREATIVE OUTPUT — Judul besar + Design Graphic, Ilustration, Motion Graphic.
Sections.creative = ({ creative: c, designGraphic: d, illustration: i, motionGraphic: m }) => `
<section id="creative" class="creative">
  ${UI.title(c.titleBold, c.titleLight, "h2", "duo-title--green duo-title--xl")}
</section>
<section id="design-graphic" class="work">
  <h2 class="work__title" data-split="words">${d.title}</h2>
  <figure class="carousel" data-image>${UI.img(d.carousel.src, d.carousel.alt)}</figure>
  <div class="grid-posters" data-stagger>${d.posters.map((p) => `<figure data-stagger-item>${UI.img(p.src, p.alt)}</figure>`).join("")}</div>
  <div class="banner-row"><figure class="banner" data-image>${UI.img(d.banner.src, d.banner.alt)}</figure>
  <p class="work__desc" data-reveal>${d.description}</p></div>
</section>
<section id="illustration" class="work">
  <h2 class="work__title" data-split="words">${i.title}</h2>
  <div class="grid-illus" data-stagger>${i.works.map((p) => `<figure data-stagger-item>${UI.img(p.src, p.alt, "")}</figure>`).join("")}</div>
  <p class="work__desc" data-reveal>${i.description}</p>
</section>
<section id="motion-graphic" class="work work--center">
  <h2 class="work__title" data-split="words">${m.title}</h2>
  <a class="btn glass-btn open-btn" data-magnetic data-reveal data-link="motionReel" aria-label="${m.buttonText}"><span>${m.buttonText}</span></a>
  <p class="work__desc" data-reveal>${m.description}</p>
</section>`;
