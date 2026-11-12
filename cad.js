import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ===== EDIT ROBOTS HERE =====
// src: model file in assets/cad/ (leave "" until the CAD is ready; it's skipped in the rotation).
// game.logo: optional image path (e.g. "assets/logos/rebuilt.png"); without one a text logo is shown.
// game.url: link opened when the game logo is clicked (game animation / reveal video).
const GAMES = {
  rebuilt: { name: "REBUILT", season: "FRC 2026", logo: "",
    url: "https://www.youtube.com/results?search_query=2026+FIRST+Robotics+Competition+REBUILT+Game+Animation" },
  bunny25: { name: "Bunnybots", season: "2025", logo: "",
    url: "https://robot.mbhs.edu/bunnybots/bunnybots-2025" },
  havoc: { name: "Harvest Havoc", season: "Bunnybots 2026", logo: "",
    url: "https://robot.mbhs.edu/bunnybots" },
};
// Chronological. Robots without a model yet show a "CAD coming soon" card in the rotation.
const ROBOTS = [
  { name: "Bunnybots 2025 robot", note: "Team 526 · placed 12th", src: "", game: GAMES.bunny25 },
  { name: "First robot", note: "Team 526 · my first full robot CAD", src: "assets/cad/robot-v1.json", game: GAMES.rebuilt },
  { name: "Rebuilt robot", note: "Team 611 · rebuilt for WV ROCKS, 16th of 30", src: "assets/cad/robot-v2.json", game: GAMES.rebuilt },
  { name: "Bunnybots 2026 robot", note: "Team 611 · I lead CAD & fabrication · simplified model, in progress", src: "assets/cad/robot-bb26.json", game: GAMES.havoc },
  { name: "Robot dog", note: "Independent project · quadruped, in progress", src: "assets/cad/robot-dog.json", game: null },
];
const CYCLE_MS = 8000;

for (const el of document.querySelectorAll("[data-cad]")) mount(el);

function mount(el) {
  const canvas = el.querySelector("canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8a80, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(3, 5, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 1.0); rim.position.set(-4, 2, -3); scene.add(rim);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false; controls.enablePan = false; controls.enableDamping = true;
  controls.autoRotate = !reduced; controls.autoRotateSpeed = 1.6;

  const pivot = new THREE.Group(); scene.add(pivot);
  const loader = new GLTFLoader();
  const status = el.querySelector(".cad-status");
  const nameEl = el.querySelector(".cad-name"), noteEl = el.querySelector(".cad-note");
  const badge = el.querySelector(".game-badge"), dots = el.querySelector(".cad-dots");
  const cache = new Map();

  const load = (url) => {
    if (!cache.has(url)) cache.set(url, fetch(url)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((json) => new Promise((res, rej) => loader.parse(toGLB(json), "", res, rej)))
      .then((g) => prepare(g.scene)));
    return cache.get(url);
  };

  dots.innerHTML = ROBOTS.map((r, i) => `<button aria-label="Show ${r.name}"></button>`).join("");
  let cur = -1, timer = null, dragging = false;

  function show(i) {
    cur = (i + ROBOTS.length) % ROBOTS.length;
    const r = ROBOTS[cur];
    [...dots.children].forEach((d, k) => d.classList.toggle("active", k === cur));
    nameEl.textContent = r.name; noteEl.textContent = r.note;
    badge.hidden = !r.game;
    if (r.game) {
    badge.href = r.game.url;
    badge.querySelector(".game-logo").innerHTML = r.game.logo
      ? `<img src="${r.game.logo}" alt="${r.game.name} logo">`
      : `<span class="game-name">${r.game.name}</span><span class="game-season">${r.game.season}</span>`;
    badge.setAttribute("aria-label", `Watch the ${r.game.name} (${r.game.season}) game reveal`);
    }
    canvas.classList.add("fading");
    if (!r.src) { // no CAD yet: placeholder card
      setTimeout(() => { if (ROBOTS[cur] !== r) return; pivot.clear(); status.hidden = false; status.textContent = "CAD coming soon"; }, 250);
      return schedule();
    }
    if (!cache.has(r.src)) { status.hidden = false; status.textContent = "Loading model…"; }
    Promise.all([load(r.src), new Promise((ok) => setTimeout(ok, 250))]).then(([root]) => {
      if (ROBOTS[cur] !== r) return;
      pivot.clear(); pivot.add(root); frame(root);
      status.hidden = true; canvas.classList.remove("fading");
      const next = ROBOTS.slice(cur + 1).concat(ROBOTS).find((x) => x.src); if (next) load(next.src); // preload the next model
    }).catch((e) => { console.error(e); status.hidden = false; status.textContent = "Model failed to load."; });
    schedule();
  }
  function schedule() {
    clearTimeout(timer);
    if (ROBOTS.length > 1 && !dragging && !reduced) timer = setTimeout(() => show(cur + 1), CYCLE_MS);
  }
  // Only pause the rotation between robots while someone is actually dragging the model.
  controls.addEventListener("start", () => { dragging = true; clearTimeout(timer); });
  controls.addEventListener("end", () => { dragging = false; schedule(); });
  [...dots.children].forEach((d, k) => d.onclick = () => show(k));

  function frame(root) {
    const r = root.userData.radius;
    camera.position.copy(new THREE.Vector3(1, 0.6, 1).normalize().multiplyScalar(r / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2)) * 1.05));
    camera.near = r / 50; camera.far = r * 20; camera.updateProjectionMatrix();
    controls.target.set(0, 0, 0); controls.update();
  }
  function prepare(root) {
    root.rotation.x = -Math.PI / 2; // Onshape is Z-up, three.js is Y-up
    root.updateMatrixWorld(true);
    root.traverse((o) => {
      if (!o.isMesh) return;
      if (o.material.name === "polycarbonate") {
        // Clear polycarbonate hopper walls: see-through, slight blue tint, glossy.
        o.material = new THREE.MeshPhysicalMaterial({ color: 0xcfe6f7, transparent: true, opacity: 0.22, roughness: 0.08, metalness: 0, side: THREE.DoubleSide, depthWrite: false });
        o.renderOrder = 2;
      } else { o.material.metalness = 0.35; o.material.roughness = 0.5; }
    });
    const box = new THREE.Box3().setFromObject(root);
    root.position.sub(box.getCenter(new THREE.Vector3()));
    root.userData.radius = box.getSize(new THREE.Vector3()).length() / 2;
    return root;
  }

  show(Math.max(0, ROBOTS.findIndex((r) => r.src))); // start on a real model
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * renderer.getPixelRatio())) { renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
  }
  renderer.setAnimationLoop(() => { resize(); controls.update(); renderer.render(scene, camera); });
}

// The models ship as glTF JSON with one base64 buffer (artifact hosting won't serve .glb).
// Rebuild a GLB in memory so nothing needs to fetch a data: URL.
function toGLB(json) {
  const b64 = json.buffers[0].uri.split(",")[1];
  const bin = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  delete json.buffers[0].uri;
  const pad = (n) => (n + 3) & ~3;
  let jsonBytes = new TextEncoder().encode(JSON.stringify(json));
  const jl = pad(jsonBytes.length), bl = pad(bin.length);
  const out = new Uint8Array(12 + 8 + jl + 8 + bl), dv = new DataView(out.buffer);
  dv.setUint32(0, 0x46546c67, true); dv.setUint32(4, 2, true); dv.setUint32(8, out.length, true);
  dv.setUint32(12, jl, true); dv.setUint32(16, 0x4e4f534a, true);
  out.fill(0x20, 20, 20 + jl); out.set(jsonBytes, 20);
  dv.setUint32(20 + jl, bl, true); dv.setUint32(24 + jl, 0x004e4942, true);
  out.set(bin, 28 + jl);
  return out.buffer;
}
