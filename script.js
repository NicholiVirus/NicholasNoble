const P = window.PROJECTS;
const imgStyle = p => p.image ? `style="background-image:url('${p.image}')"` : "";
const imgClass = p => p.image ? "img" : "img ph";
const phText = p => p.image ? "" : `Image ${p.img}`;

// Carousel
const featured = P.filter(p => p.featured);
const track = document.getElementById("track"), dots = document.getElementById("dots");
track.innerHTML = featured.map((p, i) => `
  <article class="slide" data-i="${P.indexOf(p)}">
    <div class="${imgClass(p)}" ${imgStyle(p)}>${phText(p)}</div>
    <div class="info">
      <span class="tag-line">${p.year} · ${p.tags.join(", ")}</span>
      <h3>${p.title}</h3><p>${p.blurb}</p>
      <span class="more">Read more</span>
    </div>
  </article>`).join("");
dots.innerHTML = featured.map((_, i) => `<button aria-label="Slide ${i+1}"></button>`).join("");
let cur = 0, timer;
function go(n){
  cur = (n + featured.length) % featured.length;
  track.style.transform = `translateX(-${cur*100}%)`;
  [...dots.children].forEach((d,i)=>d.classList.toggle("active", i===cur));
}
function auto(){ clearInterval(timer); timer = setInterval(()=>go(cur+1), 7000); }
document.getElementById("next").onclick = ()=>{go(cur+1);auto();};
document.getElementById("prev").onclick = ()=>{go(cur-1);auto();};
[...dots.children].forEach((d,i)=>d.onclick=()=>{go(i);auto();});
const car = document.getElementById("carousel");
car.onmouseenter = ()=>clearInterval(timer); car.onmouseleave = auto;
let sx=0; car.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});
car.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-sx; if(Math.abs(dx)>50){go(cur+(dx<0?1:-1));auto();}});
go(0); auto();

// Grid
const grid = document.getElementById("grid");
const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}}),{threshold:.1});
function render(f){
  grid.innerHTML = P.filter(p=>f==="all"||p.tags.includes(f)).sort((a,b)=>b.year-a.year).map(p=>`
    <article class="card" data-i="${P.indexOf(p)}">
      <div class="${imgClass(p)}" ${imgStyle(p)}>${phText(p)}</div>
      <div class="body"><span class="tag-line">${p.year} · ${p.tags.join(", ")}</span>
      <h3>${p.title}</h3><p>${p.blurb}</p></div>
    </article>`).join("");
  grid.querySelectorAll(".card").forEach(c=>io.observe(c));
}
document.getElementById("filters").onclick = e=>{
  if(!e.target.dataset.f) return;
  document.querySelectorAll(".chip").forEach(c=>c.classList.remove("active"));
  e.target.classList.add("active"); render(e.target.dataset.f);
};
render("all");

// Modal
const modal = document.getElementById("modal");
document.addEventListener("click", e=>{
  const el = e.target.closest("[data-i]"); if(!el) return;
  const p = P[el.dataset.i], m = document.getElementById("m-img");
  m.className = p.image ? "modal-img" : "modal-img ph"; m.style.backgroundImage = p.image?`url('${p.image}')`:""; m.textContent = phText(p);
  m.querySelector("video")?.remove();
  if (p.video) { const v = document.createElement("video"); Object.assign(v, { src: p.video, poster: p.image, muted: true, autoplay: true, loop: true, playsInline: true, controls: true }); v.className = "m-video"; m.style.backgroundImage = ""; m.textContent = ""; m.append(v); }
  const g = p.gallery || [], nav = document.getElementById("m-gal");
  nav.hidden = g.length < 2; let gi = 0;
  const showG = () => { m.style.backgroundImage = `url('${g[gi]}')`; nav.querySelector("span").textContent = `${gi + 1} / ${g.length}`; };
  if (g.length > 1) { showG(); nav.querySelector(".gp").onclick = (ev) => { ev.stopPropagation(); gi = (gi + g.length - 1) % g.length; showG(); }; nav.querySelector(".gn").onclick = (ev) => { ev.stopPropagation(); gi = (gi + 1) % g.length; showG(); }; }
  document.getElementById("m-tags").textContent = `${p.year} · ${p.tags.join(", ")}`;
  document.getElementById("m-title").textContent = p.title;
  document.getElementById("m-desc").textContent = p.desc;
  document.getElementById("m-nda").hidden = !p.nda;
  document.querySelectorAll("#m-nda .nda-note").forEach((n) => n.hidden = true);
  const ml = document.getElementById("m-link");
  if (p.link) { ml.href = p.link; ml.hidden = false; } else ml.hidden = true;
  modal.hidden = false;
});
const closeM = ()=>modal.hidden = true;
document.getElementById("close").onclick = closeM;
modal.onclick = e=>{ if(e.target===modal) closeM(); };
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeM(); });

document.querySelectorAll("[data-count]").forEach(el=>el.textContent=el.dataset.count);
document.getElementById("yr").textContent = new Date().getFullYear();

// Per-event photo loops: slow crossfade with a gentle zoom, each loop offset so they don't change together.
(() => {
  const sets = window.EVENT_PHOTOS || {};
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".loop[data-set]").forEach((fig, n) => {
    const photos = sets[fig.dataset.set] || [];
    if (!photos.length) return;
    const frames = document.createElement("div");
    frames.className = "loop-frames";
    frames.innerHTML = photos.map((p) => `<div class="g-frame" style="background-image:url('${p.src}')" role="img" aria-label="${p.caption}"></div>`).join("");
    const cap = document.createElement("span"); cap.className = "loop-cap";
    fig.prepend(frames); fig.querySelector("figcaption").append(cap);
    const els = [...frames.children]; let i = 0;
    const show = (k) => { els.forEach((e, j) => e.classList.toggle("on", j === k)); cap.textContent = " · " + photos[k].caption; };
    show(0);
    if (!still && els.length > 1) setTimeout(() => setInterval(() => { i = (i + 1) % els.length; show(i); }, 5500), n * 1800);
  });
})();


// "Code on GitHub" for NDA projects: reveal a note instead of linking out.
document.addEventListener("click", (e) => {
  const b = e.target.closest(".nda-btn"); if (!b) return;
  e.stopPropagation();
  const n = b.nextElementSibling; if (n) n.hidden = !n.hidden;
});
