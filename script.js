const P = window.PROJECTS;
const imgStyle = p => p.image ? `style="background-image:url('${p.image}')"` : "";
const imgClass = p => p.image ? "img" : "img ph";
const phText = p => p.image ? "" : "add photo";

// Carousel
const featured = P.filter(p => p.featured);
const track = document.getElementById("track"), dots = document.getElementById("dots");
track.innerHTML = featured.map((p, i) => `
  <article class="slide" data-i="${P.indexOf(p)}">
    <div class="${imgClass(p)}" ${imgStyle(p)}>${phText(p)}</div>
    <div class="info">
      <span class="tag-line mono">${p.tags.join(" · ")} — ${p.year}</span>
      <h3>${p.title}</h3><p>${p.blurb}</p>
      <span class="btn btn-ghost" style="align-self:start">View project →</span>
    </div>
  </article>`).join("");
dots.innerHTML = featured.map((_, i) => `<button aria-label="Slide ${i+1}"></button>`).join("");
let cur = 0, timer;
function go(n){
  cur = (n + featured.length) % featured.length;
  track.style.transform = `translateX(-${cur*100}%)`;
  [...dots.children].forEach((d,i)=>d.classList.toggle("active", i===cur));
}
function auto(){ clearInterval(timer); timer = setInterval(()=>go(cur+1), 5000); }
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
      <div class="body"><span class="tag-line mono">${p.tags.join(" · ")} — ${p.year}</span>
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
  document.getElementById("m-tags").textContent = `${p.tags.join(" · ")} — ${p.year}`;
  document.getElementById("m-title").textContent = p.title;
  document.getElementById("m-desc").textContent = p.desc;
  modal.hidden = false;
});
const closeM = ()=>modal.hidden = true;
document.getElementById("close").onclick = closeM;
modal.onclick = e=>{ if(e.target===modal) closeM(); };
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeM(); });

// Stats counter + year
document.querySelectorAll("[data-count]").forEach(el=>{
  const t=+el.dataset.count; let n=0; const step=Math.max(1,Math.ceil(t/40));
  const id=setInterval(()=>{n=Math.min(t,n+step); el.textContent=n; if(n>=t)clearInterval(id);},30);
});
document.getElementById("yr").textContent = new Date().getFullYear();
