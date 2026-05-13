// =========================================================
// Dana Villamizar · Portafolio · Render desde data.json
// =========================================================

const FILTERS = ["Todos", "Frontend", "Fullstack"];
let activeFilter = "Todos";
let DATA = null;

async function init() {
  const res = await fetch("data.json");
  DATA = await res.json();
  renderAll();
}

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function renderAll() {
  renderHero();
  renderAbout();
  renderSkills();
  renderProjectFilters();
  renderProjects();
  renderServices();
  renderEducation();
  renderFooter();
  bindForm();
}

function renderHero() {
  const p = DATA.perfil;
  document.getElementById("brand").textContent = `${p.nombre} · ${p.anio}`;
  document.getElementById("hero-eyebrow").textContent =
    `${p.nombre} · ${p.rol} · ${p.formacion}`;
  document.getElementById("hero-lead").textContent = p.descripcionHero;
}

function renderAbout() {
  const wrap = document.getElementById("about-text");
  wrap.innerHTML = "";
  DATA.sobreMi.parrafos.forEach((t) => {
    const p = document.createElement("p");
    p.textContent = t;
    wrap.appendChild(p);
  });
  document.getElementById("about-title").textContent = DATA.sobreMi.titulo;
}

function renderSkills() {
  const grid = document.getElementById("skills-grid");
  grid.innerHTML = "";
  Object.entries(DATA.habilidades).forEach(([cat, items]) => {
    const card = el(`
      <div class="skill-card">
        <h3 class="skill-cat">${cat}</h3>
        <ul class="skill-list">
          ${items
            .map(
              (s) => `
            <li>
              <div class="skill-row">
                <span>${s.nombre}</span>
                <span>${s.nivel}%</span>
              </div>
              <div class="bar"><div style="width:${s.nivel}%"></div></div>
            </li>`,
            )
            .join("")}
        </ul>
      </div>`);
    grid.appendChild(card);
  });
}

function renderProjectFilters() {
  const wrap = document.getElementById("filters");
  wrap.innerHTML = "";
  FILTERS.forEach((f) => {
    const b = el(
      `<button class="filter-btn ${f === activeFilter ? "active" : ""}">${f}</button>`,
    );
    b.addEventListener("click", () => {
      activeFilter = f;
      renderProjectFilters();
      renderProjects();
    });
    wrap.appendChild(b);
  });
}

function renderProjects() {
  const list = document.getElementById("project-list");
  list.innerHTML = "";
  const items =
    activeFilter === "Todos"
      ? DATA.proyectos
      : DATA.proyectos.filter((p) => p.tag === activeFilter);
  items.forEach((p, i) => {
    const art = el(`
      <article class="project ${i % 2 ? "reverse" : ""}">
        <div class="project-media">
          <img src="${p.img}" alt="${p.titulo}" loading="lazy" />
        </div>
        <div>
          <span class="project-meta">0${p.id} · ${p.tag}</span>
          <h3>${p.titulo}</h3>
          <dl>
            <dt>Problema</dt><dd>${p.problema}</dd>
            <dt>Solución</dt><dd>${p.solucion}</dd>
            <dt>Mi aporte</dt><dd>${p.aporte}</dd>
            <dt>Resultado</dt><dd>${p.resultado}</dd>
          </dl>
          <div class="tech-tags">
            ${p.tech.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
          <a class="repo-link" href="${p.repo}" target="_blank" rel="noreferrer">
            Ver repositorio →
          </a>
        </div>
      </article>`);
    list.appendChild(art);
  });
}

function renderServices() {
  const grid = document.getElementById("services-grid");
  grid.innerHTML = "";
  DATA.servicios.forEach((s, i) => {
    grid.appendChild(
      el(`
      <div class="service">
        <span class="service-num">0${i + 1}</span>
        <h3>${s.titulo}</h3>
        <p>${s.descripcion}</p>
      </div>`),
    );
  });
}

function renderEducation() {
  const ol = document.getElementById("timeline");
  ol.innerHTML = "";
  DATA.formacionTimeline.forEach((t) => {
    ol.appendChild(
      el(`
      <li>
        <p class="timeline-year">${t.anio}</p>
        <h3>${t.titulo}</h3>
        <p class="timeline-place">${t.lugar}</p>
        <p>${t.detalle}</p>
      </li>`),
    );
  });
}

function renderFooter() {
  const p = DATA.perfil;
  document.getElementById("footer-copy").textContent =
    `© ${p.anio} · ${p.nombre} · ${p.ubicacion}`;
  document.getElementById("link-linkedin").href = p.linkedin;
  document.getElementById("link-github").href = p.github;
}

function bindForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    let ok = true;
    document.querySelectorAll(".field-error").forEach((s) => (s.textContent = ""));
    if (!name || name.length > 100) {
      document.getElementById("err-name").textContent = "Nombre obligatorio (máx. 100).";
      ok = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("err-email").textContent = "Email no válido.";
      ok = false;
    }
    if (!message || message.length > 1000) {
      document.getElementById("err-message").textContent = "Mensaje obligatorio (máx. 1000).";
      ok = false;
    }
    if (!ok) { status.textContent = ""; return; }
    status.textContent = "Gracias. Te respondo en menos de 48h.";
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", init);
