// Llamadas grabadas: voz pregenerada de Natalia. Cada vez que se pulsa suena una muestra distinta, al azar.
const CLIPS = [
  ["Pizzería Don Lupe", "Hola, gracias por llamar a Pizzería Don Lupe. ¿Su pedido es para entrega a domicilio o pasa a recogerlo?"],
  ["Telnova · atención a clientes", "Gracias por comunicarse a Telnova, centro de atención a clientes. Dígame, ¿en qué le puedo ayudar el día de hoy?"],
  ["Clínica Dental Sonríe", "Buenas tardes, Clínica Dental Sonríe. ¿Desea agendar una cita o tiene alguna duda sobre su tratamiento?"],
  ["Taquería El Güero", "¿Qué tal? Taquería El Güero. ¿Qué le preparamos hoy? Por cierto, el pastor está en promoción."],
  ["Hotel Brisa del Mar", "Hotel Brisa del Mar, buenas noches. Con gusto le ayudo con su reservación. ¿Para qué fechas la necesita?"],
  ["Taller Mecánico Ramírez", "Taller Mecánico Ramírez, buen día. Cuénteme, ¿qué le está fallando a su auto? Hoy todavía tenemos espacio."],
  ["Barbería Norte", "Hola, gracias por llamar a Barbería Norte. ¿Te agendo para corte o para barba? Tengo un espacio hoy a las 5."],
];

const recs = [...document.querySelectorAll("[data-rec]")];
if (recs.length) {
  const audio = new Audio();
  audio.preload = "none";
  let ctx, analyser, data, active = null, last = -1, raf = 0;

  const rest = (r) => r.bars.forEach((b, k) => {
    b.classList.remove("on");
    b.style.setProperty("--h", (0.22 + 0.7 * Math.abs(Math.sin(k * 1.7) * Math.cos(k * 0.45))).toFixed(2));
  });
  const stop = () => {
    cancelAnimationFrame(raf);
    if (active) { active.classList.remove("playing"); rest(active); }
  };
  const tick = () => {
    const r = active;
    if (!r) return;
    const p = audio.duration ? audio.currentTime / audio.duration : 0;
    r.time.textContent = `0:${String(Math.floor(audio.currentTime)).padStart(2, "0")}`;
    if (analyser) analyser.getByteFrequencyData(data);
    r.bars.forEach((b, k) => {
      const v = analyser ? data[1 + Math.floor((Math.abs(k - (r.bars.length - 1) / 2) / (r.bars.length / 2)) * 24)] / 255 : 0.3 + 0.5 * Math.abs(Math.sin(audio.currentTime * 9 + k));
      b.style.setProperty("--h", Math.max(0.1, Math.min(1, v * 1.15)).toFixed(2));
      b.classList.toggle("on", k / r.bars.length <= p);
    });
    raf = requestAnimationFrame(tick);
  };
  const play = (r) => {
    if (active === r && !audio.paused) { audio.pause(); stop(); return; }
    stop();
    let i;
    do { i = Math.floor(Math.random() * CLIPS.length); } while (i === last);
    last = i;
    active = r;
    r.name.textContent = CLIPS[i][0];
    r.text.textContent = `«${CLIPS[i][1]}»`;
    audio.src = `audio/natalia-0${i + 1}.mp3`;
    try {
      if (!ctx) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.7;
        ctx.createMediaElementSource(audio).connect(analyser);
        analyser.connect(ctx.destination);
        data = new Uint8Array(analyser.frequencyBinCount);
      }
      ctx.resume();
    } catch { analyser = null; }
    audio.play().then(() => { r.classList.add("playing"); tick(); }).catch(() => stop());
  };

  for (const r of recs) {
    r.bars = [...r.querySelectorAll(".rec-wave i")];
    r.bars.forEach((b, k) => b.style.setProperty("--k", k));
    r.name = r.querySelector("[data-rec-name]");
    r.text = r.querySelector("[data-rec-text]");
    r.time = r.querySelector("[data-rec-time]");
    rest(r);
    r.querySelector(".rec-play").addEventListener("click", () => play(r));
  }
  audio.addEventListener("ended", stop);
}
