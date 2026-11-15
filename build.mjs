// Genera el sitio estático de Natem: `node web/build.mjs` desde `natem/`.
// Salida: web/*.html, web/img/*.webp y web/vendor/ (Three.js). Sin dependencias fuera de natem/node_modules.
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const WEB = path.dirname(fileURLToPath(import.meta.url));
const NATEM = path.dirname(WEB);
const CAP = path.join(NATEM, "carruseles/capturas/portafolio");
const PORT = path.join(NATEM, "portafolio");

const NATALIA_URL = "https://web-eta-nine-99.vercel.app";
const SUMA_URL = "https://sumaresenas.com/";
const IG_URL = "https://www.instagram.com/natem.ai/";
const wa = (text) => `https://wa.me/525656956537?text=${encodeURIComponent(text)}`;

const IMAGES = {
  "natalia-llamada": `${CAP}/01-natalia-demo-llamada.png`,
  "natalia-hero": `${CAP}/01-natalia-hero.png`,
  "suma-landing": `${CAP}/02-sumaresenas-landing.png`,
  "suma-resumen": `${CAP}/02-sumaresenas-resumen.png`,
  febal: `${CAP}/03-febal-tour-chat-abierto.png`,
  hospital: `${CAP}/04-hospital-ar-foto-ui.png`,
  crm: `${CAP}/05-crm-agentico-dashboard.png`,
  colombini: `${CAP}/06-colombini-portal-3d.png`,
  interiors: `${CAP}/11-interiors3d-hero.png`,
  tourstudio: `${CAP}/08-configurador-tours-editor.png`,
  terrain: `${CAP}/09-terrain-ar-moviles.png`,
  menu: `${CAP}/10-menu-ar-carta.png`,
  moodboard: `${CAP}/11-moodboard-ia-composicion.png`,
  museo: `${CAP}/12-museo-3d.png`,
  visor360: `${PORT}/tours-360-visores/capturas/01-visor-con-puntos-de-interes.png`,
  symbiont: `${PORT}/symbiont-configurador-3d/capturas/01-configurador-skybox.png`,
};

const I = {
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  up: '<path d="M7 17 17 7M8 7h9v9"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 10h18M3 15h18M10 4v16"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  cube: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12v9m0-9L4 7.500"/>',
  spark: '<path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.500 2.500m7 7L18 18M18 6l-2.500 2.500m-7 7L6 18"/>',
  flow: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><path d="M10 6.500h4a3 3 0 0 1 3 3V14"/>',
  layout: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M9 9v11"/>',
  pin: '<path d="M12 21s7-6.200 7-11a7 7 0 1 0-14 0c0 4.800 7 11 7 11Z"/><circle cx="12" cy="10" r="2.500"/>',
  scan: '<path d="M4 8V6a2 2 0 0 1 2-2h2m8 0h2a2 2 0 0 1 2 2v2m0 8v2a2 2 0 0 1-2 2h-2m-8 0H6a2 2 0 0 1-2-2v-2M8 12h8"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18Z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9.500 9 5 9-5M3 17l9 5 9-5"/>',
  store: '<path d="M4 9 5.500 4h13L20 9M4 9v11h16V9M4 9a2.700 2.700 0 0 0 5.300 0a2.700 2.700 0 0 0 5.400 0A2.700 2.700 0 0 0 20 9M9 20v-6h6v6"/>',
  check: '<path d="m5 12.500 4.500 4.500L19 7.500"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  shield: '<path d="M12 3 4 6v6c0 4.500 3.400 8 8 9 4.600-1 8-4.500 8-9V6l-8-3Z"/>',
};
const icon = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;
const btn = (label, href, cls = "", ext = false) =>
  `<a class="btn ${cls}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>${label}${cls.includes("ghost") ? "" : `<i>${icon(ext ? "up" : "arrow")}</i>`}</a>`;
const img = (name, alt) => `<div class="shot"><img src="img/${name}.webp" alt="${alt}" loading="lazy" decoding="async"></div>`;
const more = (label, href, ext = true) => `<a class="more" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ""}>${label}${icon(ext ? "up" : "arrow")}</a>`;

const PAGES = [
  { file: "index.html", nav: "IA y agentes" },
  { file: "software.html", nav: "Software a medida" },
  { file: "web-3d.html", nav: "Web y 3D" },
  { file: "realidad-aumentada.html", nav: "Realidad aumentada" },
];

const PROJECTS = {
  natalia: { img: "natalia-llamada", alt: "Demo de una llamada atendida por Natalia", name: "Natalia", state: "Servicio con demo", text: "Agente de voz con IA que atiende llamadas, entiende el pedido y lo registra en el flujo acordado.", url: NATALIA_URL },
  suma: { img: "suma-landing", alt: "Sitio de SumaReseñas", name: "SumaReseñas", state: "Producto propio", text: "Placas QR/NFC para pedir opiniones en Google y plataforma para dar seguimiento por establecimiento.", url: SUMA_URL },
  sumaPanel: { img: "suma-resumen", alt: "Panel de resumen de SumaReseñas con datos de ejemplo", name: "Plataforma SumaReseñas", state: "Demo · datos de ejemplo", text: "Reseñas, encuestas y seguimiento por sucursal, con borradores de respuesta que una persona revisa y publica.", url: SUMA_URL },
  febal: { img: "febal", alt: "Asistente con IA dentro de un tour virtual de mobiliario", name: "Asistente en tour virtual", state: "Demo", text: "Chat con IA dentro de un tour 360° que recomienda piezas del catálogo y te lleva a verlas.", url: "https://deploy-febal-casa.vercel.app" },
  crm: { img: "crm", alt: "Panel de un CRM agéntico con datos de demostración", name: "CRM agéntico", state: "Concepto · datos demo", text: "Prospección inmobiliaria: el agente califica y propone; una persona aprueba antes de cada acción clave." },
  colombini: { img: "colombini", alt: "Portal 3D de entrada con accesos por marca", name: "Portal 3D corporativo", state: "Proyecto de cliente", text: "Portal de entrada en 3D para un grupo italiano de mobiliario, con acceso por marca. Hecho con Interiors3D." },
  interiors: { img: "interiors", alt: "Sitio web de Interiors3D", name: "Interiors3D", state: "Sitio en línea", text: "Rediseño web para un estudio italiano de experiencias digitales inmersivas.", url: "https://www.interiors3d.com" },
  tourstudio: { img: "tourstudio", alt: "Editor web de tours 360°", name: "Tour Studio", state: "En desarrollo", text: "Editor web para armar un tour 360° con escenas, puntos de interés y marca, sin escribir código." },
  visor360: { img: "visor360", alt: "Visor de tour 360° con puntos de interés", name: "Visores de tours 360°", state: "Demo", text: "Recorridos 360° en el navegador a partir de imágenes o de video, con puntos de interés.", url: "https://eduardoallen02.github.io/virtual-tour-360/" },
  moodboard: { img: "moodboard", alt: "Moodboard generado a partir de la foto de un espacio", name: "Moodboard con IA", state: "Prototipo", text: "De la foto de un espacio a un moodboard con estilo, paleta, materiales y texturas." },
  museo: { img: "museo", alt: "Modelo 3D interactivo de un museo", name: "Experiencias 3D", state: "Demo", text: "Modelo 3D interactivo de un museo con puntos que abren la información de cada sala.", url: "https://eduardoallen02.github.io/MuseumVisualizer/" },
  symbiont: { img: "symbiont", alt: "Configurador 3D con material metálico", name: "Configurador 3D", state: "Experimento", text: "Material y entorno que cambian en tiempo real sobre una figura 3D, directo en el navegador.", url: "https://eduardoallen02.github.io/Symbiont-Configurator-ThreeJS/" },
  hospital: { img: "hospital", alt: "Flechas de realidad aumentada sobre el pasillo de un hospital", name: "Guía AR en hospital", state: "Prototipo", text: "Orientación en interiores: el móvil dibuja la ruta sobre el suelo hasta el área que buscas." },
  terrain: { img: "terrain", alt: "Terreno 3D de las Dolomitas visto en realidad aumentada", name: "Terrain AR", state: "Demo WebAR", text: "El relieve de las Dolomitas sobre tu mesa, con pines que abren panoramas 360°.", url: "https://eduardoallen02.github.io/terrain-ar/" },
  menu: { img: "menu", alt: "Carta digital con platillos en 3D", name: "Menú en AR", state: "Demo", text: "La carta de un restaurante con cada platillo en 3D y en realidad aumentada.", url: "https://eduardoallen02.github.io/restaurant-ar-menu/" },
};
const proj = (key, i = 0) => {
  const p = PROJECTS[key];
  return `<article class="proj card rv" style="--d:${(i % 3) * 0.08}s">
        ${img(p.img, p.alt)}
        <div class="meta">
          <div class="top"><h3>${p.name}</h3><span class="pill">${p.state}</span></div>
          <p>${p.text}</p>
          ${p.url ? more("Ver en línea", p.url) : ""}
        </div>
      </article>`;
};

const head = (title, desc) => `<!doctype html>
<html lang="es" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#f4f0f6">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='24' cy='32' r='20' fill='%23c8e773'/%3E%3Ctext x='20' y='47' font-family='Arial' font-style='italic' font-weight='900' font-size='44' fill='%2317141a'%3EN%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,800&family=Instrument+Serif:ital@1&family=Outfit:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/site.css">
</head>
<body>
<div class="backdrop" aria-hidden="true"><i></i><i></i><i></i></div>
<div class="grain" aria-hidden="true"></div>`;

const nav = (current) => `
<header class="nav">
  <div class="wrap">
    <div class="bar glass">
      <a class="logo" href="index.html" aria-label="Natem, inicio">Natem</a>
      <nav aria-label="Principal">
        ${PAGES.map((p) => `<a href="${p.file}"${p.file === current ? ' aria-current="page"' : ""}>${p.nav}</a>`).join("\n        ")}
        <a href="${NATALIA_URL}" target="_blank" rel="noopener">Natalia ↗</a>
      </nav>
      ${btn("Hablemos", "#contacto")}
      <button class="burger" aria-label="Abrir menú" aria-expanded="false">${icon("menu")}</button>
    </div>
  </div>
</header>`;

const processSection = (title = "Primero entendemos tu <em>proceso</em>.") => `
<section id="proceso">
  <div class="wrap">
    <div class="head split rv">
      <div class="head" style="margin:0"><span class="eyebrow">Cómo trabajamos</span><h2>${title}</h2></div>
      <p class="lead">No empezamos por la tecnología: empezamos por cómo trabaja tu negocio hoy. Después decidimos qué conviene automatizar y con qué.</p>
    </div>
    <div class="process">
      <article class="step card rv"><span class="n">01</span><div><h3>Revisamos tus procesos</h3><p>Vemos cómo entra un cliente, qué se repite cada día y dónde se pierde tiempo o se escapan oportunidades.</p></div></article>
      <article class="step glass rv" style="--d:.08s"><span class="n">02</span><div><h3>Los automatizamos con IA o software a medida</h3><p>Diseñamos la solución alrededor de tu operación y la conectamos con las herramientas que ya usas.</p></div></article>
      <article class="step dark rv" style="--d:.16s"><span class="n">03</span><div><h3>Ahorras tiempo y dinero, o ganas clientes</h3><p>Medimos el cambio en tu operación, no en la tecnología. Si algo no aporta, no se construye.</p></div></article>
    </div>
    <div class="aud">
      <div class="glass rv"><span class="ico">${icon("user")}</span>Dueños de negocio</div>
      <div class="glass rv" style="--d:.08s"><span class="ico">${icon("store")}</span>Franquicias con varias sucursales</div>
      <div class="glass rv" style="--d:.16s"><span class="ico">${icon("cube")}</span>Empresas que quieren innovar (3D, AR)</div>
    </div>
  </div>
</section>`;

const finalSection = (title, text, waText) => `
<section id="contacto">
  <div class="wrap">
    <div class="final dark on-dark rv">
      <span class="orb" aria-hidden="true"></span>
      <div class="copy">
        <span class="eyebrow" style="color:#b9b2c0">Siguiente paso</span>
        <h2>${title}</h2>
        <p class="lead" style="color:#c3bcc9">${text}</p>
      </div>
      <div class="side">
        ${btn("Escríbenos por WhatsApp", wa(waText), "light", true)}
        ${btn("Instagram @natem.ai", IG_URL, "ghost", true)}
        <p class="mute" style="font-size:.86rem;margin-top:6px">Te respondemos con preguntas sobre tu operación, no con un catálogo.</p>
      </div>
    </div>
  </div>
</section>`;

const footer = () => `
<footer>
  <div class="wrap">
    <a class="logo" href="index.html">Natem</a>
    <nav aria-label="Pie">
      ${PAGES.map((p) => `<a href="${p.file}">${p.nav}</a>`).join("")}
      <a href="${NATALIA_URL}" target="_blank" rel="noopener">Natalia ↗</a>
      <a href="${SUMA_URL}" target="_blank" rel="noopener">SumaReseñas ↗</a>
    </nav>
    <span>AI – Software Engineering · México</span>
  </div>
</footer>
<script type="module" src="assets/site.js"></script>
<script type="module" src="assets/orb.js"></script>
</body>
</html>`;

// ---------- Inicio: IA, agentes y software a medida ----------
const index = () => `${head("Natem · Agentes de IA y software a medida para tu negocio", "Natem diseña agentes de IA, automatizaciones y software a medida. Primero entendemos cómo trabaja tu negocio; después automatizamos lo que te quita tiempo.")}
${nav("index.html")}
<main>
<section class="hero">
  <div class="wrap grid">
    <div class="copy">
      <span class="eyebrow rv">Natem · AI – Software Engineering</span>
      <h1 class="rv" style="--d:.05s">Agentes de IA y software a medida que <em>trabajan</em> por tu negocio.</h1>
      <p class="lead rv" style="--d:.1s">No empezamos por la tecnología: empezamos por cómo trabaja tu negocio hoy. Luego automatizamos lo que te quita tiempo, dinero o clientes.</p>
      <div class="cta-row rv" style="--d:.15s">
        ${btn("Cuéntanos tu proceso", "#contacto")}
        ${btn("Conoce a Natalia ↗", NATALIA_URL, "ghost", true)}
      </div>
      <div class="chips rv" style="--d:.2s">
        <span class="pill dot">Agentes de voz</span><span class="pill dot">Chatbots y asistentes</span><span class="pill dot">Automatización</span><span class="pill dot">Sistemas a medida</span>
      </div>
    </div>
    <div class="stage rv" data-orb data-palette="rose" data-offset="0.25,0.1" style="--d:.1s">
      <canvas aria-hidden="true"></canvas><span class="fallback" aria-hidden="true"></span>
      <div class="float call glass" aria-label="Ejemplo ilustrativo de una llamada atendida por Natalia">
        <header><span class="ico lime">${icon("phone")}</span>Natalia contesta la llamada</header>
        <p class="bubble"><small>Natalia</small>Buenas tardes, ¿en qué le ayudo?</p>
        <p class="bubble me">Quiero un pedido para recoger.</p>
      </div>
      <div class="float done"><span class="ico lime">${icon("check")}</span>Pedido registrado en tu sistema</div>
      <div class="float steps-mini glass">
        <span><b>01</b>Tu proceso</span><span><b>02</b>IA o software</span><span><b>03</b>Resultado</span>
      </div>
    </div>
  </div>
</section>
${processSection()}
<section id="ia">
  <div class="wrap">
    <div class="head rv"><span class="eyebrow">Inteligencia artificial aplicada</span><h2>Agentes que atienden, registran y <em>dan seguimiento</em>.</h2>
      <p class="lead">Cada agente se diseña sobre un flujo real de tu negocio y con una persona al mando cuando hace falta.</p></div>
    <div class="bento">
      <article class="tile dark on-dark s3 rv">
        <span class="orb" style="width:230px;height:230px;right:-70px;top:-80px" aria-hidden="true"></span>
        <span class="ico lg lime">${icon("phone")}</span>
        <h3>Agentes de voz</h3>
        <p>Contestan el teléfono de tu negocio, entienden lo que pide la persona y lo registran. Si hace falta, pasan la llamada a alguien de tu equipo.</p>
        <div class="foot">${more("Así funciona Natalia", NATALIA_URL)}<span class="pill lime">Nuestro producto estrella</span></div>
      </article>
      <article class="tile glass s3 rv" style="--d:.08s">
        <span class="ico lg ink">${icon("chat")}</span>
        <h3>Chatbots y asistentes</h3>
        <p>Asistentes que responden con la información de tu catálogo o tu operación: en tu sitio, en WhatsApp o dentro de un tour virtual.</p>
        ${img("febal", PROJECTS.febal.alt)}
      </article>
      <article class="tile card s2 rv">
        <span class="ico lg ink">${icon("flow")}</span>
        <h3>Automatización de procesos</h3>
        <p>Lo que hoy se copia a mano entre mensajes, hojas de cálculo y sistemas, conectado para que ocurra solo.</p>
      </article>
      <article class="tile card s2 rv" style="--d:.08s">
        <span class="ico lg ink">${icon("shield")}</span>
        <h3>IA con una persona al mando</h3>
        <p>El agente propone y una persona aprueba las acciones que importan. Así trabajan nuestro CRM agéntico y las respuestas de SumaReseñas.</p>
      </article>
      <article class="tile glass s2 rv" style="--d:.16s">
        <span class="orb pearl" style="width:150px;height:150px;right:-40px;bottom:-50px" aria-hidden="true"></span>
        <span class="ico lg ink">${icon("spark")}</span>
        <h3>Agentes a medida</h3>
        <p>¿Qué tarea le quitarías hoy a tu equipo? Partimos de esa respuesta para diseñar el agente.</p>
      </article>
    </div>
  </div>
</section>
<section id="natalia">
  <div class="wrap">
    <div class="natalia dark on-dark rv">
      <span class="orb violet" aria-hidden="true"></span>
      <div class="copy">
        <span class="eyebrow" style="color:#b9b2c0">Natalia · agente de voz con IA</span>
        <h2>Que tu negocio no vuelva a <em>perder</em> una llamada.</h2>
        <p class="lead">Natalia contesta, entiende el pedido y lo registra en el flujo que acordamos con tu negocio. Si hace falta, pasa la llamada a una persona.</p>
        <div class="flow">
          <div><span class="ico">${icon("phone")}</span>Llamada</div>
          <div><span class="ico">${icon("chat")}</span>Entiende el pedido</div>
          <div><span class="ico">${icon("table")}</span>Registra en tu sistema</div>
          <div><span class="ico">${icon("user")}</span>Humano si hace falta</div>
        </div>
        <div class="cta-row">
          ${btn("Ir al sitio de Natalia", NATALIA_URL, "light", true)}
          ${btn("Pedir una demo", wa("Hola Natem, quiero una demo de Natalia para mi negocio."), "ghost", true)}
        </div>
      </div>
      <a href="${NATALIA_URL}" target="_blank" rel="noopener" aria-label="Abrir el sitio de Natalia">${img("natalia-llamada", PROJECTS.natalia.alt)}</a>
    </div>
  </div>
</section>
<section id="servicios">
  <div class="wrap">
    <div class="head rv"><span class="eyebrow">También construimos</span><h2>Software, web y <em>experiencias</em> a la medida de tu operación.</h2></div>
    <div class="areas">
      <a class="area card rv" href="software.html">${img("crm", PROJECTS.crm.alt)}<div><h3>Software a medida</h3><p>CRMs, paneles, plataformas y herramientas internas hechas alrededor de tu proceso.</p>${more("Ver software", "software.html", false).replace(/<a [^>]*>/, '<span class="more">').replace("</a>", "</span>")}</div></a>
      <a class="area card rv" style="--d:.08s" href="web-3d.html">${img("colombini", PROJECTS.colombini.alt)}<div><h3>Web y experiencias 3D</h3><p>Sitios, landing pages, portales 3D y tours virtuales que se abren en el navegador.</p>${more("Ver web y 3D", "web-3d.html", false).replace(/<a [^>]*>/, '<span class="more">').replace("</a>", "</span>")}</div></a>
      <a class="area card rv" style="--d:.16s" href="realidad-aumentada.html">${img("hospital", PROJECTS.hospital.alt)}<div><h3>Realidad aumentada</h3><p>Guías en interiores, menús y productos en AR, sin instalar una aplicación.</p>${more("Ver realidad aumentada", "realidad-aumentada.html", false).replace(/<a [^>]*>/, '<span class="more">').replace("</a>", "</span>")}</div></a>
    </div>
  </div>
</section>
<section id="proyectos">
  <div class="wrap">
    <div class="head split rv">
      <div class="head" style="margin:0"><span class="eyebrow">Proyectos</span><h2>Cosas que <em>ya</em> construimos.</h2></div>
      <p class="lead">De la voz a la realidad aumentada. Cada proyecto dice en qué estado está: producto, proyecto de cliente, demo o prototipo.</p>
    </div>
    <div class="projects">
      ${["natalia", "suma", "febal", "interiors", "crm", "colombini"].map(proj).join("\n      ")}
    </div>
  </div>
</section>
<section id="por-que">
  <div class="wrap">
    <div class="head rv"><span class="eyebrow">Por qué Natem</span><h2>Un equipo que construye, no que <em>revende</em>.</h2></div>
    <div class="why">
      <div class="glass rv"><span class="ico ink">${icon("layers")}</span><h3>+5 años construyendo software</h3><p>Startup mexicana con experiencia en agentes de IA, automatización y experiencias 3D/AR.</p></div>
      <div class="glass rv" style="--d:.06s"><span class="ico ink">${icon("spark")}</span><h3>Productos propios</h3><p>Natalia y SumaReseñas son nuestros: usamos en ellos lo mismo que proponemos a tu negocio.</p></div>
      <div class="glass rv" style="--d:.12s"><span class="ico ink">${icon("flow")}</span><h3>Proceso antes que tecnología</h3><p>Elegimos la herramienta después de entender tu operación, no al revés.</p></div>
      <div class="glass rv" style="--d:.18s"><span class="ico ink">${icon("check")}</span><h3>Demos, no promesas</h3><p>Te mostramos algo funcionando sobre tu flujo antes de pedirte que te comprometas.</p></div>
    </div>
  </div>
</section>
${finalSection("¿Y si automatizamos <em>lo tuyo</em>?", "Cuéntanos qué proceso se repite cada día en tu negocio. Lo revisamos contigo y te decimos qué se puede automatizar y qué no vale la pena.", "Hola Natem, quiero revisar un proceso de mi negocio para ver qué se puede automatizar.")}
</main>
${footer()}`;

// ---------- Subpáginas ----------
const sub = ({ file, title, desc, palette, tag, h1, lead, services, servicesTitle, projects, projectsTitle, projectsLead, two, final }) => `${head(title, desc)}
${nav(file)}
<main>
<section class="subhero">
  <div class="wrap">
    <div class="stage ${palette} rv" data-orb data-palette="${palette}" data-offset="1.15,0.25">
      <canvas aria-hidden="true"></canvas>
      <span class="pill tag">${tag}</span>
      <div class="panel glass">
        <span class="eyebrow">Natem · ${PAGES.find((p) => p.file === file).nav}</span>
        <h1>${h1}</h1>
        <p class="lead">${lead}</p>
        <div class="cta-row">${btn("Cuéntanos tu idea", "#contacto")}${btn("Ver proyectos", "#proyectos", "ghost")}</div>
      </div>
    </div>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="head rv"><span class="eyebrow">Qué podemos construir</span><h2>${servicesTitle}</h2></div>
    <div class="services">
      ${services.map(([ic, t, p], i) => `<article class="service ${i % 3 === 1 ? "glass" : "card"} rv" style="--d:${(i % 3) * 0.08}s"><span class="ico lg ink">${icon(ic)}</span><h3>${t}</h3><p>${p}</p></article>`).join("\n      ")}
    </div>
  </div>
</section>
<section id="proyectos">
  <div class="wrap">
    <div class="head split rv">
      <div class="head" style="margin:0"><span class="eyebrow">Proyectos</span><h2>${projectsTitle}</h2></div>
      <p class="lead">${projectsLead}</p>
    </div>
    <div class="projects${two ? " two" : ""}">
      ${projects.map(proj).join("\n      ")}
    </div>
  </div>
</section>
${processSection("También aquí, primero tu <em>proceso</em>.")}
${finalSection(...final)}
</main>
${footer()}`;

const software = () => sub({
  file: "software.html", palette: "violet", tag: "CRMs · paneles · plataformas",
  title: "Software a medida · Natem", desc: "CRMs, paneles, plataformas y herramientas internas diseñadas alrededor de la operación de tu empresa.",
  h1: "Software hecho alrededor de <em>tu operación</em>.",
  lead: "Cuando una hoja de cálculo ya no alcanza y un sistema genérico no encaja, construimos el tuyo: lo justo para tu proceso, conectado con lo que ya usas.",
  servicesTitle: "Sistemas que tu equipo <em>sí</em> usa.",
  services: [
    ["table", "CRMs y seguimiento", "Prospectos, clientes y tareas en un solo lugar, con los pasos de tu proceso de venta y no los de otro."],
    ["layout", "Paneles y reportes", "La información de tus sucursales o áreas en una pantalla, por establecimiento y por responsable."],
    ["layers", "Plataformas y SaaS", "Productos completos con cuentas, planes y permisos, como hicimos con SumaReseñas."],
    ["flow", "Integraciones", "Conectamos punto de venta, formularios, mensajería y bases de datos para que la información no se capture dos veces."],
    ["cube", "Editores y configuradores", "Herramientas para que tu equipo arme contenido sin depender de un especialista, como nuestro editor de tours."],
    ["spark", "Software con IA dentro", "Agentes y asistentes integrados al sistema, con aprobación humana en las acciones que importan."],
  ],
  projectsTitle: "Sistemas que <em>ya</em> armamos.", projectsLead: "Un producto propio, una herramienta en desarrollo y un concepto de interfaz. Cada uno dice su estado.",
  projects: ["sumaPanel", "crm", "tourstudio", "colombini"], two: true,
  final: ["¿Qué proceso ya no cabe en una <em>hoja de cálculo</em>?", "Cuéntanos cómo lo llevan hoy. Te decimos si conviene un sistema a medida, una automatización o dejarlo como está.", "Hola Natem, quiero platicar sobre un sistema a medida para mi empresa."],
});

const web3d = () => sub({
  file: "web-3d.html", palette: "pearl", tag: "Sitios · portales 3D · tours 360°",
  title: "Web y experiencias 3D · Natem", desc: "Landing pages, sitios corporativos, portales 3D, tours virtuales y herramientas visuales con IA que se abren en el navegador.",
  h1: "Sitios y experiencias 3D que se <em>recuerdan</em>.",
  lead: "Desde una landing page clara hasta un portal 3D o un tour virtual. Todo se abre en el navegador, en computadora y en móvil.",
  servicesTitle: "De la landing al <em>mundo 3D</em>.",
  services: [
    ["layout", "Landing pages y sitios", "Páginas rápidas y claras, pensadas para que quien llega entienda qué haces y te escriba."],
    ["globe", "Sitios corporativos", "Rediseños y sitios completos para empresas, como el de Interiors3D."],
    ["cube", "Portales y experiencias 3D", "Modelos y escenas interactivas en el navegador para presentar marcas, espacios o productos."],
    ["pin", "Tours virtuales 360°", "Recorridos con puntos de interés, hechos en colaboración con Interiors3D."],
    ["chat", "Asistentes dentro de la experiencia", "Un chat con IA que recomienda y lleva a la persona al producto dentro del tour."],
    ["spark", "Herramientas visuales con IA", "De una foto a un moodboard con estilo, paleta y materiales."],
  ],
  projectsTitle: "Páginas y mundos que <em>ya</em> hicimos.", projectsLead: "Sitios en línea, un proyecto de cliente, demos y prototipos. Abre los que tienen enlace y pruébalos.",
  projects: ["interiors", "colombini", "museo", "moodboard", "visor360", "symbiont"],
  final: ["¿Tu sitio explica bien <em>lo que haces</em>?", "Cuéntanos qué quieres mostrar: un negocio, un producto, un espacio. Te proponemos el formato que mejor lo cuenta.", "Hola Natem, quiero una página web o una experiencia 3D para mi negocio."],
});

const ar = () => sub({
  file: "realidad-aumentada.html", palette: "rose", tag: "WebAR · sin instalar apps",
  title: "Realidad aumentada · Natem", desc: "Experiencias de realidad aumentada en el navegador: guías en interiores, menús en 3D, productos y lugares en AR.",
  h1: "Realidad aumentada que se abre desde <em>un enlace</em>.",
  lead: "Experiencias WebAR: la persona escanea un código o abre un enlace y ve el contenido sobre su entorno, desde la cámara del móvil.",
  servicesTitle: "AR con un propósito <em>claro</em>.",
  services: [
    ["pin", "Guías en interiores", "Rutas dibujadas sobre el suelo para orientarse en hospitales, plazas o campus."],
    ["store", "Menús y productos en 3D", "Cada platillo o producto visto en la mesa del cliente antes de pedirlo."],
    ["globe", "Turismo y museos", "Terrenos, maquetas y piezas en AR con información y panoramas 360°."],
    ["scan", "AR sobre etiquetas y empaques", "Una imagen impresa que activa contenido cuando la enfocas con la cámara."],
    ["cube", "Modelos 3D para AR", "Preparamos y optimizamos los modelos para que carguen rápido en el móvil."],
    ["layers", "AR junto a tu web o tu tour", "La experiencia se integra con tu sitio, tu catálogo o tu tour virtual."],
  ],
  projectsTitle: "Proyectos en <em>AR</em>.", projectsLead: "Demos publicadas y un prototipo. Las demos se prueban desde un móvil con cámara.",
  projects: ["hospital", "terrain", "menu"],
  final: ["¿Qué te gustaría que tus clientes <em>vieran</em> en AR?", "Cuéntanos el lugar, el producto o el recorrido. Te decimos qué se puede lograr desde el navegador y qué necesitaría más desarrollo.", "Hola Natem, me interesa una experiencia de realidad aumentada."],
});

// ---------- Escritura ----------
await mkdir(path.join(WEB, "img"), { recursive: true });
await mkdir(path.join(WEB, "vendor"), { recursive: true });
for (const [name, src] of Object.entries(IMAGES)) {
  await sharp(src).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(WEB, "img", `${name}.webp`));
}
for (const f of ["three.module.js", "three.core.js"]) {
  await copyFile(path.join(NATEM, "node_modules/three/build", f), path.join(WEB, "vendor", f));
}
const out = { "index.html": index(), "software.html": software(), "web-3d.html": web3d(), "realidad-aumentada.html": ar() };
for (const [file, html] of Object.entries(out)) await writeFile(path.join(WEB, file), html);
console.log(`Sitio generado: ${Object.keys(out).join(", ")} · ${Object.keys(IMAGES).length} imágenes`);
