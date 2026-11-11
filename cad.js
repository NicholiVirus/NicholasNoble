import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
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
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
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
    loader.load(url, (g) => {
      const root = g.scene;
      root.rotation.x = -Math.PI / 2; // Onshape is Z-up, three.js is Y-up
      root.updateMatrixWorld(true);
      // Clean up the look: keep Onshape's part colours, give them a satin machined finish.
      root.traverse((o) => {
        if (!o.isMesh) return;
        for (const m of [].concat(o.material)) { m.metalness = 0.35; m.roughness = 0.5; m.side = THREE.DoubleSide; }
      });
      cache[url] = root; done(root);
    }, undefined, () => { status.textContent = "Model failed to load."; });
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
