// ABOUT SECTION — Kartu profil, tentang saya, skill, pendidikan.
Sections.about = ({ about: a }) => `
<section id="about" class="about" aria-labelledby="about-title">
  <div class="about__intro" data-reveal><p>${a.greeting}</p><h2 class="about__name">${a.name}</h2></div>
  <div class="about__side">
    <img class="about__photo" data-image src="${a.photo}" alt="${a.photoAlt}" width="309" height="468">
    <ul class="socials" data-stagger>${a.socials.map((s) => `<li data-stagger-item><img src="${s.icon}" alt="" width="32" height="32">${UI.button(a.socialButtonText, s.link, "btn--sm")}<span class="sr-only">${s.label}</span></li>`).join("")}</ul>
  </div>
  <div class="about__main">
    <div data-reveal><h2 id="about-title" class="h-sm">${a.title}</h2><p class="about__text">${a.text}</p></div>
    <div class="skills">
      <div data-reveal><h3 class="h-sm">${a.hardSkillsTitle}</h3>
        <ul class="hard">${a.hardSkills.map((s) => `<li><img src="${s.icon}" alt="${s.name}" width="44" height="44"><span class="ring" data-level="${s.level}" style="--v:0"><b>0%</b></span></li>`).join("")}</ul></div>
      <div data-reveal><h3 class="h-sm">${a.softSkillsTitle}</h3><ul class="soft">${a.softSkills.map((s) => `<li>${s}</li>`).join("")}</ul></div>
      <div data-reveal><h3 class="h-sm">${a.educationTitle}</h3><p>${a.education.join("<br>")}</p></div>
    </div>
  </div>
</section>`;
