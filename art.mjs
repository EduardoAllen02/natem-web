// Ilustraciones del sitio dibujadas en SVG (sin fotos de terceros).
// SCENES: escenas grandes 640x400. ART: miniaturas 320x140 para tarjetas de servicio.
const F = `font-family="Segoe UI, system-ui, Arial, sans-serif"`;
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;
const noise = `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .5 0"/></filter>`;
const grain = (w, h, o = 0.16) => `<rect width="${w}" height="${h}" filter="url(#n)" opacity="${o}" style="mix-blend-mode:soft-light"/>`;
const glass = (x, y, w, h, r = 14, o = 0.78) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#fff" fill-opacity="${o}" stroke="#fff" stroke-opacity=".9"/>`;
const t = (x, y, s, txt, fill = "#17141a", w = 500, extra = "") => `<text x="${x}" y="${y}" font-size="${s}" font-weight="${w}" fill="${fill}" ${F} ${extra}>${txt}</text>`;

// ---------- Escenas ----------
const sofa = svg(640, 400, `
<defs>${noise}
<linearGradient id="wall" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e4ec"/><stop offset="1" stop-color="#d9c6ec"/></linearGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cdb3a6"/><stop offset="1" stop-color="#a98a80"/></linearGradient>
<linearGradient id="sf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98be0"/><stop offset="1" stop-color="#7d4fa6"/></linearGradient>
<linearGradient id="win" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fbe1ea"/></linearGradient>
</defs>
<rect width="640" height="400" fill="url(#wall)"/>
<rect y="268" width="640" height="132" fill="url(#floor)"/>
<rect y="262" width="640" height="8" fill="#fff" opacity=".7"/>
<rect x="56" y="48" width="130" height="150" rx="8" fill="url(#win)" stroke="#fff" stroke-width="6"/>
<path d="M121 48v150M56 123h130" stroke="#fff" stroke-width="5"/>
<path d="M186 268 330 400H60L56 268Z" fill="#fff" opacity=".16"/>
<rect x="476" y="70" width="96" height="120" rx="6" fill="#fff" opacity=".85"/>
<circle cx="524" cy="118" r="24" fill="#f2a9c4"/><path d="M486 176l26-30 20 18 16-14 16 26Z" fill="#9160b4"/>
<ellipse cx="330" cy="330" rx="230" ry="40" fill="#f3e7ee" opacity=".75"/>
<g>
<ellipse cx="330" cy="318" rx="180" ry="16" fill="#3b2a4a" opacity=".28"/>
<rect x="170" y="172" width="320" height="96" rx="30" fill="url(#sf)"/>
<rect x="150" y="214" width="52" height="92" rx="22" fill="#8b5cb5"/><rect x="458" y="214" width="52" height="92" rx="22" fill="#8b5cb5"/>
<rect x="188" y="238" width="140" height="62" rx="20" fill="#c9a2ea"/><rect x="332" y="238" width="140" height="62" rx="20" fill="#c9a2ea"/>
<rect x="232" y="196" width="76" height="52" rx="16" fill="#f8d3df"/><rect x="366" y="200" width="66" height="48" rx="16" fill="#c8e773"/>
<rect x="176" y="300" width="10" height="18" rx="4" fill="#3b2a4a"/><rect x="474" y="300" width="10" height="18" rx="4" fill="#3b2a4a"/>
</g>
<g fill="none" stroke="#fff" stroke-width="2.5">
<rect x="136" y="158" width="388" height="170" rx="14" stroke-dasharray="7 7" opacity=".95"/>
<ellipse cx="330" cy="326" rx="214" ry="30" stroke="#c8e773" stroke-width="3"/>
<path d="M136 350h388M136 343v14M524 343v14" stroke-width="2"/>
</g>
<g fill="#fff" stroke="#663a80" stroke-width="2.5"><circle cx="136" cy="158" r="7"/><circle cx="524" cy="158" r="7"/><circle cx="136" cy="328" r="7"/><circle cx="524" cy="328" r="7"/></g>
<rect x="292" y="338" width="76" height="26" rx="13" fill="#17141a"/>${t(309, 356, 13, "2.10 m", "#fff", 600)}
${glass(20, 18, 204, 38, 19)}<circle cx="40" cy="37" r="6" fill="#c8e773" stroke="#17141a" stroke-opacity=".15"/>${t(54, 42, 14, "Vista previa en tu sala", "#17141a", 600)}
${glass(444, 300, 176, 80, 18)}${t(460, 324, 12, "Tapiz", "#5d5564", 600)}
<circle cx="470" cy="352" r="13" fill="#8b5cb5" stroke="#17141a" stroke-width="2.5"/><circle cx="504" cy="352" r="13" fill="#f2a9c4"/><circle cx="538" cy="352" r="13" fill="#c8e773"/><circle cx="572" cy="352" r="13" fill="#2b2730"/>
${grain(640, 400)}`);

const label = svg(640, 400, `
<defs>${noise}
<radialGradient id="bg" cx=".3" cy=".1" r="1.1"><stop offset="0" stop-color="#6d4390"/><stop offset=".55" stop-color="#2f2140"/><stop offset="1" stop-color="#17141a"/></radialGradient>
<linearGradient id="bt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1d2a1f"/><stop offset=".35" stop-color="#4c6a4f"/><stop offset=".6" stop-color="#22342a"/><stop offset="1" stop-color="#101812"/></linearGradient>
<linearGradient id="lb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8f1"/><stop offset="1" stop-color="#f3dfe6"/></linearGradient>
</defs>
<rect width="640" height="400" fill="url(#bg)"/>
<circle cx="520" cy="60" r="150" fill="#f2a9c4" opacity=".14"/>
<rect y="338" width="640" height="62" fill="#120f15"/><rect y="336" width="640" height="3" fill="#fff" opacity=".12"/>
<ellipse cx="258" cy="342" rx="86" ry="10" fill="#000" opacity=".5"/>
<path d="M236 28h44v70c0 26 34 40 34 84v146a14 14 0 0 1-14 14h-84a14 14 0 0 1-14-14V182c0-44 34-58 34-84Z" fill="url(#bt)"/>
<rect x="234" y="22" width="48" height="26" rx="5" fill="#c79a4a"/>
<path d="M222 150c4-22 20-34 22-52" stroke="#fff" stroke-width="5" opacity=".18" fill="none" stroke-linecap="round"/>
<rect x="206" y="192" width="104" height="112" rx="6" fill="url(#lb)"/>
<circle cx="258" cy="220" r="15" fill="none" stroke="#663a80" stroke-width="2.5"/><path d="M249 224c5-12 13-12 18 0" stroke="#663a80" stroke-width="2.5" fill="none"/>
${t(258, 256, 14, "CASA LUNA", "#17141a", 700, 'text-anchor="middle" letter-spacing="1.5"')}
${t(258, 273, 10, "Reserva · 2023", "#5d5564", 500, 'text-anchor="middle"')}
<rect x="230" y="284" width="56" height="3" rx="1.5" fill="#c79a4a"/>
<g fill="none" stroke="#c8e773" stroke-width="4" stroke-linecap="round"><path d="M194 204v-22h22M300 182h22v22M322 292v22h-22M216 314h-22v-22"/></g>
<rect x="194" y="246" width="128" height="2.5" fill="#c8e773" opacity=".9"/><rect x="194" y="248" width="128" height="26" fill="#c8e773" opacity=".12"/>
<g stroke="#fff" stroke-opacity=".7" stroke-width="1.5" stroke-dasharray="4 5" fill="none"><path d="M322 206C360 180 372 120 404 96M322 250h82M322 296c40 10 52 26 82 30"/></g>
<g fill="#c8e773"><circle cx="322" cy="206" r="4"/><circle cx="322" cy="250" r="4"/><circle cx="322" cy="296" r="4"/></g>
${glass(404, 56, 206, 82, 16, 0.16)}${t(420, 82, 11, "ORIGEN", "#d9c8e8", 600, 'letter-spacing="1.2"')}${t(420, 104, 16, "Viñedo a 600 m", "#fff", 600)}${t(420, 124, 12, "Cosecha manual · 14 meses", "#d9c8e8")}
${glass(404, 208, 206, 82, 16, 0.92)}${t(420, 234, 11, "NOTAS DE CATA", "#663a80", 600, 'letter-spacing="1.2"')}
<rect x="420" y="246" width="74" height="26" rx="13" fill="#f8d3df"/>${t(432, 264, 12, "Frutos rojos", "#17141a", 500)}<rect x="500" y="246" width="60" height="26" rx="13" fill="#e6d6f7"/>${t(512, 264, 12, "Vainilla", "#17141a", 500)}
<rect x="404" y="306" width="206" height="46" rx="23" fill="#c8e773"/><circle cx="428" cy="329" r="13" fill="#17141a"/><path d="m424 322 10 7-10 7Z" fill="#c8e773"/>${t(450, 334, 14, "Ver al productor", "#17141a", 600)}
${glass(20, 18, 176, 38, 19, 0.16)}<path d="m34 37 5 5 9-10" stroke="#c8e773" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${t(58, 42, 14, "Etiqueta reconocida", "#fff", 600)}
${grain(640, 400, 0.2)}`);

const row = (y, name, amt, ok) => `<rect x="38" y="${y}" width="330" height="40" rx="12" fill="#fff"/>
<circle cx="60" cy="${y + 20}" r="9" fill="${ok ? "#c8e773" : "#f6c66b"}"/>${ok ? `<path d="m55.500 ${y + 20} 3 3 6-6.500" stroke="#17141a" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M60 ${y + 15}v6" stroke="#17141a" stroke-width="2.200" stroke-linecap="round"/><circle cx="60" cy="${y + 25}" r="1.300" fill="#17141a"/>`}
${t(80, y + 25, 13, name, "#17141a", 500)}${t(354, y + 25, 13, amt, ok ? "#5d5564" : "#17141a", 600, 'text-anchor="end"')}`;
const contab = svg(640, 400, `
<defs>${noise}<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbe6ee"/><stop offset=".55" stop-color="#eadcf5"/><stop offset="1" stop-color="#cdb5ea"/></linearGradient></defs>
<rect width="640" height="400" fill="url(#bg)"/>
<circle cx="560" cy="70" r="120" fill="#fff" opacity=".45"/><circle cx="604" cy="360" r="90" fill="#c8e773" opacity=".5"/>
${glass(20, 24, 366, 352, 24, 0.6)}
${t(40, 58, 11, "CONCILIACIÓN · MARZO", "#663a80", 700, 'letter-spacing="1.2"')}
${t(40, 84, 20, "Facturas contra banco", "#17141a", 600)}
<rect x="38" y="100" width="330" height="8" rx="4" fill="#fff"/><rect x="38" y="100" width="262" height="8" rx="4" fill="#663a80"/>
${row(122, "Proveedor A · factura 1042", "$18,400", true)}
${row(168, "Renta de oficina", "$22,000", true)}
${row(214, "Cliente B · depósito", "$9,750", false)}
${row(260, "Nómina quincenal", "$64,300", true)}
${row(306, "Servicio de internet", "$1,190", false)}
${t(40, 366, 11, "Datos ilustrativos", "#8b8392")}
<rect x="410" y="60" width="206" height="150" rx="20" fill="#17141a"/>
<circle cx="434" cy="86" r="11" fill="#c8e773"/><path d="M429 86h10M434 81v10" stroke="#17141a" stroke-width="2" stroke-linecap="round"/>
${t(452, 91, 12, "Agente contable", "#fff", 600)}
${t(426, 122, 13.500, "Encontré 2 movimientos", "#f5f1f7")}${t(426, 141, 13.500, "sin factura. ¿Los mando", "#f5f1f7")}${t(426, 160, 13.500, "a revisión?", "#f5f1f7")}
<rect x="426" y="174" width="84" height="26" rx="13" fill="#c8e773"/>${t(442, 192, 12, "Aprobar", "#17141a", 700)}<rect x="518" y="174" width="82" height="26" rx="13" fill="#fff" fill-opacity=".14"/>${t(534, 192, 12, "Revisar", "#fff", 600)}
${glass(410, 230, 206, 62, 18, 0.9)}${t(426, 256, 11, "CIERRE DEL MES", "#663a80", 700, 'letter-spacing="1.2"')}${t(426, 278, 15, "Listo en 2 días, no en 6", "#17141a", 600)}
${glass(410, 306, 206, 44, 22, 0.9)}<circle cx="432" cy="328" r="10" fill="#f2a9c4"/>${t(450, 333, 13, "Contadora revisa y firma", "#17141a", 500)}
${grain(640, 400, 0.14)}`);

export const SCENES = { "scene-sofa": sofa, "scene-etiqueta": label, "scene-contabilidad": contab };

// ---------- Miniaturas ----------
const TINT = {
  rose: ["#fde6ee", "#f4bcd1"], lilac: ["#efe4fa", "#cdb3ea"], lime: ["#f1f9d6", "#d3ec8d"], peach: ["#fdeede", "#f6cfae"], ink: ["#2b2730", "#17141a"],
};
const art = (tint, body) => svg(320, 140, `<defs>${noise}<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${TINT[tint][0]}"/><stop offset="1" stop-color="${TINT[tint][1]}"/></linearGradient></defs>
<rect width="320" height="140" fill="url(#g)"/>${body}${grain(320, 140, 0.18)}`);
const W = (x, y, w, h, r = 8, f = "#fff", o = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" opacity="${o}"/>`;
const browser = (x, y, w, h, inner) => `${W(x, y, w, h, 12)}<circle cx="${x + 14}" cy="${y + 12}" r="3.500" fill="#f2a9c4"/><circle cx="${x + 25}" cy="${y + 12}" r="3.500" fill="#c8e773"/><circle cx="${x + 36}" cy="${y + 12}" r="3.500" fill="#dccdef"/>${inner}`;

export const ART = {
  crm: art("lilac", [0, 1, 2].map((c) => `${W(28 + c * 92, 22, 80, 96, 12, "#fff", 0.6)}${W(36 + c * 92, 30, 40, 7, 3.5, "#663a80", 0.5)}${W(36 + c * 92, 46, 64, 26, 8)}${c < 2 ? W(36 + c * 92, 78, 64, 26, 8) : ""}<circle cx="${48 + c * 92}" cy="59" r="6" fill="${["#f2a9c4", "#c8e773", "#9160b4"][c]}"/>`).join("") + `<path d="M228 88l10 10 22-26" stroke="#663a80" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  panel: art("rose", `${W(28, 20, 264, 100, 14, "#fff", 0.75)}${[34, 56, 44, 70, 60, 84].map((h, i) => W(48 + i * 26, 108 - h, 16, h, 5, i === 5 ? "#663a80" : i % 2 ? "#f2a9c4" : "#dccdef")).join("")}<path d="M214 84c14-22 24-6 36-26s18-12 26-22" stroke="#17141a" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="276" cy="36" r="5" fill="#c8e773" stroke="#17141a" stroke-width="2"/>`),
  saas: art("lime", [0, 1, 2].map((c) => `${W(30 + c * 90, c === 1 ? 14 : 26, 78, c === 1 ? 112 : 92, 14, c === 1 ? "#17141a" : "#fff", c === 1 ? 1 : 0.85)}${W(42 + c * 90, c === 1 ? 28 : 40, 30, 7, 3.5, c === 1 ? "#c8e773" : "#663a80", 0.8)}${W(42 + c * 90, c === 1 ? 46 : 56, 46, 12, 4, c === 1 ? "#fff" : "#17141a")}${[0, 1, 2].map((k) => W(42 + c * 90, (c === 1 ? 70 : 78) + k * 11, 54 - k * 8, 5, 2.5, c === 1 ? "#fff" : "#17141a", 0.25)).join("")}`).join("")),
  integ: art("peach", `<g stroke="#17141a" stroke-width="2.500" fill="none" stroke-dasharray="5 5"><path d="M74 44C120 44 120 70 160 70M74 100c46 0 46-30 86-30M160 70c40 0 44-30 86-30M160 70c40 0 44 30 86 30"/></g>${W(40, 26, 44, 36, 12)}${W(40, 82, 44, 36, 12)}${W(236, 22, 44, 36, 12)}${W(236, 82, 44, 36, 12)}<circle cx="160" cy="70" r="26" fill="#17141a"/><path d="M150 70h20M160 60v20" stroke="#c8e773" stroke-width="4" stroke-linecap="round"/><circle cx="62" cy="44" r="7" fill="#f2a9c4"/><circle cx="62" cy="100" r="7" fill="#9160b4"/><circle cx="258" cy="40" r="7" fill="#c8e773"/><circle cx="258" cy="100" r="7" fill="#f6c66b"/>`),
  editor: art("lilac", `${W(24, 18, 62, 104, 12, "#17141a")}${[0, 1, 2, 3].map((k) => W(34, 30 + k * 22, 42, 14, 5, "#fff", k === 1 ? 0.95 : 0.18)).join("")}${W(94, 18, 202, 104, 12, "#fff", 0.85)}<path d="M94 92c50-34 90 10 132-22s50-12 70-20v60a12 12 0 0 1-12 12H106a12 12 0 0 1-12-12Z" fill="#dccdef"/><circle cx="150" cy="62" r="10" fill="#c8e773" stroke="#17141a" stroke-width="2.500"/><circle cx="236" cy="50" r="10" fill="#f2a9c4" stroke="#17141a" stroke-width="2.500"/><path d="M160 62c30 0 40-12 66-12" stroke="#17141a" stroke-width="2" stroke-dasharray="4 4" fill="none"/>`),
  ia: art("rose", `${W(28, 22, 170, 34, 17, "#fff", 0.9)}${W(42, 35, 110, 8, 4, "#17141a", 0.3)}${W(110, 66, 182, 52, 18, "#17141a")}${W(126, 80, 96, 7, 3.5, "#fff", 0.7)}${W(126, 94, 60, 7, 3.5, "#fff", 0.35)}${W(226, 82, 54, 22, 11, "#c8e773")}<path d="m243 93 5 5 10-11" stroke="#17141a" stroke-width="2.500" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="58" cy="92" r="20" fill="#fff"/><path d="M58 80v24M46 92h24M50 84l16 16M66 84 50 100" stroke="#9160b4" stroke-width="2.500" stroke-linecap="round"/>`),
  route: art("lilac", `<path d="M96 140 140 30h40l44 110Z" fill="#fff" opacity=".55"/><path d="M0 60h132M188 60h132" stroke="#fff" stroke-width="3" opacity=".7"/>${[0, 1, 2, 3].map((k) => `<path d="m${160 - (26 - k * 5)} ${126 - k * 24} ${26 - k * 5}-${16 - k * 3} ${26 - k * 5} ${16 - k * 3}" stroke="#c8e773" stroke-width="${9 - k * 1.5}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`).join("")}${W(196, 20, 100, 30, 15)}<circle cx="212" cy="35" r="7" fill="#663a80"/>${t(226, 40, 12, "Sala 3 · 24 m", "#17141a", 600)}`),
  dish: art("peach", `<ellipse cx="160" cy="118" rx="150" ry="34" fill="#fff" opacity=".55"/><ellipse cx="160" cy="92" rx="70" ry="22" fill="#fff"/><ellipse cx="160" cy="88" rx="48" ry="14" fill="#f8d3df"/><ellipse cx="160" cy="82" rx="34" ry="12" fill="#c98a5a"/><path d="M134 80c8-12 44-12 52 0" fill="#e9b678"/><circle cx="150" cy="78" r="4" fill="#c8e773"/><circle cx="170" cy="76" r="4" fill="#d9534f"/><ellipse cx="160" cy="92" rx="88" ry="30" fill="none" stroke="#663a80" stroke-width="2.500" stroke-dasharray="6 6"/>${W(214, 18, 84, 30, 15, "#17141a")}${t(228, 38, 12, "Ver en 3D", "#fff", 600)}${W(24, 20, 70, 26, 13)}${t(38, 38, 12, "$189", "#17141a", 700)}`),
  terrain: art("lime", `<path d="M20 112 86 52l34 26 44-52 50 60 30-24 36 50Z" fill="#fff" opacity=".8"/><path d="M20 112 86 52l34 26 44-52 50 60 30-24 36 50Z" fill="none" stroke="#17141a" stroke-width="2"/><path d="M86 52 100 112M120 78l-8 34M164 26l-10 86M164 26l34 86M214 86l8 26M244 62l-4 50M52 82h46M136 60h60M190 88h70" stroke="#17141a" stroke-width="1" opacity=".35"/><path d="M164 26l-12 16 12 6 14-4Z" fill="#17141a" opacity=".2"/><g><path d="M164 12a9 9 0 0 1 9 9c0 6-9 14-9 14s-9-8-9-14a9 9 0 0 1 9-9Z" fill="#663a80"/><circle cx="164" cy="21" r="3" fill="#fff"/><path d="M244 48a8 8 0 0 1 8 8c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 8-8Z" fill="#f2a9c4" stroke="#17141a" stroke-width="1.500"/></g><ellipse cx="160" cy="118" rx="140" ry="12" fill="none" stroke="#663a80" stroke-width="2" stroke-dasharray="5 6"/>`),
  label: art("ink", `${W(116, 26, 88, 88, 10, "#fff8f1")}<circle cx="160" cy="54" r="12" fill="none" stroke="#663a80" stroke-width="2.500"/>${W(136, 76, 48, 7, 3.5, "#17141a")}${W(144, 90, 32, 5, 2.5, "#17141a", 0.4)}<g fill="none" stroke="#c8e773" stroke-width="4" stroke-linecap="round"><path d="M104 36V16h20M196 16h20v20M216 104v20h-20M124 124h-20v-20"/></g>${W(104, 66, 112, 3, 1.5, "#c8e773")}${W(232, 34, 70, 28, 14, "#fff", 0.16)}${W(244, 45, 44, 6, 3, "#fff", 0.8)}${W(18, 78, 70, 28, 14, "#c8e773")}<path d="m44 86 9 6-9 6Z" fill="#17141a"/>`),
  model: art("rose", `<g fill="none" stroke="#663a80" stroke-width="2.500" stroke-linejoin="round"><path d="m160 18 62 30v52l-62 30-62-30V48Z" fill="#fff" fill-opacity=".6"/><path d="M98 48l62 30 62-30M160 78v52"/><path d="M129 33l62 30M191 33l-62 30M98 74l62 30 62-30" stroke-width="1.200" opacity=".5"/></g><g fill="#c8e773" stroke="#17141a" stroke-width="2"><circle cx="160" cy="18" r="5"/><circle cx="222" cy="48" r="5"/><circle cx="98" cy="48" r="5"/><circle cx="160" cy="78" r="5"/></g>${W(222, 100, 80, 24, 12)}${t(234, 117, 11, "1.2 MB · glb", "#17141a", 600)}`),
  webar: art("lilac", `${browser(22, 24, 176, 96, `${W(36, 48, 70, 9, 4.5, "#17141a")}${W(36, 64, 100, 6, 3, "#17141a", 0.25)}${W(36, 76, 80, 6, 3, "#17141a", 0.25)}${W(36, 92, 58, 18, 9, "#663a80")}`)}<rect x="212" y="12" width="78" height="118" rx="16" fill="#17141a"/><rect x="218" y="18" width="66" height="106" rx="11" fill="#f8d3df"/><path d="m251 50 22 11v22l-22 11-22-11V61Z" fill="#fff" stroke="#663a80" stroke-width="2"/><path d="M229 61l22 11 22-11M251 72v22" stroke="#663a80" stroke-width="2" fill="none"/><path d="M198 72h14" stroke="#17141a" stroke-width="2.500" stroke-dasharray="3 3"/>`),
  site: art("rose", browser(40, 16, 240, 124, `${W(56, 42, 96, 11, 5.5, "#17141a")}${W(56, 60, 70, 11, 5.5, "#9160b4")}${W(56, 80, 84, 5, 2.5, "#17141a", 0.25)}${W(56, 90, 64, 5, 2.5, "#17141a", 0.25)}${W(56, 104, 54, 18, 9, "#17141a")}<circle cx="218" cy="84" r="36" fill="#f2a9c4"/><circle cx="206" cy="72" r="14" fill="#fff" opacity=".6"/>`)),
  corp: art("peach", `${browser(24, 18, 160, 122, `${W(36, 40, 136, 44, 8, "#17141a")}${W(46, 52, 60, 8, 4, "#fff")}${W(46, 66, 40, 6, 3, "#c8e773")}${W(36, 92, 40, 40, 8, "#f8d3df")}${W(84, 92, 40, 40, 8, "#dccdef")}${W(132, 92, 40, 40, 8, "#f1f9d6")}`)}${browser(150, 44, 150, 96, `${W(162, 66, 70, 8, 4, "#17141a")}${W(162, 80, 110, 5, 2.5, "#17141a", 0.25)}${W(162, 90, 90, 5, 2.5, "#17141a", 0.25)}${W(162, 104, 126, 30, 8, "#dccdef")}`)}`),
  pano: art("lime", `<path d="M20 44c90-22 190-22 280 0v60c-90-22-190-22-280 0Z" fill="#fff" opacity=".85"/><path d="M20 84c40-30 70 10 110-14s70 12 100-6 50-4 70 2v38c-90-22-190-22-280 0Z" fill="#cdb3ea"/><circle cx="92" cy="56" r="10" fill="#f6c66b"/><g><circle cx="176" cy="70" r="13" fill="#17141a"/><path d="M171 70h10M176 65v10" stroke="#c8e773" stroke-width="2.500" stroke-linecap="round"/><circle cx="244" cy="62" r="10" fill="#fff" stroke="#663a80" stroke-width="2.500"/></g>${W(126, 112, 68, 22, 11, "#17141a")}${t(142, 127, 11, "360°", "#fff", 700)}<path d="M110 123h-14l5-5M210 123h14l-5-5" stroke="#17141a" stroke-width="2" fill="none" stroke-linecap="round"/>`),
  chat: art("lilac", `${W(26, 20, 150, 100, 14, "#fff", 0.6)}<path d="M26 96c30-26 60 6 90-12s40-10 60-14v38a12 12 0 0 1-12 12H38a12 12 0 0 1-12-12Z" fill="#cdb3ea"/><circle cx="96" cy="64" r="9" fill="#c8e773" stroke="#17141a" stroke-width="2"/>${W(150, 30, 144, 36, 18)}${W(164, 44, 96, 7, 3.5, "#17141a", 0.35)}${W(184, 76, 110, 36, 18, "#17141a")}${W(198, 90, 70, 7, 3.5, "#fff", 0.7)}`),
  palette: art("peach", `${W(26, 22, 110, 96, 12)}<path d="M26 92c26-24 50 4 74-12s24-6 36-10v36a12 12 0 0 1-12 12H38a12 12 0 0 1-12-12Z" fill="#cdb3a6"/><rect x="48" y="52" width="46" height="30" rx="10" fill="#9160b4"/><path d="M146 70h22m-8-8 8 8-8 8" stroke="#17141a" stroke-width="2.500" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${["#9160b4", "#f2a9c4", "#cdb3a6", "#c8e773", "#2b2730"].map((c, i) => `<rect x="${180 + (i % 3) * 40}" y="${22 + Math.floor(i / 3) * 40}" width="34" height="34" rx="10" fill="${c}"/>`).join("")}${W(260, 62, 34, 34, 10, "#fff", 0.7)}${W(180, 104, 114, 14, 7, "#fff", 0.8)}`),
};
