// Natem · interacción básica: menú móvil y aparición al hacer scroll.
document.documentElement.classList.remove("no-js");

const nav = document.querySelector(".nav");
const burger = document.querySelector(".burger");
if (burger) {
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("nav a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
}

const items = document.querySelectorAll(".rv");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("in"));
}
