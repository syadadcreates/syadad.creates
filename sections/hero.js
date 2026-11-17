// HERO SECTION — Bar info atas, judul "Portfolio" dan tahun.
window.Sections = window.Sections || {};
Sections.hero = (c) => `
<header class="topbar" data-hero><a data-link="home">${c.topbar.name}</a><span>${c.topbar.age}</span><span>${c.topbar.school}</span></header>
<section id="home" class="hero">
  <div class="hero__title" data-hero>
    <h1 class="duo-title"><b>${c.hero.titleBold}</b><span>${c.hero.titleLight}</span></h1>
    <img class="star star--a" src="assets/icons/star-spiky.png" alt="" width="110" height="110"><img class="star star--b" src="assets/icons/star-round.png" alt="" width="90" height="90">
  </div>
  <p class="hero__year" data-hero>${c.hero.year}</p>
</section>`;
