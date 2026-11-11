import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Mounts a spinning, draggable CAD viewer into every [data-cad] element.
for (const el of document.querySelectorAll("[data-cad]")) mount(el);

function mount(el) {
  const canvas = el.querySelector("canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8a80, 2.2));
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(3, 5, 4); scene.add(key);
  const rim = new THREE.DirectionalLight(0xffffff, 1.0); rim.position.set(-4, 2, -3); scene.add(rim);
  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false; controls.enablePan = false; controls.enableDamping = true;
  controls.autoRotate = !matchMedia("(prefers-reduced-motion: reduce)").matches; controls.autoRotateSpeed = 1.6;

  const pivot = new THREE.Group(); scene.add(pivot);
  const loader = new GLTFLoader();
  const status = el.querySelector(".cad-status");
  const cache = {};
  function show(url) {
    status.hidden = false; status.textContent = "Loading model…";
    const done = (root) => {
      pivot.clear(); pivot.add(root); status.hidden = true;
      const box = new THREE.Box3().setFromObject(root);
      const size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
      root.position.sub(c);
      const r = size.length() / 2;
      camera.position.copy(new THREE.Vector3(1, 0.6, 1).normalize().multiplyScalar(r / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2)) * 1.05));
      camera.near = r / 50; camera.far = r * 20; camera.updateProjectionMatrix();
      controls.target.set(0, 0, 0); controls.update();
    };
    if (cache[url]) return done(cache[url]);
    fetch(url).then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((json) => new Promise((res, rej) => loader.parse(toGLB(json), "", res, rej)))
      .then((g) => {
        const root = g.scene;
        root.rotation.x = -Math.PI / 2; // Onshape is Z-up, three.js is Y-up
        root.updateMatrixWorld(true);
        root.traverse((o) => {
          if (!o.isMesh) return;
          const m = o.material;
          if (m.name === "polycarbonate") {
            // Clear polycarbonate hopper walls: see-through, slight blue tint, glossy.
            o.material = new THREE.MeshPhysicalMaterial({ color: 0xcfe6f7, transparent: true, opacity: 0.22, roughness: 0.08, metalness: 0, side: THREE.DoubleSide, depthWrite: false });
            o.renderOrder = 2;
          } else { m.metalness = 0.35; m.roughness = 0.5; }
        });
        cache[url] = root; done(root);
      })
      .catch((e) => { console.error(e); status.textContent = "Model failed to load."; });
  }
  el.querySelectorAll("[data-model]").forEach((b) => b.onclick = () => {
    el.querySelectorAll("[data-model]").forEach((x) => x.classList.toggle("active", x === b));
    show(b.dataset.model);
  });
  show(el.querySelector("[data-model].active").dataset.model);

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
