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
  document.getElementById("m-tags").textContent = `${p.year} · ${p.tags.join(", ")}`;
  document.getElementById("m-title").textContent = p.title;
  document.getElementById("m-desc").textContent = p.desc;
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

// Event photo slideshow: slow crossfade with a gentle zoom.
(() => {
  const G = window.GALLERY || [], frames = document.getElementById("gallery-frames");
  if (!frames || !G.length) return;
  frames.innerHTML = G.map((p) => p.src
    ? `<div class="g-frame" style="background-image:url('${p.src}')" role="img" aria-label="${p.caption}"></div>`
    : `<div class="g-frame ph">Photo ${p.slot}</div>`).join("");
  document.getElementById("gallery-credit").textContent = window.PHOTO_CREDIT || "";
  const cap = document.getElementById("gallery-cap"), els = [...frames.children];
  const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let i = 0;
  const show = (n) => { els.forEach((e, k) => e.classList.toggle("on", k === n)); cap.textContent = G[n].caption; };
  show(0);
  if (!still && els.length > 1) setInterval(() => { i = (i + 1) % els.length; show(i); }, 6000);
})();

